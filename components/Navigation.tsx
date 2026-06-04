"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const services = [
  { label: "Strategy",         href: "/strategy" },
  { label: "Leadership",       href: "/leadership" },
  { label: "Board Work",       href: "/board-work" },
  { label: "Media & Speaking", href: "/media-speaking" },
];

const resources = [
  { label: "My Notes",    href: "/my-notes" },
  { label: "Gallery",     href: "/gallery" },
  { label: "Marketplace", href: "/marketplace" },
];

const primaryLinks = [
  { label: "My Story",     href: "/my-story" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact",      href: "/contact" },
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

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [servicesOpen,        setServicesOpen]        = useState(false);
  const [resourcesOpen,       setResourcesOpen]       = useState(false);
  const [mobileOpen,          setMobileOpen]          = useState(false);
  const [mobileServicesOpen,  setMobileServicesOpen]  = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isActive          = (href: string) => pathname === href;
  const isServicesActive  = services.some((s) => pathname === s.href);
  const isResourcesActive = resources.some((r) => pathname === r.href);
  const toggleTheme       = () => setTheme(theme === "dark" ? "light" : "dark");
  const ThemeIcon         = mounted && theme === "dark" ? SunIcon : MoonIcon;

  return (
    <nav className="nav-root">
      <div className="container nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          The<span style={{ color: "var(--gold)" }}>KayodeKolade</span>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links">
          {/* Services dropdown */}
          <li
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`nav-link ${isServicesActive ? "active" : ""}`}>
              My Work
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none"
                style={{ opacity: 0.6, transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Invisible bridge prevents gap-triggered close */}
            <div aria-hidden style={{ position: "absolute", top: "100%", left: "-20px", right: "-20px", height: "16px" }} />

            <div className="nav-dropdown" style={{
              visibility: servicesOpen ? "visible" : "hidden",
              opacity: servicesOpen ? 1 : 0,
              transition: "opacity 0.18s ease, visibility 0.18s ease",
            }}>
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="nav-dropdown-item"
                  style={{ color: isActive(s.href) ? "var(--gold)" : undefined }}
                  onClick={() => setServicesOpen(false)}>
                  {s.label}
                </Link>
              ))}
            </div>
          </li>

          {/* Resources dropdown */}
          <li
            style={{ position: "relative" }}
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className={`nav-link ${isResourcesActive ? "active" : ""}`}>
              Explore
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none"
                style={{ opacity: 0.6, transition: "transform 0.2s", transform: resourcesOpen ? "rotate(180deg)" : "none" }}>
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            <div aria-hidden style={{ position: "absolute", top: "100%", left: "-20px", right: "-20px", height: "16px" }} />

            <div className="nav-dropdown" style={{
              visibility: resourcesOpen ? "visible" : "hidden",
              opacity: resourcesOpen ? 1 : 0,
              transition: "opacity 0.18s ease, visibility 0.18s ease",
            }}>
              {resources.map((r) => (
                <Link key={r.href} href={r.href} className="nav-dropdown-item"
                  style={{ color: isActive(r.href) ? "var(--gold)" : undefined }}
                  onClick={() => setResourcesOpen(false)}>
                  {r.label}
                </Link>
              ))}
            </div>
          </li>

          {primaryLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.label}
              </Link>
            </li>
          ))}

          {/* Theme toggle — desktop only */}
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <ThemeIcon />
            </button>
          </li>
        </ul>

        {/* Mobile: hamburger only */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{
            display: "none",          /* CSS shows this on mobile via !important */
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
          {/* Services accordion */}
          <button className="mobile-menu-item"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isServicesActive ? "var(--gold)" : "var(--text)" }}>
            My Work
            <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>{mobileServicesOpen ? "▲" : "▼"}</span>
          </button>

          {mobileServicesOpen && services.map((s) => (
            <Link key={s.href} href={s.href} className="mobile-menu-item mobile-menu-sub"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(s.href) ? "var(--gold)" : undefined }}>
              {s.label}
            </Link>
          ))}

          {/* Resources accordion */}
          <button className="mobile-menu-item"
            onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: isResourcesActive ? "var(--gold)" : "var(--text)" }}>
            Explore
            <span style={{ fontSize: "0.55rem", opacity: 0.6 }}>{mobileResourcesOpen ? "▲" : "▼"}</span>
          </button>

          {mobileResourcesOpen && resources.map((r) => (
            <Link key={r.href} href={r.href} className="mobile-menu-item mobile-menu-sub"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(r.href) ? "var(--gold)" : undefined }}>
              {r.label}
            </Link>
          ))}

          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="mobile-menu-item"
              onClick={() => setMobileOpen(false)}
              style={{ color: isActive(link.href) ? "var(--gold)" : undefined }}>
              {link.label}
            </Link>
          ))}

          {/* Theme toggle inside mobile menu */}
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
