import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import Image from "next/image";
import headshot from "@/assets/KK Headshot_BW.jpg";
import upperbody from "@/assets/KK_Upperbody_BW.jpg";

const milestones = [
  {
    period: "Early Career",
    title: "The Foundation",
    body: "Began in corporate strategy within financial services — first in London, then across Asia-Pacific. Spent a decade in roles that demanded the ability to read organisations rapidly, identify where real decisions were made, and advise under conditions of genuine uncertainty.",
  },
  {
    period: "Mid Career",
    title: "The Pivot",
    body: "Moved from doing strategy to advising on it. The transition revealed something that would define the work: most executives have more clarity than they believe — what they lack is a trusted interlocutor who can surface it without an agenda.",
  },
  {
    period: "Senior Positions",
    title: "The Operating Years",
    body: "Occupied board positions and senior leadership roles across technology, government advisory, and professional services. The experience of accountability — of being the one responsible, not the one advising — changed what kind of advisor I became.",
  },
  {
    period: "TheKayodeKolade Today",
    title: "The Practice",
    body: "Work with a deliberately small number of clients — CEOs, board chairs, and senior leadership teams at inflection points. The constraint is intentional. Every client receives direct, undivided engagement. Not a firm. Not a team. One advisor.",
  },
];

const credentials = [
  { title: "MBA — Executive Leadership",         body: "International Business School, London. Specialisation in organisational behaviour and strategic decision-making." },
  { title: "Board Directorship Qualification",   body: "Institute of Directors. Governance, fiduciary responsibility, and board dynamics across listed and private entities." },
  { title: "Certified Executive Coach",          body: "International Coaching Federation (ICF). Individual and team coaching at senior and board level." },
  { title: "Non-Executive Director Accreditation", body: "Recognised qualification for independent board advisory roles across corporate, government, and not-for-profit sectors." },
];

const recognition = [
  { year: "2024", title: "Top Executive Advisors — Africa", body: "Recognised among a select group of senior advisors shaping leadership and governance practice across the continent." },
  { year: "2023", title: "Board Governance Award",          body: "Institute of Directors Africa — acknowledging sustained contribution to board effectiveness and governance excellence." },
  { year: "2022", title: "Leadership Speaker of the Year",  body: "Pan-African Leadership Forum — recognised for keynote contributions on executive presence, succession, and board dynamics." },
];

const values = [
  { label: "Directness",      body: "I say what I see. My clients do not pay me for comfort — they engage me for clarity. I will tell you what I genuinely think, every time." },
  { label: "Confidentiality", body: "Not as a policy. As a first principle. Nothing that passes between us reaches anyone else. This is non-negotiable and has always been so." },
  { label: "Independence",    body: "I hold no institutional affiliations that create conflicted counsel. My only loyalty is to the quality of the thinking I bring to your situation." },
  { label: "Preparation",     body: "I believe decisions made from a place of stillness and preparation outlast decisions made under pressure. I help leaders get to that place." },
];

export default function MyStory() {
  return (
    <>
      <PageHero
        eyebrow="About TheKayodeKolade"
        title="The Advisor Behind the Practice."
        subtitle="I didn't plan to become an advisor. I planned to lead. What I discovered — through decades of operating experience across four continents — is that the questions I was most useful for were the ones no one inside the organisation could safely ask."
      />

      {/* ── In Brief ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="relative overflow-hidden hidden md:block" style={{ aspectRatio: "3/4" }}>
              <Image
                src={headshot}
                alt="TheKayodeKolade — Executive Advisor"
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
                I work with leaders who are willing to be challenged.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
                TheKayodeKolade is the operating name of a seasoned executive advisor whose career spans three decades across financial services, technology, and government. Having occupied senior leadership and board positions across four continents, the work draws on a combination of operating experience and strategic perspective that purely advisory careers rarely produce.
              </p>
              <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
                I am a direct communicator and a deep reader of organisations. I notice what is said, what is not said, and what is happening beneath both. That combination — operating experience, strategic clarity, and the capacity to ask the question no one else will — is what clients engage me for.
              </p>
              <p className="text-muted font-light mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
                The practice does not accept more clients than it can serve at the standard each engagement demands. Every relationship is exclusive and handled with complete discretion.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-[2px] bg-surface-2" style={{ marginBottom: "40px" }}>
                {[
                  { num: "30+", label: "Years" },
                  { num: "4", label: "Continents" },
                  { num: "CEO", label: "to Board" },
                  { num: "100%", label: "Confidential" },
                ].map((s) => (
                  <div key={s.label} className="bg-surface" style={{ padding: "24px 20px" }}>
                    <span className="display text-text" style={{ fontSize: "1.9rem", color: "var(--gold)", lineHeight: 1, display: "block" }}>{s.num}</span>
                    <span className="eyebrow" style={{ marginTop: "6px", display: "block", color: "var(--dim)" }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">The Journey</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
            A Career Built on Accountability
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
      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">Qualifications</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.15 }}>
                The formation behind the practice.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Three decades of operating experience are underpinned by formal qualifications in leadership, governance, and coaching — developed across institutions in Europe and Africa.
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

      {/* ── Recognition ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Recognition</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>
            Acknowledged by the field.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-surface-2">
            {recognition.map((r) => (
              <div key={r.title} className="bg-surface" style={{ padding: "48px 40px" }}>
                <span className="display" style={{ fontSize: "3rem", color: "var(--gold)", lineHeight: 1, display: "block", marginBottom: "20px" }}>{r.year}</span>
                <span className="gold-rule" style={{ marginBottom: "24px" }} />
                <h3 className="display text-text mb-4" style={{ fontSize: "clamp(1rem,1.6vw,1.35rem)", lineHeight: 1.2 }}>{r.title}</h3>
                <p className="text-muted font-light" style={{ fontSize: "0.82rem", lineHeight: 1.85 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What drives me ── */}
      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="relative overflow-hidden hidden md:block" style={{ aspectRatio: "4/5" }}>
              <Image
                src={upperbody}
                alt="TheKayodeKolade"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 1160px) 50vw, 580px"
              />
              <div className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none" style={{ borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
              <div className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none" style={{ borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
            </div>
            <div>
              <span className="eyebrow block mb-6">What Drives Me</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.15 }}>
                The principles I bring to every engagement.
              </h2>
              <span className="gold-rule mb-10" />
              <div className="flex flex-col" style={{ gap: "32px" }}>
                {values.map((v) => (
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

      {/* ── Quote ── */}
      <section className="bg-surface border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <span className="eyebrow block mb-6">Guiding Principle</span>
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.3rem,3vw,2.6rem)", fontStyle: "italic", lineHeight: 1.3, marginBottom: "24px" }}>
            "I am not here to make you feel good about where you are. I am here to help you get where you need to be."
          </blockquote>
          <p className="eyebrow">— TheKayodeKolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Work Together</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>
              Ready for a direct conversation?
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            <Link href="/testimonials" className="btn-outline">Read the Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
