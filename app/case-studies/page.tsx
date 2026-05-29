import PageHero from "@/components/PageHero";
import Link from "next/link";

const cases = [
  {
    code: "CS-01",
    title: "The Reorientation",
    sector: "Financial Services",
    challenge:
      "A global financial services CEO navigating the aftermath of a major acquisition — two organisations that had merged on paper but remained cultures apart. The executive was technically capable but had never managed transformation at this scale. The board was growing impatient.",
    process:
      "Over six months, we worked on two parallel tracks: the strategic framework for integration, and the executive's own leadership model under sustained pressure. The distinction between what needed to be decided and what needed to be led was not obvious at the outset.",
    outcome:
      "The integration delivered within revised timelines. The more durable outcome was the executive's own recalibration — a clearer personal operating model, and the capacity to lead at scale without deferring to busyness as a substitute for direction.",
  },
  {
    code: "CS-02",
    title: "The Succession",
    sector: "Family Business",
    challenge:
      "A family-owned business entering its third generational transition — with a founding family that had never formally separated ownership from management, and a second-generation leadership team that lacked either the experience or the mandate to step fully into the roles they would inherit.",
    process:
      "Worked with the board, the outgoing chair, and the incoming generation over eighteen months. The work was as much relational as it was structural — the organisation needed a governance architecture it had never required before, and the family needed a trusted third party to surface what they could not say to each other.",
    outcome:
      "A governance structure fit for a professional organisation. A succession completed without the public fractures that characterise many comparable transitions. The next generation in place, with the authority — not just the titles — to lead.",
  },
  {
    code: "CS-03",
    title: "The Turnaround",
    sector: "Technology",
    challenge:
      "A mid-cap technology company facing a board crisis following the departure of its founding CEO. An interim CEO in place with a strong operational background but limited experience managing a board in a contested environment. Two activist shareholders. A strategy that no longer held.",
    process:
      "Engaged directly with the interim CEO and the board chair. The immediate priority was stabilisation — managing the activist dynamic while preserving management's ability to operate. The strategic review ran concurrently, not sequentially.",
    outcome:
      "A new CEO appointed through a process that managed shareholder expectations effectively. A revised strategy communicated to the market without triggering the credibility gap that prior communications had produced. The organisation through its most exposed period intact.",
  },
];

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="The Work in Practice."
        subtitle="A selection of engagements — anonymised, as all client work remains confidential. Presented to illustrate the nature of the challenges we engage with, not to claim outcomes that belong to our clients."
      />

      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container">
          <div className="flex gap-5 items-start max-w-[720px]">
            <span
              className="shrink-0 mt-1"
              style={{
                display: "block",
                width: "1px",
                minHeight: "60px",
                background: "var(--gold)",
              }}
            />
            <p
              className="text-muted font-light"
              style={{ fontSize: "0.88rem", lineHeight: 1.9 }}
            >
              All client engagements are conducted under strict confidentiality.
              The cases below are composites, with identifying details altered.
              They reflect real situations and genuine outcomes — the specifics
              belong to the clients who achieved them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg s-pad-sm">
        <div className="container">
          <div className="flex flex-col gap-[2px] bg-surface">
            {cases.map((c) => (
              <article key={c.code} className="case-article">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-8 md:mb-10">
                  <div>
                    <span className="eyebrow block mb-3 md:mb-4">
                      {c.sector}
                    </span>
                    <h2
                      className="display text-text"
                      style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)" }}
                    >
                      {c.title}
                    </h2>
                  </div>
                  <span
                    className="text-dim font-light"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                  >
                    {c.code}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {[
                    { label: "The Challenge", body: c.challenge },
                    { label: "The Process", body: c.process },
                    { label: "The Outcome", body: c.outcome },
                  ].map(({ label, body }) => (
                    <div key={label}>
                      <span className="eyebrow block mb-4">{label}</span>
                      <p
                        className="text-muted font-light"
                        style={{ fontSize: "0.85rem", lineHeight: 1.9 }}
                      >
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Your Situation</span>
            <h3
              className="display text-text"
              style={{ fontSize: "clamp(1.3rem,2.5vw,2.2rem)" }}
            >
              Facing a challenge that fits one of these patterns?
            </h3>
          </div>
          <Link href="/contact" className="btn-solid shrink-0">
            Begin the Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
