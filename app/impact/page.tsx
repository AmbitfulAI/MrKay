import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

export const revalidate = 60;

export const metadata = {
  title: "Impact — TheKayodeKolade",
  description: "Mining the Genius. Beyond the Invoice. The commercial practice is one expression of a deeper conviction. This is where the others live.",
};

export default async function Impact() {

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-6">Impact</span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            Mining the Genius. Beyond the Invoice.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[560px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            The commercial practice is one expression of a deeper conviction. This page is where the others live — the work that has nothing to do with what someone can pay, and everything to do with what they carry.
          </p>
        </div>
      </section>

      {/* ── Section 1: The Conviction ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">The Why</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--gold)" }}>
            GeniusMined.
          </h2>
          <div className="max-w-[680px] flex flex-col gap-5">
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              I believe genius is not rare. It is resident — in every individual, every team, every organisation. Most of it simply goes unmined: unseen, unnamed, unstructured, never reaching the form it was capable of. My essence — the thing I cannot not do — is to mine it. To make sure that an encounter with me leaves the genius in a person, a team, or an organisation closer to its full potential than it was before.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              That conviction doesn&apos;t switch off when someone can&apos;t pay for it. So a portion of how I work is — and will always be — given. This is where that lives.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mining the Genius ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">How It Works</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            One Pays. One Receives. Both Move.
          </h2>
          <div className="max-w-[680px] flex flex-col gap-5 mb-12">
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              Talent is not the problem in this world. Access is. There are gifted people whose next chapter is being held back not by capability, but by the absence of someone to help them name it — and the cost of that help is out of reach.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              So the practice operates on a simple model: every paid coaching engagement funds a Mining the Genius Session — a free 30-minute clarity coaching session for someone on the waitlist who otherwise couldn&apos;t access this kind of work. Typically a student, an early-career professional from an under-resourced background, or someone navigating a critical transition without the means to pay for guidance.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              The paying client can either nominate someone they know to receive the session, or simply know that their engagement has funded one for the next person on the waitlist. Either way, the principle holds: the work compounds. One conversation funds another. Genius gets mined on both sides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-surface-2">
            {/* Waitlist CTA */}
            <div className="bg-bg" style={{ padding: "40px 44px" }}>
              <span className="eyebrow block mb-5">If you&apos;d like to be considered for a session</span>
              <p className="text-muted font-light mb-8" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                The waitlist is open to anyone genuinely unable to access this kind of coaching commercially — students, early-career professionals from under-resourced backgrounds, or people navigating real transitions without the means to pay. Sessions are 30 minutes, focused on clarity rather than long-term coaching, and released as paid engagements fund them.
              </p>
              <Link href="/contact?lane=mining-waitlist#form" className="btn-outline">
                Join the Mining the Genius Waitlist
              </Link>
            </div>

            {/* Nominate CTA */}
            <div className="bg-bg" style={{ padding: "40px 44px" }}>
              <span className="eyebrow block mb-5">If you&apos;d like to nominate someone</span>
              <p className="text-muted font-light mb-8" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                Existing or future clients can nominate a recipient when they begin an engagement. Just mention their name when we start our work together — or write to me directly if you&apos;d like to nominate someone outside of an active engagement. They get the same care, the same rigour, the same outcome focus — at no cost to them.
              </p>
              <Link href="/contact?lane=mining-nominate#form" className="btn-outline">
                Nominate Someone for a Session
              </Link>
            </div>
          </div>

          {/* Honest note on timing */}
          <p className="text-dim font-light mt-8 max-w-[600px]" style={{ fontSize: "0.82rem", lineHeight: 1.85, fontStyle: "italic" }}>
            One honest note about timing. Sessions are released at the rate paid engagements fund them. If many people join the waitlist at once, or if a season passes with fewer new engagements, the wait may run longer than expected. You&apos;re held in the queue regardless. You&apos;ll be reached in turn. There is no expiry — only honest pace.
          </p>
        </div>
      </section>

      {/* ── Section 3: The Lighthouse ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">A Longer Walk · Mentorship</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The Lighthouse: A Smaller Door. A Longer Arc.
          </h2>
          <div className="max-w-[680px] flex flex-col gap-5 mb-10">
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              Some conversations are not about a single Mining the Genius session — they are about being walked with over a longer arc.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              For a small number of people each year, I take on mentorship: structured, ongoing, off-the-meter engagement with someone whose trajectory I believe in. I call it The Lighthouse — a name I&apos;ve used before, for a mentorship circle I ran years ago, because that is what real mentorship is. A lighthouse doesn&apos;t chase ships. It doesn&apos;t drive the boat. It stands, illuminates, and lets those who need it find their way. The mentor&apos;s job is to be present and steady; the mentee&apos;s work is their own.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              The Lighthouse is not open enrolment. It is selective by design — both because real mentorship requires real attention, and because the integrity of the relationship depends on careful match. If you think you might be a fit, the door is a written note: tell me where you are, what you&apos;re trying to build, and why you think this kind of relationship would change something for you. I read every one.
            </p>
          </div>
          <Link href="/contact?lane=lighthouse#form" className="btn-outline">
            Write to Me About The Lighthouse
          </Link>
        </div>
      </section>

      {/* ── Section 4: Prior Pro Bono ── */}
      <section className="bg-bg border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">What&apos;s Already Been Given</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            This Isn&apos;t a New Idea. It&apos;s a Continued One.
          </h2>
          <div className="max-w-[680px] flex flex-col gap-5">
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              Long before TKKC existed as a formal practice, I was already doing this work — privately, quietly, and continuously. Free coaching for friends, colleagues, and strangers navigating career and life decisions. Pro bono advisory for non-profits and early-stage organisations — supporting founders and teams across Uganda, Tanzania, Rwanda, Ghana, and beyond — and unpaid mentoring of professionals across multiple sectors and several countries.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              I mention this not as a credential, but as a clarification: Mining the Genius isn&apos;t a new initiative dressed up for the website. It&apos;s the systemisation of something that&apos;s been part of how I work for years — now structured so it can scale beyond what one person can hold informally.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: The Foundation ── */}
      <section className="bg-surface border-b border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-6">What&apos;s Coming</span>
          <h2 className="display text-text mb-8" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            The GeniusMined Foundation: A Longer Build.
          </h2>
          <div className="max-w-[680px] flex flex-col gap-5">
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              GeniusMined as a conviction has always pointed beyond what one practice can do. There is a transition gap — between school and meaningful work, between potential and opportunity, between what young people across Africa carry and what they&apos;re able to convert it into — that no single advisor, however generous, can close.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              So the longer-arc work is becoming a Foundation. The GeniusMined Foundation will focus on bridging that transition gap for high-potential but under-resourced young people, beginning in Africa — helping them turn raw capability into named direction, structured opportunity, and economic outcomes that can carry a family and shape a generation.
            </p>
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              The Foundation is in build. There is nothing to sign up for yet, and no story to tell that isn&apos;t still being shaped. When it is ready to receive attention, this page will say so. Until then, the conviction is named here so that anyone walking with this work knows where it&apos;s heading.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6: Closing ── */}
      <section className="bg-bg s-pad-sm">
        <div className="container max-w-[680px]">
          <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Genius Mined Is Genius Released.
          </h2>
          <p className="text-muted font-light mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            Every person who walks away from a conversation, an engagement, a Mining the Genius session, or a mentorship arc with their genius more clearly named — that&apos;s the work. Whether they paid for it or not is, in the end, a smaller question than whether something true got mined.
          </p>
          <p className="text-muted font-light mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
            If something here speaks to where you are — as a giver, a receiver, or someone who simply wants to walk this path alongside — write to me.
          </p>
          <CalendlyButton className="btn-solid">Let&apos;s Talk</CalendlyButton>
        </div>
      </section>
    </>
  );
}
