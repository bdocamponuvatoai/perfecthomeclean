"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import {
  areaOptions,
  bathroomOptions,
  bedroomOptions,
  frequencyOptions,
  plannerServices,
  plannerSteps,
  priorityOptions,
  regions,
  serviceNames,
  type PlannerService,
} from "@/content/planner";
import {
  buildMailtoHref,
  buildRequestText,
  describeSpace,
  isBusinessService,
  localIsoDate,
  reviewEntries,
  type PlannerValues,
} from "@/lib/request-brief";

type PlannerPreset = { service?: PlannerService; region?: string };

type PlannerError = { field: "zip" | "date"; message: string };

const LAST_STEP = plannerSteps.length - 1;

function initialValues(preset: PlannerPreset): PlannerValues {
  return {
    service: preset.service ?? "regular",
    region: preset.region ?? regions[0],
    zip: "",
    bedrooms: "2",
    bathrooms: "1",
    area: areaOptions[0],
    frequency: frequencyOptions[0],
    date: "",
    priorities: [],
    notes: "",
  };
}

function readValues(form: HTMLFormElement): PlannerValues {
  const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;
  const data = new FormData(form);
  return {
    service: data.get("service") as PlannerService,
    region: value("region"),
    zip: value("zip").trim(),
    bedrooms: value("bedrooms"),
    bathrooms: value("bathrooms"),
    area: value("area"),
    frequency: value("frequency"),
    date: value("date"),
    priorities: data.getAll("priorities") as string[],
    notes: value("notes").trim(),
  };
}

const noSubscription = () => () => {};

