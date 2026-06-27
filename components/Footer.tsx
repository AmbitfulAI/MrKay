"use client";

import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { useSiteConfig } from "@/components/SiteConfigProvider";

const services = [
  { label: "Career & Executive Clarity",        href: "/career-executive-clarity" },
  { label: "Founder & Business Architecture",   href: "/founder-business-architecture" },
  { label: "Organisational Systems & Execution", href: "/organisational-systems-execution" },
  { label: "Retreats, Facilitation & Speaking", href: "/retreats-facilitation-speaking" },
];

const company = [
  { label: "Meet Kayode",    href: "/meet-kayode" },
  { label: "Beyond the Work", href: "/beyond-the-work" },
  { label: "Visual Diary",   href: "/visual-diary" },
  { label: "Testimonials",   href: "/testimonials" },
  { label: "Impact",         href: "/impact" },
  { label: "Writing",        href: "/writing" },
  { label: "Contact",        href: "/contact" },
];

export default function Footer() {
  const { contactEmail, footerTagline, footerBlurb, linkedInUrl, instagramUrl } = useSiteConfig();
  return (
    <footer className="bg-surface border-t border-border" style={{ paddingTop: "72px", paddingBottom: "40px" }}>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-16 border-b border-surface-2" style={{ paddingBottom: "64px" }}>
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-5">
              <span className="display text-text" style={{ fontSize: "2rem" }}>
                The<span style={{ color: "var(--gold)" }}>KayodeKolade</span>
              </span>
            </Link>
            <p className="text-dim font-light leading-[1.8] max-w-[260px]" style={{ fontSize: "0.8rem" }}>
              {footerBlurb}
            </p>
            <div className="flex gap-5 mt-8">
              {[
                {
                  label: "LinkedIn", href: linkedInUrl,
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
                },
                {
                  label: "Instagram", href: instagramUrl,
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
                },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow mb-6">My Work</p>
            <ul className="flex flex-col gap-[14px] list-none">
              {services.map((s) => <li key={s.href}><Link href={s.href} className="footer-link">{s.label}</Link></li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="eyebrow mb-6">Company</p>
            <ul className="flex flex-col gap-[14px] list-none">
              {company.map((s) => <li key={s.href}><Link href={s.href} className="footer-link">{s.label}</Link></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-6">Get in Touch</p>
            <div className="flex flex-col gap-3 font-light leading-[1.7] text-muted" style={{ fontSize: "0.78rem" }}>
              <a href={`mailto:${contactEmail}`} className="hover-gold">{contactEmail}</a>
              <span>All enquiries are treated with the utmost discretion.</span>
            </div>
            <p className="eyebrow" style={{ marginTop: "32px", marginBottom: "4px" }}>Newsletter</p>
            <p className="text-dim font-light" style={{ fontSize: "0.72rem", lineHeight: 1.7, marginBottom: "4px" }}>
              Notes on leadership, systems & conviction.
            </p>
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-dim font-light"
          style={{ fontSize: "0.62rem", letterSpacing: "0.12em", paddingTop: "32px" }}>
          <span>© {new Date().getFullYear()} TheKayodeKolade. All rights reserved.</span>
          <span>{footerTagline}</span>
        </div>
      </div>
    </footer>
  );
}
