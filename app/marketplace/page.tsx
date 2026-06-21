import PageHero from "@/components/PageHero";
import MarketplaceGrid from "@/components/MarketplaceGrid";
import CalendlyButton from "@/components/CalendlyButton";
import type { Product } from "@/components/MarketplaceGrid";
import { connectDB } from "@/lib/db";
import { Product as ProductModel } from "@/lib/models/Product";

export const revalidate = 60;

const products: Product[] = [
  {
    id: "boardroom-code",
    type: "Book",
    title: "The Boardroom Code",
    subtitle: "What nobody tells you about executive authority",
    description:
      "A direct, practical guide to building the kind of authority that outlasts any title. Drawn from three decades of boardroom experience — the things I've told clients in private, now written down.",
    price: "$24.99",
    priceNote: "Digital + Print available",
    tag: "Bestseller",
    href: "#",
    available: true,
    coverAccent: "linear-gradient(135deg, #1a1208 0%, #2d1f0a 60%, #1c1510 100%)",
  },
  {
    id: "lead-before-ready",
    type: "Book",
    title: "Lead Before You're Ready",
    subtitle: "On stepping into authority before you feel you deserve it",
    description:
      "The book I wish someone had handed me at the beginning of my career. A candid account of the gap between being appointed and being trusted — and how to close it faster.",
    price: "$19.99",
    priceNote: "Digital edition",
    href: "#",
    available: true,
    coverAccent: "linear-gradient(135deg, #0f1a0f 0%, #162010 60%, #0d140d 100%)",
  },
  {
    id: "stillness-and-strategy",
    type: "Book",
    title: "Stillness & Strategy",
    subtitle: "A leader's guide to deciding well",
    description:
      "On the discipline of slowing down before the most consequential decisions — how stillness, reflection, and a settled inner life produce better outcomes than urgency and motion.",
    price: "$21.99",
    priceNote: "Digital + Print available",
    tag: "New",
    href: "#",
    available: true,
    coverAccent: "linear-gradient(135deg, #0a0f1a 0%, #101828 60%, #0c1220 100%)",
  },
  {
    id: "executive-presence-masterclass",
    type: "Course",
    title: "Executive Presence Masterclass",
    subtitle: "6-week live cohort programme",
    description:
      "A structured six-week programme for senior leaders who want to develop the authority, composure, and communication clarity that define the most effective executives. Small cohort. Direct access.",
    price: "$499",
    priceNote: "Per participant · Next cohort: Sept 2026",
    tag: "Most Popular",
    href: "#",
    available: true,
    coverAccent: "linear-gradient(135deg, #1a0f08 0%, #261508 60%, #1a1008 100%)",
  },
  {
    id: "board-governance-fundamentals",
    type: "Course",
    title: "Board Governance Fundamentals",
    subtitle: "Self-paced · 8 modules",
    description:
      "Everything a new or aspiring board director needs to understand about governance in practice — beyond the compliance frameworks and into what actually makes boards effective.",
    price: "$299",
    priceNote: "Lifetime access · Self-paced",
    href: "#",
    available: true,
    coverAccent: "linear-gradient(135deg, #110d1a 0%, #1a1226 60%, #110d1a 100%)",
  },
  {
    id: "succession-advisory-workshop",
    type: "Course",
    title: "Succession Advisory Workshop",
    subtitle: "Intensive half-day · Virtual",
    description:
      "A focused half-day session on succession planning — for chairs, HR leaders, and boards who want to approach the process with more rigour than most organisations currently apply.",
    price: "From $199",
    priceNote: "Group pricing available",
    tag: "Coming Soon",
    href: "#",
    available: false,
    coverAccent: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 60%, #111111 100%)",
  },
];

interface SanityProduct {
  _id: string;
  title: string;
  subtitle?: string;
  type: "Book" | "Course";
  description?: string;
  price?: string;
  priceNote?: string;
  tag?: string;
  selarUrl?: string;
  available?: boolean;
  coverAccent?: string;
}

export default async function Marketplace() {
  await connectDB();
  const sanityProducts = await ProductModel.find().sort({ order: 1 }).lean<SanityProduct[]>();

  const activeProducts: Product[] = sanityProducts.length > 0
    ? sanityProducts.map((p) => ({
        id: p._id,
        type: p.type,
        title: p.title,
        subtitle: p.subtitle ?? "",
        description: p.description ?? "",
        price: p.price ?? "",
        priceNote: p.priceNote,
        tag: p.tag,
        href: p.selarUrl ?? "#",
        available: p.available ?? true,
        coverAccent: p.coverAccent ?? "linear-gradient(135deg, #1a1208 0%, #2d1f0a 60%, #1c1510 100%)",
      }))
    : products;

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="Books & Courses."
        subtitle="Practical knowledge from three decades of boardroom experience — available as books to read at your own pace, and courses to work through with others."
      />

      <MarketplaceGrid products={activeProducts} />

      {/* ── Custom work CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <span className="eyebrow block mb-4">Need Something More Tailored?</span>
              <h3 className="display text-text mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}>
                The books and courses are a starting point.
              </h3>
              <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                If your situation calls for direct, one-to-one engagement — a sustained advisory relationship, a board effectiveness review, or executive coaching — that work is available too. It just begins with a conversation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
              <a href="/my-story" className="btn-outline">About TheKayodeKolade</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