export function RequestPlanner({ preset = {} }: { preset?: PlannerPreset }) {
  const [initial] = useState(() => initialValues(preset));
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<PlannerError | null>(null);
  const [downloadStatus, setDownloadStatus] = useState("");
  // The date input's minimum depends on the visitor's clock, so it is only set in the browser.
  const today = useSyncExternalStore(noSubscription, localIsoDate, () => "");

  const plannerRef = useRef<HTMLDivElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const reviewing = step === LAST_STEP;
  const business = isBusinessService(values.service);
  const space = describeSpace(values);

  function fail(field: PlannerError["field"], message: string) {
    flushSync(() => setError({ field, message }));
    (field === "zip" ? zipRef : dateRef).current?.focus();
    return false;
  }

  function validateStep() {
    setError(null);
    if (step === 1 && !/^\d{5}$/.test(values.zip)) {
      return fail(
        "zip",
        "Please enter a five-digit ZIP code so the team can review your location.",
      );
    }
    if (step === 2 && values.date && values.date < localIsoDate()) {
      return fail(
        "date",
        "Please choose today or a future date. The team will confirm availability.",
      );
    }
    return true;
  }

  function showStep(next: number) {
    flushSync(() => {
      setStep(next);
      setError(null);
    });
    const legend = plannerRef.current?.querySelectorAll("legend")[next];
    if (legend) {
      legend.tabIndex = -1;
      legend.focus({ preventScroll: true });
    }
    plannerRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }

  function advance() {
    if (step < LAST_STEP && validateStep()) showStep(step + 1);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    advance();
  }

  function downloadBrief() {
    const url = URL.createObjectURL(
      new Blob([buildRequestText(values)], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "Perfect-Home-Cleaning-Request.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    setDownloadStatus(
      "Your brief is ready to save. Share it with the team when you’re ready; nothing has been submitted.",
    );
  }

  return (
    <section className="container planner-layout section compact">
      <div className="planner" ref={plannerRef}>
        <div className="planner-progress" aria-label="Request progress">
          {plannerSteps.map((label, index) => (
            <span
              key={label}
              className={index < step ? "complete" : undefined}
              aria-current={index === step ? "step" : undefined}
            >
              <b>{index + 1}</b>
              {` ${label}`}
            </span>
          ))}
        </div>
        <noscript>
          <style>{"#clean-form,.planner-progress{display:none!important}"}</style>
          <div className="help-block">
            <h2>Let’s plan your clean together.</h2>
            <p>Contact the team to discuss your space, priorities and schedule.</p>
            <a className="button" href="/contact/">
              Talk to the team →
            </a>
          </div>
        </noscript>
        <form
          id="clean-form"
          noValidate
          onSubmit={onSubmit}
          onChange={(event) => setValues(readValues(event.currentTarget))}
        >
          <fieldset hidden={step !== 0}>
            <legend>What kind of clean feels right?</legend>
            <p className="step-description">
              Choose a starting point. You can fine-tune it with the team.
            </p>
            <div className="service-choices">
              {plannerServices.map((service) => (
                <label className="choice" key={service.value}>
                  <input
                    type="radio"
                    name="service"
                    value={service.value}
                    defaultChecked={service.value === initial.service}
                  />
                  <span className="choice-icon">
                    <Icon name={service.icon} />
                  </span>
                  <span>
                    <strong>{service.title}</strong>
                    <small>{service.description}</small>
                  </span>
                  <span className="radio-dot"></span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset hidden={step !== 1}>
            <legend>Tell us about your space.</legend>
            <p className="step-description">
              A few practical details help the team start the right conversation.
            </p>
            <div className="form-grid">
              <label>
                Service region
                <select name="region" defaultValue={preset.region}>
                  {regions.map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              </label>
              <label>
                {"ZIP code "}
                <span className="required">Required</span>
                <input
                  ref={zipRef}
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder="e.g. 10016"
                  required
                  aria-describedby="zip-help"
                  aria-invalid={error?.field === "zip" || undefined}
                />
              </label>
            </div>
            <p className="fine" id="zip-help">
              Coverage is confirmed by the team for your exact location.
            </p>
            <div className="form-grid home-fields" hidden={business}>
              <label>
                Bedrooms
                <select name="bedrooms" defaultValue="2" disabled={business}>
                  {bedroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Bathrooms
                <select name="bathrooms" defaultValue="1" disabled={business}>
                  {bathroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="work-fields" hidden={!business}>
              <label>
                Approximate area
                <select name="area" disabled={!business}>
                  {areaOptions.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset hidden={step !== 2}>
            <legend>How can we make it yours?</legend>
            <p className="step-description">
              Share a preferred rhythm and the details that deserve attention.
            </p>
            <div className="form-grid">
              <label>
                Frequency
                <select name="frequency">
                  {frequencyOptions.map((frequency) => (
                    <option key={frequency}>{frequency}</option>
                  ))}
                </select>
              </label>
              <label>
                {"Preferred date "}
                <span className="optional">Optional</span>
                <input
                  ref={dateRef}
                  name="date"
                  type="date"
                  min={today || undefined}
                  aria-invalid={error?.field === "date" || undefined}
                />
              </label>
            </div>
            <p className="fine">A preferred date is a request, not confirmed availability.</p>
            <span className="field-title">
              {"What matters most? "}
              <span className="optional">Choose any</span>
            </span>
            <div className="priority-grid">
              {priorityOptions.map((priority) => (
                <label key={priority}>
                  <input type="checkbox" name="priorities" value={priority} />
                  <span>{priority}</span>
                </label>
              ))}
            </div>
            <label className="notes-label">
              Anything else we should know?
              <textarea
                name="notes"
                rows={4}
                maxLength={700}
                placeholder="Tell us about access, pets, product preferences or any special requests. Please don’t include access codes or sensitive information."
              ></textarea>
            </label>
            <p className="fine">
              Specific tasks and extras are subject to the team’s review and quote.
            </p>
          </fieldset>

          <fieldset hidden={!reviewing}>
            <legend>Your clean, clearly laid out.</legend>
            <p className="step-description">
              Review your brief, then share it with the team to request a quote.
            </p>
            <div id="request-review">
              {reviewing && (
                <dl>
                  {reviewEntries(values).map(([term, detail]) => (
                    <div className="review-group" key={term}>
                      <dt>{term}</dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="review-notice">
              <Icon name="shield" />
              <p>This is a request brief. No message has been sent and no appointment is booked.</p>
            </div>
            <div className="review-actions">
              <a
                className="button"
                href={reviewing ? buildMailtoHref(site.email, values) : `mailto:${site.email}`}
              >
                <span>Create email request</span>
                <Icon name="up" />
              </a>
              <button className="button outline" type="button" onClick={downloadBrief}>
                <span>Download my brief</span>
                <Icon name="download" />
              </button>
            </div>
            <p className="fine">
              {
                "The email button opens your email app with the brief ready to review and send. Prefer a web form? "
              }
              <a href={site.originalContactPage} target="_blank" rel="noopener">
                Use the company’s contact page ↗
              </a>
            </p>
            <p id="download-status" className="fine" role="status">
              {downloadStatus || null}
            </p>
          </fieldset>

          <p id="planner-error" className="form-error" role="alert">
            {error?.message ?? null}
          </p>
          <div className="planner-controls">
            <button
              className="text-link"
              type="button"
              hidden={step === 0}
              onClick={() => step > 0 && showStep(step - 1)}
            >
              ← Back
            </button>
            <button
              id="next-step"
              className="button"
              type="button"
              hidden={reviewing}
              onClick={advance}
            >
              {"Continue "}
              <Icon name="arrow" />
            </button>
          </div>
        </form>
      </div>
      <aside className="plan-sidebar">
        <div className="plan-image">
          <Photo photo={photos.hero} alt="Illustrative calm home interior" />
          <span>A LITTLE MORE LIFE.</span>
        </div>
        <div className="plan-sidebar-content">
          <Eyebrow>YOUR CLEAN, AT A GLANCE</Eyebrow>
          <h2>
            Coming together
            <br />
            nicely.
          </h2>
          <dl>
            <div>
              <dt>Service</dt>
              <dd>{serviceNames[values.service]}</dd>
            </div>
            <div>
              <dt>Space</dt>
              <dd>{values.zip ? `${space} · ${values.zip}` : space}</dd>
            </div>
            <div>
              <dt>Schedule</dt>
              <dd>{values.frequency}</dd>
            </div>
          </dl>
          <p className="fine">The team provides a tailored quote after reviewing your request.</p>
          <hr />
          <p>Prefer to talk it through?</p>
          <a className="sidebar-phone" href={site.phone.href}>
            {site.phone.display}
          </a>
        </div>
      </aside>
    </section>
  );
}
