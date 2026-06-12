"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/notes");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
    }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "0 24px" }}>
        <p className="display text-text" style={{ fontSize: "1.6rem", marginBottom: "6px" }}>
          The<span style={{ color: "var(--gold)" }}>KayodeKolade</span>
        </p>
        <p className="text-dim font-light" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "48px" }}>
          Admin
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-2)",
              color: "var(--text)",
              padding: "12px 16px",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              outline: "none",
              width: "100%",
            }}
          />
          {error && (
            <p style={{ fontSize: "0.78rem", color: "#e05555", margin: 0 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-solid"
            style={{ width: "100%", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
