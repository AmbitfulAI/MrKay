import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";

export const revalidate = 60;

const formats = [
  {
    title: "Leadership Retreats & Executive Offsites",
    body: "Design and facilitation of leadership retreats, annual planning sessions, executive offsites, and strategic alignment experiences. Built to strengthen leadership cohesion, clarify priorities, and create shared ownership for what comes next.",
  },
  {
    title: "Strategic Facilitation",
    body: "High-stakes conversations, planning sessions, operating model discussions, change initiatives, and leadership alignment work. Particularly valuable when complexity is high and the room needs structure, clarity, and productive challenge.",
  },
  {
    title: "Systems & Execution Workshops",
    body: "Working sessions that build real operating assets — governance structures, execution rhythms, OKR architecture, accountability systems, and leadership practices — with the people responsible for making them work.",
  },
  {
    title: "Keynotes & Executive Speaking",
    body: "Talks on leadership, operating models, organisational effectiveness, strategy execution, founder architecture, career clarity, and building institutions across Africa and the diaspora. Structured arguments delivered with conviction — not motivation dressed as insight.",
  },
  {
    title: "Selected Experience",
    body: "Designed and led leadership retreats bringing together 50+ leaders across multiple countries · Facilitated strategy alignment, organisational effectiveness, and leadership development sessions · Built and facilitated sessions on high-performing teams, execution, leadership accountability, and organisational change.",
  },
];

export default function WorkshopsSpeaking() {
  return (
    <>
      <PageHero
        eyebrow="The Work — Strategic Facilitation, Retreats & Speaking"
        title="Rooms That Produce Decisions."
        subtitle="Leadership retreats, executive offsites, strategic facilitation, workshops, and speaking engagements designed to create clarity, alignment, capability, and decisions that continue shaping execution long after the session ends. Most gatherings are designed around content. The work I facilitate is designed around outcomes."
      />

      {/* ── Engagement Formats ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Engagement Formats</span>
          <h2
            className="display text-text mb-12 md:mb-16"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            How We Can Work Together
          </h2>
          <div className="flex flex-col" style={{ gap: "0" }}>
            {formats.map((format, idx) => (
              <div
                key={format.title}
                className="flex flex-col md:flex-row gap-6 md:gap-16 items-start"
                style={{
                  padding: "40px 0",
                  borderTop: "1px solid var(--surface-2)",
                  borderBottom: idx === formats.length - 1 ? "1px solid var(--surface-2)" : undefined,
                }}
              >
                <div className="shrink-0" style={{ minWidth: "280px" }}>
                  <span
                    className="display text-text"
                    style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)", lineHeight: 1.3 }}
                  >
                    {format.title}
                  </span>
                </div>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                  {format.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing line ── */}
      <section className="bg-bg border-b border-surface-2 s-pad-sm">
        <div className="container" style={{ maxWidth: "720px" }}>
          <blockquote
            className="display text-text"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              fontStyle: "italic",
              lineHeight: 1.5,
              marginBottom: "20px",
            }}
          >
            "Trusted advisors don't design sessions — they design outcomes. Tell me what needs to be different after
            the room, and I'll build backwards from there."
          </blockquote>
          <p className="eyebrow">— Kayode Kolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Let's Talk About Your Room</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Tell me about your team, retreat, offsite, or event.
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
          </div>
        </div>
      </section>
    </>
  );
}
