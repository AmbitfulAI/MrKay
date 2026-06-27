import Link from "next/link";

export const metadata = {
  title: "Writing — TheKayodeKolade",
  description: "Three voices. One person. GeniusMined, GraceJunkie, and RareMusingWorks — writing for the work, the faith, and the parts that don't fit either.",
};

const streams = [
  {
    num: "01",
    name: "GeniusMined",
    href: "/writing/geniusmined",
    desc: "Professional brilliance. Frameworks, case lessons, leadership, mentorship, organisation design, and the realities of building inside growing organisations. The voice of the work.",
  },
  {
    num: "02",
    name: "GraceJunkie",
    href: "/writing/gracejunkie",
    desc: "Life journey and lessons. Faith, family, fatherhood, transitions, resilience — and a particular conviction that grace is the headwater, not the decoration. Reflections from a life held together by mercy.",
  },
  {
    num: "03",
    name: "RareMusingWorks",
    href: "/writing/raremusingworks",
    desc: "The unfiltered room. Poetry, songs, sparks, travel notes, and the random rants of a mind that won't stay in one lane. No rules. Sometimes a thought; sometimes a piece of art; sometimes a question I'm sitting with.",
  },
];

export default function Writing() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-6">Writing</span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            Three Voices. One Person.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            I write in three places — for the work, for the faith, and for the parts that don&apos;t fit either. They sound different on purpose. They come from the same person.
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container max-w-[720px]">
          <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            The commercial practice has its own voice — frameworks, lessons, the discipline of building. That voice has a stream of its own.
          </p>
          <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            But the conviction beneath the practice — that genius is resident in everyone, and that mining it is the work — doesn&apos;t only show up at the boardroom table. It shows up at the kitchen table, in the quiet hours of doubt, in the years of being raised and the longer years of raising others, in songs I write when no one is listening, in the way I see a city I&apos;ve never visited before.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            So the writing splits where life does — into three streams that share a person but not a register. Choose where you want to start.
          </p>
        </div>
      </section>

      {/* ── Streams ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-surface-2">
            {streams.map((s) => (
              <Link key={s.href} href={s.href} className="service-card">
                <span className="service-card-num display">{s.num}</span>
                <h2 className="display text-text mb-3" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}>
                  {s.name}
                </h2>
                <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8 }}>
                  {s.desc}
                </p>
                <span className="service-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing note ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container max-w-[640px]">
          <p className="text-dim font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9, fontStyle: "italic" }}>
            There&apos;s no requirement to read all three, and no shame in only ever reading one. The streams exist because the parts of me don&apos;t compress neatly. If you came for the frameworks and stayed for the faith — welcome. If you came for the poetry and left curious about how I see organisations — also welcome. The genius gets mined in whichever room you choose to walk into.
          </p>
        </div>
      </section>
    </>
  );
}
