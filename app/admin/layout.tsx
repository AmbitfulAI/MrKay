"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Site Config",     href: "/admin/site-config",      exact: false },
  { label: "Hero Slides",     href: "/admin/hero-slides",      exact: false },
  { label: "FAQs",            href: "/admin/faqs",             exact: false },
  { label: "Testimonials",    href: "/admin/testimonials",     exact: false },
  { label: "Success Stories", href: "/admin/success-stories",  exact: false },
  { label: "Marketplace",     href: "/admin/marketplace",      exact: false },
  { label: "Gallery",         href: "/admin/gallery",          exact: false },
  { label: "Impact",          href: "/admin/impact",           exact: false },
  { label: "Notes",           href: "/admin/notes",            exact: true },
  { label: "↳ Categories",   href: "/admin/notes/categories", exact: false, sub: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "var(--surface)",
        borderRight: "1px solid var(--surface-2)",
        display: "flex",
        flexDirection: "column",
        padding: "32px 0",
      }}>
        <div style={{ padding: "0 24px 32px" }}>
          <Link href="/" target="_blank" style={{ textDecoration: "none" }}>
            <p className="display text-text" style={{ fontSize: "1rem", lineHeight: 1.2 }}>
              The<span style={{ color: "var(--gold)" }}>KayodeKolade</span>
            </p>
          </Link>
          <span style={{
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--dim)",
            fontFamily: "var(--font-body)",
          }}>
            Admin
          </span>
        </div>

        <nav style={{ flex: 1, padding: "0 12px" }}>
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href || (pathname.startsWith(item.href + "/") && !pathname.startsWith("/admin/notes/categories"))
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: item.sub ? "6px 14px 6px 28px" : "10px 14px",
                  fontSize: item.sub ? "0.72rem" : "0.8rem",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.06em",
                  color: active ? "var(--gold)" : item.sub ? "var(--dim)" : "var(--muted)",
                  background: active ? "var(--gold-glow)" : "transparent",
                  textDecoration: "none",
                  borderRadius: "2px",
                  fontWeight: active ? 500 : 300,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "0 12px" }}>
          <button
            onClick={signOut}
            style={{
              width: "100%",
              padding: "10px 14px",
              textAlign: "left",
              fontSize: "0.78rem",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.06em",
              color: "var(--dim)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
