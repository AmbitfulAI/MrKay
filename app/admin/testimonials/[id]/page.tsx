import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";
import { TestimonialForm } from "../TestimonialForm";

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const item = await Testimonial.findById(id).lean<{ quote: string; clientName: string; clientContext: string; order?: number; pages?: string[] }>().catch(() => null);
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/testimonials" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Testimonials</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Testimonial</h1>
      </div>
      <TestimonialForm id={id} initialData={{ quote: item.quote, clientName: item.clientName ?? "", clientContext: item.clientContext ?? "", order: item.order?.toString() ?? "", pages: item.pages ?? [] }} />
    </div>
  );
}
