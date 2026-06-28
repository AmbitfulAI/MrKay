import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";
import { FaqForm } from "../FaqForm";

export default async function EditFaq({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const item = await Faq.findById(id).lean<{ question: string; answer: string; order?: number }>().catch(() => null);
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/faqs" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← FAQs</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit FAQ</h1>
      </div>
      <FaqForm id={id} initialData={{ question: item.question, answer: item.answer, order: item.order?.toString() ?? "" }} />
    </div>
  );
}
