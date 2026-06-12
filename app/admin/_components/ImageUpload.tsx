"use client";

import { useRef, useState } from "react";

interface Props {
  value?: string;
  onChange: (assetId: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { assetId } = await res.json();
      onChange(assetId);
    } else {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  }

  return (
    <div>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" }}>
        {label}
      </p>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: "8px 18px",
            background: "var(--surface)",
            border: "1px solid var(--surface-2)",
            color: uploading ? "var(--dim)" : "var(--text)",
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading…" : value ? "Replace Image" : "Choose Image"}
        </button>
        {value && (
          <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)" }}>
            ✓ Image uploaded
          </span>
        )}
      </div>
      {error && <p style={{ fontSize: "0.72rem", color: "#e05555", marginTop: "6px", fontFamily: "var(--font-body)" }}>{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}
