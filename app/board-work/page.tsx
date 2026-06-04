import CalendlyButton from "@/components/CalendlyButton";
import PageHero from "@/components/PageHero";
import Link from "next/link";

const areas = [
  { title: "Governance Review",          desc: "An independent assessment of board composition, committee structure, information flows, and decision-making effectiveness. Delivered with directness and without the softening that internal perspectives tend to apply." },
  { title: "CEO & Executive Succession", desc: "Succession at the top is among the most consequential and most poorly managed processes in corporate life. I advise boards on succession planning with a rigour that internal HR processes rarely achieve." },
  { title: "Strategic Oversight",        desc: "Boards are responsible for strategy approval and oversight, not strategy development — a distinction many boards fail to honour. We help boards exercise this responsibility with the right information, the right questions, and the right challenge." },
  { title: "Crisis Navigation",          desc: "When an organisation faces a material crisis — reputational, regulatory, financial, or human — the quality of board oversight in those first weeks is decisive. I provide direct, calm counsel to boards and chairs navigating sudden complexity." },
];

export default function BoardAdvisory() {
  return (
    <>
      <PageHero eyebrow="Services — Board Work" title="Independent Counsel for Boards." subtitle="Governance, succession, and strategic transformation — viewed from the outside, with the experience of someone who has sat on both sides of the table." />

      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">The Work</span>
              <h2 className="display text-text mb-6" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)",lineHeight:1.15}}>Boards need advisors who can say what management cannot.</h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p className="text-muted font-light mb-5" style={{fontSize:"0.95rem",lineHeight:1.9}}>Board effectiveness is an enduring challenge for organisations of every size. The constraints of independence, the dynamics of a collective governance body, and the inherent information asymmetry between board and management create structural challenges that few boards resolve well.</p>
              <p className="text-muted font-light" style={{fontSize:"0.95rem",lineHeight:1.9}}>I provide independent advisory to boards, chairs, and nomination committees — bringing an outside perspective informed by experience across listed, private, government, and not-for-profit entities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Advisory Areas</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)"}}>Where We Add Value</h2>
          <div className="flex flex-col">
            {areas.map((area, i) => (
              <div key={area.title} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start py-10 md:py-[52px]" style={{borderBottom:i<areas.length-1?"1px solid var(--surface-2)":"none"}}>
                <h3 className="display text-text" style={{fontSize:"clamp(1.2rem,2vw,1.8rem)",lineHeight:1.2}}>{area.title}</h3>
                <p className="text-muted font-light" style={{fontSize:"0.9rem",lineHeight:1.9}}>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{fontSize:"clamp(1.2rem,2.8vw,2.2rem)",fontStyle:"italic",lineHeight:1.35,marginBottom:"24px"}}>"A board that cannot challenge its CEO with intellectual rigour and genuine independence is an ornament, not an asset."</blockquote>
          <p className="eyebrow">— TheKayodeKolade</p>
        </div>
      </section>

      <section className="bg-surface s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-8">Related Services</span>
          <div className="flex flex-wrap gap-4">
            {[{label:"Strategy",href:"/strategy"},{label:"Leadership",href:"/leadership"}].map((s)=>(
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
