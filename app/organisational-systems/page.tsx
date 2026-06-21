import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import TestimonialStrip from "@/components/TestimonialStrip";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";

export const revalidate = 60;

const services = [
  {
    title: "Operating Model & Governance Design",
    body: "Structure, decision rights, accountability, and the governance maturity your next stage requires — designed for how your organisation actually works, not how the org chart claims it does.",
  },
  {
    title: "Operating Rhythm & Execution Architecture",
    body: "OKRs and KPIs, dashboards, meeting architecture, and the weekly–monthly–quarterly cadence that connects your strategy to delivery. Strategy dies where rhythm is missing.",
  },
  {
    title: "Organisational Development & Change",
    body: "Diagnosing your system, not just your symptoms — because structure, culture, leadership behaviour, and execution performance are one interacting system, not four separate problems.",
  },
  {
    title: "Leadership Systems & Manager Effectiveness",
    body: "Structured development for your managers — most of whom carry responsibility without ever receiving a real management operating system. Self-leadership, team rhythms, performance management, delegation, and accountability.",
  },
  {
    title: "Fractional COO Support",
    body: "Senior operating leadership without the full-time hire — from diagnostic, to 90-day operating rhythm build, to multi-month embedded advisory for founder-led and scaling organisations.",
  },
];

const FALLBACK_TESTIMONIALS = [
  { name: "James Otai",          context: "Imagine Her (Uganda)",                  quote: "He guided us on improving our Social Enterprise and Innovation Program — the cost of delivering quality training versus quantity trained, curriculum engagement, and how to assess the success of funded enterprises. The encounter was very valuable: we made concrete adjustments to our 2024 strategic plan, including making community trainers full-time staff." },
  { name: "Programme Specialist", context: "International Education Organisation", quote: "You are an original thinker. Your guidance was never based on fluff — very practical insights. You changed how managers and specialists think about OKRs in general." },
];

export default async function OrganisationalSystems() {
  await connectDB();
  const raw = await Testimonial.find({ pages: "organisational-systems" }).sort({ order: 1 }).lean<Array<{ quote: string; clientName: string; clientContext: string }>>().catch(() => []);
  const testimonials = raw.length
    ? raw.map((t: { quote: string; clientName: string; clientContext?: string }) => ({ quote: t.quote, name: t.clientName, context: t.clientContext }))
    : FALLBACK_TESTIMONIALS;
  return (
    <>
      <PageHero
        eyebrow="The Work — Organisational Systems & Execution"
        title="You're Growing Faster Than Your Systems Can Carry."
        subtitle="Your ambition is real. Your people are capable. And yet execution still depends on heroic effort — yours, usually. That's not a people problem. It's a design problem."
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
                Your organisation isn't underperforming because people don't care. It's under-designed for the outcomes
                you want.
              </h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                You'll recognise the pattern: unclear decision rights, weak governance rhythms, inconsistent performance
                management, managers pulling in different directions — and you or your executive team carrying far more
                than the structure should require of you. The instinct is to push harder. The answer is to design
                better. Drawing on multi-country operating leadership and COO-level training, I help you build the
                operating architecture that makes execution visible, accountable, and repeatable — so performance stops
                depending on heroics and starts depending on systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Five Ways We Can Work ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Advisory Areas</span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            Five Ways We Can Work
          </h2>
          <p className="text-muted font-light mb-12 md:mb-16" style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "640px" }}>
            Whether you're strengthening an operating model, improving execution, developing leaders, or navigating
            organisational change, the goal is the same: building systems that can sustain performance beyond individual
            effort.
          </p>
          <div className="flex flex-col" style={{ gap: "0" }}>
            {services.map((svc, idx) => (
              <div
                key={svc.title}
                className="flex flex-col md:flex-row gap-6 md:gap-16 items-start"
                style={{
                  padding: "40px 0",
                  borderTop: idx === 0 ? "1px solid var(--surface-2)" : "1px solid var(--surface-2)",
                  borderBottom: idx === services.length - 1 ? "1px solid var(--surface-2)" : undefined,
                }}
              >
                <div className="shrink-0" style={{ minWidth: "280px" }}>
                  <span
                    className="display text-text"
                    style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", lineHeight: 1.3 }}
                  >
                    {svc.title}
                  </span>
                </div>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Impact in Practice ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">The Impact in Practice</span>
          <TestimonialStrip items={testimonials} />
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
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
            "The system you tolerate becomes the performance you inherit."
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Let's Look at Your Architecture</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Talk to me.
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
                  href="/founder-architecture"
                  className="text-muted hover-gold font-light"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
                >
                  Building a business of your own →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
