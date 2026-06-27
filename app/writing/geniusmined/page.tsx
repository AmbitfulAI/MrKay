import Link from "next/link";

export const metadata = {
  title: "GeniusMined — Writing · TheKayodeKolade",
  description: "Frameworks, case lessons, leadership, mentorship, organisation design, and the realities of building inside growing organisations. The voice of the work.",
};

const themes = [
  "Career clarity and the discipline of decision-making",
  "Founder identity, business architecture, and traction",
  "Operating models, governance, and execution rhythms",
  "Manager effectiveness and leadership transitions",
  "Organisational design, culture, and change",
  "Awareness, growth, and the inner work of leadership",
  "Intentional living and conviction",
  "Reflections from inside the executive seat",
];

export default function GeniusMined() {
  return (
    <>
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-3">
            <Link href="/writing" className="hover-gold">Writing</Link> / GeniusMined
          </span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            GeniusMined.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            Frameworks, lessons, and reflections on the work — for leaders, founders, and anyone building something that has to hold.
          </p>
        </div>
      </section>

      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container max-w-[720px]">
          <p className="text-muted font-light mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            This is the stream for the work itself. Pieces here are about what I see inside organisations, what I&apos;ve learned across two decades of operating roles, the frameworks I&apos;ve built and the cases that taught me to build them. Some pieces are short and practical. Others are longer and structural. All of them are written for the person who isn&apos;t looking for inspiration — they&apos;re looking for something they can use.
          </p>
          <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            If you&apos;re navigating a career inflection point, building a business, or leading an organisation through change, this is the stream that will speak most directly to where you are.
          </p>
        </div>
      </section>

      <section className="bg-bg s-pad">
        <div className="container">
          <span className="eyebrow block mb-8">Themes you&apos;ll find here</span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none max-w-[760px]">
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
