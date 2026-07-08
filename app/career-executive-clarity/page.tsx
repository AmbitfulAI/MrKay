import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Career & Executive Clarity — TheKayodeKolade",
  description: "You know you have more in you. You just can't name the direction yet. Career clarity coaching and executive transition support using the MINED® framework.",
};

const minedSteps = [
  {
    step: "M — Mine",
    desc: "We go beneath the surface — past the CV, past the job titles, past the stories you've been telling yourself. The work begins with an honest excavation of what you actually carry: your strengths, your patterns, your values, and the experiences that have shaped how you show up.",
  },
  {
    step: "I — Identify",
    desc: "From the excavation, we identify the genius that's resident in you — the capabilities, convictions, and signature strengths that distinguish you from everyone else in the room. Most people can't name these accurately. We get precise.",
  },
  {
    step: "N — Name",
    desc: "Naming is the hardest part. We translate what we've uncovered into a clear, honest, defensible direction — a next chapter you can own, articulate, and move toward with conviction rather than hesitation.",
  },
  {
    step: "E — Engineer",
    desc: "A named direction without a path is still a wish. We engineer the specific sequence of moves — decisions, positioning, relationships, skills — that close the gap between where you are and where you need to be.",
  },
  {
    step: "D — Deploy",
    desc: "The final phase is execution with accountability. We deploy — with clear milestones, honest reflection points, and a thinking partner who will hold you to the direction you've chosen, not just the comfortable one.",
  },
];

const testimonials = [
  {
    quote: "I was stuck on what to do next to make this transition. Kayode provided clarity on the steps I needed to take — finding out what my core skills and interests were, and leveraging this to decide on a career path. Our interactions provided both the drive and direction I needed. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.",
    name: "Ayodeji Akinola",
  },
  {
    quote: "After a decade-long career, I needed guidance on how to validate my interests and shape what to pursue in the next decade. I got the clarity to invest in digital transformation rather than the default path — better positioned for the modern COO role if I get there.",
    name: "Temitope Awoyemi",
  },
  {
    quote: "I got direction. I got practical, realistic scenarios that gave clarity. The interaction helped me make the right decision — one I am enjoying today.",
    name: "Adeniran Kayode",
  },
];

const otherLanes = [
  { label: "Building a business", href: "/founder-business-architecture" },
  { label: "Leading an organisation", href: "/organisational-systems-execution" },
  { label: "Retreats, facilitation & speaking", href: "/retreats-facilitation-speaking" },
];

