"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface ImpactOrgRow {
  _id: string;
  name: string;
  category: string;
  role?: string;
  active?: boolean;
  order?: number;
  imageUrl?: string;
}

export function useImpactQuery() {
  return useQuery<ImpactOrgRow[]>({
    queryKey: QUERY_KEYS.impact,
    queryFn: () => apiClient.get("/api/admin/impact"),
  });
}

export interface ImpactOrgSaveData {
  name: string;
  category: string;
  role: string;
  since: string;
  description: string;
  url: string;
  active: boolean;
  alt: string;
  imageUrl: string;
}

export function useSaveImpactOrg(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.impact, onSuccess);
  function save(data: ImpactOrgSaveData) {
    mutation.mutate({
      url: id ? `/api/admin/impact/${id}` : "/api/admin/impact",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteImpactOrg() {
  const mutation = useAdminMutation(QUERY_KEYS.impact);
  function deleteImpactOrg(id: string) {
    mutation.mutate({ url: `/api/admin/impact/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteImpactOrg };
}

export function useReorderImpact() {
  const queryClient = useQueryClient();
  return async function reorder(items: ImpactOrgRow[]) {
    await apiClient.patch("/api/admin/impact/reorder", {
      items: items.map((item, index) => ({ id: item._id, order: index + 1 })),
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.impact });
  };
}
