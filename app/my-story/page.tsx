import PageHero from "@/components/PageHero";
import Link from "next/link";

const milestones = [
  { period: "Early Career",     title: "The Foundation",      body: "Began in corporate strategy within financial services — first in London, then across Asia-Pacific. Spent a decade in roles that demanded the ability to read organisations rapidly, identify where real decisions were made, and advise under conditions of genuine uncertainty." },
  { period: "Mid Career",       title: "The Pivot",           body: "Moved from doing strategy to advising on it. The transition revealed something that would define the work: most executives have more clarity than they believe — what they lack is a trusted interlocutor who can surface it without an agenda." },
  { period: "Senior Positions", title: "The Operating Years", body: "Occupied board positions and senior leadership roles across technology, government advisory, and professional services. The experience of accountability — of being the one responsible, not the one advising — changed what kind of advisor I became." },
  { period: "MrKay Today",      title: "The Practice",        body: "Work with a deliberately small number of clients — CEOs, board chairs, and senior leadership teams at inflection points. The constraint is intentional. Every client receives direct, undivided engagement. Not a firm. Not a team. One advisor." },
];

export default function MyStory() {
  return (
    <>
      <PageHero eyebrow="About" title="The Advisor Behind the Practice." subtitle="Three decades at the intersection of strategy and leadership. A career built on asking the questions that organisations most need — and least want — to hear." />

      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="bg-surface border border-border relative overflow-hidden hidden md:block" style={{aspectRatio:"3/4"}}>
              <div className="absolute inset-8 border border-surface-2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="display" style={{fontSize:"6rem",fontWeight:300,color:"var(--border)",display:"block",lineHeight:1}}>MK</span>
              </div>
              <div className="absolute top-0 left-0 w-[50px] h-[50px]" style={{borderTop:"1px solid var(--gold)",borderLeft:"1px solid var(--gold)"}} />
              <div className="absolute bottom-0 right-0 w-[50px] h-[50px]" style={{borderBottom:"1px solid var(--gold)",borderRight:"1px solid var(--gold)"}} />
            </div>
            <div>
              <span className="eyebrow block mb-6">In Brief</span>
              <h2 className="display text-text mb-6" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)",lineHeight:1.15}}>I work with leaders who are willing to be challenged.</h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light mb-5" style={{fontSize:"0.95rem",lineHeight:1.9}}>MrKay is the operating name of a seasoned executive advisor whose career spans three decades across financial services, technology, and government. Having occupied senior leadership positions across four continents, the work draws on a combination of operating experience and strategic perspective that purely advisory careers rarely produce.</p>
              <p className="text-muted font-light mb-5" style={{fontSize:"0.95rem",lineHeight:1.9}}>The practice is built around one principle: that the most valuable counsel is independent, direct, and given without the softening that internal relationships tend to impose.</p>
              <p className="text-muted font-light" style={{fontSize:"0.95rem",lineHeight:1.9}}>Client relationships are handled with complete discretion. The practice does not accept more clients than it can serve at the standard that each engagement demands.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">The Journey</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)"}}>A Career Built on Accountability</h2>
          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <div key={m.period} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12 items-start py-10 md:py-[52px]" style={{borderBottom:i<milestones.length-1?"1px solid var(--surface-2)":"none"}}>
                <div>
                  <span className="eyebrow block mb-2">{m.period}</span>
                  <span className="hidden md:block" style={{display:"block",width:"24px",height:"1px",background:"var(--border)"}} />
                </div>
                <div>
                  <h3 className="display text-text mb-4 md:mb-5" style={{fontSize:"clamp(1.2rem,2.2vw,1.9rem)"}}>{m.title}</h3>
                  <p className="text-muted font-light" style={{fontSize:"0.9rem",lineHeight:1.9}}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <span className="eyebrow block mb-6">Guiding Principle</span>
          <blockquote className="display text-text" style={{fontSize:"clamp(1.3rem,3vw,2.6rem)",fontStyle:"italic",lineHeight:1.3,marginBottom:"24px"}}>"I am not here to make you feel good about where you are. I am here to help you get where you need to be."</blockquote>
          <p className="eyebrow">— MrKay</p>
        </div>
      </section>

      <section className="bg-surface s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Explore the Practice</span>
            <h3 className="display text-text" style={{fontSize:"clamp(1.4rem,2.5vw,2rem)"}}>See how we work.</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/executive-strategy" className="btn-outline">Executive Strategy</Link>
            <Link href="/case-studies" className="btn-solid">Case Studies</Link>
          </div>
        </div>
      </section>
    </>
  );
}
