import Link from "next/link";
import Image from "next/image";
import CalendlyButton from "@/components/CalendlyButton";
import HeroSlider from "@/components/HeroSlider";
import facecard from "@/assets/KK_Facecard_BW.jpg";

const services = [
  {
    num: "01",
    title: "Strategy",
    href: "/strategy",
    desc: "Clarity in complexity. Strategic counsel for the decisions that define careers and companies.",
  },
  {
    num: "02",
    title: "Leadership",
    href: "/leadership",
    desc: "Developing the behaviours, mindsets, and presence of leaders at every level of your organisation.",
  },
  {
    num: "03",
    title: "Board Work",
    href: "/board-work",
    desc: "Independent counsel for boards navigating governance, succession, and strategic transformation.",
  },
  {
    num: "04",
    title: "Media & Speaking",
    href: "/media-speaking",
    desc: "Positioning executives and organisations in the media and on the public stage with authority.",
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
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(180deg, var(--gold), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderRight: "1px solid var(--surface-2)" }}>
            {[
              { num: "30+", label: "Years of Practice" },
              { num: "4",   label: "Continents" },
              { num: "C-Suite", label: "& Board Level Clients" },
              { num: "One",  label: "Advisor. Every Engagement." },
            ].map((s) => (
              <div key={s.label} className="stats-cell">
                <span className="display text-text" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--gold)", lineHeight: 1 }}>{s.num}</span>
                <span className="eyebrow" style={{ marginTop: "10px", display: "block", color: "var(--dim)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-md">
        <div className="container">
          <div className="max-w-[860px] mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
            <span className="eyebrow">Our Philosophy</span>
            <span className="gold-rule" />
            <blockquote
              className="display text-text"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                fontStyle: "italic",
                lineHeight: 1.25,
              }}
            >
              &ldquo;Leadership is not a title. It is a discipline — cultivated
              through decision, action, and presence, exercised consistently
              across every room you enter.&rdquo;
            </blockquote>
            <p
              className="text-dim uppercase tracking-[0.15em]"
              style={{ fontSize: "0.85rem" }}
            >
              — TheKayodeKolade
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-surface-2 pb-8 mb-0 gap-4">
            <div>
              <span className="eyebrow block mb-4">My Work</span>
              <h2
                className="display text-text"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
              >
                How I Help
              </h2>
            </div>
            <Link
              href="/strategy"
              className="hover-gold flex items-center gap-2"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              View All <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-surface-2 mt-0">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="service-card">
                <span className="service-card-num display">{s.num}</span>
                <h3 className="display text-text mb-3" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}>
                  {s.title}
                </h3>
                <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                  {s.desc}
                </p>
                <span className="service-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="eyebrow block mb-6">About TheKayodeKolade</span>
              <h2
                className="display text-text mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  lineHeight: 1.15,
                }}
              >
                Three decades at the intersection of strategy and leadership.
              </h2>
              <span className="gold-rule mb-7" />
              <p
                className="text-muted font-light mb-4"
                style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
              >
                TheKayodeKolade brings decades of boardroom experience to help executives
                navigate complexity, lead with authority, and build enduring
                organisations.
              </p>
              <p
                className="text-dim font-light mb-10"
                style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
              >
                Every engagement is exclusive and confidential. Clients receive
                direct, undivided access — not delegated to a junior team.
              </p>
              <Link href="/my-story" className="btn-outline">
                My Story
              </Link>
            </div>

            <div
              className="relative hidden md:block overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={facecard}
                alt="TheKayodeKolade"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 1160px) 50vw, 580px"
              />
              <div
                className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none"
                style={{
                  borderTop: "1px solid var(--gold)",
                  borderRight: "1px solid var(--gold)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-[60px] h-[60px] pointer-events-none"
                style={{
                  borderBottom: "1px solid var(--gold)",
                  borderLeft: "1px solid var(--gold)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg border-t border-surface-2 text-center s-pad-md">
        <div className="container max-w-[680px] mx-auto">
          <span className="eyebrow block mb-4">Take the Next Step</span>
          <h2
            className="display text-text mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)" }}
          >
            Ready to lead at the highest level?
          </h2>
          <p
            className="text-dim font-light mb-8"
            style={{ fontSize: "0.9rem", lineHeight: 1.85 }}
          >
            Initial consultations are complimentary. All engagements are handled
            with complete discretion.
          </p>
          <CalendlyButton className="btn-solid">
            Let's Talk
          </CalendlyButton>
        </div>
      </section>
    </>
  );
}
