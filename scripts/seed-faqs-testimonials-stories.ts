/**
 * Seeds the static FAQ, testimonial, and success-story fallback data into MongoDB.
 * Clears each collection first.
 *
 * Usage:
 *   npx tsx scripts/seed-faqs-testimonials-stories.ts
 */

import * as fs from "fs";
import * as path from "path";
import mongoose from "mongoose";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set in .env.local");

const FaqSchema = new mongoose.Schema(
  { question: String, answer: String, order: Number },
  { timestamps: true },
);
const Faq = mongoose.models.Faq ?? mongoose.model("Faq", FaqSchema);

const TestimonialSchema = new mongoose.Schema(
  { quote: String, clientName: String, clientContext: String, order: Number, pages: [String] },
  { timestamps: true },
);
const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial", TestimonialSchema);

const SuccessStorySchema = new mongoose.Schema(
  { code: String, title: String, sector: String, client: String, result: String, story: String, order: Number },
  { timestamps: true },
);
const SuccessStory = mongoose.models.SuccessStory ?? mongoose.model("SuccessStory", SuccessStorySchema);

const FAQS = [
  { question: "Who does this work apply to?", answer: "Professionals at career inflection points, founders building or restructuring, leaders of scaling organisations, and those seeking facilitation, retreats, or speaking. If you're navigating something consequential and need a thinking partner who operates at the level the situation demands — this is for you.", order: 1 },
  { question: "How does an engagement begin?", answer: "With a complimentary initial conversation — no agenda, no obligation. The purpose is mutual: to understand whether the situation is one I can add real value to, and whether the working relationship makes sense. From there, we design the engagement around the specific need.", order: 2 },
  { question: "Is everything confidential?", answer: "Completely. Client relationships are never disclosed. Nothing that passes between us reaches anyone else — not in marketing materials, not in case studies, not in references — without your explicit permission. Confidentiality is a first principle, not a policy.", order: 3 },
  { question: "What if I'm not sure which path fits me?", answer: "That's normal — and it's literally the work. You don't need to arrive with a perfectly framed question. A few lines about your situation is enough. We'll figure out the shape of it together in the first conversation.", order: 4 },
  { question: "Do you work internationally?", answer: "Yes. The practice is based in the Netherlands and serves clients across Africa, Europe, and beyond. Engagements are conducted in person where proximity adds value, and remotely where it doesn't.", order: 5 },
  { question: "How much does this cost?", answer: "Engagement scope and cost vary by the work. Initial conversations are complimentary, and I'm direct about whether the fit is right before we shape something further. Pricing isn't a barrier to the first conversation.", order: 6 },
  { question: "Do you work with teams, or only one-to-one?", answer: "Both. Career and executive work is one-to-one. Organisational and execution work happens at the team level. Workshops and retreats are designed around the room they're built for.", order: 7 },
];

const TESTIMONIALS = [
  { quote: "Kayode is a true and impactful leader. You'd not have an encounter with him and remain the same.", clientName: "Senior Professional, Technology Sector", clientContext: "", order: 1, pages: ["home"] },
  { quote: "Our interactions provided both the drive and direction I needed to take the next bold steps. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.", clientName: "Ayodeji Akinola", clientContext: "Career & Executive Clarity", order: 2, pages: ["home"] },

  { quote: "I was stuck on what to do next to make this transition. Kayode provided clarity on the steps I needed to take — finding out what my core skills and interests were, and leveraging this to decide on a career path. Our interactions provided both the drive and direction I needed. I transitioned into project management, moved abroad for my master's, and graduated with a distinction.", clientName: "Ayodeji Akinola", clientContext: "Career & Executive Clarity", order: 3, pages: ["career-clarity"] },
  { quote: "I got direction. I got practical, realistic scenarios that gave clarity. The interaction helped me make the right decision — one I am enjoying today.", clientName: "Adeniran Kayode", clientContext: "Career & Executive Clarity", order: 4, pages: ["career-clarity"] },
  { quote: "After a decade-long career, I needed guidance on how to validate my interests and shape what to pursue in the next decade. I got the clarity to invest in digital transformation rather than the default path — better positioned for the modern COO role if I get there.", clientName: "Temitope Awoyemi", clientContext: "Career & Executive Clarity", order: 5, pages: ["career-clarity"] },

  { quote: "We were trying to define what my organisation is aiming to achieve. I needed help understanding structure and how to build out ideas that are marketable. Together we created a revised vision, mission, goals, and business model for the organisation I am building.", clientName: "Founder, early-stage organisation", clientContext: "Founder & Business Architecture", order: 6, pages: ["founder-architecture"] },

  { quote: "He guided us on improving our Social Enterprise and Innovation Program — the cost of delivering quality training versus quantity trained, curriculum engagement, and how to assess the success of funded enterprises. The encounter was very valuable: we made concrete adjustments to our 2024 strategic plan, including making community trainers full-time staff.", clientName: "James Otai", clientContext: "Imagine Her (Uganda)", order: 7, pages: ["organisational-systems"] },
  { quote: "You are an original thinker. Your guidance was never based on fluff — very practical insights. You changed how managers and specialists think about OKRs in general.", clientName: "Programme Specialist", clientContext: "International Education Organisation", order: 8, pages: ["organisational-systems"] },

  { quote: "You showed me how to reflect growth and career progression in spite of having the same job title. Within about four months of applying what you shared, I got two job offers — and finally left after several years of applying here and there. Recruiters still reach out to me.", clientName: "Victoria Ikuemonisan", clientContext: "Career & Executive Clarity", order: 9, pages: ["my-story"] },
  { quote: "You helped me contextualise situations, develop a comprehensive pros and cons — and even did it with me. These interactions gave me better perspective and helped me make the best decisions.", clientName: "Samson Richard", clientContext: "Career & Executive Clarity", order: 10, pages: ["my-story"] },
];

