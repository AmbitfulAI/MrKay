import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Meet Kayode — TheKayodeKolade",
  description:
    "Operations leader, executive systems thinker, consultant, and coach. The architect behind the work — built inside growing organisations, not in a lecture hall.",
};

const credentials = [
  {
    category: "Operating & Leadership",
    items: [
      "Executive MBA, Rotterdam School of Management, Erasmus University",
      "Certified Project Management Professional (PMP)",
      "Fellow of the Institute of Leadership & Management, UK",
    ],
  },
  {
    category: "Coaching",
    items: [
      "Brain-based coaching certification, NeuroLeadership Institute",
      "Member, International Coaching Federation (ICF)",
    ],
  },
  {
    category: "Operations, Systems & OD",
    items: [
      "COO-level training, Operations Nation — operating model design, strategic finance, performance analytics, and execution governance",
      "Organisational development training; member, Organization Development Network (ODN)",
    ],
  },
  {
    category: "Continued Study",
    items: [
      "Executive education in Digital Transformation Strategy, University of Cambridge, Judge Business School",
      "Design Thinking, MIT Sloan School of Management",
    ],
  },
];

const principles = [
  {
    label: "Clarity Is Kindness",
    body: "I say what I see. You won't engage me for comfort — you'll engage me for clarity, which is the most useful kind of care I can offer. Vagueness is what's actually unkind: it leaves you to discover the hard truth later, alone, at greater cost. I'll tell you what I think plainly — not because it's what's easiest for you to hear, but because I'm committed to what's best for you, and I'll say it with care and respect.",
  },
  {
    label: "Rigour Because I Care",
    body: "I go deep, ask the uncomfortable questions, and refuse the easy answer — not because I enjoy complexity, but because shallow work fails you later. The rigour is the care. I'd rather we do the harder thinking now than have you inherit the cost of skipped steps down the line.",
  },
  {
    label: "Architecture Before Scale",
    body: "I won't help you build faster on a structure that can't hold. Systemisation comes before scaling. Always.",
  },
  {
    label: "A Partnership, Not a Performance",
    body: "I don't hand down answers from a podium. The best work happens in the room with you — your context, your judgement, your ownership of the outcome. I bring structure and challenge; you bring the truth of your situation. What we build, we build together, and you leave able to run it without me.",
  },
  {
    label: "Outcomes Over Sessions",
    body: "Trusted advisors don't design sessions — they design outcomes. Every engagement is built backwards from the decision, capability, or system it must produce.",
  },
  {
    label: "Confidentiality",
    body: "What you share in confidence stays there. Client relationships and details are never used publicly without your explicit permission. A first principle, not a policy.",
  },
];

const testimonials = [
  {
    quote:
      "You showed me how to reflect growth and career progression in spite of having the same job title. Within about four months of applying what you shared, I got two job offers — and finally left after several years of applying here and there. Recruiters still reach out to me.",
    name: "Victoria Ikuemonisan",
  },
];

