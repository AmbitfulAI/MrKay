import PageHero from "@/components/PageHero";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import { getAllTestimonials } from "@/lib/data/testimonials";
import { getSuccessStories } from "@/lib/data/success-stories";

export const metadata = {
  title: "Testimonials — TheKayodeKolade",
  description:
    "Real work. Real results. What clients have said about the work, and a small set of recent engagements — named where permission exists, anonymised where it doesn't.",
};

const testimonials = [
  {
    quote:
      "You showed me how to reflect growth and career progression in spite of having the same job title. Within about four months of applying what you shared, I got two job offers — and finally left after several years of applying here and there. Recruiters still reach out to me.",
    name: "Victoria Ikuemonisan",
    context: "Career & Executive Clarity",
  },
  {
    quote:
      "He guided us on improving our Social Enterprise and Innovation Program — the cost of delivering quality training versus quantity trained, curriculum engagement, and how to assess the success of funded enterprises. The encounter was very valuable: we made concrete adjustments to our 2024 strategic plan, including making community trainers full-time staff.",
    name: "James Otai",
    context: "Imagine Her · Uganda",
  },
  {
    quote:
      "After a decade-long career, I needed guidance on how to validate my interests and shape what to pursue in the next decade. I got the clarity to invest in digital transformation rather than the default path — better positioned for the modern COO role if I get there.",
    name: "Temitope Awoyemi",
    context: "Career & Executive Clarity",
  },
  {
    quote:
      "We were trying to define what my organisation is aiming to achieve. I needed help understanding structure and how to build out ideas that are marketable. Together we created a revised vision, mission, goals, and business model for the organisation I am building.",
    name: "Founder",
    context: "Early-stage organisation · Founder & Business Architecture",
  },
  {
    quote:
      "I was stuck on what to do next to make this transition. Kayode provided clarity on the steps I needed to take — finding out what my core skills and interests were, and leveraging this to decide on a career path. Our interactions provided both the drive and direction I needed. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.",
    name: "Ayodeji Akinola",
    context: "Career & Executive Clarity",
  },
  {
    quote:
      "You are an original thinker. Your guidance was never based on fluff — very practical insights. You changed how managers and specialists think about OKRs in general.",
    name: "Programme Specialist",
    context:
      "International Education Organisation · Organisational Systems & Execution",
  },
  {
    quote:
      "You helped me contextualise situations, develop a comprehensive pros and cons — and even did it with me. These interactions gave me better perspective and helped me make the best decisions.",
    name: "Samson Richard",
    context: "Career & Executive Clarity",
  },
  {
    quote:
      "I got direction. I got practical, realistic scenarios that gave clarity. The interaction helped me make the right decision — one I am enjoying today.",
    name: "Adeniran Kayode",
    context: "Career & Executive Clarity",
  },
];

