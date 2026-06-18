import Link from "next/link";

export const revalidate = 60;

export default function ThePerson() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-border relative overflow-hidden s-pad-hero">
        <div
          aria-hidden
          className="absolute pointer-events-none hidden md:block"
          style={{
            top: "20%",
            right: "6%",
            width: "360px",
            height: "360px",
            background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 5%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="container">
          <span className="eyebrow anim-fade-up block mb-6 md:mb-7">The Person Behind the Work</span>
          <h1
            className="display text-text anim-fade-up anim-delay-1 max-w-[760px] mb-6 md:mb-7"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.6rem)" }}
          >
            GeniusMined: The Idea Behind Everything.
          </h1>
          <span className="gold-rule anim-fade-up anim-delay-2 mb-6 md:mb-7" />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <div className="max-w-[760px]">
            <p className="text-muted font-light mb-7" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
              Over the years I've been called many things — leader, mentor, coach, strategist, creative. Some of those names you'll find across this site. But the one that explains all the others starts with the first name I was ever given.
            </p>
            <p className="text-muted font-light mb-7" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
              Kayode — fully, Oluwakayode. It means <em style={{ color: "var(--gold)", fontStyle: "italic" }}>God has brought joy home</em>. I read it less as a statement about my arrival and more as a calling about my work: to be part of how joy is fulfilled — the deep, durable kind that outlasts circumstance, not the thin kind tied to a good day. I believe in God. I've had a lifetime of reasons to choose otherwise, and I've chosen, repeatedly, to live.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
              Out of that grew the conviction that names everything I do. I call it GeniusMined.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Conviction ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">The Conviction</span>
              <span className="gold-rule" />
            </div>
            <div className="max-w-[640px]">
              <h2
                className="display text-text mb-7"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.2 }}
              >
                I believe genius is not rare. It is resident.
              </h2>
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                In every individual, every situation, every organisation, every idea. Most of it simply goes unmined: unseen, unnamed, unstructured, never reaching the form it was capable of. My essence — the thing I cannot not do — is to mine it. To make sure that an encounter with me leaves the genius in a person, a team, or an organisation closer to its full potential than it was before.
              </p>
              <p
                className="display text-text"
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                  fontStyle: "italic",
                  lineHeight: 1.45,
                  color: "var(--gold)",
                }}
              >
                That's it. That's the whole thing. Everything else is an expression of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── One Idea, Many Expressions ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">One Idea, Many Expressions</span>
              <span className="gold-rule" />
            </div>
            <div className="max-w-[640px]">
              <p className="text-muted font-light mb-7" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                Once you see GeniusMined, you see it everywhere in my work.
              </p>
              <div className="flex flex-col" style={{ gap: "28px" }}>
                {[
                  {
                    lead: "UTM™ — Uncover → Transform → Multiply",
                    body: "My founder framework isn't a clever acronym I reverse-engineered. Mining genius in a business is exactly that: uncover what's truly there, transform it into a model and a structure that fits, and multiply it into the world. UTM™ is GeniusMined applied to a company.",
                  },
                  {
                    lead: "Clarity → Architecture → Momentum",
                    body: "My operating philosophy. Mining genius in an organisation means turning buried potential into decisions, decisions into systems, and systems into sustained movement.",
                  },
                  {
                    lead: "Beyond the invoices",
                    body: "The same conviction extends to impact, to creative expression, and to the people I'm simply privileged to walk alongside — because genius doesn't stop at the edge of a professional engagement.",
                  },
                ].map((item) => (
                  <div
                    key={item.lead}
                    className="flex gap-5 items-start"
                    style={{ borderLeft: "1px solid var(--gold)", paddingLeft: "20px" }}
                  >
                    <div>
                      <span
                        className="display text-text block mb-2"
                        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", fontStyle: "italic" }}
                      >
                        {item.lead}
                      </span>
                      <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Winding Road ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">The Winding Road</span>
              <span className="gold-rule" />
            </div>
            <div className="max-w-[640px]">
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                My career has been anything but linear, and I wouldn't trade that. Cost consultant. Project manager. E-commerce pioneer. Founding operator of a multinational outsourcing business. Country Manager. Director of Enterprise Transformation &amp; Strategic Operations. Deputy COO across four countries.
              </p>
              <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                Every turn looked, at the time, like a detour. In hindsight they were one continuous education in the same subject: how genius becomes reality, and why it so often doesn't. I didn't start at the top, and I didn't leap there — I climbed, tier by tier, which is why when I finally led at the executive level, I understood it from the inside out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Roots It ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">What Roots It</span>
              <span className="gold-rule" />
            </div>
            <div className="max-w-[640px]">
              <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                Most importantly, I'm a product of grace. Whatever I've built or become rests far more on what I've been given than on what I've earned — and I try to hold it that way. It keeps me honest about my own limits, generous with other people's potential, and far more interested in whether the work lasts than in whether it impresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Other Flavours ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">The Other Flavours</span>
              <span className="gold-rule" />
            </div>
            <div className="max-w-[640px]">
              <p className="text-muted font-light mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                This is also where the parts of me that don't fit on a services page get to breathe — the writing, the reflections, the things I'm still learning, and a few expressions of GeniusMined still taking shape.
              </p>
              <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.95 }}>
                Consider this the room where all the parts of me sit in one place.
              </p>
              <p className="text-dim font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9, marginTop: "32px" }}>
                Thank you for stopping by.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Now You Know Me</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Tell me about you.
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-solid">Let's Talk</Link>
            <Link href="/my-story" className="btn-outline">Back to Meet Kayode</Link>
          </div>
        </div>
      </section>
    </>
  );
}
