"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useSaveImpactOrg } from "@/queries/impact";

const schema = yup.object({
  name:        yup.string().required("Organisation name is required"),
  category:    yup.string().default(""),
  role:        yup.string().default(""),
  since:       yup.string().default(""),
  description: yup.string().default(""),
  url:         yup.string().default(""),
  active:      yup.boolean().default(true),
  alt:         yup.string().default(""),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function ImpactForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const mutation = useSaveImpactOrg(id, () => router.push("/admin/impact"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", category: "", role: "", since: "", description: "", url: "", active: true, alt: "", ...initialData },
  });

  const onSubmit = (data: FormData) => mutation.save({ ...data, imageUrl });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label style={labelStyle}>Organisation Name *</label>
          <input {...register("name")} placeholder="Name" style={input} />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Category</label><input {...register("category")} placeholder="e.g. Advisory" style={input} /></div>
          <div><label style={labelStyle}>Role</label><input {...register("role")} placeholder="e.g. Board Member" style={input} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Since</label><input {...register("since")} placeholder="e.g. 2020" style={input} /></div>
          <div><label style={labelStyle}>Website URL</label><input {...register("url")} placeholder="https://..." style={input} /></div>
        </div>
        <div><label style={labelStyle}>Description</label><textarea {...register("description")} rows={3} placeholder="Brief description…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label="Proof-of-Work Image" />
        <div><label style={labelStyle}>Image Alt Text</label><input {...register("alt")} placeholder="Describe the image" style={input} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input type="checkbox" id="active" {...register("active")} />
          <label htmlFor="active" style={{ ...labelStyle, marginBottom: 0 }}>Active (shown on site)</label>
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Organisation"}</button>
          <button type="button" onClick={() => router.push("/admin/impact")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
