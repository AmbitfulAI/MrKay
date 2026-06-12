"use client";

import { useState, FormEvent } from "react";

interface ContactSectionProps {
  heading?: string;
  subheading?: string;
  dark?: boolean;
}

export default function ContactSection({
  heading = "Begin the conversation.",
  subheading = "All engagements are confidential. Initial consultations are complimentary.",
  dark = false,
}: ContactSectionProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organisation: "", role: "", situation: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section className={`${dark ? "bg-bg" : "bg-surface"} s-pad`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: copy */}
          <div>
            <span className="eyebrow block mb-6">Get in Touch</span>
            <h2 className="display text-text mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}>
              {heading}
            </h2>
            <span className="gold-rule mb-7" />
            <p className="text-muted font-light max-w-none md:max-w-[360px] mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>
              {subheading}
            </p>
            <a href="mailto:hello@thekayodekolade.com" className="btn-outline">hello@thekayodekolade.com</a>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="flex flex-col gap-4 border border-border p-10 md:p-12" style={{ borderTopColor: "var(--gold)" }}>
                <span className="eyebrow">Message Received</span>
                <p className="display text-text" style={{ fontSize: "1.6rem", lineHeight: 1.3 }}>
                  Thank you for reaching out.
                </p>
                <p className="text-muted font-light" style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
                  We will be in contact within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" className="form-input" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="form-group">
                    <label className="form-label" htmlFor="organisation">Organisation <span className="text-dim" style={{ fontSize: "0.75em" }}>(optional)</span></label>
                    <input id="organisation" name="organisation" type="text" className="form-input" placeholder="Company name" value={form.organisation} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" className="form-input" placeholder="+61 000 000 000" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="role">What best describes you?</label>
                  <select id="role" name="role" className="form-input" value={form.role} onChange={handleChange}>
                    <option value="">Select your situation</option>
                    <option value="professional">A professional or executive at a crossroads</option>
                    <option value="founder">A founder building or restructuring a business</option>
                    <option value="organisation">A leader of a scaling organisation</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="situation">Where are you right now?</label>
                  <select id="situation" name="situation" className="form-input" value={form.situation} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="crossroads">At a career crossroads</option>
                    <option value="building">Building a business</option>
                    <option value="leading">Leading an organisation</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">How can we help?</label>
                  <textarea id="message" name="message" className="form-input" placeholder="Briefly describe your situation..." value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-solid self-start">Send It Over</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
