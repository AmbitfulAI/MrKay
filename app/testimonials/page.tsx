import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity-fetch";
import { testimonialsQuery, successStoriesQuery } from "@/sanity/queries";

export const revalidate = 60;

const quotes = [
  {
    quote: "TheKayodeKolade gave me the kind of counsel I didn't know I was missing — direct, independent, and completely without agenda. Within three months I had more clarity on our direction than I'd had in three years.",
    name: "CEO",
    context: "Financial Services, West Africa",
  },
  {
    quote: "I came in sceptical. I left the first conversation knowing I'd be back. He sees things others don't, and he says them in a way that makes you want to act rather than defend.",
    name: "Managing Director",
    context: "Technology, Pan-African",
  },
  {
    quote: "The board work he did with us changed how we function at a fundamental level. We stopped going through the motions and started doing the actual work of governance. I didn't know there was a difference until I experienced it.",
    name: "Board Chair",
    context: "Professional Services",
  },
  {
    quote: "What I valued most was that he never told me what I wanted to hear. Every conversation was honest, every challenge was grounded, and every session left me better equipped than when I arrived.",
    name: "Executive Director",
    context: "Government Advisory",
  },
];

const stories = [
  {
    code: "01",
    title: "The Reorientation",
    sector: "Financial Services",
    client: "Global CEO, post-acquisition integration",
    result: "Integration delivered. Leadership model rebuilt.",
    story:
      "Two organisations had merged on paper but remained cultures apart. The CEO was technically strong but had never managed transformation at this scale — and the board's patience was thinning. Over six months, we worked on two parallel tracks: the strategic framework for integration, and the CEO's own leadership model under sustained pressure. The distinction between what needed to be decided and what needed to be led wasn't obvious at the outset — but once it was, everything moved differently. The integration delivered within revised timelines. More durably, the CEO developed a personal operating model that held under pressure rather than defaulting to busyness as a substitute for direction.",
  },
  {
    code: "02",
    title: "The Succession",
    sector: "Family Business",
    client: "Third-generation ownership transition",
    result: "Governance structure established. Succession completed without fracture.",
    story:
      "A family-owned business entering its third generational transition had never formally separated ownership from management. The second-generation leadership lacked the experience — and the mandate — to step fully into what they were about to inherit. I worked with the board, the outgoing chair, and the incoming generation over eighteen months. The work was as much relational as structural: the organisation needed governance architecture it had never required before, and the family needed a trusted third party to surface what they couldn't say to each other. What resulted was a governance structure fit for a professional organisation, a succession completed without public fracture, and a next generation in place with authority — not just titles.",
  },
  {
    code: "03",
    title: "The Turnaround",
    sector: "Technology",
    client: "Interim CEO, contested board environment",
    result: "New CEO appointed. Strategy reset. Organisation stabilised.",
    story:
      "A mid-cap technology company was navigating a board crisis following the departure of its founding CEO. The interim CEO had strong operational credentials but limited experience managing a board in a contested environment — with two activist shareholders and a strategy that no longer held. I engaged directly with the interim CEO and board chair. The immediate priority was stabilisation: managing the activist dynamic while preserving management's ability to operate. The strategic review ran concurrently rather than sequentially. A new CEO was appointed through a process that managed shareholder expectations effectively. The organisation came through its most exposed period intact — and with a revised strategy that landed credibly with the market.",
  },
  {
    code: "04",
    title: "The Presence",
    sector: "Media & Communications",
    client: "Senior Executive, public profile development",
    result: "Media positioning established. Keynote delivered to 2,000+.",
    story:
      "A highly capable executive was being overlooked for public-facing opportunities because she hadn't yet found a way to translate her boardroom authority into media presence. The work wasn't about polish — she had plenty of that. It was about helping her find, articulate, and hold a point of view worth having. Over four months we developed her public positioning, restructured her keynote, and prepared her for a series of media engagements she had previously declined. She delivered her first major keynote to an audience of over two thousand people. The feedback was that she was the highlight of the programme. She already knew what she believed. The work was helping her say it.",
  },
];

interface SanityQuote {
  _id: string;
  quote: string;
  clientName?: string;
  clientContext?: string;
}

interface SanityStory {
  _id: string;
  code: string;
  title: string;
  sector: string;
  client?: string;
  result?: string;
  story: string;
}

export default async function Testimonials() {
  const [sanityQuotes, sanityStories] = await Promise.all([
    sanityFetch<SanityQuote>(testimonialsQuery),
    sanityFetch<SanityStory>(successStoriesQuery),
  ]);

  const activeQuotes = sanityQuotes.length > 0
    ? sanityQuotes.map((q) => ({ quote: q.quote, name: q.clientName ?? "", context: q.clientContext ?? "" }))
    : quotes;

  const activeStories = sanityStories.length > 0
    ? sanityStories.map((s) => ({ code: s.code, title: s.title, sector: s.sector, client: s.client ?? "", result: s.result ?? "", story: s.story }))
    : stories;

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Real Work. Real Results."
        subtitle="What clients say, and a selection of the work behind it. Details are anonymised — the outcomes belong to the people who achieved them."
      />

      {/* ── Client quotes ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-surface-2">
            {activeQuotes.map((q) => (
              <div key={q.name} className="bg-surface" style={{ padding: "48px 44px" }}>
                <span className="display" style={{ fontSize: "3.5rem", color: "var(--gold)", lineHeight: 1, display: "block", marginBottom: "24px", opacity: 0.4 }}>&ldquo;</span>
                <blockquote
                  className="display text-text"
                  style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontStyle: "italic", lineHeight: 1.55, marginBottom: "32px" }}
                >
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

      {/* ── Confidentiality note ── */}
      <section className="bg-bg border-b border-surface-2 s-pad-sm">
        <div className="container">
          <div className="flex gap-5 items-start max-w-[720px]">
            <span className="shrink-0 mt-1" style={{ display: "block", width: "1px", minHeight: "60px", background: "var(--gold)" }} />
            <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
              All client relationships are handled with complete confidentiality. The stories below reflect real engagements with identifying details altered. Every outcome described is genuine — it belongs to the client, not to me.
            </p>
          </div>
        </div>
      </section>

      {/* ── Success stories ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Success Stories</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
            The work in practice.
          </h2>
          <div className="flex flex-col gap-[2px] bg-surface-2">
            {activeStories.map((s) => (
              <article key={s.code} className="bg-bg" style={{ padding: "64px 56px" }}>
                {/* Header */}
                <div className="flex justify-between items-start flex-wrap gap-4" style={{ marginBottom: "12px" }}>
                  <span className="eyebrow">{s.sector}</span>
                  <span className="text-dim font-light" style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>{s.code}</span>
                </div>
                <h3 className="display text-text" style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)", marginBottom: "8px" }}>{s.title}</h3>
                <p className="text-dim font-light" style={{ fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "32px" }}>{s.client}</p>

                {/* Result callout */}
                <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "20px", marginBottom: "36px" }}>
                  <p className="display text-text" style={{ fontSize: "clamp(0.95rem,1.5vw,1.15rem)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {s.result}
                  </p>
                </div>

                {/* Story */}
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.95, maxWidth: "760px" }}>
                  {s.story}
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
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem,2.5vw,2.2rem)" }}>
              Recognise something in these stories?
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            <Link href="/impact" className="btn-outline shrink-0">See the Impact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
