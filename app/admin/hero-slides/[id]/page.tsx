import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { HeroSlideForm } from "../HeroSlideForm";

export default async function EditHeroSlide({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const raw = await sanityClient.getDocument(id).catch(() => undefined);
  const item = (raw ?? null) as {
    _id: string; eyebrow: string; line1: string; line2: string; subtitle: string;
    image?: { asset?: { _ref?: string } }; imagePos?: string;
    primaryLabel?: string; primaryHref?: string; primaryCalendly?: boolean;
    secondaryLabel?: string; secondaryHref?: string; secondaryCalendly?: boolean;
    order?: number;
  } | null;
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/hero-slides" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Hero Slides</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Slide</h1>
      </div>
      <HeroSlideForm
        id={id}
        initialData={{
          eyebrow:          item.eyebrow,
          line1:            item.line1,
          line2:            item.line2,
          subtitle:         item.subtitle,
          imagePos:         item.imagePos ?? "center top",
          assetId:          item.image?.asset?._ref ?? "",
          primaryLabel:     item.primaryLabel ?? "",
          primaryHref:      item.primaryHref ?? "",
          primaryCalendly:  item.primaryCalendly ? "true" : "false",
          secondaryLabel:   item.secondaryLabel ?? "",
          secondaryHref:    item.secondaryHref ?? "",
          secondaryCalendly: item.secondaryCalendly ? "true" : "false",
          order:            item.order?.toString() ?? "",
        }}
      />
    </div>
  );
}
