"use client";

import Link from "next/link";
import { useAdminCommentsQuery, useDeleteComment } from "@/queries/comments";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";

const gridCols = "1fr 140px 2fr 110px 70px 100px";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminComments() {
  const { data: items = [], isLoading } = useAdminCommentsQuery();
  const deleteComment = useDeleteComment();

  return (
    <div style={{ padding: "40px 48px", maxWidth: "1000px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Comments</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "comment" : "comments"} — auto-published, moderate here</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No comments yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Note", "Author", "Comment", "Date", "Likes", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: gridCols, padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <div>
                {item.note ? (
                  <Link href={`/writing/note/${item.note.slug}`} target="_blank" style={{ fontSize: "0.82rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                    {item.note.title}
                  </Link>
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "var(--dim)", fontFamily: "var(--font-body)" }}>Deleted note</span>
                )}
                {item.parentId && (
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>↳ reply</span>
                )}
              </div>
              <div>
                <p style={{ fontSize: "0.78rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>{item.authorName}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{item.authorEmail}</p>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "16px" }}>{item.content}</p>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{formatDate(item.createdAt)}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.likes}</span>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <DeleteButton onDelete={() => deleteComment.deleteComment(item._id)} isPending={deleteComment.isPending} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
