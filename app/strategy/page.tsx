import CalendlyButton from "@/components/CalendlyButton";
import PageHero from "@/components/PageHero";
import Link from "next/link";

const phases = [
  {
    num: "01",
    title: "Discovery",
    desc: "I begin with a deep assessment of your current strategic position — examining your competitive context, organisational dynamics, decision-making frameworks, and the external forces shaping your sector. This phase is not a surface audit; it is a rigorous interrogation of where you are and why.",
  },
  {
    num: "02",
    title: "Clarification",
    desc: "Complexity is the enemy of decisive leadership. Working with you directly, I distil the noise into a clear strategic narrative — defining priorities, resolving competing imperatives, and constructing the framework through which your most consequential decisions will be made.",
  },
  {
    num: "03",
    title: "Execution Support",
    desc: "Strategy without execution is intention without outcome. We remain at your side as a trusted thinking partner through implementation — challenging your assumptions, interrogating progress, and adjusting course as the landscape evolves.",
  },
];

export default function ExecutiveStrategy() {
  return (
    <>
      <PageHero
        eyebrow="Services — Strategy"
        title="Clarity in Complexity."
        subtitle="Strategic counsel for leaders navigating the decisions that define careers and companies. Not advice to be accepted — counsel to be interrogated."
      />

      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">The Work</span>
              <h2
                className="display text-text mb-6"
                style={{
                  fontSize: "clamp(1.8rem,3vw,2.8rem)",
                  lineHeight: 1.15,
                }}
              >
                Strategy is not a document. It is a living discipline.
              </h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p
                className="text-muted font-light mb-5"
                style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
              >
                The most consequential decisions in an executive&apos;s career
                are rarely made in ideal conditions. They arrive under pressure,
                with incomplete information, and with significant personal and
                organisational stakes attached to each path.
              </p>
              <p
                className="text-muted font-light"
                style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
              >
                MrKay works with a small number of senior executives and
                organisations to provide strategic counsel that is direct,
                independent, and informed by decades of operating experience.
                Not frameworks. Not methodologies. Thinking — applied to your
                specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">My Approach</span>
          <h2
            className="display text-text mb-12 md:mb-16"
            style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}
          >
            A Three-Phase Engagement
          </h2>
          <div className="flex flex-col">
            {phases.map((phase, i) => (
              <div
                key={phase.num}
                className="grid grid-cols-[56px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start py-10 md:py-[52px]"
                style={{
                  borderBottom:
                    i < phases.length - 1
                      ? "1px solid var(--surface-2)"
                      : "none",
                }}
              >
                <div>
                  <span
                    className="display"
                    style={{
                      fontSize: "clamp(1.8rem,3.5vw,3.5rem)",
                      color: "var(--border)",
                      display: "block",
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    {phase.num}
                  </span>
                  <span
                    style={{
                      display: "block",
                      width: "24px",
                      height: "1px",
                      background: "var(--gold)",
                    }}
                  />
                </div>
                <div>
                  <h3
                    className="display text-text mb-4"
                    style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)" }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    className="text-muted font-light"
                    style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
                  >
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote
            className="display text-text"
            style={{
              fontSize: "clamp(1.2rem,2.8vw,2.2rem)",
              fontStyle: "italic",
              lineHeight: 1.35,
              marginBottom: "24px",
            }}
          >
            &ldquo;The question I am paid to ask is the one the executive cannot
            ask themselves — because they are too close to the problem to see it
            clearly.&rdquo;
          </blockquote>
          <p className="eyebrow">— MrKay</p>
        </div>
      </section>

      <section className="bg-surface s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-8">Related Services</span>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Leadership", href: "/leadership" },
              { label: "Board Work", href: "/board-work" },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="btn-outline">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container max-w-[600px] mx-auto">
          <span className="eyebrow block mb-5">Ready to Begin?</span>
          <h2
            className="display text-text mb-8"
            style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)" }}
          >
            Let's have a conversation.
          </h2>
          <CalendlyButton className="btn-solid">
            Let's Talk
          </CalendlyButton>
        </div>
      </section>
    </>
  );
}
