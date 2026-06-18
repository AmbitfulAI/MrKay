import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import Image from "next/image";
import TestimonialStrip from "@/components/TestimonialStrip";
import headshot from "@/assets/KK Headshot_BW.jpg";
import upperbody from "@/assets/KK_Upperbody_BW.jpg";
import facecardImg from "@/assets/KK_Facecard_BW.jpg";
import { sanityClient } from "@/sanity/client";
import { testimonialsForPageQuery } from "@/sanity/queries";

export const revalidate = 60;

const milestones = [
  {
    period: "The Foundation",
    title: "From Drawing Board to Reality",
    body: "I began in construction — a cost consultant, then a project manager — learning to take something from drawing to reality under hard constraints of time, budget, and risk. That discipline never left me: ideas are cheap; making them hold in the real world is the actual work. I became a certified Project Management Professional, and that early grounding in execution under pressure still shapes how I think.",
  },
  {
    period: "The Operating Years",
    title: "Building Where There Was No Playbook",
    body: "I was a pioneer team member at one of the first e-commerce marketplaces to launch on the African continent — building a category in a market where the infrastructure for it barely existed yet. Standing up commercial operations where there was no playbook taught me something I've relied on ever since: structure isn't bureaucracy; in hard terrain, it's the only thing that lets ambition survive contact with reality. From there I helped stand up a multinational business process outsourcing operation — at one point directing a 200-person team to deliver best-in-class customer outcomes against demanding service-level agreements. A conviction about the leadership my continent needs then drew me into education and impact.",
  },
  {
    period: "Into the Executive Tier",
    title: "Operating Where the Stakes Were Absolute",
    body: "As Country Manager, Operations & Strategy, I led a national operation end to end — its people, its performance, its outcomes — in an environment where the stakes were anything but ordinary: the work interfaced directly with government immigration authorities, including the UK's UKVI and Australia's Department of Immigration and Border Protection, where the compliance bar is absolute and senior government stakeholders relied on the operation to deliver without fail. I performed strongly enough in that seat to be leaned on well beyond my own market — supporting other countries and being seconded to help restructure another national operation. From there I stepped up to Director of Enterprise Transformation & Strategic Operations, working directly with the COO and leading across two countries — Mauritius and Rwanda — where the canvas widened from one market to the whole enterprise: leading transformation, designing operating and performance architecture, and turning strategy into structures that could actually hold across the organisation.",
  },
  {
    period: "The Executive Seat",
    title: "Deputy COO, Multi-Country Operation",
    body: "Deputy COO of a multi-country operation spanning Rwanda, Kenya, Uganda, and Tanzania, with managing directors across those countries reporting to me. I owned strategy and performance outcomes across the region, coached and held to account the managing directors and senior leaders running each market, and built the operating rhythms, leadership retreats, and excellence standards an organisation needs to scale a high-performance culture. I made the strategic hiring calls and connected front-line teams to the executive table. And I led the hardest kind of change there is: I closed down an operation in one country and stood up a new one in another, did the on-the-ground reconnaissance for an expansion into a fifth market that we ultimately, and rightly, chose not to launch, and built the cultural and structural foundations each market needed to succeed — all while sparring directly with the COO and CEO as a thinking partner at the top of the house. That is where the conviction beneath my whole practice finally proved itself: execution fails when architecture is missing — and most of what looks like a people problem or a strategy problem is an architecture problem in disguise. I didn't learn that in a seminar. I learned it closing operations that couldn't hold, building ones that could, and sitting with leaders carrying weight they'd never been equipped to carry. Having climbed through every tier to get there, I don't advise at that level from theory — I recognise terrain I've already crossed.",
  },
  {
    period: "The Integration",
    title: "Where Structure Meets the Human",
    body: "The coaching came first, not last. I was certified in brain-based coaching through the NeuroLeadership Institute before I stepped into the Deputy COO seat — which means when I coached and held managing directors to account, I was working from a trained discipline, not improvising. So the structural and the human were braided from the start. What I've done since is deliberately formalise the structure to match the practice: COO-level training through Operations Nation, organisational development training, and active membership of both the Organization Development Network and the International Coaching Federation. Because people, systems, and processes were never separate problems. They are one system — and most advisors are trained to see only one of the three.",
  },
  {
    period: "The Practice Today",
    title: "Founder-Led. Deliberately.",
    body: "The Kayode Kolade Consulting is where both disciplines come together: decision-grade clarity for professionals, architecture for founders, and operating systems for organisations — the same work I once did from inside the executive seat, now brought to yours. The practice is live and selective: I currently advise professionals, founders, and organisations who want the structure beneath their ambition to actually hold. It's also deliberately founder-led. When you work with me, you get me — direct, undivided engagement on every assignment.",
  },
];

