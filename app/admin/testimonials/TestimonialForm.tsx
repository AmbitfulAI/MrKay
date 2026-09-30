"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveTestimonial } from "@/queries/testimonials";

const PAGE_OPTIONS = [
  { value: "home",                   label: "Homepage" },
  { value: "career-clarity",         label: "Career Clarity" },
  { value: "organisational-systems", label: "Organisational Systems" },
  { value: "my-story",               label: "My Story" },
  { value: "founder-architecture",   label: "Founder Architecture" },
  { value: "workshops-speaking",     label: "Workshops & Speaking" },
  { value: "testimonials",           label: "Testimonials Page" },
];

const schema = yup.object({
  quote:         yup.string().required("Quote is required"),
  clientName:    yup.string().default(""),
  clientContext: yup.string().default(""),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData> & { pages?: string[] }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function TestimonialForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [pages, setPages] = useState<string[]>(initialData?.pages ?? []);
  const mutation = useSaveTestimonial(id, () => router.push("/admin/testimonials"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { quote: "", clientName: "", clientContext: "", ...initialData },
  });

  function togglePage(value: string) {
    setPages((prev) => prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]);
  }

  const onSubmit = (data: FormData) => mutation.save({ ...data, pages });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label style={labelStyle}>Quote *</label>
          <textarea {...register("quote")} rows={5} placeholder="The most honest and incisive…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} />
          {errors.quote && <p style={errorStyle}>{errors.quote.message}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Client Name</label><input {...register("clientName")} placeholder="e.g. Chukwuemeka Obi" style={input} /></div>
          <div><label style={labelStyle}>Client Context</label><input {...register("clientContext")} placeholder="e.g. CEO, Financial Services" style={input} /></div>
        </div>
        <div>
          <p style={labelStyle}>Show on Pages</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {PAGE_OPTIONS.map((opt) => (
              <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: pages.includes(opt.value) ? "var(--gold)" : "var(--muted)" }}>
                <input type="checkbox" checked={pages.includes(opt.value)} onChange={() => togglePage(opt.value)} style={{ accentColor: "var(--gold)" }} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Testimonial"}</button>
          <button type="button" onClick={() => router.push("/admin/testimonials")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
