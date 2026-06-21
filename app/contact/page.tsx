import ContactSection from "@/components/ContactSection";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";

export const revalidate = 60;

const FALLBACK_FAQS = [
  { question: "Am I the kind of person you work with?", answer: "If you're a professional or executive navigating a career inflection point, a founder building or restructuring a business, or a leader of a scaling organisation that needs operating systems, governance rhythms, manager development, or Fractional COO support — yes, very likely. Not every enquiry becomes an engagement; the first conversation is how we both find out whether there's a meaningful fit." },
  { question: "What happens after I reach out?", answer: "We have a direct, complimentary conversation. From there, the engagement is designed around your specific need — a structured programme, an advisory arrangement, a workshop, or a longer operating partnership." },
  { question: "Will this stay confidential?", answer: "Completely. Client relationships are never disclosed, and nothing you share is used in marketing or content without your explicit permission. Discretion is a founding principle of this practice." },
  { question: "Does location matter?", answer: "No. I'm based in the Netherlands and work with clients across Africa, Europe, and North America — engagements have spanned Nigeria, Kenya, the US, the UK, and beyond. Work runs remotely by default, and in person where proximity adds genuine value." },
  { question: "What if I'm not sure which path fits me?", answer: "That's normal — and it's literally the work. Reach out anyway and describe where you are. Helping you name the real problem is how every good engagement begins." },
];

export default async function Contact() {
  await connectDB();
  const rawFaqs = await Faq.find().sort({ order: 1 }).lean<Array<{ question: string; answer: string }>>().catch(() => []);
  const faqs: Array<{ question: string; answer: string }> = rawFaqs.length ? rawFaqs : FALLBACK_FAQS;
  return (
    <>
      <section className="bg-bg border-b border-border relative overflow-hidden s-pad-hero">
        <div aria-hidden className="absolute pointer-events-none hidden md:block" style={{ top: "30%", right: "8%", width: "400px", height: "400px", background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 6%, transparent) 0%, transparent 70%)" }} />
        <div className="container">
          <span className="eyebrow anim-fade-up block mb-6 md:mb-7">Contact · Let's Talk</span>
          <h1 className="display text-text anim-fade-up anim-delay-1 max-w-[700px] mb-6 md:mb-7" style={{ fontSize: "clamp(1.8rem,3.5vw,3.6rem)" }}>Begin the Conversation. Tell Me What You&apos;re Navigating.</h1>
          <span className="gold-rule anim-fade-up anim-delay-2 mb-6 md:mb-7" />
          <p className="text-muted font-light anim-fade-up anim-delay-3 max-w-[500px]" style={{ fontSize: "0.95rem", lineHeight: 1.85 }}>Every enquiry is handled with discretion. Initial conversations are complimentary and carry no obligation. Whatever you share here stays between us — and you'll be talking to me, not a process.</p>
        </div>
      </section>

      <ContactSection
        heading="Send a message. Start here."
        subheading="I respond within two business days. For anything urgent, write directly to hello@thekayodekolade.com."
        dark
      />

      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Common Questions</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)" }}>What to Expect</h2>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-start py-10 md:py-[52px]" style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--surface-2)" : "none" }}>
                <h3 className="display text-text" style={{ fontSize: "clamp(1.1rem,1.8vw,1.6rem)", lineHeight: 1.3 }}>{faq.question}</h3>
                <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diagnostic Placeholder ── TODO: self-assessment quiz "Where are you stuck — clarity, architecture, or momentum?" */}
      {/* <DiagnosticQuiz /> */}

      <section className="bg-surface border-t border-surface-2 text-center s-pad-sm">
        <div className="container max-w-[560px] mx-auto">
          <span className="eyebrow block mb-5">Direct Contact</span>
          <p className="display text-text mb-6" style={{ fontSize: "clamp(1.3rem,2.5vw,2rem)" }}>Prefer email?</p>
          <a href="mailto:hello@thekayodekolade.com" className="gold-link font-light" style={{ fontSize: "1rem" }}>hello@thekayodekolade.com</a>
        </div>
      </section>
    </>
  );
}
