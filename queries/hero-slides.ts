"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface HeroSlideRow {
  _id: string;
  eyebrow: string;
  line1: string;
  line2: string;
  imageUrl?: string;
  order?: number;
}

export function useHeroSlidesQuery() {
  return useQuery<HeroSlideRow[]>({
    queryKey: QUERY_KEYS.heroSlides,
    queryFn: () => apiClient.get("/api/admin/hero-slides"),
  });
}

export interface HeroSlideSaveData {
  eyebrow: string;
  line1: string;
  line2: string;
  subtitle: string;
  imagePos: string;
  primaryLabel: string;
  primaryHref: string;
  primaryCalendly: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryCalendly: string;
  imageUrl: string;
}

export function useSaveHeroSlide(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.heroSlides, onSuccess);
  function save(data: HeroSlideSaveData) {
    mutation.mutate({
      url: id ? `/api/admin/hero-slides/${id}` : "/api/admin/hero-slides",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteHeroSlide() {
  const mutation = useAdminMutation(QUERY_KEYS.heroSlides);
  function deleteHeroSlide(id: string) {
    mutation.mutate({ url: `/api/admin/hero-slides/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteHeroSlide };
}

export function useReorderHeroSlides() {
  const queryClient = useQueryClient();
  return async function reorder(items: HeroSlideRow[]) {
    await apiClient.patch("/api/admin/hero-slides/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.heroSlides });
  };
}
