"use client";

import { useState } from "react";

interface Props {
  variant?: "compact" | "full";
}

export default function NewsletterForm({ variant = "full" }: Props) {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Request failed");
      }
      setStatus("success");
      setMessage("You're in. Expect notes worth reading.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.82rem",
        fontWeight: 300,
        color: "var(--gold)",
        letterSpacing: "0.04em",
        lineHeight: 1.7,
      }}>
        {message}
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="newsletter-compact">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          disabled={status === "loading"}
          className="newsletter-input"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="newsletter-btn"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {status === "error" && (
          <p className="newsletter-error">{message}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-full">
      <div className="newsletter-full-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          className="newsletter-input-full"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-solid"
          style={{ whiteSpace: "nowrap" }}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="newsletter-error">{message}</p>
      )}
      <p style={{ fontSize: "0.65rem", color: "var(--dim)", marginTop: "12px", letterSpacing: "0.08em" }}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
