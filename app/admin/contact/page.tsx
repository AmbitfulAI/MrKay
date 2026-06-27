"use client";

import { useEffect, useState } from "react";

interface Submission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  role?: string;
  situation?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const dim: React.CSSProperties = { fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--dim)", fontFamily: "var(--font-body)" };
const label: React.CSSProperties = { ...dim, display: "block", marginBottom: "4px" };

export default function ContactPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contact")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function open(item: Submission) {
    setSelected(item);
    if (!item.read) {
      await fetch(`/api/admin/contact/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, read: true } : i));
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this submission?")) return;
    const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== id));
      if (selected?._id === id) setSelected(null);
    }
  }

  const unread = items.filter((i) => !i.read).length;

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Contact Submissions</h1>
        {!loading && (
          <p style={{ ...dim, marginTop: "6px" }}>
            {unread > 0 ? `${unread} unread · ` : ""}{items.length} total
          </p>
        )}
      </div>

      {loading ? (
        <p style={dim}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={dim}>No submissions yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "24px", alignItems: "start" }}>

          {/* List */}
          <div style={{ border: "1px solid var(--surface-2)" }}>
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => open(item)}
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--surface-2)",
                  cursor: "pointer",
                  background: selected?._id === item._id ? "var(--surface)" : "transparent",
                  borderLeft: !item.read ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text)", fontWeight: item.read ? 300 : 500 }}>
                    {item.name}
                  </span>
                  <span style={dim}>
                    {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.email}{item.organisation ? ` · ${item.organisation}` : ""}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--dim)", margin: "4px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.message}
                </p>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div style={{ border: "1px solid var(--surface-2)", borderTop: "2px solid var(--gold)", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <div>
                  <h2 className="display text-text" style={{ fontSize: "1.3rem", marginBottom: "4px" }}>{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--gold)", textDecoration: "none" }}>{selected.email}</a>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your enquiry`}
                    style={{ padding: "8px 16px", background: "var(--gold)", color: "var(--bg)", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.1em", textDecoration: "none", display: "inline-block" }}
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => remove(selected._id)}
                    style={{ padding: "8px 16px", background: "none", border: "1px solid var(--surface-2)", color: "#c0392b", fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.1em", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {selected.phone && (
                  <div><p style={label}>Phone</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text)" }}>{selected.phone}</p></div>
                )}
                {selected.organisation && (
                  <div><p style={label}>Organisation</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text)" }}>{selected.organisation}</p></div>
                )}
                {selected.role && (
                  <div><p style={label}>Describes themselves as</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text)" }}>{selected.role}</p></div>
                )}
                {selected.situation && (
                  <div><p style={label}>Situation</p><p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text)" }}>{selected.situation}</p></div>
                )}
                <div>
                  <p style={label}>Message</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{selected.message}</p>
                </div>
                <p style={{ ...dim, marginTop: "8px" }}>
                  Received {new Date(selected.createdAt).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
