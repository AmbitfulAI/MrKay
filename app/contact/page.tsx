import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";
import CalendlyButton from "@/components/CalendlyButton";

export const metadata = {
  title: "Let's Talk — TheKayodeKolade",
  description: "Begin the conversation. Every enquiry is handled with discretion. Initial conversations are complimentary and carry no obligation.",
};

const faqs = [
  {
    q: "Who does this work apply to?",
    a: "Professionals at career inflection points, founders building or restructuring, leaders of scaling organisations, and those seeking facilitation, retreats, or speaking. If you're navigating something consequential and need a thinking partner who operates at the level the situation demands — this is for you.",
  },
  {
    q: "How does an engagement begin?",
    a: "With a complimentary initial conversation — no agenda, no obligation. The purpose is mutual: to understand whether the situation is one I can add real value to, and whether the working relationship makes sense. From there, we design the engagement around the specific need.",
  },
  {
    q: "Is everything confidential?",
    a: "Completely. Client relationships are never disclosed. Nothing that passes between us reaches anyone else — not in marketing materials, not in case studies, not in references — without your explicit permission. Confidentiality is a first principle, not a policy.",
  },
  {
    q: "What if I'm not sure which path fits me?",
    a: "That's normal — and it's literally the work. You don't need to arrive with a perfectly framed question. A few lines about your situation is enough. We'll figure out the shape of it together in the first conversation.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes. The practice is based in the Netherlands and serves clients across Africa, Europe, and beyond. Engagements are conducted in person where proximity adds value, and remotely where it doesn't.",
  },
  {
    q: "How much does this cost?",
    a: "Engagement scope and cost vary by the work — a Career Clarity Intensive is very different from a multi-month Fractional COO engagement. Initial conversations are complimentary, and I'm direct about whether the fit is right before we shape something further. Pricing isn't a barrier to the first conversation.",
  },
  {
    q: "Do you work with teams, or only one-to-one?",
    a: "Both. Career and executive work is one-to-one. Founder advisory adapts to whether the founder is solo or already has a team. Organisational and execution work happens at the team level. Workshops and retreats are designed around the room they're built for.",
  },
  {
    q: "How long do engagements typically last?",
    a: "From short intensives over a few weeks to multi-month operating partnerships. The right shape emerges in the first conversation. I'm interested in work that changes something — not engagement length for its own sake.",
  },
];

export default function Contact() {
  return (
    <>
      {/* ── Hero + Form (above the fold) ── */}
      <section className="bg-bg border-b border-surface-2" id="form" style={{ paddingTop: "clamp(72px, 10vw, 120px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left: headline + context */}
            <div>
              <span className="eyebrow block mb-6">Let&apos;s Talk</span>
              <h1
                className="display text-text mb-6"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.05 }}
              >
                Begin the Conversation. Tell Me What You&apos;re Navigating.
              </h1>
              <span className="gold-rule mb-6" />
              <p className="text-muted font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Every enquiry is handled with discretion. Initial conversations are complimentary and carry no obligation. Whatever you share here stays between us — and you&apos;ll be talking to me, not a process.
              </p>
              <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.85 }}>
                I respond within two business days. For anything more immediate:{" "}
                <a href="mailto:hello@thekayodekolade.com" className="hover-gold">
                  hello@thekayodekolade.com
                </a>
              </p>
            </div>

            {/* Right: form */}
            <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">What to Expect</span>
          <h2 className="display text-text mb-10 md:mb-14" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Common Questions
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-start"
                style={{
                  padding: "clamp(28px, 4vw, 40px) 0",
                  borderBottom: i < faqs.length - 1 ? "1px solid var(--surface-2)" : "none",
                }}
              >
                <h3 className="display text-text" style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)", lineHeight: 1.3 }}>
                  {faq.q}
                </h3>
                <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Multi-modal contact panel ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">Other Ways to Reach Me</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}>
            Choose the door that fits.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-surface-2">
            {/* Email */}
            <div className="bg-bg" style={{ padding: "40px 36px" }}>
              <span className="eyebrow block mb-4">Email me directly</span>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                Best for nuanced enquiries that don&apos;t fit the form, or for ongoing conversations.
              </p>
              <a href="mailto:hello@thekayodekolade.com" className="hover-gold" style={{ fontSize: "0.82rem", letterSpacing: "0.05em" }}>
                hello@thekayodekolade.com
              </a>
            </div>

            {/* Calendly */}
            <div className="bg-bg" style={{ padding: "40px 36px" }}>
              <span className="eyebrow block mb-4">Book a conversation</span>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                Best when you&apos;re ready to talk — a 30-minute complimentary call, no obligation.
              </p>
              <CalendlyButton className="btn-solid" style={{ fontSize: "0.6rem", padding: "10px 18px" }}>
                Let&apos;s Talk
              </CalendlyButton>
            </div>

            {/* LinkedIn */}
            <div className="bg-bg" style={{ padding: "40px 36px" }}>
              <span className="eyebrow block mb-4">Connect on LinkedIn</span>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                Best for staying loosely in touch, or if you&apos;d like to see how I think before reaching out.
              </p>
              <a
                href="https://linkedin.com/in/kayodekolade"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-gold"
                style={{ fontSize: "0.82rem", letterSpacing: "0.05em" }}
              >
                linkedin.com/in/kayodekolade
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
