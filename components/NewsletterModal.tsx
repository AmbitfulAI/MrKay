"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";

const DISMISSED_KEY = "newsletter-modal-dismissed-at";
const SUBSCRIBED_KEY = "newsletter-modal-subscribed";
const SHOW_DELAY_MS = 3000;
const COOLDOWN_DAYS = 14;

export default function NewsletterModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    try {
      if (localStorage.getItem(SUBSCRIBED_KEY)) return;
      const dismissedAt = localStorage.getItem(DISMISSED_KEY);
      if (dismissedAt) {
        const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysSince < COOLDOWN_DAYS) return;
      }
    } catch {
      return;
    }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {}
  }

  function handleSubscribed() {
    try {
      localStorage.setItem(SUBSCRIBED_KEY, "true");
    } catch {}
    setTimeout(() => setOpen(false), 2500);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to the newsletter"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        aria-hidden
        onClick={dismiss}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "clamp(320px, 55vw, 720px)",
          width: "100%",
          background: "var(--bg)",
          border: "1px solid var(--surface-2)",
          padding: "48px 40px",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "none",
            border: "none",
            color: "var(--dim)",
            fontSize: "1.2rem",
            lineHeight: 1,
            cursor: "pointer",
            padding: "4px",
          }}
        >
          ×
        </button>

        <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>
          Writing &amp; Notes
        </span>
        <h2 className="display text-text" style={{ fontSize: "1.7rem", lineHeight: 1.15, marginBottom: "14px" }}>
          Notes worth reading, before anyone else sees them.
        </h2>
        <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "28px" }}>
          Career clarity, founder architecture, and organisational systems — delivered occasionally, never spammed.
        </p>

        <NewsletterForm variant="full" onSuccess={handleSubscribed} />
      </div>
    </div>
  );
}
