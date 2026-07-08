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
  linkedInUrl:   "https://linkedin.com/in/kayodekolade",
  instagramUrl:  "https://instagram.com",
  statsBar: [
    { line: "COO-Level Operating Leadership",       descriptor: "MULTI-COUNTRY EXECUTIVE EXPERIENCE" },
    { line: "Multi-Country Executive Experience",   descriptor: "AFRICA · EUROPE · GLOBAL CLIENT REACH" },
    { line: "Leadership & High-Performance Culture", descriptor: "SYSTEMS · CULTURE · EXECUTION ARCHITECTURE" },
    { line: "Organisational Development Practitioner", descriptor: "ORGANIZATION DEVELOPMENT NETWORK · NEUROLEADERSHIP INSTITUTE · ICF" },
  ],
};
