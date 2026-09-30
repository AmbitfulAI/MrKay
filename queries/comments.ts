"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";

export interface CommentRow {
  _id: string;
  noteId: string;
  parentId: string | null;
  authorName: string;
  authorEmail: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface NewCommentInput {
  noteId: string;
  parentId?: string;
  authorName: string;
  authorEmail: string;
  content: string;
  website?: string;
}

function commentsKey(noteId: string) {
  return ["comments", noteId] as const;
}

export function useCommentsQuery(noteId: string) {
  return useQuery<CommentRow[]>({
    queryKey: commentsKey(noteId),
    queryFn: () => apiClient.get(`/api/comments?noteId=${noteId}`),
    enabled: !!noteId,
  });
}

export function useCreateComment(noteId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NewCommentInput) => apiClient.post<CommentRow>("/api/comments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKey(noteId) });
    },
  });
}

export function useLikeComment(noteId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => apiClient.post<{ likes: number }>(`/api/comments/${commentId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKey(noteId) });
    },
  });
}

export interface AdminCommentRow {
  _id: string;
  note: { title: string; slug: string } | null;
  parentId: string | null;
  authorName: string;
  authorEmail: string;
  content: string;
  likes: number;
  createdAt: string;
}

export function useAdminCommentsQuery() {
  return useQuery<AdminCommentRow[]>({
    queryKey: QUERY_KEYS.comments,
    queryFn: () => apiClient.get("/api/admin/comments"),
  });
}

export function useDeleteComment() {
  const mutation = useAdminMutation(QUERY_KEYS.comments);
  function deleteComment(id: string) {
    mutation.mutate({ url: `/api/admin/comments/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteComment };
}