export default function CareerExecutiveClarity() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-8">Career &amp; Executive Clarity</span>
          <h1
            className="display text-text mb-8"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 6rem)", lineHeight: 1.0 }}
          >
            You Know You Have More in You.{" "}
            <em style={{ color: "var(--gold)" }}>You Just Can&apos;t Name the Direction Yet.</em>
          </h1>
          <span className="gold-rule mb-8" />
          <p className="text-muted font-light mb-10" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            You&apos;ve performed. You&apos;ve grown. But the next move isn&apos;t obvious anymore — and another job won&apos;t fix that. What you need is a clearer read on who you are, what you carry, and what comes next.
          </p>
          <TwoTierCTA lane="career" />
        </div>
      </section>

      {/* ── Sound Familiar? ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">Sound Familiar?</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}>
            The clarity you need isn&apos;t about more effort. It&apos;s about better questions.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2 mb-10">
            {[
              "You've been successful — but the path forward isn't clear anymore",
              "You're performing at a high level but operating below your potential",
              "You've outgrown your current role and don't know what comes next",
              "You're making a major transition and want to make the right move, not just the next one",
              "You have multiple directions pulling at you and can't resolve which one is actually yours",
              "You want someone to think through this with you — not a coach who asks endless questions, but a partner who engages directly",
            ].map((item) => (
              <div key={item} className="bg-surface" style={{ padding: "28px 32px" }}>
                <div className="flex gap-4 items-start">
                  <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>—</span>
                  <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "20px", maxWidth: "640px" }}>
            <p className="display text-text" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", fontStyle: "italic", lineHeight: 1.5 }}>
              If this is the conversation you&apos;ve been needing —
            </p>
          </div>
          <div className="mt-6">
            <TwoTierCTA lane="career" />
          </div>
        </div>
      </section>

      {/* ── Is This You? ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="eyebrow block mb-6" style={{ color: "var(--gold)" }}>Is This You?</span>
              <div className="flex flex-col gap-5">
                {[
                  "A senior professional navigating a career inflection point",
                  "An executive who has succeeded but isn't sure what the next chapter looks like",
                  "Someone mid-transition who needs a clear read, not more options",
                  "A high-performer who wants to make their next move from clarity, not pressure",
                ].map((item) => (
                  <p key={item} className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow block mb-6">It&apos;s Not For You If…</span>
              <div className="flex flex-col gap-5">
                {[
                  "You're looking for a quick fix or a shortcut to the next title",
                  "You want validation of a decision you've already made",
                  "You're not ready to be honest about what's actually holding you back",
                ].map((item) => (
                  <p key={item} className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINED® Framework ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">How We&apos;ll Move</span>
          <h2 className="display text-text mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>MINED®</span>
            {" "}Framework
          </h2>
          <p className="text-muted font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            MINED® is a proprietary coaching framework built on one conviction: genius is not rare, it is resident. Every step is designed to excavate what you already carry and convert it into clear, executable direction.
          </p>
          <div className="flex flex-col">
            {minedSteps.map((item, i) => (
              <div
                key={item.step}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-10 items-start"
                style={{ padding: "clamp(10px, 1.5vw, 16px) 0", borderBottom: i < minedSteps.length - 1 ? "1px solid var(--surface-2)" : "none" }}
              >
                <span className="eyebrow" style={{ color: "var(--gold)" }}>{item.step}</span>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TwoTierCTA lane="career" />
          </div>
        </div>
      </section>

      {/* ── Signature Programme ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Signature Engagement</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The Career Clarity Intensive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                A focused, structured engagement designed for professionals at a genuine inflection point. Not a coaching programme. A clarity engagement — with a defined arc, clear deliverables, and a named direction at the end.
              </p>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                You leave with three things: a clear read on who you are and what you carry, a named direction you can defend and own, and a sequenced path of the specific moves that close the gap.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "A documented capability profile — your genuine strengths, not the CV version",
                "A named direction statement — clear, specific, and defensible",
                "A sequenced action plan — the exact moves, in order",
              ].map((item) => (
                <div key={item} className="flex gap-4 items-start" style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "20px" }}>
                  <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-muted font-light mb-6" style={{ fontSize: "0.88rem" }}>
              Ready to start? Two ways to begin —
            </p>
            <TwoTierCTA lane="career" />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-surface-2">
            {testimonials.map((q) => (
              <div key={q.name} className="bg-surface" style={{ padding: "40px 36px" }}>
                <span className="display" style={{ fontSize: "3rem", color: "var(--gold)", lineHeight: 1, display: "block", marginBottom: "20px", opacity: 0.4 }}>&ldquo;</span>
                <blockquote className="display text-text" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "28px" }}>
                  {q.quote}
                </blockquote>
                <span className="gold-rule" style={{ marginBottom: "16px" }} />
                <p className="eyebrow">{q.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote breakpage ── */}
      <section className="bg-bg border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}>
            &ldquo;Clarity is the decision. Architecture is the system that protects it. Momentum is what happens when both exist.&rdquo;
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-surface s-pad-sm">
        <div className="container">
          <TwoTierCTA lane="career" headline="Ready to Name Your Direction?" />
          <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--surface-2)" }}>
            <p className="eyebrow mb-5" style={{ color: "var(--muted)" }}>Not quite your situation?</p>
            <div className="flex flex-wrap gap-6">
              {otherLanes.map((lane) => (
                <Link
                  key={lane.href}
                  href={lane.href}
                  className="eyebrow hover-gold"
                  style={{ color: "var(--gold)", letterSpacing: "0.18em" }}
                >
                  {lane.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
