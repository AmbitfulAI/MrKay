import Link from "next/link";
import Image from "next/image";
import CalendlyButton from "@/components/CalendlyButton";
import HeroSlider from "@/components/HeroSlider";
import facecard from "@/assets/KK_Facecard_BW.jpg";

const lanes = [
  {
    num: "01",
    title: "Professionals & Executives",
    tags: "Career Clarity · Leadership Identity · Strategic Transitions",
    pullquote: '"I know I have more in me. I just can\'t name the direction."',
    desc: "Structured clarity work for professionals and executives at genuine inflection points — powered by the MINED® framework.",
    cta: "Name Your Direction →",
    href: "/career-clarity",
  },
  {
    num: "02",
    title: "Founders",
    tags: "Business Architecture · Positioning · Traction Systems",
    pullquote: '"I\'m building hard. So why isn\'t momentum compounding?"',
    desc: "Founder identity, business model architecture, and traction systems — powered by the UTM™ framework.",
    cta: "Pressure-Test Your Model →",
    href: "/founder-architecture",
  },
  {
    num: "03",
    title: "Organisations",
    tags: "Operating Models · Governance · Fractional COO",
    pullquote: '"We\'re growing faster than our systems can carry."',
    desc: "Operating architecture, execution rhythms, and leadership systems for scaling organisations and leadership teams.",
    cta: "See the Architecture →",
    href: "/organisational-systems",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg relative overflow-hidden flex flex-col justify-center min-h-svh pt-20 pb-16 md:pt-24 md:pb-20" style={{ position: "relative" }}>
        <HeroSlider />

        <div
          className="absolute hidden md:flex flex-col items-center gap-2 opacity-35"
          style={{ bottom: "40px", left: "50%", transform: "translateX(-50%)" }}
        >
          <span
            className="text-text"
            style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Scroll
          </span>
          <div
            style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, var(--gold), transparent)" }}
          />
        </div>
      </section>

      {/* ── Stat Bar ── */}
      <section className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderRight: "1px solid var(--surface-2)" }}>
            {[
              { line: "15+ Years",       descriptor: "Leadership, Transformation & Systems Building" },
              { line: "Multi-Country",   descriptor: "Executive Leadership Across Africa" },
              { line: "Operating Models", descriptor: "Governance & Organisational Effectiveness" },
              { line: "ICF Member",      descriptor: "Brain-Based Coach · Organisational Development Practitioner" },
            ].map((s) => (
              <div key={s.line} className="stats-cell">
                <span className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)", color: "var(--gold)", lineHeight: 1, fontWeight: 600 }}>{s.line}</span>
                <span className="eyebrow" style={{ marginTop: "10px", display: "block", color: "var(--dim)" }}>{s.descriptor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-md">
        <div className="container">
          <div className="max-w-[860px] mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
            <span className="eyebrow">The Philosophy</span>
            <span className="gold-rule" />
            <blockquote
              className="display text-text"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", fontStyle: "italic", lineHeight: 1.25 }}
            >
              &ldquo;Clarity is the decision. Architecture is the system that protects it. Momentum is what happens when both exist.&rdquo;
            </blockquote>
            <p className="text-dim uppercase tracking-[0.15em]" style={{ fontSize: "0.85rem" }}>
              — Kayode Kolade
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Lanes / How I Help ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-surface-2 pb-8 mb-0 gap-4">
            <div>
              <span className="eyebrow block mb-4">Start Here</span>
              <h2 className="display text-text" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
                Three Lanes. One Operating Philosophy.
              </h2>
            </div>
          </div>
          <p className="text-muted font-light mt-6 mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.9, maxWidth: "640px" }}>
            Most people arrive here in one of three situations. Find yours — and I&apos;ll show you exactly how we&apos;d work together.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px] bg-surface-2 mt-0">
            {lanes.map((lane) => (
              <Link key={lane.href} href={lane.href} className="service-card" style={{ display: "flex", flexDirection: "column" }}>
                <span className="service-card-num display">{lane.num}</span>
                <h3 className="display text-text mb-1" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>
                  {lane.title}
                </h3>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--dim)", marginBottom: "16px" }}>
                  {lane.tags}
                </p>
                <p style={{ fontStyle: "italic", color: "var(--gold)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "12px" }}>
                  {lane.pullquote}
                </p>
                <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "auto" }}>
                  {lane.desc}
                </p>
                <span className="service-card-arrow" style={{ marginTop: "20px" }}>
                  {lane.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── In Their Words ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-md">
        <div className="container">
          <span className="eyebrow block mb-8">In Their Words</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2">
            {[
              {
                quote: "Kayode is a true and impactful leader. You'd not have an encounter with him and remain the same.",
                attribution: "Senior Professional, Technology Sector",
              },
              {
                quote: "Our interactions provided both the drive and direction I needed to take the next bold steps. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.",
                attribution: "Ayodeji Akinola",
              },
            ].map((item) => (
              <div
                key={item.attribution}
                className="bg-surface"
                style={{ padding: "clamp(32px, 5vw, 56px)", display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <span style={{ fontSize: "3.5rem", lineHeight: 1, color: "var(--gold)", fontFamily: "var(--font-display)", opacity: 0.5 }}>&ldquo;</span>
                <blockquote
                  className="text-muted font-light"
                  style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)", lineHeight: 1.85, marginTop: "-20px" }}
                >
                  {item.quote}
                </blockquote>
                <span className="gold-rule" />
                <p className="text-dim uppercase tracking-[0.14em]" style={{ fontSize: "0.72rem" }}>
                  {item.attribution}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "28px" }}>
            <Link href="/testimonials" className="hover-gold" style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Strip ── */}
      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="eyebrow block mb-6">Who You&apos;d Be Working With</span>
              <h2
                className="display text-text mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
              >
                I built this practice in operating rooms, not lecture halls.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                I&apos;m an operations leader, executive systems thinker, consultant, and coach. I&apos;ve led multi-country programmes, designed governance and OKR systems inside growing organisations, and coached leaders and professionals through their most consequential transitions. The Kayode Kolade Consulting is deliberately founder-led — which means you get me. Direct, undivided attention on every engagement. Not a junior team. Not a process. One advisor, every time.
              </p>
              <Link href="/my-story" className="btn-outline">
                Meet Kayode
              </Link>
            </div>

            <div className="relative hidden md:block overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src={facecard}
                alt="Kayode Kolade"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 1160px) 50vw, 580px"
              />
              <div
                className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none"
                style={{ borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none"
                style={{ borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Beyond the Work ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            <span className="eyebrow block mb-5">Beyond the Work</span>
            <h2 className="display text-text mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", lineHeight: 1.2 }}>
              The thinking you can take with you.
            </h2>
            <span className="gold-rule mb-7" />
            <p className="text-muted font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
              Not ready for a conversation? Start with the writing — reflections on clarity, leadership, systems, and the realities of building across Africa and the diaspora. Take what&apos;s useful. More dimensions of this platform will unfold over time.
            </p>
            <Link href="/my-notes" className="btn-outline">
              Read the Notes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container max-w-[680px] mx-auto">
          <span className="eyebrow block mb-4">Your Move</span>
          <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)" }}>
            Your next chapter deserves better architecture.
          </h2>
          <p className="text-dim font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.85 }}>
            It starts with a conversation — direct, confidential, and without obligation. You&apos;ll talk to me, not a sales process.
          </p>
          <CalendlyButton className="btn-solid">
            Let&apos;s Talk
          </CalendlyButton>
        </div>
      </section>
    </>
  );
}
