import Link from "next/link";
import TwoTierCTA from "@/components/TwoTierCTA";

export const metadata = {
  title: "Beyond the Work — TheKayodeKolade",
  description: "Photography, books, reflections, and the creative side of GeniusMinedWorks. The expressions of the conviction — the room for everything that doesn't fit on a services page.",
};

const readingList = [
  { title: "The Advice Trap", author: "Michael Bungay Stanier", note: "On staying curious longer and rushing to advice less." },
  { title: "An Everyone Culture", author: "Robert Kegan & Lisa Lahey", note: "Deliberately developmental organisations and what they require." },
  { title: "Reboot", author: "Jerry Colonna", note: "On the inner work of leadership." },
  { title: "Multipliers", author: "Liz Wiseman", note: "On how the best leaders make everyone around them smarter." },
  { title: "Leadership and Self-Deception", author: "Arbinger Institute", note: "On the postures we carry into our work and relationships." },
  { title: "The Coaching Habit", author: "Michael Bungay Stanier", note: "Seven questions that change how managers manage." },
  { title: "Atomic Habits", author: "James Clear", note: "On systems over goals, and small architecture over willpower." },
  { title: "Mere Christianity", author: "C.S. Lewis", note: "A book I keep returning to." },
];

export default function BeyondTheWork() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-6">Beyond the Work</span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            The Room for Everything Else.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            Photography from places I&apos;ve walked through. Books that have shaped how I think. The occasional short video. The creative side of GeniusMinedWorks. The things that don&apos;t fit on a services page but matter to who I am.
          </p>
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9, marginTop: "16px" }}>
            If you&apos;ve read{" "}
            <a href="/geniusmined" className="hover-gold">GeniusMined</a>
            , you already know the conviction. This is where the expressions of it live.
          </p>
        </div>
      </section>

      {/* ── Block 1: Visual Diary ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4" style={{ color: "var(--gold)" }}>#GeniusMinedWorks</span>
          <h2 className="display text-text mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Photography as Quiet Language
          </h2>
          <p className="text-muted font-light mb-10 max-w-[580px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            A growing archive of places I&apos;ve walked through — markets, corners, colours, textures. Moments that hold more meaning than words often can. This is the visual stream of GeniusMinedWorks, my creative output across mediums.
          </p>
          <Link href="/visual-diary" className="btn-outline">Explore the Visual Diary</Link>
        </div>
      </section>

      {/* ── Block 2: Reading List ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">What I&apos;m Reading</span>
          <h2 className="display text-text mb-10" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Books That Have Shaped How I Think
          </h2>
          <p className="text-muted font-light mb-10 max-w-[560px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            A short, evolving list — recent reads, perennial returns, recommendations from clients and friends. Not a comprehensive library. Just the ones I keep coming back to or have recently been changed by.
          </p>
          <div className="flex flex-col gap-[2px] bg-surface-2 max-w-[760px]">
            {readingList.map((book) => (
              <div key={book.title} className="bg-surface" style={{ padding: "24px 28px" }}>
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <span className="display text-text block mb-1" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}>{book.title}</span>
                    <span className="text-dim font-light" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>{book.author}</span>
                  </div>
                </div>
                <p className="text-muted font-light mt-3" style={{ fontSize: "0.82rem", lineHeight: 1.8, fontStyle: "italic" }}>{book.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Block 3: Reflections ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Reflections</span>
          <h2 className="display text-text mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Things I&apos;ve Been Thinking About
          </h2>
          <p className="text-muted font-light mb-8 max-w-[560px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            Short pieces that didn&apos;t fit neatly into the executive frame — reflections on grace, growth, faith, and the texture of daily life. These live more fully in the Writing hub, but a few of them belong here too.
          </p>
          <Link href="/writing" className="btn-outline">More in the Writing Hub</Link>
        </div>
      </section>

      {/* ── Block 4: Creative Works ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4" style={{ color: "var(--gold)" }}>GeniusMinedWorks</span>
          <h2 className="display text-text mb-5" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Other Creative Output
          </h2>
          <p className="text-muted font-light max-w-[560px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            Photography lives in the Visual Diary. The rest of the GeniusMinedWorks family — designs, art, songs, whatever comes next — will surface here over time. Building quietly.
          </p>
        </div>
      </section>

      {/* ── Soft handoff ── */}
      <section className="bg-bg s-pad-sm">
        <div className="container">
          <span className="eyebrow block mb-4">Return</span>
          <p className="text-muted font-light mb-8 max-w-[480px]" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
            If you came here from Meet Kayode and you&apos;re ready to talk about working together, the door is always open.
          </p>
          <TwoTierCTA />
        </div>
      </section>
    </>
  );
}
