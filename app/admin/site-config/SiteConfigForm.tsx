"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveSiteConfig } from "@/queries/site-config";
import { Toast } from "@/app/admin/_components/Toast";

const schema = yup.object({
  calendlyUrl:   yup.string().required("Calendly URL is required"),
  contactEmail:  yup.string().email("Must be a valid email").required("Contact email is required"),
  footerTagline: yup.string().default(""),
  footerBlurb:   yup.string().default(""),
  linkedInUrl:   yup.string().default(""),
  instagramUrl:  yup.string().default(""),
  statsBar: yup.array(
    yup.object({
      line:       yup.string().default(""),
      descriptor: yup.string().default(""),
    })
  ).default([]),
}).required();

type Config = yup.InferType<typeof schema>;

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const sectionHead: React.CSSProperties = { fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)", paddingBottom: "12px", borderBottom: "1px solid var(--surface-2)", marginBottom: "4px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function SiteConfigForm({ initial }: { initial: Config }) {
  const [saved, setSaved] = useState(false);
  const mutation = useSaveSiteConfig(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  });
  const { register, control, handleSubmit, formState: { errors } } = useForm<Config>({
    resolver: yupResolver(schema),
    defaultValues: initial,
  });
  const { fields } = useFieldArray({ control, name: "statsBar" });

  const onSubmit = (data: Config) => mutation.save(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <p style={sectionHead}>Booking & Contact</p>
        <div>
          <label style={labelStyle}>Calendly URL *</label>
          <input {...register("calendlyUrl")} placeholder="https://calendly.com/thekayodekolade" style={input} />
          {errors.calendlyUrl && <p style={errorStyle}>{errors.calendlyUrl.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Contact Email *</label>
          <input type="email" {...register("contactEmail")} placeholder="hello@thekayodekolade.com" style={input} />
          {errors.contactEmail && <p style={errorStyle}>{errors.contactEmail.message}</p>}
        </div>

        <p style={sectionHead}>Footer</p>
        <div><label style={labelStyle}>Footer Tagline</label><input {...register("footerTagline")} placeholder="Executive Operating System Architect · Fractional COO · Coach" style={input} /></div>
        <div><label style={labelStyle}>Footer Brand Blurb</label><textarea {...register("footerBlurb")} rows={2} style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>LinkedIn URL</label><input {...register("linkedInUrl")} placeholder="https://linkedin.com/in/..." style={input} /></div>
          <div><label style={labelStyle}>Instagram URL</label><input {...register("instagramUrl")} placeholder="https://instagram.com/..." style={input} /></div>
        </div>

        <p style={sectionHead}>Homepage Stats Bar</p>
        <p className="text-dim font-light" style={{ fontSize: "0.72rem", lineHeight: 1.7, marginTop: "-12px" }}>Four stat blocks shown below the hero on the homepage.</p>
        {fields.map((field, i) => (
          <div key={field.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--surface-2)" }}>
            <div><label style={labelStyle}>Stat Value</label><input {...register(`statsBar.${i}.line`)} placeholder="15+ Years" style={input} /></div>
            <div><label style={labelStyle}>Description</label><input {...register(`statsBar.${i}.descriptor`)} placeholder="Leadership, Transformation & Systems Building" style={input} /></div>
          </div>
        ))}

        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : "Save Configuration"}</button>
        </div>
      </div>
      <Toast message="✓ Configuration saved" visible={saved} />
    </form>
  );
}
