import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import TestimonialStrip from "@/components/TestimonialStrip";
import { sanityClient } from "@/sanity/client";
import { testimonialsForPageQuery } from "@/sanity/queries";

export const revalidate = 60;

const FALLBACK_TESTIMONIALS = [
  { name: "Ayodeji Akinola",  quote: "I was stuck on what to do next to make this transition. Kayode provided clarity on the steps I needed to take — finding out what my core skills and interests were, and leveraging this to decide on a career path. Our interactions provided both the drive and direction I needed. I transitioned into project management, moved abroad for my master's, and graduated with a distinction." },
  { name: "Adeniran Kayode",  quote: "I got direction. I got practical, realistic scenarios that gave clarity. The interaction helped me make the right decision — one I am enjoying today." },
  { name: "Temitope Awoyemi", quote: "After a decade-long career, I needed guidance on how to validate my interests and shape what to pursue in the next decade. I got the clarity to invest in digital transformation rather than the default path — better positioned for the modern COO role if I get there." },
];

const steps = [
  {
    label: "MAP",
    body: "We establish where you actually are: your situation, history, patterns, and the forces shaping your professional life.",
  },
  {
    label: "INVESTIGATE",
    body: "We go beneath the surface: your values, energisers, drainers, strengths, constraints — and the hidden need driving the discomfort.",
  },
  {
    label: "NAVIGATE",
    body: "We evaluate your realistic options against who you are and where you're going — not against noise, pressure, or other people's timelines.",
  },
  {
    label: "EXECUTE",
    body: "We convert direction into first-phase moves: your positioning, narrative, objectives, and a weekly operating rhythm.",
  },
  {
    label: "DEBRIEF",
    body: "We review the evidence, adjust course, and compound the learning. Clarity is maintained, not just achieved.",
  },
];

const deliverables = [
  "Your Career Clarity Snapshot — a synthesis of where you are, what success looks like across 0–6 months, 6–12 months, and 2–5 years, your key insights, and your hidden need.",
  "Your Options Dossier and Decision Memo — your realistic paths, evaluated and resolved.",
  "Your 90-Day Objectives and Weekly Operating Rhythm — so clarity becomes movement, not a moment.",
];

export default async function CareerClarity() {
  const raw = await sanityClient.fetch(testimonialsForPageQuery, { page: "career-clarity" }).catch(() => []);
  const testimonials = raw.length
    ? raw.map((t: { quote: string; clientName: string; clientContext?: string }) => ({ quote: t.quote, name: t.clientName, context: t.clientContext }))
    : FALLBACK_TESTIMONIALS;
  return (
    <>
      <PageHero
        eyebrow="The Work — Career & Executive Clarity"
        title="You Know You Have More in You. You Just Can't Name the Direction Yet."
        subtitle="Structured clarity work for professionals and executives who want to be more intentional about their direction, decisions, and long-term growth — and who value a rigorous process over generic advice."
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
                Clarity is not a feeling. It is a decision-making asset.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Most professionals don't need more ambition, qualifications, or opportunities. They need greater clarity
                about who they are, what matters most, and where they should direct their energy next.
              </p>
            </div>
            <div>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                You've accumulated real experience, real strengths, and real options. What you haven't yet done is
                translate what you carry — strengths, patterns, values, constraints, direction — into a clear career
                thesis. So decisions get made reactively: the next job by default, the inflection point drifted through,
                the same questions circled without resolution. This work replaces that drift with structured clarity — a
                rigorous process that produces direction you can defend, decisions you can own, and first moves you can
                act on. Because clarity is not a feeling you wait for. It is a decision-making asset you build.
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
            MINED® — From Confusion to Decision.
          </h2>
          <div className="flex flex-col bg-surface-2" style={{ gap: "2px" }}>
            {steps.map((step) => (
              <div
                key={step.label}
                className="bg-bg flex flex-col md:flex-row gap-6 md:gap-16 items-start"
                style={{ padding: "40px 48px" }}
              >
                <span
                  className="display text-text shrink-0"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", paddingTop: "4px", minWidth: "100px", color: "var(--gold)" }}
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

      {/* ── The Signature Programme ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">The Signature Programme</span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            The Career Clarity Intensive
          </h2>
          <p className="text-muted font-light mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "680px" }}>
            A structured 1:1 engagement — typically four sessions, with an extended six-session option — built around
            deep intake, synthesis, and decision-focused coaching. This is not 'a few coaching conversations.' You leave
            with artefacts you'll keep using long after we finish:
          </p>

          {/* Deliverables */}
          <div className="flex flex-col mb-10" style={{ gap: "2px" }}>
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex gap-5 items-start bg-bg"
                style={{ padding: "24px 28px", borderLeft: "2px solid var(--gold)" }}
              >
                <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Is this you? */}
          <div
            className="flex gap-5 items-start mb-8"
            style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "24px", paddingTop: "4px", paddingBottom: "4px", maxWidth: "680px" }}
          >
            <div>
              <span className="eyebrow block mb-3">Is This You?</span>
              <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                You're at a genuine inflection point — deciding whether to stay, pivot, reposition, relocate, step into
                leadership, or build something of your own — and you're willing to do the reflective and strategic work.
              </p>
            </div>
          </div>

          <p className="text-dim font-light" style={{ fontSize: "0.8rem", lineHeight: 1.8 }}>
            <span style={{ color: "var(--text)", fontWeight: 500 }}>It's not for you if</span> ...you're looking for
            quick fixes, generic CV advice, or motivation without decision.
          </p>
        </div>
      </section>

      {/* ── The Impact in Practice ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">The Impact in Practice</span>
          <TestimonialStrip items={testimonials} cols={3} />
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-surface border-b border-surface-2 text-center s-pad-md">
        <div className="container" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <blockquote
            className="display text-text"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}
          >
            "You do not need another job by default. You need to understand what you carry, what you are becoming, and
            which options are truly aligned."
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Ready to Name Your Direction?</span>
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
                  href="/founder-architecture"
                  className="text-muted hover-gold font-light"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
                >
                  Building a business →
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
