import Link from "next/link";

import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/photos";

export function Hero() {
  return (
    <section className="container hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="status-dot"></span>
          {" CLEAN SPACES. FULLER DAYS."}
        </span>
        <h1>
          A cleaner home.
          <br />
          A little more
          <br />
          <span className="life-word">
            life.
            <Icon name="spark" />
          </span>
        </h1>
        <p>
          Come back to the feeling of everything in its place. Thoughtful cleaning for your home,
          your workspace, and whatever comes next.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/request/">Find my perfect clean</ButtonLink>
          <Link className="quiet-link" href="/services/">
            {"Explore services "}
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="hero-proof">
          <span className="proof-icon">
            <Icon name="shield" />
          </span>
          <p>
            Family owned. Insured & bonded.
            <br />
            <b>Taking care of New York since 2001.</b>
          </p>
        </div>
      </div>
      <div className="hero-visual">
        <Photo
          photo={photos.hero}
          alt="Illustrative warm, sunlit living room"
          className="hero-photo"
          eager
        />
        <div className="hero-float">
          <span className="float-check">
            <Icon name="check" />
          </span>
          <div>
            <strong>Less on your to-do list.</strong>
            <span>More of what makes you happy.</span>
          </div>
        </div>
        <div className="hero-label">HOME FEELS GOOD FROM HERE.</div>
        <div className="hero-orbit" aria-hidden="true">
          <Icon name="spark" />
        </div>
      </div>
    </section>
  );
}
