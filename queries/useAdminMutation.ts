"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

type MutationArgs = {
  url: string;
  method: "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export function useAdminMutation(
  queryKey: QueryKey,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, MutationArgs>({
    mutationFn: ({ url, method, body }) => {
      if (method === "POST") return apiClient.post(url, body);
      if (method === "PATCH") return apiClient.patch(url, body);
      return apiClient.delete(url);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.();
    },
  });
}
