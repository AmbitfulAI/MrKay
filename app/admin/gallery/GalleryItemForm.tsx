"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FormData { title: string; caption: string; category: string; alt: string; order: string; }
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; categories: string[]; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function GalleryItemForm({ initialData, id, categories }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ title: "", caption: "", category: "", alt: "", order: "", ...initialData });
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [imageError, setImageError] = useState("");
  const mutation = useAdminMutation(QUERY_KEYS.gallery, () => router.push("/admin/gallery"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEdit && !imageUrl) { setImageError("Please upload an image."); return; }
    setImageError("");
    mutation.mutate({
      url: isEdit ? `/api/admin/gallery/${id}` : "/api/admin/gallery",
      method: isEdit ? "PATCH" : "POST",
      body: { ...form, imageUrl },
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "640px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label="Image *" />
        {imageError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "-12px" }}>{imageError}</p>}
        <div><label style={labelStyle}>Title</label><input value={form.title} onChange={set("title")} placeholder="Image title" style={input} /></div>
        <div><label style={labelStyle}>Alt Text</label><input value={form.alt} onChange={set("alt")} placeholder="Describe the image" style={input} /></div>
        <div><label style={labelStyle}>Caption</label><input value={form.caption} onChange={set("caption")} placeholder="Optional caption" style={input} /></div>
        <div>
          <label style={labelStyle}>Category</label>
          <select value={form.category} onChange={set("category")} style={input}>
            <option value="">— select a category —</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div style={{ maxWidth: "140px" }}><label style={labelStyle}>Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}</button>
          <button type="button" onClick={() => router.push("/admin/gallery")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