const caseStudies = [
  {
    code: "01",
    eyebrow: "Workforce & Talent Platforms",
    title: "The System",
    descriptor: "Global talent platform · Assessment delivery transformation",
    outcome:
      "Fragmented assessment process turned into a governed, decision-grade operating system.",
    body: "A rapidly growing global workforce platform serving major technology companies had built its talent decisions on an assessment system that was straining under its own growth. The platform's leadership thought they had a tooling problem. A deeper diagnostic revealed something different: the assessment delivery system surrounding the tool had matured organically — undocumented governance, audit practices that depended on individual judgement, integrity controls that varied by reviewer, candidate experience designed around the platform rather than around the person being assessed. The work wasn't an assessment problem. It was a system maturity problem in assessment's clothing. Over the engagement, I led the diagnosis, designed the assessment delivery operating model, and built the governance, integrity, audit, and candidate experience architecture that turned a tool-dependent process into a defensible, decision-grade system. The deeper outcome was a shift in how leadership thought about the function — from assessment as an isolated activity to assessment as workforce intelligence built on an operating system.",
  },
  {
    code: "02",
    eyebrow: "Media & Impact",
    title: "The Positioning",
    descriptor:
      "Senior media executive · Foundational brand and strategy architecture",
    outcome:
      "Personal positioning and initiative strategy established as the foundation for everything downstream.",
    body: "A senior media executive with decades of newsroom leadership is transitioning into a major continental impact initiative — one that will draw on her authority but ask different things of how she shows up publicly. The work, currently underway, is the foundational architecture beneath the visible work: a positioning structure for her as a senior figure, a strategic frame for how the broader initiative sits relative to the platforms she's already built, and the decisions that determine how everything downstream — partnerships, funders, audiences, and the next generation of work — holds together. The conviction beneath the engagement is the same one underneath most of my senior client work: when the principal isn't positioned with clarity, every initiative they touch carries an unresolved version of that ambiguity into the world. The work continues.",
  },
  {
    code: "03",
    eyebrow: "Founder Advisory",
    title: "The Build",
    descriptor:
      "Talent Rendezvous · Lagos · Founder strategy and ongoing advisory",
    outcome:
      "Founder strategy sharpened. Brand identity introduced. The work continues.",
    body: "Talent Rendezvous is a founder-led HR and talent services firm based in Lagos. When the founder approached me, the work spanned three business streams under one identity — recruitment and HR support, an events and rentals operation, and a furniture and business management arm — without a clear strategic spine or brand to hold them together. Over an extended period, I worked with the founder on the foundational architecture: pressure-testing the business model and target market, sharpening the SWOT analysis into actionable strategic priorities, surfacing the gaps between what the business claimed and what its operating reality could defend, and introducing the brand identity partner who designed the current Talent Rendezvous mark. The work continues today as founder positioning advisory — clarifying where Talent Rendezvous sits in the market, how the founder shows up as a leader, and how the offering needs to evolve as the practice matures. Founders don't only need a strategy. They need someone willing to ask the questions no one else will. The relationship has lasted because the work has kept earning its place.",
  },
];

export default async function Testimonials() {
  const [activeQuotes, activeStories] = await Promise.all([
    getAllTestimonials(testimonials),
    getSuccessStories(caseStudies),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Real Work. Real Results."
        subtitle="What clients have said about the work, in their own words. Below that, a small set of recent engagements I've been part of. Some are named with permission. Others are anonymised by request. All are real."
      />

      {/* ── Testimonials grid ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-surface-2">
            {activeQuotes.map((q) => (
              <div
                key={q.name}
                className="bg-surface"
                style={{ padding: "48px 44px" }}
              >
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
                    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    marginBottom: "32px",
                  }}
                >
                  {q.quote}
                </blockquote>
                <span className="gold-rule" style={{ marginBottom: "20px" }} />
                <p className="eyebrow" style={{ marginBottom: "4px" }}>
                  {q.name}
                </p>
                <p
                  className="text-dim font-light"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
                >
                  {q.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Selected Engagements</span>
          <h2
            className="display text-text mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            Recent work, in honest detail.
          </h2>
          <p
            className="text-muted font-light mb-12 md:mb-16"
            style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "640px" }}
          >
            Three engagements drawn from recent work. Where the client has given
            permission, the work is named. Where confidentiality requires it,
            identifying details are altered — but the work itself, and the
            outcome, is real.
          </p>
          <div className="flex flex-col gap-[2px] bg-surface-2">
            {activeStories.map((s) => (
              <article
                key={s.code}
                className="bg-bg"
                style={{ padding: "64px 56px" }}
              >
                <div
                  className="flex justify-between items-start flex-wrap gap-4"
                  style={{ marginBottom: "12px" }}
                >
                  <span className="eyebrow">{s.eyebrow}</span>
                  <span
                    className="text-dim font-light"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                  >
                    {s.code}
                  </span>
                </div>
                <h3
                  className="display text-text"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-dim font-light"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    marginBottom: "32px",
                  }}
                >
                  {s.descriptor}
                </p>
                <div
                  style={{
                    borderLeft: "2px solid var(--gold)",
                    paddingLeft: "20px",
                    marginBottom: "36px",
                  }}
                >
                  <p
                    className="display text-text"
                    style={{
                      fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.outcome}
                  </p>
                </div>
                <p
                  className="text-muted font-light"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.95,
                  }}
                >
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Your Situation</span>
            <h3
              className="display text-text"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}
            >
              Recognise something in these stories?
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">
              Let&apos;s Talk
            </CalendlyButton>
            <Link href="/contact#form" className="btn-outline">
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
