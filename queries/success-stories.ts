"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface StoryRow {
  _id: string;
  code: string;
  title: string;
  sector: string;
  order?: number;
}

export function useSuccessStoriesQuery() {
  return useQuery<StoryRow[]>({
    queryKey: QUERY_KEYS.successStories,
    queryFn: () => apiClient.get("/api/admin/success-stories"),
  });
}

export function useSaveSuccessStory(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.successStories, onSuccess);
  function save(data: { code: string; title: string; sector: string; client: string; result: string; story: string }) {
    mutation.mutate({
      url: id ? `/api/admin/success-stories/${id}` : "/api/admin/success-stories",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteSuccessStory() {
  const mutation = useAdminMutation(QUERY_KEYS.successStories);
  function deleteSuccessStory(id: string) {
    mutation.mutate({ url: `/api/admin/success-stories/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteSuccessStory };
}

export function useReorderSuccessStories() {
  const queryClient = useQueryClient();
  return async function reorder(items: StoryRow[]) {
    await apiClient.patch("/api/admin/success-stories/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.successStories });
  };
}
