import Link from "next/link";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";
import { Faq } from "@/lib/models/Faq";
import { Testimonial } from "@/lib/models/Testimonial";
import { SuccessStory } from "@/lib/models/SuccessStory";
import { Product } from "@/lib/models/Product";
import { GalleryImage } from "@/lib/models/GalleryImage";
import { ImpactOrg } from "@/lib/models/ImpactOrg";
import { Note } from "@/lib/models/Note";
import { Subscriber } from "@/lib/models/Subscriber";
import { ContactSubmission } from "@/lib/models/ContactSubmission";

export const revalidate = 0;

interface SectionSummary {
  label: string;
  href: string;
  description: string;
  count: number;
  updatedAt: Date | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function summarize(model: mongoose.Model<any>, label: string, href: string, description: string): Promise<SectionSummary> {
  const [count, latest] = await Promise.all([
    model.countDocuments(),
    model.findOne().sort({ updatedAt: -1 }).select("updatedAt").lean<{ updatedAt?: Date }>(),
  ]);
  return { label, href, description, count, updatedAt: latest?.updatedAt ?? null };
}

function timeAgo(date: Date | null): string {
  if (!date) return "No entries yet";
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "Updated just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Updated ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Updated ${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Updated ${months}mo ago`;
  return `Updated ${Math.floor(months / 12)}y ago`;
}

export default async function AdminDashboard() {
  await connectDB();

  const [heroSlides, faqs, testimonials, successStories, marketplace, gallery, impact, notes, subscribers, unreadMessages] =
    await Promise.all([
      summarize(HeroSlide, "Hero Slides", "/admin/hero-slides", "Rotating homepage banners"),
      summarize(Faq, "FAQs", "/admin/faqs", "Shown on the Contact page"),
      summarize(Testimonial, "Testimonials", "/admin/testimonials", "Client quotes across the site"),
      summarize(SuccessStory, "Success Stories", "/admin/success-stories", "Case studies on the Testimonials page"),
      summarize(Product, "Marketplace", "/admin/marketplace", "Products for sale"),
      summarize(GalleryImage, "Gallery", "/admin/gallery", "Visual diary images"),
      summarize(ImpactOrg, "Impact", "/admin/impact", "Boards & pro bono organisations"),
      summarize(Note, "Notes", "/admin/notes", "Writing / blog posts"),
      summarize(Subscriber, "Subscribers", "/admin/subscribers", "Newsletter sign-ups"),
      ContactSubmission.countDocuments({ read: false }),
    ]);

  const sections = [heroSlides, faqs, testimonials, successStories, marketplace, gallery, impact, notes, subscribers];

  return (
    <div style={{ padding: "40px 48px" }}>
      <div>
        <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Welcome back</h1>
        <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>
          Here&apos;s what&apos;s live on TheKayodeKolade.com.
        </p>
      </div>

      {unreadMessages > 0 && (
        <Link
          href="/admin/contact"
          style={{
            display: "block",
            marginTop: "28px",
            padding: "16px 20px",
            background: "var(--gold-glow)",
            border: "1px solid var(--gold)",
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "var(--gold)", fontFamily: "var(--font-body)" }}>
            {unreadMessages} unread {unreadMessages === 1 ? "message" : "messages"} in Contact →
          </span>
        </Link>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "1px",
          background: "var(--surface-2)",
          border: "1px solid var(--surface-2)",
          marginTop: "32px",
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{ display: "block", padding: "24px", background: "var(--surface)", textDecoration: "none" }}
          >
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "12px" }}>
              {s.label}
            </p>
            <p className="display text-text" style={{ fontSize: "2rem", marginBottom: "6px" }}>{s.count}</p>
            <p style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)", marginBottom: "10px" }}>
              {s.description}
            </p>
            <p style={{ fontSize: "0.66rem", color: "var(--dim)", fontFamily: "var(--font-body)" }}>
              {timeAgo(s.updatedAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
