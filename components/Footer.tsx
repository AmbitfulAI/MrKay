"use client";

import Link from "next/link";

const services = [
  { label: "Executive Strategy",     href: "/executive-strategy" },
  { label: "Leadership Development", href: "/leadership-development" },
  { label: "Board Advisory",         href: "/board-advisory" },
  { label: "Media & Speaking",       href: "/media-speaking" },
];
const company = [
  { label: "My Story",     href: "/my-story" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" style={{ paddingTop: "72px", paddingBottom: "40px" }}>
      <div className="container">
        {/* Top grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-16 border-b border-surface-2" style={{ paddingBottom: "64px" }}>
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-5">
              <span className="display text-text" style={{ fontSize: "2rem" }}>
                Mr<span style={{ color: "var(--gold)" }}>Kay</span>
              </span>
            </Link>
            <p className="text-dim font-light leading-[1.8] max-w-[260px]" style={{ fontSize: "0.8rem" }}>
              Strategic counsel for executives who lead at the highest level.
              Confidential. Considered. Consequential.
            </p>
            <div className="flex gap-5 mt-8">
              {[
                {
                  label: "LinkedIn", href: "https://linkedin.com",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
                },
                {
                  label: "Instagram", href: "https://instagram.com",
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
            <p className="eyebrow mb-6">Services</p>
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
            <p className="eyebrow mb-6">Contact</p>
            <div className="flex flex-col gap-3 font-light leading-[1.7] text-muted" style={{ fontSize: "0.78rem" }}>
              <a href="mailto:hello@mrkay.com" className="hover-gold">hello@mrkay.com</a>
              <span>All enquiries are treated with the utmost discretion.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-dim font-light"
          style={{ fontSize: "0.62rem", letterSpacing: "0.12em", paddingTop: "32px" }}>
          <span>© {new Date().getFullYear()} MrKay. All rights reserved.</span>
          <span>Executive Consulting</span>
        </div>
      </div>
    </footer>
  );
}