const SUCCESS_STORIES = [
  {
    code: "01",
    title: "The System",
    sector: "Workforce & Talent Platforms",
    client: "Global talent platform · Assessment delivery transformation",
    result: "Fragmented assessment process turned into a governed, decision-grade operating system.",
    story: "A rapidly growing global workforce platform serving major technology companies had built its talent decisions on an assessment system that was straining under its own growth. The platform's leadership thought they had a tooling problem. A deeper diagnostic revealed something different: the assessment delivery system surrounding the tool had matured organically — undocumented governance, audit practices that depended on individual judgement, integrity controls that varied by reviewer, candidate experience designed around the platform rather than around the person being assessed. The work wasn't an assessment problem. It was a system maturity problem in assessment's clothing. Over the engagement, I led the diagnosis, designed the assessment delivery operating model, and built the governance, integrity, audit, and candidate experience architecture that turned a tool-dependent process into a defensible, decision-grade system. The deeper outcome was a shift in how leadership thought about the function — from assessment as an isolated activity to assessment as workforce intelligence built on an operating system.",
    order: 1,
  },
  {
    code: "02",
    title: "The Positioning",
    sector: "Media & Impact",
    client: "Senior media executive · Foundational brand and strategy architecture",
    result: "Personal positioning and initiative strategy established as the foundation for everything downstream.",
    story: "A senior media executive with decades of newsroom leadership is transitioning into a major continental impact initiative — one that will draw on her authority but ask different things of how she shows up publicly. The work, currently underway, is the foundational architecture beneath the visible work: a positioning structure for her as a senior figure, a strategic frame for how the broader initiative sits relative to the platforms she's already built, and the decisions that determine how everything downstream — partnerships, funders, audiences, and the next generation of work — holds together. The conviction beneath the engagement is the same one underneath most of my senior client work: when the principal isn't positioned with clarity, every initiative they touch carries an unresolved version of that ambiguity into the world. The work continues.",
    order: 2,
  },
  {
    code: "03",
    title: "The Build",
    sector: "Founder Advisory",
    client: "Talent Rendezvous · Lagos · Founder strategy and ongoing advisory",
    result: "Founder strategy sharpened. Brand identity introduced. The work continues.",
    story: "Talent Rendezvous is a founder-led HR and talent services firm based in Lagos. When the founder approached me, the work spanned three business streams under one identity — recruitment and HR support, an events and rentals operation, and a furniture and business management arm — without a clear strategic spine or brand to hold them together. Over an extended period, I worked with the founder on the foundational architecture: pressure-testing the business model and target market, sharpening the SWOT analysis into actionable strategic priorities, surfacing the gaps between what the business claimed and what its operating reality could defend, and introducing the brand identity partner who designed the current Talent Rendezvous mark. The work continues today as founder positioning advisory — clarifying where Talent Rendezvous sits in the market, how the founder shows up as a leader, and how the offering needs to evolve as the practice matures. Founders don't only need a strategy. They need someone willing to ask the questions no one else will. The relationship has lasted because the work has kept earning its place.",
    order: 3,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  for (const faq of FAQS) {
    await Faq.findOneAndUpdate({ question: faq.question }, { $set: faq }, { upsert: true });
  }
  console.log(`Upserted ${FAQS.length} FAQs`);

  for (const t of TESTIMONIALS) {
    await Testimonial.findOneAndUpdate(
      { quote: t.quote, clientName: t.clientName },
      { $set: t },
      { upsert: true },
    );
  }
  console.log(`Upserted ${TESTIMONIALS.length} testimonials`);

  for (const s of SUCCESS_STORIES) {
    await SuccessStory.findOneAndUpdate({ code: s.code }, { $set: s }, { upsert: true });
  }
  console.log(`Upserted ${SUCCESS_STORIES.length} success stories`);

  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
