"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FormData { question: string; answer: string; order: string; }
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function FaqForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ question: "", answer: "", order: "", ...initialData });
  const mutation = useAdminMutation(QUERY_KEYS.faqs, () => router.push("/admin/faqs"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      url: isEdit ? `/api/admin/faqs/${id}` : "/api/admin/faqs",
      method: isEdit ? "PATCH" : "POST",
      body: form,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div><label style={labelStyle}>Question *</label><input value={form.question} onChange={set("question")} required placeholder="Am I the kind of person you work with?" style={input} /></div>
        <div><label style={labelStyle}>Answer *</label><textarea value={form.answer} onChange={set("answer")} required rows={6} placeholder="Your answer here…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ maxWidth: "160px" }}><label style={labelStyle}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add FAQ"}</button>
          <button type="button" onClick={() => router.push("/admin/faqs")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
