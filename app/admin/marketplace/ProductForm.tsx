"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveProduct } from "@/queries/marketplace";

const schema = yup.object({
  title:       yup.string().required("Title is required"),
  subtitle:    yup.string().default(""),
  type:        yup.string().required("Type is required"),
  description: yup.string().default(""),
  price:       yup.string().default(""),
  priceNote:   yup.string().default(""),
  tag:         yup.string().default(""),
  selarUrl:    yup.string().default(""),
  available:   yup.boolean().default(true),
  coverAccent: yup.string().default(""),
  order:       yup.string().default(""),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function ProductForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const mutation = useSaveProduct(id, () => router.push("/admin/marketplace"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", subtitle: "", type: "", description: "", price: "", priceNote: "", tag: "", selarUrl: "", available: true, coverAccent: "", order: "", ...initialData },
  });

  const onSubmit = (data: FormData) => mutation.save(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: "20px" }}>
          <div>
            <label style={label}>Title *</label>
            <input {...register("title")} placeholder="e.g. Lead From Within" style={input} />
            {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
          </div>
          <div>
            <label style={label}>Type *</label>
            <select {...register("type")} style={input}>
              <option value="">Select</option>
              <option value="Book">Book</option>
              <option value="Course">Course</option>
            </select>
            {errors.type && <p style={errorStyle}>{errors.type.message}</p>}
          </div>
        </div>
        <div><label style={label}>Subtitle</label><input {...register("subtitle")} placeholder="e.g. A guide to executive leadership" style={input} /></div>
        <div><label style={label}>Description</label><textarea {...register("description")} rows={4} placeholder="What this product is about…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Price</label><input {...register("price")} placeholder="$24.99" style={input} /></div>
          <div><label style={label}>Price Note</label><input {...register("priceNote")} placeholder="Digital + Print" style={input} /></div>
          <div><label style={label}>Tag</label><input {...register("tag")} placeholder="Bestseller" style={input} /></div>
        </div>
        <div><label style={label}>Selar URL</label><input type="url" {...register("selarUrl")} placeholder="https://selar.co/…" style={input} /></div>
        <div><label style={label}>Cover Gradient</label><input {...register("coverAccent")} placeholder="linear-gradient(135deg, #1a1a2e, #16213e)" style={input} /></div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" {...register("order")} placeholder="1" style={input} /></div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", fontFamily: "var(--font-body)", color: "var(--text)", cursor: "pointer" }}>
            <input type="checkbox" {...register("available")} />
            Available for purchase
          </label>
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}</button>
          <button type="button" onClick={() => router.push("/admin/marketplace")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
