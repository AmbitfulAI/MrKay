import Link from "next/link";

export const metadata = {
  title: "GraceJunkie — Writing · TheKayodeKolade",
  description: "Life journey and lessons. Faith, family, fatherhood, transitions, resilience — reflections from a life held together by mercy.",
};

const themes = [
  "Faith and the daily walk",
  "Family life and fatherhood",
  "Transitions, resilience, and the work of growth",
  "Faith-shaped leadership and decision-making",
  "Devotionals and quieter reflections",
];

export default function GraceJunkie() {
  return (
    <>
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-3">
            <Link href="/writing" className="hover-gold">Writing</Link> / GraceJunkie
          </span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            GraceJunkie.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            I&apos;m a product of grace. These are the reflections that come from that.
          </p>
        </div>
      </section>

      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container max-w-[720px]">
          <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            This stream is honest about the foundation. I&apos;ve said elsewhere on this site that I&apos;m a product of grace — that whatever I&apos;ve built or become rests far more on what I&apos;ve been given than on what I&apos;ve earned. GraceJunkie is where that conviction is allowed to write.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            Pieces here move through faith, family, fatherhood, resilience, transition, and the long unglamorous work of being formed. They are not sermons, and they are not strategy. They are the reflections of someone trying to live well — and willing to write honestly about what that has cost, taught, and given.
          </p>
        </div>
      </section>

      <section className="bg-bg s-pad">
        <div className="container">
          <span className="eyebrow block mb-8">Themes you&apos;ll find here</span>
          <ul className="flex flex-col gap-4 list-none max-w-[480px]">
            {themes.map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <span style={{ display: "block", width: "1px", minHeight: "40px", background: "var(--gold)", flexShrink: 0, marginTop: "4px" }} />
                <span className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.8 }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <p className="text-dim font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9, fontStyle: "italic" }}>
            First pieces coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
