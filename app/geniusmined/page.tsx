import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "GeniusMined — TheKayodeKolade",
  description: "The conviction behind everything. GeniusMined: the idea that genius is not rare — it is resident — and that my work is to mine it.",
};

const sections = [
  {
    subhead: "The Conviction",
    paragraphs: [
      "I believe genius is not rare. It is resident — in every individual, every situation, every organisation, every idea. Most of it simply goes unmined: unseen, unnamed, unstructured, never reaching the form it was capable of. My essence — the thing I cannot not do — is to mine it. To make sure that an encounter with me leaves the genius in a person, a team, or an organisation closer to its full potential than it was before.",
      "That's it. That's the whole thing. Everything else is an expression of it.",
    ],
  },
  {
    subhead: "One Idea, Many Expressions",
    paragraphs: [
      "Once you see GeniusMined, you see it everywhere in my work.",
      "It's why my founder framework is Uncover → Transform → Multiply (UTM™) — because mining genius in a business is exactly that: uncover what's truly there, transform it into a model and a structure that fits, and multiply it into the world. UTM™ isn't a clever acronym I reverse-engineered. It's GeniusMined applied to a company.",
      "It's why my operating philosophy is Clarity → Architecture → Momentum — mining genius in an organisation means turning buried potential into decisions, decisions into systems, and systems into sustained movement.",
      "And it's why I do work that has nothing to do with invoices at all — because the same conviction extends to impact, to creative expression, and to the people I'm simply privileged to walk alongside.",
    ],
  },
  {
    subhead: "The Winding Road",
    paragraphs: [
      "My career has been anything but linear, and I wouldn't trade that. Cost consultant. Project manager. E-commerce pioneer. Founding operator of a multinational outsourcing business. Country Manager. Director of Enterprise Transformation & Strategic Operations. Deputy COO across four countries. Every turn looked, at the time, like a detour. In hindsight they were one continuous education in the same subject: how genius becomes reality, and why it so often doesn't. I didn't start at the top, and I didn't leap there — I climbed, tier by tier, which is why when I finally led at the executive level, I understood it from the inside out.",
    ],
  },
  {
    subhead: "What Roots It",
    paragraphs: [
      "Most importantly, I'm a product of grace. Whatever I've built or become rests far more on what I've been given than on what I've earned — and I try to hold it that way. It keeps me honest about my own limits, generous with other people's potential, and far more interested in whether the work lasts than in whether it impresses.",
    ],
  },
];

const subheadStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
  fontStyle: "italic",
  fontWeight: 400,
  color: "var(--text)",
  lineHeight: 1.3,
  marginBottom: "24px",
  marginTop: "0",
};

export default function GeniusMined() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="bg-bg border-b border-surface-2"
        style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <div className="container">
          <span className="eyebrow block mb-6" style={{ color: "var(--gold)" }}>The Conviction</span>
          <h1
            className="display text-text"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}
          >
            GeniusMined: The Idea Behind Everything.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px" }} />
        </div>
      </section>

      {/* ── Manifesto body ── */}
      <section className="bg-bg s-pad">
        <div className="container" style={{ maxWidth: "720px" }}>
          {/* Opening */}
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95, marginBottom: "20px" }}>
            Over the years I&apos;ve been called many things — leader, mentor, coach, strategist, creative. Some of those names you&apos;ll find across this site. But the one that explains all the others starts with the first name I was ever given.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95, marginBottom: "20px" }}>
            Kayode — fully, Oluwakayode. It means <em>God has brought joy home.</em> I read it less as a statement about my arrival and more as a calling about my work: to be part of how joy is fulfilled — the deep, durable kind that outlasts circumstance, not the thin kind tied to a good day. I believe in God. I&apos;ve had a lifetime of reasons to choose otherwise, and I&apos;ve chosen, repeatedly, to live.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95, marginBottom: "64px" }}>
            Out of that grew the conviction that names everything I do. I call it <strong style={{ color: "var(--text)", fontWeight: 500 }}>GeniusMined.</strong>
          </p>

          {/* Sections */}
          {sections.map((s, i) => (
            <div
              key={s.subhead}
              style={{
                paddingTop: i > 0 ? "56px" : 0,
                borderTop: i > 0 ? "1px solid var(--surface-2)" : "none",
                marginBottom: i < sections.length - 1 ? "56px" : 0,
              }}
            >
              <h2 style={subheadStyle}>{s.subhead}</h2>
              <span style={{ display: "block", width: "28px", height: "1px", background: "var(--gold)", marginBottom: "28px" }} />
              {s.paragraphs.map((p, pi) => (
                <p
                  key={pi}
                  className="text-muted font-light"
                  style={{ fontSize: "0.95rem", lineHeight: 1.95, marginBottom: pi < s.paragraphs.length - 1 ? "20px" : 0 }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Soft handoff to Beyond the Work ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container" style={{ maxWidth: "720px" }}>
          <span className="eyebrow block mb-5">Expressions</span>
          <p className="text-muted font-light mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            If you&apos;d like to see how this conviction lives beyond the writing — in photographs, reading, reflections, and creative work — that&apos;s what Beyond the Work is for.
          </p>
          <Link href="/beyond-the-work" className="btn-outline">
            Visit Beyond the Work
          </Link>
        </div>
      </section>

      {/* ── Two-tier CTA ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container">
          <TwoTierCTA />
        </div>
      </section>
    </>
  );
}
