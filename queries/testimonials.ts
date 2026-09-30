"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface TestimonialRow {
  _id: string;
  quote: string;
  clientName: string;
  clientContext: string;
  order?: number;
  pages?: string[];
}

export function useTestimonialsQuery() {
  return useQuery<TestimonialRow[]>({
    queryKey: QUERY_KEYS.testimonials,
    queryFn: () => apiClient.get("/api/admin/testimonials"),
  });
}

export function useSaveTestimonial(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.testimonials, onSuccess);
  function save(data: { quote: string; clientName: string; clientContext: string; pages: string[] }) {
    mutation.mutate({
      url: id ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteTestimonial() {
  const mutation = useAdminMutation(QUERY_KEYS.testimonials);
  function deleteTestimonial(id: string) {
    mutation.mutate({ url: `/api/admin/testimonials/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteTestimonial };
}

export function useReorderTestimonials() {
  const queryClient = useQueryClient();
  return async function reorder(items: TestimonialRow[]) {
    await apiClient.patch("/api/admin/testimonials/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.testimonials });
  };
}
