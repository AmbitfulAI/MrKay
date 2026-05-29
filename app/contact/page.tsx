import ContactSection from "@/components/ContactSection";

const faqs = [
  { q:"Who does MrKay work with?", a:"Senior executives, board chairs, and leadership teams at genuine inflection points — typically CEOs, CFOs, MDs, and chairs of listed and private organisations. We do not work with every enquiry that arrives; a brief initial conversation determines whether there is a fit worth pursuing." },
  { q:"How does an engagement begin?", a:"With a complimentary initial conversation — no agenda, no obligation. The purpose is mutual: to understand whether the situation is one we can add value to, and whether the working relationship makes sense. From there, we design the engagement around the specific need." },
  { q:"Is everything confidential?", a:"Completely. Client relationships are never disclosed. We do not use client names in marketing materials, case studies, or references without explicit permission. Discretion is not an add-on — it is a founding principle of the practice." },
  { q:"Do you work internationally?", a:"Yes. Current and recent clients span Australia, the United Kingdom, Southeast Asia, and the Gulf. Engagements are conducted in person where proximity adds value, and remotely where it does not." },
];

export default function Contact() {
  return (
    <>
      <section className="bg-bg border-b border-border relative overflow-hidden s-pad-hero">
        <div aria-hidden className="absolute pointer-events-none hidden md:block" style={{top:"30%",right:"8%",width:"400px",height:"400px",background:"radial-gradient(circle, color-mix(in srgb, var(--gold) 6%, transparent) 0%, transparent 70%)"}} />
        <div className="container">
          <span className="eyebrow anim-fade-up block mb-6 md:mb-7">Contact</span>
          <h1 className="display text-text anim-fade-up anim-delay-1 max-w-[700px] mb-6 md:mb-7" style={{fontSize:"clamp(2.4rem,6vw,5.5rem)"}}>Begin the Conversation.</h1>
          <span className="gold-rule anim-fade-up anim-delay-2 mb-6 md:mb-7" />
          <p className="text-muted font-light anim-fade-up anim-delay-3 max-w-[500px]" style={{fontSize:"0.95rem",lineHeight:1.85}}>All enquiries are treated with the utmost discretion. Initial consultations are complimentary and without obligation.</p>
        </div>
      </section>

      <ContactSection heading="Send a message." subheading="We will respond within two business days. For urgent matters, please reach us directly at hello@mrkay.com." dark />

      <section className="bg-bg border-t border-surface-2 s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Common Questions</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{fontSize:"clamp(1.8rem,3vw,2.8rem)"}}>What to Expect</h2>
          <div className="flex flex-col">
            {faqs.map((faq,i) => (
              <div key={faq.q} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-start py-10 md:py-[52px]" style={{borderBottom:i<faqs.length-1?"1px solid var(--surface-2)":"none"}}>
                <h3 className="display text-text" style={{fontSize:"clamp(1.1rem,1.8vw,1.6rem)",lineHeight:1.3}}>{faq.q}</h3>
                <p className="text-muted font-light" style={{fontSize:"0.9rem",lineHeight:1.9}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-surface-2 text-center s-pad-sm">
        <div className="container max-w-[560px] mx-auto">
          <span className="eyebrow block mb-5">Direct Contact</span>
          <p className="display text-text mb-6" style={{fontSize:"clamp(1.3rem,2.5vw,2rem)"}}>Prefer to write directly?</p>
          <a href="mailto:hello@mrkay.com" className="gold-link font-light" style={{fontSize:"1rem"}}>hello@mrkay.com</a>
        </div>
      </section>
    </>
  );
}