export default function MeetKayode() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-bg border-b border-surface-2"
        style={{
          paddingTop: "clamp(80px, 12vw, 140px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="container">
          <span className="eyebrow block mb-6">Meet Kayode</span>
          <h1
            className="display text-text"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}
          >
            The Architect Behind the Work.
          </h1>
          <span
            className="gold-rule"
            style={{ marginTop: "32px", marginBottom: "32px" }}
          />
          <p
            className="text-muted font-light"
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              lineHeight: 1.9,
            }}
          >
            Before you trust someone with your next chapter, you should know how
            they built theirs. Mine wasn&apos;t built in a lecture hall. It was
            built inside growing organisations — in the operating rooms where
            systems either hold or fail, and where I learned, first-hand,
            exactly why they do.
          </p>
        </div>
      </section>

      {/* ── In Brief ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6" style={{ fontSize: "0.7rem" }}>
            In Brief
          </span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}
          >
            I work at the intersection of people, systems, and execution.
          </h2>
          <span className="gold-rule mb-7" />

          <div className="flex flex-col gap-5">
            <p
              className="text-muted font-light"
              style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
            >
              I am an operations leader, executive systems thinker, consultant,
              and coach. Everything I do circles one question: how do people and
              organisations move from intention to structured, sustained
              execution?
            </p>
            <p
              className="text-muted font-light"
              style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
            >
              I have operated at COO level across a multi-country operation, led
              enterprise transformation from inside the COO&apos;s office,
              designed the governance and performance systems that let
              organisations scale, stood up new operations from nothing, led the
              kind of change that decides whether an organisation survives its
              next stage — and coached professionals and founders through their
              most consequential transitions. I&apos;ve done this across
              construction, e-commerce, business process outsourcing, education,
              and impact, which means I&apos;ve watched the same execution
              problem wear very different clothes.
            </p>
            <p
              className="text-muted font-light"
              style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
            >
              What all of it taught me is simple, and slightly unfashionable:
              most people and organisations don&apos;t fail for lack of talent,
              effort, or ambition. They struggle because of unclear identity,
              weak architecture, broken rhythms, and misaligned execution.
            </p>
            <p
              className="text-muted font-light"
              style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
            >
              Everything I build — through The Kayode Kolade Consulting and
              beyond it — exists to fix that.
            </p>
          </div>

          {/* Stat line — single horizontal row */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "32px",
              borderTop: "1px solid var(--surface-2)",
            }}
          >
            <p
              className="eyebrow"
              style={{
                color: "var(--gold)",
                fontSize: "0.58rem",
                lineHeight: 2,
              }}
            >
              COO-LEVEL OPERATING LEADERSHIP · MULTI-COUNTRY · FIVE SECTORS ·
              FOUNDER-LED PRACTICE · FULL CONFIDENTIALITY
            </p>
          </div>
        </div>
      </section>

      {/* ── The Journey ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4" style={{ fontSize: "0.7rem" }}>
            The Journey
          </span>
          <h2
            className="display text-text mb-12 md:mb-16"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            I Didn&apos;t Start at the Top. I Climbed There.
          </h2>
          <div className="flex flex-col">
            {[
              {
                label: "The Foundation",
                body: "I began in construction — a cost consultant, then a project manager — learning to take something from drawing to reality under hard constraints of time, budget, and risk. That discipline never left me: ideas are cheap; making them hold in the real world is the actual work. I became a certified Project Management Professional, and that early grounding in execution under pressure still shapes how I think.",
              },
              {
                label: "The Operating Years",
                body: "The scale and the stakes kept growing. I was a pioneer team member at one of the first e-commerce marketplaces to launch on the African continent — building a category in a market where the infrastructure for it barely existed yet. Standing up commercial operations where there was no playbook taught me something I've relied on ever since: structure isn't bureaucracy; in hard terrain, it's the only thing that lets ambition survive contact with reality. From there I helped stand up a multinational business process outsourcing operation — at one point directing a 200-person team to deliver best-in-class customer outcomes against demanding service-level agreements. A conviction about the leadership my continent needs then drew me into education and impact.",
              },
              {
                label: "Into the Executive Tier",
                body: "The path then moved through real executive seats, one at a time. As Country Manager, Operations & Strategy, I led a national operation end to end — its people, its performance, its outcomes — in an environment where the stakes were anything but ordinary: the work interfaced directly with government immigration authorities, where the compliance bar is absolute and senior government stakeholders relied on the operation to deliver without fail. I performed strongly enough in that seat to be leaned on well beyond my own market — supporting other countries and being seconded to help restructure another national operation. From there I stepped up to Director of Enterprise Transformation & Strategic Operations, working directly inside the COO's office and leading across two countries, Mauritius and Rwanda, where the canvas widened from one market to the whole enterprise.",
              },
              {
                label: "Operating at COO Level",
                body: "That trajectory brought everything full circle: leading a multi-country operation spanning Rwanda, Kenya, Uganda, and Tanzania — with managing directors across those countries reporting to me — as Deputy COO. I owned strategy and performance outcomes across the region, coached and held to account the managing directors and senior leaders running each market, and built the operating rhythms, leadership retreats, and excellence standards an organisation needs to scale a high-performance culture. I made the strategic hiring calls and connected front-line teams to the executive table. And I led the hardest kind of change there is: I closed down an operation in one country and stood up a new one in another, did the on-the-ground reconnaissance for an expansion into a fifth market that we ultimately, and rightly, chose not to launch, and built the cultural and structural foundations each market needed to succeed — all while partnering directly with the COO and CEO as a thinking partner at the top of the house.\n\nAcross that seat, and across the years inside the COO's office before it, I have been doing COO-level operating work for the better part of a decade. The Fractional COO work I bring to clients today is not a pivot — it is the same work, in a different seat, now backed by formal COO-level training through Operations Nation.",
              },
              {
                label: "The Integration",
                body: "The coaching came first, not last. I was certified in brain-based coaching through the NeuroLeadership Institute before I stepped into the COO-level seat — which means when I coached and held managing directors to account, I was working from a trained discipline, not improvising. So the structural and the human were braided from the start. What I've done since is deliberately formalise the structure to match the practice: COO-level training through Operations Nation, organisational development training, and active membership of both the Organization Development Network and the International Coaching Federation. Because people, systems, and processes were never separate problems. They are one system — and most advisors are trained to see only one of the three.",
              },
              {
                label: "The Practice Today",
                body: "The Kayode Kolade Consulting is where both disciplines come together: decision-grade clarity for professionals, architecture for founders, and operating systems for organisations — the same work I once did from inside the executive seat, now brought to yours. The practice is live and selective: I currently advise professionals, founders, and organisations who want the structure beneath their ambition to actually hold. It's also deliberately founder-led. When you work with me, you get me — direct, undivided engagement on every assignment.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-10 items-start"
                style={{
                  padding: "clamp(20px, 3vw, 32px) 0",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--surface-2)" : "none",
                }}
              >
                <div>
                  <span className="eyebrow block mb-2">{item.label}</span>
                  <span
                    style={{
                      display: "block",
                      width: "24px",
                      height: "1px",
                      background: "var(--border)",
                    }}
                  />
                </div>
                <div>
                  {item.body.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-muted font-light"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.95,
                        marginBottom:
                          pi < item.body.split("\n\n").length - 1 ? "20px" : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">Credentials</span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}
          >
            The Foundations Beneath the Practice.
          </h2>
          <span className="gold-rule mb-7" />
          <p
            className="text-muted font-light mb-12"
            style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "600px" }}
          >
            Lived operating experience comes first. But it sits on formal
            foundations built across institutions in Africa and Europe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2">
            {credentials.map((c) => (
              <div
                key={c.category}
                className="bg-surface"
                style={{ padding: "36px 40px" }}
              >
                <span
                  className="eyebrow block mb-5"
                  style={{ color: "var(--gold)" }}
                >
                  {c.category}
                </span>
                <ul className="flex flex-col gap-3 list-none">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="text-muted font-light"
                      style={{ fontSize: "0.85rem", lineHeight: 1.8 }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">
            What You Can Expect From Me
          </span>
          <h2
            className="display text-text mb-12"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}
          >
            The Principles You Can Hold Me To.
          </h2>
          <div className="flex flex-col" style={{ gap: "32px" }}>
            {principles.map((p) => (
              <div key={p.label} className="flex gap-5 items-start">
                <span
                  style={{
                    display: "block",
                    width: "1px",
                    minHeight: "56px",
                    background: "var(--gold)",
                    flexShrink: 0,
                    marginTop: "4px",
                  }}
                />
                <div>
                  <span className="eyebrow block mb-3">{p.label}</span>
                  <p
                    className="text-muted font-light"
                    style={{ fontSize: "0.88rem", lineHeight: 1.9 }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In Their Words ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-12">In Their Words</span>
          <div
            className="flex flex-col gap-[2px] bg-surface-2"
            style={{ maxWidth: "760px" }}
          >
            {testimonials.map((q) => (
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
                    fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    marginBottom: "32px",
                  }}
                >
                  {q.quote}
                </blockquote>
                <span className="gold-rule" style={{ marginBottom: "20px" }} />
                <p className="eyebrow">{q.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A Personal Note ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container" style={{ maxWidth: "680px" }}>
          <span className="eyebrow block mb-5">A Personal Note</span>
          <p
            className="text-muted font-light"
            style={{ fontSize: "0.95rem", lineHeight: 1.9 }}
          >
            Beyond the operating rooms and the frameworks, there&apos;s a
            conviction that drives all of it — one I call GeniusMined: the
            belief that genius sits inside every person, team, and organisation,
            and that my work is to mine it and help it reach its full potential.
            It&apos;s the headwater everything else flows from, including this
            practice.{" "}
            <Link href="/geniusmined" className="hover-gold">
              If you want to know the person behind the work, that story lives
              here →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Beyond the Practice handoff ── */}
      <section className="bg-bg border-b border-surface-2 s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-5">Beyond the Practice</span>
          <h2
            className="display text-text mb-5"
            style={{
              fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
              lineHeight: 1.2,
            }}
          >
            There&apos;s More to the Person Than the Practice.
          </h2>
          <p
            className="text-muted font-light mb-8"
            style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
          >
            The conviction behind the work — why I do this, what roots it, how
            the frameworks all trace back to one idea — lives in GeniusMined.
            The photography, the reading, the reflections, and the creative work
            live in Beyond the Work. If you want to understand the human behind
            the architecture, those two pages are where it sits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/geniusmined" className="btn-outline">
              Read GeniusMined
            </Link>
            <Link href="/beyond-the-work" className="btn-outline">
              Visit Beyond the Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <TwoTierCTA headline="Now you know me. Tell me about you." />
        </div>
      </section>
    </>
  );
}
