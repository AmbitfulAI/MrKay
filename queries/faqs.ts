"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface FaqRow {
  _id: string;
  question: string;
  answer: string;
  order?: number;
}

export function useFaqsQuery() {
  return useQuery<FaqRow[]>({
    queryKey: QUERY_KEYS.faqs,
    queryFn: () => apiClient.get("/api/admin/faqs"),
  });
}

export function useSaveFaq(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.faqs, onSuccess);
  function save(data: { question: string; answer: string }) {
    mutation.mutate({
      url: id ? `/api/admin/faqs/${id}` : "/api/admin/faqs",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteFaq() {
  const mutation = useAdminMutation(QUERY_KEYS.faqs);
  function deleteFaq(id: string) {
    mutation.mutate({ url: `/api/admin/faqs/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteFaq };
}

export function useReorderFaqs() {
  const queryClient = useQueryClient();
  return async function reorder(items: FaqRow[]) {
    await apiClient.patch("/api/admin/faqs/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.faqs });
  };
}
