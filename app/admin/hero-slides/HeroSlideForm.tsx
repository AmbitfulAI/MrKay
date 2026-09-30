"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useSaveHeroSlide } from "@/queries/hero-slides";

const POSITION_PRESETS = [
  { value: "center top",    label: "Top" },
  { value: "center 20%",    label: "Upper" },
  { value: "center center", label: "Center" },
  { value: "center 35%",    label: "Lower" },
  { value: "center bottom", label: "Bottom" },
];

const schema = yup.object({
  eyebrow:  yup.string().required("Eyebrow text is required"),
  line1:    yup.string().required("Headline is required"),
  line2:    yup.string().required("Highlighted phrase is required"),
  subtitle: yup.string().required("Subtitle paragraph is required"),
  imagePos: yup.string().default("center top"),
  primaryLabel:      yup.string().required("Primary CTA label is required"),
  primaryHref:       yup.string().default(""),
  primaryCalendly:   yup.string().default("false"),
  secondaryLabel:    yup.string().default(""),
  secondaryHref:     yup.string().default(""),
  secondaryCalendly: yup.string().default("false"),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const sectionHead: React.CSSProperties = { fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)", paddingBottom: "12px", borderBottom: "1px solid var(--surface-2)", marginBottom: "4px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function HeroSlideForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [imageError, setImageError] = useState("");
  const [customPosition, setCustomPosition] = useState(
    () => !!initialData?.imagePos && !POSITION_PRESETS.some((p) => p.value === initialData.imagePos)
  );
  const mutation = useSaveHeroSlide(id, () => router.push("/admin/hero-slides"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      eyebrow: "", line1: "", line2: "", subtitle: "",
      imagePos: "center top",
      primaryLabel: "", primaryHref: "", primaryCalendly: "false",
      secondaryLabel: "", secondaryHref: "", secondaryCalendly: "false",
      ...initialData,
    },
  });

  const onSubmit = (data: FormData) => {
    if (!isEdit && !imageUrl) { setImageError("Please upload a background image."); return; }
    setImageError("");
    mutation.save({ ...data, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <p style={sectionHead}>Slide Content</p>
        <div>
          <label style={labelStyle}>Eyebrow Text *</label>
          <input {...register("eyebrow")} placeholder="Executive Operating System Architect · Fractional COO · Coach" style={input} />
          {errors.eyebrow && <p style={errorStyle}>{errors.eyebrow.message}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Headline *</label>
            <input {...register("line1")} placeholder="Clarity → Architecture" style={input} />
            {errors.line1 && <p style={errorStyle}>{errors.line1.message}</p>}
          </div>
          <div>
            <label style={labelStyle}>Highlighted Phrase *</label>
            <input {...register("line2")} placeholder="→ Momentum." style={input} />
            {errors.line2 && <p style={errorStyle}>{errors.line2.message}</p>}
          </div>
        </div>
        <p className="text-dim font-light" style={{ fontSize: "0.68rem", lineHeight: 1.6, marginTop: "-20px" }}>
          The Highlighted Phrase appears in gold, right after the Headline.
        </p>
        <div>
          <label style={labelStyle}>Subtitle Paragraph *</label>
          <textarea {...register("subtitle")} rows={4} placeholder="You're at the kind of inflection point…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} />
          {errors.subtitle && <p style={errorStyle}>{errors.subtitle.message}</p>}
        </div>

        <p style={sectionHead}>Background Image</p>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label={isEdit ? "Background Image (replace to change)" : "Background Image *"} />
        {imageError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "-12px" }}>{imageError}</p>}
        <div style={{ maxWidth: "260px" }}>
          <label style={labelStyle}>Image Focus Point</label>
          {customPosition ? (
            <input {...register("imagePos")} placeholder="center top" style={input} />
          ) : (
            <select {...register("imagePos")} style={input}>
              {POSITION_PRESETS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          )}
          <button
            type="button"
            onClick={() => setCustomPosition((v) => !v)}
            style={{ background: "none", border: "none", color: "var(--dim)", fontSize: "0.68rem", fontFamily: "var(--font-body)", padding: "8px 0 0", cursor: "pointer" }}
          >
            {customPosition ? "Use a preset instead" : "Advanced: enter a custom position"}
          </button>
        </div>

        <p style={sectionHead}>Primary CTA</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Label *</label>
            <input {...register("primaryLabel")} placeholder="Find Your Path" style={input} />
            {errors.primaryLabel && <p style={errorStyle}>{errors.primaryLabel.message}</p>}
          </div>
          <div><label style={labelStyle}>Link (leave blank if Calendly)</label><input {...register("primaryHref")} placeholder="/career-clarity" style={input} /></div>
        </div>
        <div><label style={labelStyle}>Opens Calendly?</label>
          <select {...register("primaryCalendly")} style={{ ...input, maxWidth: "180px" }}>
            <option value="false">No — use link above</option>
            <option value="true">Yes — open Calendly</option>
          </select>
        </div>

        <p style={sectionHead}>Secondary CTA</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Label</label><input {...register("secondaryLabel")} placeholder="Meet Kayode" style={input} /></div>
          <div><label style={labelStyle}>Link (leave blank if Calendly)</label><input {...register("secondaryHref")} placeholder="/my-story" style={input} /></div>
        </div>
        <div><label style={labelStyle}>Opens Calendly?</label>
          <select {...register("secondaryCalendly")} style={{ ...input, maxWidth: "180px" }}>
            <option value="false">No — use link above</option>
            <option value="true">Yes — open Calendly</option>
          </select>
        </div>

        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Slide"}</button>
          <button type="button" onClick={() => router.push("/admin/hero-slides")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
