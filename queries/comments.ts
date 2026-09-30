"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

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
