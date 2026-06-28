import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Retreats, Facilitation & Speaking — TheKayodeKolade",
  description: "Rooms that produce decisions. Leadership retreats, strategic facilitation, systems workshops, and keynote speaking for executive teams.",
};

const formats = [
  {
    num: "01",
    title: "Leadership Retreats & Executive Offsites",
    desc: "Designed for leadership teams who need to step out of the operational noise and think clearly about where they're going and how they'll get there together. Every retreat is built backwards from the decisions it needs to produce — not forward from an agenda that fills the time.",
  },
  {
    num: "02",
    title: "Strategic Facilitation",
    desc: "For organisations navigating strategy alignment, organisational effectiveness, or leadership development challenges that require a skilled external hand. I facilitate — which means I hold the room, manage the dynamics, and keep the group moving toward the outcomes that matter, without imposing my own conclusions.",
  },
  {
    num: "03",
    title: "Systems & Execution Workshops",
    desc: "Practical, structured working sessions for teams who need to get sharper on how they operate: OKR design, governance architecture, performance management systems, operating rhythms. The goal is always the same — a team that leaves with something they can actually use.",
  },
  {
    num: "04",
    title: "Keynotes & Executive Speaking",
    desc: "High-conviction talks for leadership conferences, executive forums, and organisational events. Topics drawn from lived operating experience: building across Africa, Europe, and beyond; COO-level operating disciplines; the architecture of high-performance organisations; clarity, leadership, and what it actually takes to build institutions that hold.",
  },
];

const selectedExperience = [
  "Designed and led leadership retreats bringing together 50+ leaders across multiple countries",
  "Designed and rolled out OKR architecture for a multi-country operation with executive teams in four countries",
  "Facilitated strategy alignment, organisational effectiveness, and leadership development sessions across education, impact, and operational environments",
  "Coached managing directors and senior leaders through performance accountability rhythms that survived past my tenure",
  "Built operating model documentation and governance cadences adopted as the organisational standard",
  "Led executive presentations and strategic rollouts for large-scale organisational initiatives",
  "Former PMP, soft-skills and professional skills trainer",
];

const otherLanes = [
  { label: "Career & executive clarity", href: "/career-executive-clarity" },
  { label: "Building a business", href: "/founder-business-architecture" },
  { label: "Leading an organisation", href: "/organisational-systems-execution" },
];

export default function RetreatsFacilitationSpeaking() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-8">Retreats, Facilitation &amp; Speaking</span>
          <h1
            className="display text-text max-w-[900px] mb-8"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 6rem)", lineHeight: 1.0 }}
          >
            Rooms That Produce Decisions.{" "}
            <em style={{ color: "var(--gold)" }}>Your Team Will Still Be Using This Next Quarter.</em>
          </h1>
          <span className="gold-rule mb-8" />
          <p className="text-muted font-light max-w-[520px] mb-10" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            Most offsites feel good in the room and disappear within a week. The ones that last are built backwards from the decisions they need to produce — not forward from an agenda that fills the time. That&apos;s the difference between a retreat and a working session that actually works.
          </p>
          <TwoTierCTA lane="speaking" />
        </div>
      </section>

      {/* ── How We Can Work ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">How We Can Work Together</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Four Formats. One Standard.
          </h2>
          <div className="flex flex-col">
            {formats.map((item, i) => (
              <div
                key={item.num}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start"
                style={{ padding: "clamp(10px, 1.5vw, 16px) 0", borderBottom: i < formats.length - 1 ? "1px solid var(--surface-2)" : "none" }}
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
            <TwoTierCTA lane="speaking" />
          </div>
        </div>
      </section>

      {/* ── Selected Experience ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">Selected Experience</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Evidence of work that held.
          </h2>
          <div className="flex flex-col gap-[2px] bg-surface-2 max-w-[760px]">
            {selectedExperience.map((item) => (
              <div key={item} className="bg-bg" style={{ padding: "24px 32px" }}>
                <div className="flex gap-4 items-start">
                  <span style={{ display: "block", width: "1px", minHeight: "36px", background: "var(--gold)", flexShrink: 0, marginTop: "4px" }} />
                  <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-surface border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}>
            &ldquo;Trusted advisors don&apos;t design sessions — they design outcomes. The session is just the vehicle.&rdquo;
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-bg s-pad-sm">
        <div className="container">
          <TwoTierCTA lane="speaking" headline="Tell me about your team, retreat, offsite, or event." />
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
