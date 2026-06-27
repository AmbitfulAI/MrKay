import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Founder & Business Architecture — TheKayodeKolade",
  description: "You're building hard. So why isn't it compounding? Founder advisory and business architecture using the UTM™ framework.",
};

const utmSteps = [
  {
    step: "U — Uncover",
    desc: "We start with what's actually there — not the pitch version, not the LinkedIn version. We uncover the true nature of what you're building: the core value proposition, the real business model, the genuine competitive position, and the honest gaps between where you say you are and where you actually are.",
  },
  {
    step: "T — Transform",
    desc: "From the uncovering, we transform what exists into a structure that can hold. This is the architecture work: designing the business model, the operating structure, the decision-making framework, and the scaling logic that turns raw potential into something defensible and repeatable.",
  },
  {
    step: "M — Multiply",
    desc: "Architecture without execution is just theory. Multiply is the work of converting the structure into momentum — deploying it into the market, the team, and the systems, and building the compounding effects that turn a good business into a great one.",
  },
];

const otherLanes = [
  { label: "Career & executive clarity", href: "/career-executive-clarity" },
  { label: "Leading an organisation", href: "/organisational-systems-execution" },
  { label: "Retreats, facilitation & speaking", href: "/retreats-facilitation-speaking" },
];

export default function FounderBusinessArchitecture() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-8">Founder &amp; Business Architecture</span>
          <h1
            className="display text-text max-w-[900px] mb-8"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 6rem)", lineHeight: 1.0 }}
          >
            You&apos;re Building Hard.{" "}
            <em style={{ color: "var(--gold)" }}>So Why Isn&apos;t It Compounding?</em>
          </h1>
          <span className="gold-rule mb-8" />
          <p className="text-muted font-light max-w-[520px] mb-10" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            The effort is there. The conviction is there. But the traction isn&apos;t matching the work — and you can&apos;t quite name why. Most founders don&apos;t have an effort problem. They have an architecture problem.
          </p>
          <TwoTierCTA lane="founder" />
        </div>
      </section>

      {/* ── Diagnosis ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">Sound Familiar?</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}>
            You don&apos;t have an effort problem. You have an alignment problem.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2 mb-10">
            {[
              "You're working harder than ever but the business isn't compounding",
              "Your offer isn't as clear as it needs to be — and you know it",
              "You have multiple revenue streams but no strategic spine holding them together",
              "You're the best-kept secret in your market and can't work out why",
              "You're building on instinct and energy but need a structure that scales",
              "You've built something real and now need to architect the next stage",
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
            <TwoTierCTA lane="founder" />
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
                  "A founder building from scratch or restructuring an existing business",
                  "An entrepreneur with real traction who needs to scale with structure, not just speed",
                  "A founder carrying multiple business streams without a clear strategic spine",
                  "Someone who has built on instinct and is ready to build on architecture",
                ].map((item) => (
                  <p key={item} className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow block mb-6">It&apos;s Not For You If…</span>
              <div className="flex flex-col gap-5">
                {[
                  "You want a business plan written for you",
                  "You're looking for investment pitching or fundraising support",
                  "You want to be told what to do rather than to build the thinking yourself",
                ].map((item) => (
                  <p key={item} className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UTM™ Framework ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">How We&apos;ll Move</span>
          <h2 className="display text-text mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>UTM™</span>
            {" "}Framework
          </h2>
          <p className="text-muted font-light mb-10 max-w-[560px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            Uncover → Transform → Multiply. A proprietary framework for mining genius in a business — because building a company is exactly that: uncover what&apos;s truly there, transform it into a model and a structure that fits, and multiply it into the world.
          </p>
          <div className="flex flex-col">
            {utmSteps.map((item, i) => (
              <div
                key={item.step}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 items-start"
                style={{ padding: "clamp(10px, 1.5vw, 16px) 0", borderBottom: i < utmSteps.length - 1 ? "1px solid var(--surface-2)" : "none" }}
              >
                <span className="eyebrow" style={{ color: "var(--gold)" }}>{item.step}</span>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <TwoTierCTA lane="founder" />
          </div>
        </div>
      </section>

      {/* ── Signature Engagement ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Signature Engagement</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The 90-Day Founder Architecture Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                A structured 90-day engagement built around the UTM™ framework. Not a coaching programme. A building programme — with a defined arc, clear deliverables, and a sharper, more defensible business at the end of it.
              </p>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                We kill bad models before we build good ones. The work begins with honest pressure-testing, not with validation.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Business model diagnostic — what's real, what's noise, what needs to change",
                "Strategic spine — the positioning, the offer, and the architecture beneath both",
                "Operating and scaling logic — how this grows without breaking",
              ].map((item) => (
                <div key={item} className="flex gap-4 items-start" style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "20px" }}>
                  <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-muted font-light mb-6" style={{ fontSize: "0.88rem" }}>
              Ready to pressure-test your model? Two ways to begin —
            </p>
            <TwoTierCTA lane="founder" />
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div className="max-w-[760px]">
            <div className="bg-bg" style={{ padding: "48px 44px" }}>
              <span className="display" style={{ fontSize: "3.5rem", color: "var(--gold)", lineHeight: 1, display: "block", marginBottom: "24px", opacity: 0.4 }}>&ldquo;</span>
              <blockquote className="display text-text" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "28px" }}>
                We were trying to define what my organisation is aiming to achieve. I needed help understanding structure and how to build out ideas that are marketable. Together we created a revised vision, mission, goals, and business model for the organisation I am building.
              </blockquote>
              <span className="gold-rule" style={{ marginBottom: "20px" }} />
              <p className="eyebrow">Founder</p>
              <p className="text-dim font-light" style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}>Early-stage organisation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-bg border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}>
            &ldquo;We kill bad models before we build good ones. The work begins with honesty, not with validation.&rdquo;
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-surface s-pad-sm">
        <div className="container">
          <TwoTierCTA lane="founder" headline="Let's Look at Your Architecture." />
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
