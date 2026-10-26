// Business details and navigation. Safe to import from client components.

export const site = {
  name: "Perfect Home Cleaning",
  titleSuffix: "Perfect Home Clean",
  themeColor: "#eff4e9",
  phone: { display: "(516) 385-0721", href: "tel:+15163850721", e164: "+15163850721" },
  altPhone: { display: "(917) 488-2109", href: "tel:+19174882109" },
  email: "perfecthome@perfecthome-cleanings.com",
  address: {
    street: "347 5th Avenue, Suite 1402",
    locality: "New York",
    region: "NY",
    postalCode: "10016",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=347+5th+Avenue+Suite+1402+New+York+NY+10016",
  originalWebsite: "https://perfecthomeclean.com/",
  originalContactPage: "https://perfecthomeclean.com/contact/",
  serviceRegions: ["New York City", "Long Island", "New Jersey"],
} as const;

export const cityLine = `${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

export const mainNav = [
  { label: "Our services", href: "/services/" },
  { label: "What we clean", href: "/what-we-clean/" },
  { label: "Our story", href: "/about/" },
  { label: "Service areas", href: "/areas/" },
] as const;
