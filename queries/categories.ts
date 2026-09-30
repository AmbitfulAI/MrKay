"use client";

import { useQuery } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export type CategoryType = "writing" | "visual-diary";

export interface CategoryRow {
  _id: string;
  title: string;
  type: CategoryType;
  order?: number;
}

export function useCategoriesQuery() {
  return useQuery<CategoryRow[]>({
    queryKey: QUERY_KEYS.categories,
    queryFn: () =>
      apiClient
        .get<CategoryRow[]>("/api/admin/notes/categories")
        .then((d) => d.filter((c) => c._id)),
  });
}

export function useAddCategory(onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.categories, onSuccess);
  function add(data: { title: string; type: CategoryType; order: number }) {
    mutation.mutate({ url: "/api/admin/notes/categories", method: "POST", body: data });
  }
  return { ...mutation, add };
}

export function useDeleteCategory() {
  const mutation = useAdminMutation(QUERY_KEYS.categories);
  function deleteCategory(id: string) {
    mutation.mutate({ url: `/api/admin/notes/categories/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteCategory };
}

export interface CategorySaveData {
  title: string;
  type: string;
  tagline: string;
  description: string;
  themes: string[];
}

export function useSaveCategory(id: string, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.categories, onSuccess);
  function save(data: CategorySaveData) {
    mutation.mutate({ url: `/api/admin/notes/categories/${id}`, method: "PATCH", body: data });
  }
  return { ...mutation, save };
}
