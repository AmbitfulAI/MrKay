"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSaveCategory } from "@/queries/categories";

const schema = yup.object({
  title:       yup.string().required("Title is required"),
  type:        yup.string().default("writing"),
  tagline:     yup.string().default(""),
  description: yup.string().default(""),
  themes:      yup.string().default(""),
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props {
  id: string;
  initialData: FormData;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--surface-2)",
  color: "var(--text)",
  padding: "10px 14px",
  fontFamily: "var(--font-body)",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--dim)",
  fontFamily: "var(--font-body)",
  marginBottom: "8px",
};

const errorStyle: React.CSSProperties = { fontSize: "0.68rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "5px" };

export default function CategoryEditForm({ id, initialData }: Props) {
  const router = useRouter();
  const mutation = useSaveCategory(id, () => router.push("/admin/notes/categories"));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const onSubmit = (data: FormData) => {
    const themes = data.themes.split("\n").map((t) => t.trim()).filter(Boolean);
    mutation.save({ title: data.title, type: data.type, tagline: data.tagline, description: data.description, themes });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input type="text" {...register("title")} style={inputStyle} />
            {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select {...register("type")} style={inputStyle}>
              <option value="writing">Writing</option>
              <option value="visual-diary">Visual Diary</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Tagline</label>
          <input
            type="text"
            {...register("tagline")}
            placeholder="Short line shown under the heading on the category page"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            {...register("description")}
            rows={6}
            placeholder={"Two paragraphs about this stream.\n\nSeparate paragraphs with a blank line."}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>
            Separate paragraphs with a blank line.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Themes</label>
          <textarea
            {...register("themes")}
            rows={8}
            placeholder={"One theme per line:\nCareer clarity and the discipline of decision-making\nFounder identity, business architecture, and traction"}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>
            One theme per line.
          </p>
        </div>

        {mutation.isError && (
          <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>
        )}

        <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-solid"
            style={{ opacity: mutation.isPending ? 0.6 : 1, cursor: mutation.isPending ? "not-allowed" : "pointer", fontSize: "0.78rem", padding: "11px 28px" }}
          >
            {mutation.isPending ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/notes/categories")}
            style={{
              background: "none",
              border: "1px solid var(--surface-2)",
              color: "var(--muted)",
              padding: "11px 24px",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
