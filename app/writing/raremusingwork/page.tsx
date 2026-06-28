import Link from "next/link";

export const metadata = {
  title: "RareMusingWork — Writing · TheKayodeKolade",
  description: "The unfiltered room. Poetry, songs, travel notes, and the random rants of a mind that won't stay in one lane.",
};

const themes = [
  "Poetry and creative writing",
  "Songs, lyrics, and the sparks beneath them",
  "Travel notes and observations",
  "Random rants and thought invitations",
  "Half-formed ideas, posed openly",
];

export default function RareMusingWork() {
  return (
    <>
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-3">
            <Link href="/writing" className="hover-gold">Writing</Link> / RareMusingWork
          </span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            RareMusingWork.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            The unfiltered room. Where the rules are softer and the writing is freer.
          </p>
        </div>
      </section>

      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container max-w-[720px]">
          <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            This is where the rest goes. Poetry I write when a line lands and won&apos;t leave. Songs and lyrics from a quieter creative life that runs alongside the commercial one. Travel notes from places that taught me something. Half-formed essays, thought invitations, things I&apos;m sitting with but haven&apos;t fully resolved.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            There&apos;s no editorial line here, and that&apos;s the point. RareMusingWork is the room with the loosest dress code. If you came for frameworks, you&apos;ll find none. If you came to see how a mind that won&apos;t stay in one lane actually wanders, you&apos;ve arrived in the right place.
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
