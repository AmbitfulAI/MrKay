import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { SuccessStoryForm } from "../SuccessStoryForm";

export default async function EditSuccessStory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const raw = await sanityClient.getDocument(id).catch(() => undefined);
  const item = (raw ?? null) as { code: string; title: string; sector: string; client: string; result: string; story: string; order?: number } | null;
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/success-stories" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Success Stories</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Success Story</h1>
      </div>
      <SuccessStoryForm id={id} initialData={{ code: item.code ?? "", title: item.title ?? "", sector: item.sector ?? "", client: item.client ?? "", result: item.result ?? "", story: item.story ?? "", order: item.order?.toString() ?? "" }} />
    </div>
  );
}
