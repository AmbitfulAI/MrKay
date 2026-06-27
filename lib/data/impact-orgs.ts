import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";

export interface OrgItem {
  name: string;
  category: string;
  role: string;
  since: string;
  description: string;
  href: string;
  active: boolean;
  imageUrl: string | null;
  imageAlt: string;
}

interface DBOrg {
  name: string;
  category: string;
  role?: string;
  since?: string;
  description?: string;
  url?: string;
  active?: boolean;
  imageUrl?: string;
  alt?: string;
}

export async function getImpactOrgs(): Promise<OrgItem[]> {
  await connectDB();
  const results = await ImpactOrg
    .find()
    .sort({ order: 1 })
    .lean<DBOrg[]>()
    .catch(() => []);
  return results.map((org) => ({
    name: org.name,
    category: org.category,
    role: org.role ?? "",
    since: org.since ?? "",
    description: org.description ?? "",
    href: org.url ?? "#",
    active: org.active ?? true,
    imageUrl: org.imageUrl ?? null,
    imageAlt: org.alt ?? `TheKayodeKolade at ${org.name}`,
  }));
}
