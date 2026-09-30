"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveFaq } from "@/queries/faqs";

const schema = yup.object({
  question: yup.string().required("Question is required"),
  answer:   yup.string().required("Answer is required"),
}).required();

type FormData = yup.InferType<typeof schema>;
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export function FaqForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const mutation = useSaveFaq(id, () => router.push("/admin/faqs"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { question: "", answer: "", ...initialData },
  });

  const onSubmit = (data: FormData) => mutation.save(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label style={labelStyle}>Question *</label>
          <input {...register("question")} placeholder="Am I the kind of person you work with?" style={input} />
          {errors.question && <p style={errorStyle}>{errors.question.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Answer *</label>
          <textarea {...register("answer")} rows={6} placeholder="Your answer here…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} />
          {errors.answer && <p style={errorStyle}>{errors.answer.message}</p>}
        </div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add FAQ"}</button>
          <button type="button" onClick={() => router.push("/admin/faqs")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
