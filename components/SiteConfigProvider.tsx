"use client";

import { createContext, useContext } from "react";

export interface SiteConfig {
  calendlyUrl:  string;
  contactEmail: string;
  footerTagline: string;
  footerBlurb:  string;
  linkedInUrl:  string;
  instagramUrl: string;
  statsBar: Array<{ line: string; descriptor: string }>;
}

const defaults: SiteConfig = {
  calendlyUrl:  "https://calendly.com/thekayodekolade",
  contactEmail: "hello@thekayodekolade.com",
  footerTagline: "Executive Operating System Architect · Fractional COO · Coach",
  footerBlurb:  "Helping professionals, founders, and organisations turn clarity into operating architecture and execution momentum.",
  linkedInUrl:  "https://linkedin.com",
  instagramUrl: "https://instagram.com",
  statsBar: [
    { line: "15+ Years",       descriptor: "Leadership, Transformation & Systems Building" },
    { line: "Multi-Country",   descriptor: "Executive Leadership Across Africa" },
    { line: "Operating Models", descriptor: "Governance & Organisational Effectiveness" },
    { line: "ICF Member",      descriptor: "Brain-Based Coach · Organisational Development Practitioner" },
  ],
};

const SiteConfigContext = createContext<SiteConfig>(defaults);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: Partial<SiteConfig> | null;
  children: React.ReactNode;
}) {
  const value: SiteConfig = config
    ? { ...defaults, ...config, statsBar: config.statsBar?.length ? config.statsBar : defaults.statsBar }
    : defaults;

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}
