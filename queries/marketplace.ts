"use client";

import { useQuery } from "@tanstack/react-query";
import { useAdminMutation } from "./useAdminMutation";
import { QUERY_KEYS } from "./keys";
import { apiClient } from "@/lib/api-client";

export interface ProductRow {
  _id: string;
  title: string;
  type: string;
  price?: string;
  available?: boolean;
  order?: number;
}

export function useMarketplaceQuery() {
  return useQuery<ProductRow[]>({
    queryKey: QUERY_KEYS.marketplace,
    queryFn: () => apiClient.get("/api/admin/marketplace"),
  });
}

export interface ProductSaveData {
  title: string;
  subtitle: string;
  type: string;
  description: string;
  price: string;
  priceNote: string;
  tag: string;
  selarUrl: string;
  available: boolean;
  coverAccent: string;
  order: string;
}

export function useSaveProduct(id: string | undefined, onSuccess?: () => void) {
  const mutation = useAdminMutation(QUERY_KEYS.marketplace, onSuccess);
  function save(data: ProductSaveData) {
    mutation.mutate({
      url: id ? `/api/admin/marketplace/${id}` : "/api/admin/marketplace",
      method: id ? "PATCH" : "POST",
      body: data,
    });
  }
  return { ...mutation, save };
}

export function useDeleteProduct() {
  const mutation = useAdminMutation(QUERY_KEYS.marketplace);
  function deleteProduct(id: string) {
    mutation.mutate({ url: `/api/admin/marketplace/${id}`, method: "DELETE" });
  }
  return { ...mutation, deleteProduct };
}
