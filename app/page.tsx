import Link from "next/link";
import Image from "next/image";
import CalendlyButton from "@/components/CalendlyButton";
import HeroSlider from "@/components/HeroSlider";
import TestimonialStrip from "@/components/TestimonialStrip";
import facecard from "@/assets/KK_Facecard_BW.jpg";
import { getHeroSlides } from "@/lib/data/hero-slides";
import { getSiteConfig } from "@/lib/data/site-config";
import { getTestimonialsByPage } from "@/lib/data/testimonials";

export const revalidate = 60;

const services = [
  {
    num: "01",
    title: "Career & Executive Clarity",
    href: "/career-executive-clarity",
    framework: "MINED®",
    desc: "For professionals and executives navigating the next inflection point. We name what's next — with rigour, not guesswork.",
  },
  {
    num: "02",
    title: "Founder & Business Architecture",
    href: "/founder-business-architecture",
    framework: "UTM™",
    desc: "For founders building or restructuring. We uncover, transform, and multiply — until the architecture can carry the ambition.",
  },
  {
    num: "03",
    title: "Organisational Systems & Execution",
    href: "/organisational-systems-execution",
    framework: null,
    desc: "For scaling organisations whose systems haven't caught up with their growth. Operating model, governance, and execution design.",
  },
  {
    num: "04",
    title: "Retreats, Facilitation & Speaking",
    href: "/retreats-facilitation-speaking",
    framework: null,
    desc: "Leadership retreats and strategic facilitation designed backwards from the decisions they need to produce.",
  },
];

const FALLBACK_STATS = [
  { line: "COO-Level Operating Leadership",        descriptor: "MULTI-COUNTRY EXECUTIVE EXPERIENCE" },
  { line: "Multi-Country Executive Experience",    descriptor: "AFRICA · EUROPE · GLOBAL CLIENT REACH" },
  { line: "Leadership & High-Performance Culture", descriptor: "SYSTEMS · CULTURE · EXECUTION ARCHITECTURE" },
  { line: "Organisational Development Practitioner", descriptor: "ORGANIZATION DEVELOPMENT NETWORK · NEUROLEADERSHIP INSTITUTE · ICF" },
];

const FALLBACK_HOME_TESTIMONIALS = [
  { quote: "Kayode is a true and impactful leader. You'd not have an encounter with him and remain the same.", name: "Senior Professional, Technology Sector", context: "" },
  { quote: "Our interactions provided both the drive and direction I needed to take the next bold steps. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.", name: "Ayodeji Akinola", context: "Career & Executive Clarity" },
];

export default async function Home() {
  const [heroSlides, siteConfig, homeTestimonials] = await Promise.all([
    getHeroSlides(),
    getSiteConfig(),
    getTestimonialsByPage("home", FALLBACK_HOME_TESTIMONIALS),
  ]);

  const statsBar = siteConfig?.statsBar?.length ? siteConfig.statsBar : FALLBACK_STATS;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg relative overflow-hidden flex flex-col justify-center min-h-svh pt-20 pb-16 md:pt-24 md:pb-20" style={{ position: "relative" }}>
        <HeroSlider slides={heroSlides} />

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

      {/* ── Credibility Strip ── */}
      <section className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderRight: "1px solid var(--surface-2)" }}>
            {statsBar.map((s: { line: string; descriptor: string }) => (
              <div key={s.line} className="stats-cell">
                <span className="display text-text" style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", color: "var(--gold)", lineHeight: 1.2 }}>{s.line}</span>
                <span className="eyebrow" style={{ marginTop: "10px", display: "block", color: "var(--dim)", fontSize: "0.55rem" }}>{s.descriptor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-md">
        <div className="container">
          <div className="max-w-[860px] mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
            <span className="eyebrow">Conviction</span>
            <span className="gold-rule" />
            <blockquote
              className="display text-text"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                fontStyle: "italic",
                lineHeight: 1.25,
              }}
            >
              &ldquo;Clarity is not a luxury. It is the precondition for everything
              that follows — every decision, every structure, every system that
              has to hold.&rdquo;
            </blockquote>
            <p
              className="text-dim uppercase tracking-[0.15em]"
              style={{ fontSize: "0.85rem" }}
            >
              — Kayode Kolade
            </p>
          </div>
        </div>
      </section>

      {/* ── Services / My Work ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-surface-2 pb-8 mb-0 gap-4">
            <div>
              <span className="eyebrow block mb-4">My Work</span>
              <h2
                className="display text-text"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
              >
                Four Ways I Work
              </h2>
            </div>
            <Link
              href="/meet-kayode"
              className="hover-gold flex items-center gap-2"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Meet Kayode <span style={{ color: "var(--gold)" }}>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-surface-2 mt-0">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="service-card group">
                <span className="service-card-num display">{s.num}</span>
                <h3 className="display text-text mb-2" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                  {s.title}
                </h3>
                {s.framework && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      border: "1px solid color-mix(in srgb, var(--gold) 40%, transparent)",
                      padding: "2px 8px",
                      marginBottom: "10px",
                    }}
                  >
                    {s.framework}
                  </span>
                )}
                {!s.framework && <div style={{ marginBottom: "10px", height: "22px" }} />}
                <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                  {s.desc}
                </p>
                <span
                  className="service-card-arrow"
                  style={{ color: "var(--gold)", transition: "transform 0.2s ease" }}
                >
                  →
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
          <TestimonialStrip
            items={homeTestimonials.map((t) => ({
              quote:   t.quote,
              name:    t.name,
              context: t.context,
            }))}
          />
          <div style={{ marginTop: "28px" }}>
            <Link href="/testimonials" className="hover-gold" style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="eyebrow block mb-6">The Architect Behind the Work</span>
              <h2
                className="display text-text mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  lineHeight: 1.15,
                }}
              >
                Clarity. Architecture. Momentum.
              </h2>
              <span className="gold-rule mb-7" />
              <p
                className="text-muted font-light mb-4"
                style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
              >
                Kayode Kolade is a Netherlands-based operating advisor, executive coach, and organisational architect. COO-level leadership across Africa and Europe. Formal credentials in coaching, organisational development, and operating systems.
              </p>
              <p
                className="text-dim font-light mb-10"
                style={{ fontSize: "0.9rem", lineHeight: 1.9 }}
              >
                Every engagement is direct and confidential — you work with Kayode, not a team. Full attention. No delegation.
              </p>
              <Link href="/meet-kayode" className="btn-outline">
                Meet Kayode
              </Link>
            </div>

            <div
              className="relative hidden md:block overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={facecard}
                alt="Kayode Kolade"
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

      {/* ── Beyond the Work strip ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <span className="eyebrow block mb-5">Beyond the Work</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.15 }}>
                The Human Behind the Architecture.
              </h2>
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Photography from places walked through. Books that have shaped how I think. Reflections on clarity, leadership, systems, and the realities of building across borders. The personal side of the practice, for those who want to understand the person they&apos;d be working with.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link href="/beyond-the-work" className="btn-outline">
                Beyond the Work →
              </Link>
              <Link href="/visual-diary" className="hover-gold eyebrow" style={{ color: "var(--gold)" }}>
                #GeniusMinedWorks · Visual Diary →
              </Link>
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
            Ready to name what&apos;s next?
          </h2>
          <p
            className="text-dim font-light mb-10"
            style={{ fontSize: "0.9rem", lineHeight: 1.85 }}
          >
            All engagements are handled with complete discretion. You&apos;ll be talking to Kayode directly — not a process, not a team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyButton className="btn-solid">Let&apos;s Talk</CalendlyButton>
            <Link href="/contact#form" className="btn-outline">Start the Conversation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
