import Link from "next/link";
import Image from "next/image";
import CalendlyButton from "@/components/CalendlyButton";
import facecard from "@/assets/KK_Facecard_BW.jpg";
import execBg from "@/assets/KK_Exec_bg.jpg";

const services = [
  {
    num: "01",
    title: "Executive Strategy",
    href: "/executive-strategy",
    desc: "Clarity in complexity. Strategic counsel for the decisions that define careers and companies.",
  },
  {
    num: "02",
    title: "Leadership Development",
    href: "/leadership-development",
    desc: "Developing the behaviours, mindsets, and presence of leaders at every level of your organisation.",
  },
  {
    num: "03",
    title: "Board Advisory",
    href: "/board-advisory",
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
      <section className="bg-bg relative overflow-hidden flex flex-col justify-center min-h-svh pt-20 pb-16 md:pt-24 md:pb-20">
        <Image
          src={execBg}
          alt=""
          aria-hidden
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.18,
          }}
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 30%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)",
          }}
        />

        <div className="container relative">
          <span className="eyebrow anim-fade-up block mb-8 md:mb-10">
            Executive Consulting
          </span>
          <h1
            className="display text-text anim-fade-up anim-delay-1 max-w-[900px] mb-8 md:mb-10"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", lineHeight: 0.97 }}
          >
            Built for the
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
              Boardroom.
            </em>
          </h1>
          <span className="gold-rule anim-fade-up anim-delay-2 mb-6 md:mb-8" />
          <p
            className="text-muted font-light anim-fade-up anim-delay-3 max-w-[520px] mb-10 md:mb-12"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              lineHeight: 1.9,
            }}
          >
            Strategic counsel for executives who lead at the highest level.
            Confidential. Considered. Consequential.
          </p>
          <div className="anim-fade-up anim-delay-4 flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">
              Book a Consultation
            </CalendlyButton>
            <Link href="/executive-strategy" className="btn-outline">
              Our Services
            </Link>
          </div>
        </div>

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
              — MrKay
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-surface-2 pb-8 mb-0 gap-4">
            <div>
              <span className="eyebrow block mb-4">Our Practice</span>
              <h2
                className="display text-text"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
              >
                How We Work
              </h2>
            </div>
            <Link
              href="/executive-strategy"
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
          <div className="flex flex-col">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="service-row">
                <span className="service-num display">{s.num}</span>
                <div>
                  <h3
                    className="display text-text mb-2"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-dim font-light"
                    style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
                  >
                    {s.desc}
                  </p>
                </div>
                <span className="service-arrow">→</span>
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
              <span className="eyebrow block mb-6">About MrKay</span>
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
                MrKay brings decades of boardroom experience to help executives
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
                alt="MrKay"
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
            Book a Consultation
          </CalendlyButton>
        </div>
      </section>
    </>
  );
}
