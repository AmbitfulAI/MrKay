"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  _id: string;
  email: string;
  active: boolean;
  createdAt: string;
}

const dim: React.CSSProperties = { fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--dim)", fontFamily: "var(--font-body)" };

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((r) => r.json())
      .then((data) => { setSubscribers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleActive(id: string, current: boolean) {
    const res = await fetch(`/api/admin/subscribers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !current }),
    });
    if (res.ok) {
      setSubscribers((prev) => prev.map((s) => s._id === id ? { ...s, active: !current } : s));
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    if (res.ok) setSubscribers((prev) => prev.filter((s) => s._id !== id));
  }

  function exportCsv() {
    const rows = [["Email", "Status", "Subscribed"]];
    subscribers.forEach((s) => {
      rows.push([s.email, s.active ? "Active" : "Unsubscribed", new Date(s.createdAt).toLocaleDateString()]);
    });
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const active = subscribers.filter((s) => s.active).length;

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Subscribers</h1>
          {!loading && (
            <p style={{ ...dim, marginTop: "6px" }}>
              {active} active · {subscribers.length - active} unsubscribed · {subscribers.length} total
            </p>
          )}
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportCsv}
            style={{ padding: "9px 20px", background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer", letterSpacing: "0.06em" }}
          >
            Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <p style={{ ...dim }}>Loading…</p>
      ) : subscribers.length === 0 ? (
        <p style={{ ...dim }}>No subscribers yet.</p>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            <span style={dim}>Email</span>
            <span style={dim}>Status</span>
            <span style={dim}>Subscribed</span>
            <span style={dim}>Actions</span>
          </div>
          {subscribers.map((s) => (
            <div
              key={s._id}
              style={{ display: "grid", gridTemplateColumns: "1fr 120px 160px 100px", padding: "14px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: s.active ? "var(--text)" : "var(--dim)" }}>
                {s.email}
              </span>
              <span style={{ ...dim, color: s.active ? "var(--gold)" : "var(--dim)" }}>
                {s.active ? "Active" : "Unsub'd"}
              </span>
              <span style={{ ...dim }}>
                {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => toggleActive(s._id, s.active)}
                  style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--muted)", cursor: "pointer", letterSpacing: "0.06em" }}
                >
                  {s.active ? "Deactivate" : "Reactivate"}
                </button>
                <button
                  onClick={() => remove(s._id)}
                  style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#c0392b", cursor: "pointer", letterSpacing: "0.06em" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
