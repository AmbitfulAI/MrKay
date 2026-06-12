import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";

export const revalidate = 60;

const steps = [
  {
    label: "UNCOVER",
    body: "Your identity, conviction, strengths, non-negotiables, and constraints. The real vision beneath the noise — and the truth about the market you're actually in.",
  },
  {
    label: "TRANSFORM",
    body: "We convert clarity into structure: your business model choices, deliberate trade-offs, offer architecture, positioning, and an operating rhythm that fits you. This is where we kill bad models — calmly — before building good ones.",
  },
  {
    label: "MULTIPLY",
    body: "We build your traction architecture: authority assets, market signal, pipeline, execution cadence, and the discipline to value traction over motion.",
  },
];

const deliverables = [
  "Your Founder Clarity & Business Canvas",
  "Your Options Dossier and Decision Memo",
  "Your offer and positioning architecture",
  "An authority asset — positioning statement, offer one-pager, or founder point-of-view",
  "Your 90-Day objectives and weekly operating rhythm",
  "A learning log built on one discipline: adjust, kill, or double down",
];

export default function FounderArchitecture() {
  return (
    <>
      <PageHero
        eyebrow="The Work — Founder & Business Architecture"
        title="You're Building Hard. So Why Isn't Momentum Compounding?"
        subtitle="You are a founder. Intelligent, ambitious, and active. The problem isn't effort. It's that you, your model, and your operating structure are not yet aligned — and no amount of hustle fixes misalignment."
      />

      {/* ── Sound Familiar? ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">Sound Familiar?</span>
              <h2
                className="display text-text mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}
              >
                You don't have an effort problem. You have an alignment problem.
              </h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Too many ideas and no hierarchy between them. An offer that isn't sharp enough to sell itself. A
                business that depends entirely on you. Activity that never compounds into traction. More ideas won't fix
                this. Neither will more motivation. What fixes it is aligning four things in the right order: who you
                are, what you're building, how the business runs, and how momentum is generated. The principle
                underneath all of it: identity first, model second, execution third.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We'll Move ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">How We'll Move</span>
          <h2
            className="display text-text mb-12 md:mb-16"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            UTM™ — Uncover → Transform → Multiply.
          </h2>
          <div className="flex flex-col bg-surface-2" style={{ gap: "2px" }}>
            {steps.map((step) => (
              <div
                key={step.label}
                className="bg-bg flex flex-col md:flex-row gap-6 md:gap-16 items-start"
                style={{ padding: "40px 48px" }}
              >
                <span
                  className="shrink-0"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display)",
                    color: "var(--gold)",
                    paddingTop: "4px",
                    minWidth: "100px",
                  }}
                >
                  {step.label}
                </span>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Signature Engagement ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">The Signature Engagement</span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            The 90-Day Founder Architecture Build
          </h2>
          <p className="text-muted font-light mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "680px" }}>
            A structured advisory engagement that takes you through the full UTM™ arc and produces tangible business
            assets — not just conversations:
          </p>

          {/* Deliverables */}
          <div className="flex flex-col mb-10" style={{ gap: "2px" }}>
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex gap-5 items-start bg-bg"
                style={{ padding: "20px 28px", borderLeft: "2px solid var(--gold)" }}
              >
                <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* How I'll show up */}
          <div
            className="bg-bg mb-8"
            style={{
              borderLeft: "2px solid var(--gold)",
              padding: "28px 32px",
              maxWidth: "680px",
            }}
          >
            <span className="eyebrow block mb-4">How I'll Show Up</span>
            <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
              This is not passive coaching. My role is not to cheerlead every idea. It is to help you see clearly.
              Where a path is weak, I'll say so. Where assumptions need testing, we'll test them. Where a decision is
              overdue, we'll address it. Truth over enthusiasm. Evidence over excitement. Traction over motion.
            </p>
          </div>

          {/* Is this you? */}
          <p className="text-dim font-light" style={{ fontSize: "0.8rem", lineHeight: 1.8 }}>
            <span style={{ color: "var(--text)", fontWeight: 500 }}>Is this you?</span> You're serious enough to do
            the identity and model work — and ready to make sharper choices.
          </p>
        </div>
      </section>

      {/* ── The Impact in Practice ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">The Impact in Practice</span>
          <div className="bg-surface" style={{ padding: "48px 44px", borderLeft: "2px solid var(--gold)" }}>
            <span
              className="display"
              style={{
                fontSize: "3.5rem",
                color: "var(--gold)",
                lineHeight: 1,
                display: "block",
                marginBottom: "24px",
                opacity: 0.4,
              }}
            >
              &ldquo;
            </span>
            <blockquote
              className="display text-text"
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                fontStyle: "italic",
                lineHeight: 1.55,
                marginBottom: "32px",
                maxWidth: "720px",
              }}
            >
              We were trying to define what my organisation is aiming to achieve. I needed help understanding structure
              and how to build out ideas that are marketable. Together we created a revised vision, mission, goals, and
              business model for the organisation I am building.
            </blockquote>
            <span className="gold-rule" style={{ marginBottom: "20px" }} />
            <p className="eyebrow">Founder, early-stage organisation</p>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-surface border-b border-surface-2 text-center s-pad-md">
        <div className="container" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <blockquote
            className="display text-text"
            style={{
              fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)",
              fontStyle: "italic",
              lineHeight: 1.35,
              marginBottom: "24px",
            }}
          >
            "We kill bad models before we build good ones. It is cheaper, faster, and far kinder than letting a
            misaligned business slowly exhaust its founder."
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Ready to Pressure-Test Your Model?</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Let's talk.
            </h3>
          </div>
          <div className="flex flex-col" style={{ gap: "20px", alignItems: "flex-start" }}>
            <div className="flex flex-wrap gap-4">
              <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            </div>
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <p className="text-dim font-light" style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                Not quite your situation?
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  href="/career-clarity"
                  className="text-muted hover-gold font-light"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
                >
                  Navigating a career inflection point →
                </Link>
                <Link
                  href="/organisational-systems"
                  className="text-muted hover-gold font-light"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
                >
                  Leading an organisation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
