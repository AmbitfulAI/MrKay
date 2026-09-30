"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveSuccessStory } from "@/queries/success-stories";

const schema = yup.object({
  code:   yup.string().required("Code is required"),
  title:  yup.string().required("Title is required"),
  sector: yup.string().required("Sector is required"),
  client: yup.string().default(""),
  result: yup.string().default(""),
  story:  yup.string().required("Full story is required"),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function SuccessStoryForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const mutation = useSaveSuccessStory(id, () => router.push("/admin/success-stories"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { code: "", title: "", sector: "", client: "", result: "", story: "", ...initialData },
  });

  const onSubmit = (data: FormData) => mutation.save(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "20px" }}>
          <div>
            <label style={label}>Code *</label>
            <input {...register("code")} placeholder="01" style={input} />
            {errors.code && <p style={errorStyle}>{errors.code.message}</p>}
          </div>
          <div>
            <label style={label}>Title *</label>
            <input {...register("title")} placeholder="Navigating a hostile takeover bid" style={input} />
            {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={label}>Sector *</label>
            <input {...register("sector")} placeholder="e.g. Banking" style={input} />
            {errors.sector && <p style={errorStyle}>{errors.sector.message}</p>}
          </div>
          <div><label style={label}>Client Description</label><input {...register("client")} placeholder="e.g. Regional bank, West Africa" style={input} /></div>
        </div>
        <div><label style={label}>Key Result</label><input {...register("result")} placeholder="e.g. Board confidence restored within 90 days" style={input} /></div>
        <div>
          <label style={label}>Full Story *</label>
          <textarea {...register("story")} rows={7} placeholder="Describe what happened, the challenge, and the outcome…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} />
          {errors.story && <p style={errorStyle}>{errors.story.message}</p>}
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Story"}</button>
          <button type="button" onClick={() => router.push("/admin/success-stories")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
