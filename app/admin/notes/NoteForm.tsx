"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategories } from "@/components/CategoriesProvider";
import type { CategoryOption } from "@/components/CategoriesProvider";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

const schema = yup.object({
  title:    yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  date:     yup.string().required("Date is required"),
  excerpt:  yup.string().required("Excerpt is required"),
  body:     yup.string().required("Body is required"),
}).required();

type NoteFormData = yup.InferType<typeof schema>;

interface Props {
  initialData?: Partial<NoteFormData>;
  id?: string;
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

const errorStyle: React.CSSProperties = {
  fontSize: "0.68rem",
  color: "#e05555",
  fontFamily: "var(--font-body)",
  marginTop: "5px",
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

export function NoteForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const categories: CategoryOption[] = useCategories();
  const mutation = useAdminMutation(QUERY_KEYS.notes, () => router.push("/admin/notes"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title:    "",
      category: "",
      date:     "",
      excerpt:  "",
      body:     "",
      ...initialData,
    },
  });

  const onSubmit = (data: NoteFormData) => {
    mutation.mutate({
      url:    isEdit ? `/api/admin/notes/${id}` : "/api/admin/notes",
      method: isEdit ? "PATCH" : "POST",
      body:   data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Title */}
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            {...register("title")}
            type="text"
            placeholder="The Cost of Unclear Leadership"
            style={inputStyle}
          />
          {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
        </div>

        {/* Category + Date row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            {categories.length > 0 ? (
              <select {...register("category")} style={inputStyle}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>
            ) : (
              <input
                {...register("category")}
                type="text"
                placeholder="e.g. GeniusMined"
                style={inputStyle}
              />
            )}
            {errors.category && <p style={errorStyle}>{errors.category.message}</p>}
          </div>
          <div>
            <label style={labelStyle}>Date *</label>
            <input
              {...register("date")}
              type="text"
              placeholder="e.g. June 2026"
              style={inputStyle}
            />
            {errors.date && <p style={errorStyle}>{errors.date.message}</p>}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Excerpt *</label>
          <textarea
            {...register("excerpt")}
            rows={3}
            placeholder="A short summary shown in the notes list…"
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
          />
          {errors.excerpt && <p style={errorStyle}>{errors.excerpt.message}</p>}
        </div>

        {/* Body */}
        <div>
          <label style={labelStyle}>Body *</label>
          <textarea
            {...register("body")}
            rows={16}
            placeholder={"Write your note here.\n\nSeparate paragraphs with a blank line."}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.85 }}
          />
          {errors.body
            ? <p style={errorStyle}>{errors.body.message}</p>
            : <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>Separate paragraphs with a blank line.</p>
          }
        </div>

        {mutation.isError && (
          <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-solid"
            style={{ opacity: mutation.isPending ? 0.6 : 1, cursor: mutation.isPending ? "not-allowed" : "pointer", fontSize: "0.78rem", padding: "11px 28px" }}
          >
            {mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Publish Note"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/notes")}
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
