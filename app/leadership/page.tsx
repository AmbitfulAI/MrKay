import CalendlyButton from "@/components/CalendlyButton";
import PageHero from "@/components/PageHero";
import Link from "next/link";

const pillars = [
  { title: "Behavioural Mastery",       desc: "Leadership behaviour is the aggregate of thousands of micro-decisions made daily — how you enter a room, how you listen, when you speak and when you do not. I work on the specifics, not the generalities." },
  { title: "Decision Architecture",     desc: "Leaders at the highest level are defined by how they make decisions under pressure and with incomplete information. We build the mental frameworks and personal processes that make great decisions a discipline rather than an accident." },
  { title: "Executive Presence",        desc: "Presence is not charisma — it is the consistent projection of authority, conviction, and calm across every context. I develop this with precision, across the full range of executive environments." },
  { title: "Organisational Leadership", desc: "Individual capability is necessary but insufficient. I develop leaders who can build cultures, align organisations, and create conditions in which talent grows without depending on the leader's constant presence." },
];

export default function LeadershipDevelopment() {
  return (
    <>
      <PageHero eyebrow="Services — Leadership" title="Leaders Are Made, Not Born." subtitle="Developing the behaviours, mindsets, and presence of leaders at every level. Rigorous, individualised, and built around what your organisation actually needs." />

      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">The Work</span>
              <h2 className="display text-text mb-6" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)",lineHeight:1.15}}>Leadership is a practice — not a programme.</h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p className="text-muted font-light mb-5" style={{fontSize:"0.95rem",lineHeight:1.9}}>Most leadership development fails because it treats leadership as content to be absorbed, rather than as capability to be built. A two-day offsite does not change how a leader behaves under pressure six months later.</p>
              <p className="text-muted font-light" style={{fontSize:"0.95rem",lineHeight:1.9}}>I work across extended, structured engagements — with individuals and with teams — to build leadership capability that is observable, durable, and directly linked to organisational outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">My Focus Areas</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)"}}>Four Pillars of Executive Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-surface-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="pillar-card">
                <h3 className="display text-text mb-5" style={{fontSize:"clamp(1.2rem,1.6vw,1.6rem)"}}>{pillar.title}</h3>
                <p className="text-muted font-light" style={{fontSize:"0.88rem",lineHeight:1.9}}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{fontSize:"clamp(1.2rem,2.8vw,2.2rem)",fontStyle:"italic",lineHeight:1.35,marginBottom:"24px"}}>"The best leaders I have worked with share one trait: they are genuinely curious about the gap between who they are and who they need to become."</blockquote>
          <p className="eyebrow">— MrKay</p>
        </div>
      </section>

      <section className="bg-surface s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-8">Related Services</span>
          <div className="flex flex-wrap gap-4">
            {[{label:"Strategy",href:"/strategy"},{label:"Board Work",href:"/board-work"}].map((s)=>(
              <Link key={s.href} href={s.href} className="btn-outline">{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container max-w-[600px] mx-auto">
          <span className="eyebrow block mb-5">Ready to Begin?</span>
          <h2 className="display text-text mb-8" style={{fontSize:"clamp(1.6rem,3vw,2.8rem)"}}>Let's have a conversation.</h2>
          <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
        </div>
      </section>
    </>
  );
}
