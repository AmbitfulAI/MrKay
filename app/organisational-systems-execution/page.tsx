import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Organisational Systems & Execution — TheKayodeKolade",
  description: "You're growing faster than your systems can carry. Operating model design, organisational development, and COO-level execution support.",
};

const fiveWays = [
  {
    num: "01",
    title: "Operating Model & Governance Design",
    desc: "Designing the structural spine of the organisation: how decisions get made, how accountability flows, and how the whole thing holds together under the pressure of growth. Operating models that don't just exist on paper — they survive contact with execution.",
  },
  {
    num: "02",
    title: "Organisational Development & Change",
    desc: "Systemic intervention at the level of culture, capability, and design. OD isn't a department — it's the discipline of building organisations that can grow without fracture. This work sits at the intersection of people, structure, and strategy.",
  },
  {
    num: "03",
    title: "Operating Rhythm & Execution Architecture",
    desc: "Strategy without rhythm is aspiration without traction. We build the cadences, performance management systems, and execution routines that turn good planning into durable performance. The goal: an organisation that executes consistently, not just in good months.",
  },
  {
    num: "04",
    title: "Leadership Systems & Manager Effectiveness",
    desc: "The quality of your middle layer determines the quality of your organisation's output. We build the manager effectiveness systems, leadership standards, and accountability frameworks that multiply leadership performance across the whole organisation.",
  },
  {
    num: "05",
    title: "Fractional COO Support",
    desc: "COO-level operating leadership without the permanent hire. For organisations that need the thinking, the discipline, and the execution capacity of a seasoned COO — without a full-time seat. Backed by formal COO-level training through Operations Nation.",
  },
];

const otherLanes = [
  { label: "Career & executive clarity", href: "/career-executive-clarity" },
  { label: "Building a business", href: "/founder-business-architecture" },
  { label: "Retreats, facilitation & speaking", href: "/retreats-facilitation-speaking" },
];

export default function OrganisationalSystemsExecution() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-8">Organisational Systems &amp; Execution</span>
          <h1
            className="display text-text max-w-[900px] mb-8"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 6rem)", lineHeight: 1.0 }}
          >
            You&apos;re Growing Faster{" "}
            <em style={{ color: "var(--gold)" }}>Than Your Systems Can Carry.</em>
          </h1>
          <span className="gold-rule mb-8" />
          <p className="text-muted font-light max-w-[520px] mb-10" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            Your organisation isn&apos;t underperforming because people don&apos;t care. It&apos;s under-designed for the outcomes you want. The gap between ambition and execution is almost always an architecture problem — not a people problem.
          </p>
          <TwoTierCTA lane="org" />
        </div>
      </section>

      {/* ── Diagnosis ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">Sound Familiar?</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}>
            Most of what looks like a people problem is an architecture problem in disguise.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2 mb-10">
            {[
              "You have good people but inconsistent performance",
              "Your strategy is clear but execution keeps breaking down",
              "You're scaling but your systems weren't built for this size",
              "Decision-making is too slow, too centralised, or too chaotic",
              "Your leaders are capable individually but don't perform as a system",
              "You've outgrown your operating model and can feel it everywhere",
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
            <TwoTierCTA lane="org" />
          </div>
        </div>
      </section>

      {/* ── Five Ways ── */}
      <section className="bg-bg border-b border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">How We Can Work</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Five Ways We Can Work Together
          </h2>
          <div className="flex flex-col">
            {fiveWays.map((item, i) => (
              <div
                key={item.num}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start"
                style={{ padding: "clamp(10px, 1.5vw, 16px) 0", borderBottom: i < fiveWays.length - 1 ? "1px solid var(--surface-2)" : "none" }}
              >
                <div>
                  <span className="display" style={{ fontSize: "2.5rem", color: "var(--border)", lineHeight: 1, display: "block", marginBottom: "8px" }}>{item.num}</span>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>{item.title}</span>
                </div>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <TwoTierCTA lane="org" />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2">
            {[
              {
                quote: "He guided us on improving our Social Enterprise and Innovation Program — the cost of delivering quality training versus quantity trained, curriculum engagement, and how to assess the success of funded enterprises. The encounter was very valuable: we made concrete adjustments to our 2024 strategic plan, including making community trainers full-time staff.",
                name: "James Otai",
                context: "Imagine Her · Uganda",
              },
              {
                quote: "You are an original thinker. Your guidance was never based on fluff — very practical insights. You changed how managers and specialists think about OKRs in general.",
                name: "Programme Specialist",
                context: "International Education Organisation",
              },
            ].map((q) => (
              <div key={q.name} className="bg-surface" style={{ padding: "48px 44px" }}>
                <span className="display" style={{ fontSize: "3.5rem", color: "var(--gold)", lineHeight: 1, display: "block", marginBottom: "24px", opacity: 0.4 }}>&ldquo;</span>
                <blockquote className="display text-text" style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "28px" }}>
                  {q.quote}
                </blockquote>
                <span className="gold-rule" style={{ marginBottom: "20px" }} />
                <p className="eyebrow" style={{ marginBottom: "4px" }}>{q.name}</p>
                <p className="text-dim font-light" style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}>{q.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-bg border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}>
            &ldquo;The system you tolerate becomes the performance you inherit.&rdquo;
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-surface s-pad-sm">
        <div className="container">
          <TwoTierCTA lane="org" headline="Let's Look at Your Architecture." />
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
