"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";

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
    mutationFn: async ({ url, method, body }) => {
      const res = await fetch(url, {
        method,
        headers: body !== undefined ? { "Content-Type": "application/json" } : {},
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      return res.json().catch(() => null);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.();
    },
  });
}
