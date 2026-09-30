"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface GalleryRow {
  _id: string;
  title: string;
  category?: string;
  order?: number;
  imageUrl?: string;
}

export function useGalleryQuery() {
  return useQuery<GalleryRow[]>({
    queryKey: QUERY_KEYS.gallery,
    queryFn: () => apiClient.get("/api/admin/gallery"),
  });
}

export function useSaveGalleryItem(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.gallery, onSuccess);
  function save(data: { title: string; caption: string; category: string; alt: string; imageUrl: string }) {
    mutation.mutate({
      url: id ? `/api/admin/gallery/${id}` : "/api/admin/gallery",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteGalleryItem() {
  const mutation = useAdminMutation(QUERY_KEYS.gallery);
  function deleteGalleryItem(id: string) {
    mutation.mutate({ url: `/api/admin/gallery/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteGalleryItem };
}

export function useReorderGallery() {
  const queryClient = useQueryClient();
  return async function reorder(items: GalleryRow[]) {
    await apiClient.patch("/api/admin/gallery/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.gallery });
  };
}
