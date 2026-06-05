import { sanityClient } from "@/sanity/client";

const isConfigured =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T[]> {
  if (!isConfigured) return [];
  try {
    const result = await sanityClient.fetch<T[]>(query, params ?? {});
    return result ?? [];
  } catch {
    return [];
  }
}

export async function sanityFetchOne<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!isConfigured) return null;
  try {
    const result = await sanityClient.fetch<T>(query, params ?? {});
    return result ?? null;
  } catch {
    return null;
  }
}
