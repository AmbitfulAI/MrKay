"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";

const myWork = [
  { label: "Career & Executive Clarity",       href: "/career-executive-clarity" },
  { label: "Founder & Business Architecture",  href: "/founder-business-architecture" },
  { label: "Organisational Systems & Execution", href: "/organisational-systems-execution" },
  { label: "Retreats, Facilitation & Speaking", href: "/retreats-facilitation-speaking" },
];

const FALLBACK_WRITING = [
  { label: "GeniusMined",     href: "/writing/geniusmined" },
  { label: "GraceJunkie",     href: "/writing/gracejunkie" },
  { label: "RareMusingWork",  href: "/writing/raremusingwork" },
];

const meetKayode = [
  { label: "Meet Kayode",      href: "/meet-kayode" },
  { label: "Beyond the Work",  href: "/beyond-the-work" },
  { label: "Visual Diary",     href: "/visual-diary" },
];

const primaryLinks = [
  { label: "Testimonials", href: "/testimonials" },
  { label: "Impact",       href: "/impact" },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ opacity: 0.6 }}>
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

interface DropdownItem { label: string; href: string; }

function DesktopDropdown({
  label,
  items,
  open,
  onEnter,
  onLeave,
  isActive,
  isItemActive,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isActive: boolean;
  isItemActive: (href: string) => boolean;
  onClose: () => void;
}) {
  return (
    <li style={{ position: "relative" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className={`nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {label}
        <span style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", display: "flex" }}>
          <ChevronDown />
        </span>
      </button>
      <div aria-hidden style={{ position: "absolute", top: "100%", left: "-20px", right: "-20px", height: "16px" }} />
      <div className="nav-dropdown" style={{
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        transition: "opacity 0.18s ease, visibility 0.18s ease",
      }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-dropdown-item"
            style={{ color: isItemActive(item.href) ? "var(--gold)" : undefined }}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

export default function Navigation({
  writingCategories,
}: {
  writingCategories?: { title: string; slug: string }[];
}) {
  const writing = writingCategories?.length
    ? writingCategories.map((c) => ({ label: c.title, href: `/writing/${c.slug}` }))
    : FALLBACK_WRITING;

  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [workOpen,       setWorkOpen]       = useState(false);
  const [writingOpen,    setWritingOpen]     = useState(false);
  const [meetOpen,       setMeetOpen]        = useState(false);
  const [mobileOpen,     setMobileOpen]      = useState(false);
  const [mobileWorkOpen,    setMobileWorkOpen]    = useState(false);
  const [mobileWritingOpen, setMobileWritingOpen] = useState(false);
  const [mobileMeetOpen,    setMobileMeetOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isActive       = (href: string) => pathname === href;
  const isWorkActive   = myWork.some((s) => pathname === s.href);
  const isWritingActive = writing.some((s) => pathname === s.href) || pathname === "/writing";
  const isMeetActive   = meetKayode.some((s) => pathname === s.href);
  const toggleTheme    = () => setTheme(theme === "dark" ? "light" : "dark");
  const ThemeIcon      = mounted && theme === "dark" ? SunIcon : MoonIcon;

  return (
    <nav className="nav-root">
      <div className="container nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <span>The<span style={{ color: "var(--gold)" }}>KayodeKolade</span></span>
          <span className="nav-logo-tag">Advisor · Architect · Coach</span>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links">
          <DesktopDropdown
            label="My Work"
            items={myWork}
            open={workOpen}
            onEnter={() => setWorkOpen(true)}
            onLeave={() => setWorkOpen(false)}
            isActive={isWorkActive}
            isItemActive={isActive}
            onClose={() => setWorkOpen(false)}
          />

          <DesktopDropdown
            label="Writing"
            items={writing}
            open={writingOpen}
            onEnter={() => setWritingOpen(true)}
            onLeave={() => setWritingOpen(false)}
            isActive={isWritingActive}
            isItemActive={isActive}
            onClose={() => setWritingOpen(false)}
          />

          <DesktopDropdown
            label="Meet Kayode"
            items={meetKayode}
            open={meetOpen}
            onEnter={() => setMeetOpen(true)}
            onLeave={() => setMeetOpen(false)}
            isActive={isMeetActive}
            isItemActive={isActive}
            onClose={() => setMeetOpen(false)}
          />

          {primaryLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.label}
              </Link>
            </li>
          ))}

          {/* LET'S TALK — routes to /contact */}
          <li>
            <Link href="/contact" className="btn-solid" style={{ fontSize: "0.6rem", padding: "10px 18px" }}>
              Let&apos;s Talk
            </Link>
          </li>

          {/* Theme toggle */}
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <ThemeIcon />
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--text)", transition: "transform 0.3s, opacity 0.3s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--text)", transition: "opacity 0.3s", opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--text)", transition: "transform 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {/* My Work accordion */}
          <button className="mobile-menu-item"
            onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isWorkActive ? "var(--gold)" : "var(--text)" }}>
            My Work
            <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>{mobileWorkOpen ? "▲" : "▼"}</span>
          </button>
          {mobileWorkOpen && myWork.map((s) => (
            <Link key={s.href} href={s.href} className="mobile-menu-item mobile-menu-sub"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(s.href) ? "var(--gold)" : undefined }}>
              {s.label}
            </Link>
          ))}

          {/* Writing accordion */}
          <button className="mobile-menu-item"
            onClick={() => setMobileWritingOpen(!mobileWritingOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isWritingActive ? "var(--gold)" : "var(--text)" }}>
            Writing
            <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>{mobileWritingOpen ? "▲" : "▼"}</span>
          </button>
          {mobileWritingOpen && writing.map((s) => (
            <Link key={s.href} href={s.href} className="mobile-menu-item mobile-menu-sub"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(s.href) ? "var(--gold)" : undefined }}>
              {s.label}
            </Link>
          ))}

          {/* Meet Kayode accordion */}
          <button className="mobile-menu-item"
            onClick={() => setMobileMeetOpen(!mobileMeetOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isMeetActive ? "var(--gold)" : "var(--text)" }}>
            Meet Kayode
            <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>{mobileMeetOpen ? "▲" : "▼"}</span>
          </button>
          {mobileMeetOpen && meetKayode.map((s) => (
            <Link key={s.href} href={s.href} className="mobile-menu-item mobile-menu-sub"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(s.href) ? "var(--gold)" : undefined }}>
              {s.label}
            </Link>
          ))}

          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="mobile-menu-item"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(link.href) ? "var(--gold)" : undefined }}>
              {link.label}
            </Link>
          ))}

          <Link href="/contact" className="mobile-menu-item"
            onClick={() => setMobileOpen(false)}
            style={{ color: isActive("/contact") ? "var(--gold)" : "var(--gold)", fontWeight: 500 }}>
            Let&apos;s Talk
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingTop: "16px",
              paddingBottom: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <ThemeIcon />
            {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
