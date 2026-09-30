"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useSaveGalleryItem } from "@/queries/gallery";

const schema = yup.object({
  title:    yup.string().default(""),
  caption:  yup.string().default(""),
  category: yup.string().default(""),
  alt:      yup.string().default(""),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; categories: string[]; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function GalleryItemForm({ initialData, id, categories }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [imageError, setImageError] = useState("");
  const mutation = useSaveGalleryItem(id, () => router.push("/admin/gallery"));
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", caption: "", category: "", alt: "", ...initialData },
  });

  const onSubmit = (data: FormData) => {
    if (!isEdit && !imageUrl) { setImageError("Please upload an image."); return; }
    setImageError("");
    mutation.save({ ...data, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "640px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label="Image *" />
        {imageError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "-12px" }}>{imageError}</p>}
        <div><label style={labelStyle}>Title</label><input {...register("title")} placeholder="Image title" style={input} /></div>
        <div><label style={labelStyle}>Alt Text</label><input {...register("alt")} placeholder="Describe the image" style={input} /></div>
        <div><label style={labelStyle}>Caption</label><input {...register("caption")} placeholder="Optional caption" style={input} /></div>
        <div>
          <label style={labelStyle}>Category</label>
          <select {...register("category")} style={input}>
            <option value="">— select a category —</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}</button>
          <button type="button" onClick={() => router.push("/admin/gallery")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
