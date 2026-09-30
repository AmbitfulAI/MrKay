"use client";

import { useQuery } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";
import type { ContentBlock } from "@/lib/notes";

export interface NoteRow {
  _id: string;
  title: string;
  slug: string;
  category: { title: string };
  date: string;
}

export interface NoteSaveData {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  featuredImages: string[];
  contentBlocks: ContentBlock[];
}

export function useNotesQuery() {
  return useQuery<NoteRow[]>({
    queryKey: QUERY_KEYS.notes,
    queryFn: () => apiClient.get("/api/admin/notes"),
  });
}

export function useSaveNote(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.notes, onSuccess);
  function save(data: NoteSaveData) {
    mutation.mutate({
      url: id ? `/api/admin/notes/${id}` : "/api/admin/notes",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteNote() {
  const mutation = useAdminMutation(QUERY_KEYS.notes);
  function deleteNote(id: string) {
    mutation.mutate({ url: `/api/admin/notes/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteNote };
}
