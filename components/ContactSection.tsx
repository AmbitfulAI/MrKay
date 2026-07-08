"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const laneMap: Record<string, string> = {
  career:          "A professional or executive navigating a career inflection point",
  founder:         "A founder building or restructuring a business",
  org:             "A leader of a scaling organisation",
  speaking:        "Exploring a retreat, facilitation, or speaking engagement",
  "mining-waitlist": "I'd like to be considered for a Mining the Genius session",
  "mining-nominate": "I'd like to nominate someone for a Mining the Genius session",
  lighthouse:      "I'd like to be considered for The Lighthouse",
};

const dynamicPlaceholder: Record<string, string> = {
  "I'd like to be considered for a Mining the Genius session":
    "Tell me a little about where you are and what kind of clarity you're hoping for. A few lines is enough.",
  "I'd like to nominate someone for a Mining the Genius session":
    "Tell me who you'd like to nominate and, if you're comfortable, a sentence or two about why this session would matter for them.",
  "I'd like to be considered for The Lighthouse":
    "Tell me where you are, what you're trying to build, and why you think this kind of relationship would change something for you. I read every one.",
};

const confirmationMessage: Record<string, string> = {
  "I'd like to be considered for a Mining the Genius session":
    "You're on the list. When a paid engagement funds a Mining the Genius session for you, you'll hear from me directly. There's no fixed timeline — but you're held in the queue, and you'll be reached in turn.",
  "I'd like to nominate someone for a Mining the Genius session":
    "Thank you for nominating someone. I'll be in touch to coordinate the session once your own engagement is underway, or if you've reached out independently, to discuss next steps.",
  "I'd like to be considered for The Lighthouse":
    "Thank you for writing. The Lighthouse is selective by design, and every note gets read personally. You'll hear from me within two business days.",
};

const defaultPlaceholder = "A few lines about your situation is enough. We'll go deeper in the conversation.";
const defaultConfirmation = "Thank you. I read every note that comes through. You'll hear from me within two business days.";

export default function ContactSection() {
  const searchParams = useSearchParams();
  const laneParam = searchParams.get("lane") ?? "";

  const [dropdown, setDropdown] = useState(() => laneMap[laneParam] ?? "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const mapped = laneMap[laneParam] ?? "";
    setDropdown(mapped);
  }, [laneParam]);

  const textareaPlaceholder = dynamicPlaceholder[dropdown] ?? defaultPlaceholder;
  const confirmation = confirmationMessage[dropdown] ?? defaultConfirmation;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, enquiryType: dropdown }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div id="form" className="flex flex-col gap-4 border border-border p-10 md:p-12" style={{ borderTopColor: "var(--gold)" }}>
        <span className="eyebrow">Note Received</span>
        <p className="display text-text" style={{ fontSize: "1.6rem", lineHeight: 1.3 }}>
          Thank you for writing.
        </p>
        <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
          {confirmation}
        </p>
      </div>
    );
  }

  return (
    <form id="form" onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Row 1: Name + Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name" name="name" type="text"
            className="form-input"
            placeholder="e.g. Kayode Kolade"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email"
            className="form-input"
            placeholder="e.g. you@yourcompany.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone <span style={{ opacity: 0.5, fontWeight: 300 }}>(optional)</span></label>
          <input
            id="phone" name="phone" type="tel"
            className="form-input"
            placeholder="Country code"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 2: Dropdown */}
      <div className="form-group">
        <label className="form-label" htmlFor="dropdown">What best describes you?</label>
        <select
          id="dropdown"
          className="form-input"
          value={dropdown}
          onChange={(e) => setDropdown(e.target.value)}
          required
          style={{ cursor: "pointer" }}
        >
          <option value="" disabled>Please select…</option>

          <optgroup label="— Commercial engagements —">
            <option>A professional or executive navigating a career inflection point</option>
            <option>A founder building or restructuring a business</option>
            <option>A leader of a scaling organisation</option>
            <option>Exploring a retreat, facilitation, or speaking engagement</option>
          </optgroup>

          <optgroup label="— Mining the Genius (pro bono coaching) —">
            <option>I&apos;d like to be considered for a Mining the Genius session</option>
            <option>I&apos;d like to nominate someone for a Mining the Genius session</option>
          </optgroup>

          <optgroup label="— The Lighthouse (mentorship) —">
            <option>I&apos;d like to be considered for The Lighthouse</option>
          </optgroup>

          <optgroup label="— Other —">
            <option>Something else</option>
          </optgroup>
        </select>
      </div>

      {/* Row 4: Free text */}
      <div className="form-group">
        <label className="form-label" htmlFor="message">Tell me what you&apos;re working on</label>
        <textarea
          id="message" name="message"
          className="form-input"
          placeholder={textareaPlaceholder}
          value={form.message}
          onChange={handleChange}
          required
          style={{ minHeight: "120px", resize: "vertical" }}
        />
      </div>

      {error && (
        <p style={{ fontSize: "0.82rem", color: "var(--gold)", letterSpacing: "0.04em" }}>{error}</p>
      )}

      <button type="submit" className="btn-solid self-start" disabled={sending}>
        {sending ? "Sending…" : "Send Note"}
      </button>
    </form>
  );
}
