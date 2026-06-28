"use client";

import { createContext, useContext } from "react";
import { SITE_CONFIG_DEFAULTS, type SiteConfigShape } from "@/lib/site-config-defaults";

export type SiteConfig = SiteConfigShape;

const defaults: SiteConfig = SITE_CONFIG_DEFAULTS;

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
