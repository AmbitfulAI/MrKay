import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";
import { ImpactForm } from "../ImpactForm";

export default async function EditImpactOrg({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const item = await ImpactOrg.findById(id).lean<{ name: string; category: string; role: string; since: string; description: string; url: string; active: boolean; imageUrl: string; alt: string; order?: number }>();
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/impact" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Impact</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Organisation</h1>
      </div>
      <ImpactForm id={id} initialData={{ name: item.name ?? "", category: item.category ?? "", role: item.role ?? "", since: item.since ?? "", description: item.description ?? "", url: item.url ?? "", active: item.active !== false, alt: item.alt ?? "", order: item.order?.toString() ?? "", imageUrl: item.imageUrl ?? "" }} />
    </div>
  );
}
