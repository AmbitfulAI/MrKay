export interface SiteConfigShape {
  calendlyUrl:   string;
  contactEmail:  string;
  footerTagline: string;
  footerBlurb:   string;
  linkedInUrl:   string;
  instagramUrl:  string;
  statsBar:      { line: string; descriptor: string }[];
}

export const SITE_CONFIG_DEFAULTS: SiteConfigShape = {
  calendlyUrl:   "https://calendly.com/thekayodekolade",
  contactEmail:  "hello@thekayodekolade.com",
  footerTagline: "Executive Operating System Architect · Fractional COO · Coach",
  footerBlurb:   "Helping professionals, founders, and organisations turn clarity into operating architecture and execution momentum.",
  linkedInUrl:   "https://linkedin.com",
  instagramUrl:  "https://instagram.com",
  statsBar: [
    { line: "15+ Years",        descriptor: "Leadership, Transformation & Systems Building" },
    { line: "Multi-Country",    descriptor: "Executive Leadership Across Africa" },
    { line: "Operating Models", descriptor: "Governance & Organisational Effectiveness" },
    { line: "ICF Member",       descriptor: "Brain-Based Coach · Organisational Development Practitioner" },
  ],
};