const credentials = [
  {
    title: "Operating & Leadership",
    body: "Executive MBA, Rotterdam School of Management, Erasmus University. Certified Project Management Professional (PMP). Fellow of the Institute of Leadership & Management, UK.",
  },
  {
    title: "Coaching",
    body: "Brain-based coaching certification, NeuroLeadership Institute. Member, International Coaching Federation (ICF).",
  },
  {
    title: "Operations, Systems & OD",
    body: "COO-level training, Operations Nation — operating model design, strategic finance, performance analytics, and execution governance. Organisational development training; member, Organization Development Network (ODN).",
  },
  {
    title: "Continued Study",
    body: "Executive education in Digital Transformation Strategy (University of Cambridge, Judge Business School) and Design Thinking (MIT Sloan School of Management).",
  },
];

const principles = [
  {
    label: "Clarity Is Kindness",
    body: "I say what I see. You won't engage me for comfort — you'll engage me for clarity, which is the most useful kind of care I can offer. Vagueness is what's actually unkind: it leaves you to discover the hard truth later, alone, at greater cost.",
  },
  {
    label: "Rigour Because I Care",
    body: "I go deep, ask the uncomfortable questions, and refuse the easy answer — not because I enjoy complexity, but because shallow work fails you later. The rigour is the care.",
  },
  {
    label: "Architecture Before Scale",
    body: "I won't help you build faster on a structure that can't hold. Systemisation comes before scaling — always — because durable beats fast every time.",
  },
  {
    label: "A Partnership, Not a Performance",
    body: "I don't hand down answers from a podium. The best work happens in the room with you — your context, your judgement, your ownership of the outcome.",
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

const FALLBACK_TESTIMONIALS = [
  { name: "Victoria Ikuemonisan", quote: "You showed me how to reflect growth and career progression in spite of having the same job title. Within about four months of applying what you shared, I got two job offers — and finally left after several years of applying here and there. Recruiters still reach out to me." },
  { name: "Samson Richard",       quote: "You helped me contextualise situations, develop a comprehensive pros and cons — and even did it with me. These interactions gave me better perspective and helped me make the best decisions." },
];

export default async function MyStory() {
  const raw = await sanityClient.fetch(testimonialsForPageQuery, { page: "my-story" }).catch(() => []);
  const testimonials = raw.length
    ? raw.map((t: { quote: string; clientName: string; clientContext?: string }) => ({ quote: t.quote, name: t.clientName, context: t.clientContext }))
    : FALLBACK_TESTIMONIALS;

  return (
    <>
      <PageHero
        eyebrow="Meet Kayode"
        title="The Architect Behind the Work."
        subtitle="Before you trust someone with your next chapter, you should know how they built theirs. Mine wasn't built in a lecture hall. It was built inside growing organisations — in the operating rooms where systems either hold or fail, and where I learned, first-hand, exactly why they do."
      />

      {/* ── In Brief ── */}
      <section className="bg-surface s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="relative overflow-hidden hidden md:block" style={{ aspectRatio: "3/4" }}>
              <Image
                src={facecardImg}
                alt="Kayode Kolade"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 1160px) 50vw, 580px"
                priority
              />
              <div className="absolute top-0 left-0 w-[50px] h-[50px] pointer-events-none" style={{ borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
              <div className="absolute bottom-0 right-0 w-[50px] h-[50px] pointer-events-none" style={{ borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
            </div>
            <div>
              <span className="eyebrow block mb-6">In Brief</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.15 }}>
                I work at the intersection of people, systems, and execution.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
                I'm an operations leader, executive systems thinker, consultant, and coach. Everything I do circles one question: how do people and organisations move from intention to structured, sustained execution? I've sat in the COO's chair across a multi-country operation, led enterprise transformation, designed governance and performance systems that let organisations scale, stood up new operations from nothing, led the kind of change that decides whether an organisation survives its next stage — and coached professionals and founders through their most consequential transitions. I've done this across construction, e-commerce, business process outsourcing, education, and impact, which means I've watched the same execution problem wear very different clothes. What all of it taught me is simple, and slightly unfashionable: most people and organisations don't fail for lack of talent, effort, or ambition. They struggle because of unclear identity, weak architecture, broken rhythms, and misaligned execution. Everything I build — through The Kayode Kolade Consulting and beyond it — exists to fix that.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-[2px] bg-surface-2" style={{ marginBottom: "40px" }}>
                {[
                  { num: "Deputy COO", label: "4-Country Operation" },
                  { num: "Five Sectors", label: "of Lived Experience" },
                  { num: "Founder-Led", label: "Practice" },
                  { num: "Full", label: "Confidentiality" },
                ].map((s) => (
                  <div key={s.label} className="bg-bg" style={{ padding: "24px 20px" }}>
                    <span className="display text-text" style={{ fontSize: "1.1rem", color: "var(--gold)", lineHeight: 1.2, display: "block" }}>{s.num}</span>
                    <span className="eyebrow" style={{ marginTop: "6px", display: "block", color: "var(--dim)" }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Journey ── */}
      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">The Journey</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
            I Didn't Start at the Top. I Climbed There.
          </h2>
          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <div
                key={m.period}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12 items-start py-10 md:py-[52px]"
                style={{ borderBottom: i < milestones.length - 1 ? "1px solid var(--surface-2)" : "none" }}
              >
                <div>
                  <span className="eyebrow block mb-2">{m.period}</span>
                  <span style={{ display: "block", width: "24px", height: "1px", background: "var(--border)" }} />
                </div>
                <div>
                  <h3 className="display text-text mb-4 md:mb-5" style={{ fontSize: "clamp(1.2rem,2.2vw,1.9rem)" }}>{m.title}</h3>
                  <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">Credentials</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.15 }}>
                The Foundations Beneath the Practice.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Lived operating experience comes first. But it sits on formal foundations built across institutions in Africa and Europe.
              </p>
            </div>
            <div className="flex flex-col" style={{ gap: "1px", background: "var(--surface-2)" }}>
              {credentials.map((c) => (
                <div key={c.title} className="bg-bg" style={{ padding: "32px 36px" }}>
                  <h3 className="display text-text mb-3" style={{ fontSize: "clamp(1rem,1.6vw,1.3rem)" }}>{c.title}</h3>
                  <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Can Expect ── */}
      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="relative overflow-hidden hidden md:block" style={{ aspectRatio: "4/5" }}>
              <Image
                src={upperbody}
                alt="Kayode Kolade"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 1160px) 50vw, 580px"
              />
              <div className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none" style={{ borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
              <div className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none" style={{ borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
            </div>
            <div>
              <span className="eyebrow block mb-6">What You Can Expect From Me</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.15 }}>
                The Principles You Can Hold Me To.
              </h2>
              <span className="gold-rule mb-10" />
              <div className="flex flex-col" style={{ gap: "32px" }}>
                {principles.map((v) => (
                  <div key={v.label} className="flex gap-5 items-start">
                    <span style={{ display: "block", width: "1px", minHeight: "56px", background: "var(--gold)", flexShrink: 0, marginTop: "4px" }} />
                    <div>
                      <span className="eyebrow block mb-3">{v.label}</span>
                      <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>{v.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── In Their Words ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-10 md:mb-12">In Their Words</span>
          <TestimonialStrip items={testimonials} />
        </div>
      </section>

      {/* ── Personal Note ── */}
      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <span className="eyebrow block mb-6">A Personal Note</span>
          <p className="text-muted font-light mb-6" style={{ fontSize: "1rem", lineHeight: 1.9 }}>
            Beyond the operating rooms and the frameworks, there's a conviction that drives all of it — one I call <em style={{ color: "var(--gold)", fontStyle: "normal" }}>GeniusMined</em>: the belief that genius sits inside every person, team, and organisation, and that my work is to mine it and help it reach its full potential. It's the headwater everything else flows from, including this practice.
          </p>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem", lineHeight: 1.85 }}>
            If you want to know the person behind the work, that story lives{" "}
            <a href="/the-person" className="hover-gold" style={{ borderBottom: "1px solid var(--gold)", paddingBottom: "1px" }}>
              here →
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Now You Know Me</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>
              Tell me about you.
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            <Link href="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
