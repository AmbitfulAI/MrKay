import { useEffect, useState } from "react";
import { StringInputProps, useClient, set, unset } from "sanity";

interface Category {
  _id: string;
  title: string;
}

export function CategorySelectInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    client
      .fetch<Category[]>(`*[_type == "noteCategory"] | order(order asc) { _id, title }`)
      .then(setCategories)
      .catch(() => {});
  }, [client]);

  const current = props.value ?? "";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: "4px" }}>
      {categories.map((cat) => (
        <button
          key={cat._id}
          type="button"
          onClick={() =>
            props.onChange(current === cat.title ? unset() : set(cat.title))
          }
          style={{
            padding: "6px 18px",
            border: `1px solid ${current === cat.title ? "#c4972e" : "var(--card-border-color, #ccc)"}`,
            background: current === cat.title ? "rgba(196,151,46,0.12)" : "transparent",
            color: current === cat.title ? "#c4972e" : "inherit",
            cursor: "pointer",
            borderRadius: "4px",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          }}
        >
          {cat.title}
        </button>
      ))}
      {categories.length === 0 && (
        <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0 }}>
          No categories yet — add some in Note Categories first.
        </p>
      )}
    </div>
  );
}
