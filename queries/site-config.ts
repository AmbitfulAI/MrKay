"use client";

import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";

export interface SiteConfigSaveData {
  calendlyUrl: string;
  contactEmail: string;
  footerTagline: string;
  footerBlurb: string;
  linkedInUrl: string;
  instagramUrl: string;
  statsBar: { line: string; descriptor: string }[];
}

export function useSaveSiteConfig(onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.siteConfig, onSuccess);
  function save(data: SiteConfigSaveData) {
    mutation.mutate({ url: "/api/admin/site-config", method: "PATCH", body: data });
  }
  return { ...mutation, save };
}
