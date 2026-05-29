import CalendlyButton from "@/components/CalendlyButton";
import PageHero from "@/components/PageHero";
import Link from "next/link";

const items = [
  { title: "Media Training",          desc: "Executives are not born media ready. We prepare leaders for print, broadcast, and digital media — with realistic interview simulations, message architecture, and the capacity to stay on-message under pressure without appearing to do so." },
  { title: "Keynote Development",     desc: "A great keynote is not a slide deck with a confident presenter. It is a precisely structured argument, delivered with authority and personal conviction. We work on substance, structure, and delivery — not presentation skills in the generic sense." },
  { title: "Public Profile Strategy", desc: "For executives building a public profile, the question is not whether to be visible — it is where, on what terms, and to what purpose. We develop coherent public positioning strategies aligned with the executive's broader career and organisational objectives." },
  { title: "Crisis Communications",   desc: "When an organisation faces a public crisis, the first 48 hours are frequently decisive. We advise senior executives and communications teams on messaging, sequencing, and spokesperson positioning under real-time pressure." },
];

export default function MediaSpeaking() {
  return (
    <>
      <PageHero eyebrow="Services — Media & Speaking" title="Authority on the Public Stage." subtitle="Positioning executives and organisations in the media and on the public stage — with the clarity, conviction, and composure that consequential moments demand." />

      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">The Work</span>
              <h2 className="display text-text mb-6" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)",lineHeight:1.15}}>Your public voice is a strategic asset. Treat it as one.</h2>
              <span className="gold-rule mb-7" />
            </div>
            <div>
              <p className="text-muted font-light mb-5" style={{fontSize:"0.95rem",lineHeight:1.9}}>The gap between what an executive knows and what they can communicate publicly is often significant — and rarely acknowledged. The boardroom brilliance that created an executive&apos;s career does not automatically translate into effective public performance.</p>
              <p className="text-muted font-light" style={{fontSize:"0.95rem",lineHeight:1.9}}>We close that gap — through preparation, positioning, and practice — so that when the moment arrives, the executive is ready.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">What We Offer</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)"}}>Four Areas of Practice</h2>
          <div className="flex flex-col">
            {items.map((s, i) => (
              <div key={s.title} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start py-10 md:py-[52px]" style={{borderBottom:i<items.length-1?"1px solid var(--surface-2)":"none"}}>
                <h3 className="display text-text" style={{fontSize:"clamp(1.2rem,2vw,1.8rem)",lineHeight:1.2}}>{s.title}</h3>
                <p className="text-muted font-light" style={{fontSize:"0.9rem",lineHeight:1.9}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <blockquote className="display text-text" style={{fontSize:"clamp(1.2rem,2.8vw,2.2rem)",fontStyle:"italic",lineHeight:1.35,marginBottom:"24px"}}>"The camera does not lie, and neither does a live audience. Both reward authenticity, preparation, and a point of view worth having."</blockquote>
          <p className="eyebrow">— MrKay</p>
        </div>
      </section>

      <section className="bg-surface s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-8">Related Services</span>
          <div className="flex flex-wrap gap-4">
            {[{label:"Executive Strategy",href:"/executive-strategy"},{label:"Leadership Development",href:"/leadership-development"}].map((s)=>(
              <Link key={s.href} href={s.href} className="btn-outline">{s.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container max-w-[600px] mx-auto">
          <span className="eyebrow block mb-5">Ready to Begin?</span>
          <h2 className="display text-text mb-8" style={{fontSize:"clamp(1.6rem,3vw,2.8rem)"}}>Book a complimentary consultation.</h2>
          <CalendlyButton className="btn-solid">Book a Consultation</CalendlyButton>
        </div>
      </section>
    </>
  );
}
