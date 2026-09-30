"use client";

import { useState } from "react";
import { useCreateComment } from "@/queries/comments";

const NAME_KEY = "comment-author-name";
const EMAIL_KEY = "comment-author-email";

function rememberedValue(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

interface Props {
  noteId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  autoFocus?: boolean;
}

export default function CommentForm({ noteId, parentId, onSuccess, onCancel, submitLabel = "Post Comment", autoFocus }: Props) {
  const mutation = useCreateComment(noteId);
  const [authorName, setAuthorName] = useState(() => rememberedValue(NAME_KEY));
  const [authorEmail, setAuthorEmail] = useState(() => rememberedValue(EMAIL_KEY));
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!authorName || !authorEmail || !content) return;

    mutation.mutate(
      { noteId, parentId, authorName, authorEmail, content, website },
      {
        onSuccess: () => {
          try {
            localStorage.setItem(NAME_KEY, authorName);
            localStorage.setItem(EMAIL_KEY, authorEmail);
          } catch {}
          setContent("");
          onSuccess?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-field-row">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Name"
          required
          disabled={mutation.isPending}
          className="comment-input"
          autoFocus={autoFocus}
        />
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="Email (not published)"
          required
          disabled={mutation.isPending}
          className="comment-input"
        />
      </div>

      {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Write a reply…" : "Share your thoughts…"}
        required
        rows={parentId ? 3 : 4}
        disabled={mutation.isPending}
        className="comment-textarea"
      />

      {mutation.isError && <p className="comment-error">{mutation.error.message}</p>}

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ fontSize: "0.68rem", padding: "11px 26px" }}>
          {mutation.isPending ? "Posting…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="comment-reply-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
