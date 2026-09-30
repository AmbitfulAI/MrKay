"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import {
  DashboardIcon, HeroSlidesIcon, NotesIcon, CategoriesIcon, GalleryIcon,
  TestimonialsIcon, SuccessStoriesIcon, FaqsIcon, MarketplaceIcon, ImpactIcon,
  SettingsIcon, ContactIcon, SubscribersIcon,
} from "./_components/NavIcons";

const topItem = { label: "Dashboard", href: "/admin", exact: true, icon: DashboardIcon };

const navGroups: { label: string; items: { label: string; href: string; exact: boolean; icon: () => React.ReactElement }[] }[] = [
  {
    label: "Homepage",
    items: [
      { label: "Hero Slides", href: "/admin/hero-slides", exact: false, icon: HeroSlidesIcon },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Notes",      href: "/admin/notes",            exact: true,  icon: NotesIcon },
      { label: "Categories", href: "/admin/notes/categories", exact: false, icon: CategoriesIcon },
      { label: "Gallery",    href: "/admin/gallery",          exact: false, icon: GalleryIcon },
    ],
  },
  {
    label: "Social Proof",
    items: [
      { label: "Testimonials",    href: "/admin/testimonials",    exact: false, icon: TestimonialsIcon },
      { label: "Success Stories", href: "/admin/success-stories", exact: false, icon: SuccessStoriesIcon },
      { label: "FAQs",            href: "/admin/faqs",            exact: false, icon: FaqsIcon },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Marketplace", href: "/admin/marketplace", exact: false, icon: MarketplaceIcon },
      { label: "Impact",      href: "/admin/impact",      exact: false, icon: ImpactIcon },
    ],
  },
  {
    label: "Inbox",
    items: [
      { label: "Contact",     href: "/admin/contact",     exact: false, icon: ContactIcon },
      { label: "Subscribers", href: "/admin/subscribers", exact: false, icon: SubscribersIcon },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Site Config", href: "/admin/site-config", exact: false, icon: SettingsIcon },
    ],
  },
];

function isActive(pathname: string, item: { href: string; exact: boolean }) {
  if (item.href === "/admin") return pathname === "/admin";
  if (item.exact) {
    return pathname === item.href || (pathname.startsWith(item.href + "/") && !pathname.startsWith("/admin/notes/categories"));
  }
  return pathname.startsWith(item.href);
}

function NavLink({ item, pathname }: { item: { label: string; href: string; exact: boolean; icon: () => React.ReactElement }; pathname: string }) {
  const active = isActive(pathname, item);
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 14px",
        fontSize: "0.8rem",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.06em",
        color: active ? "var(--gold)" : "var(--muted)",
        background: active ? "var(--gold-glow)" : "transparent",
        textDecoration: "none",
        borderRadius: "2px",
        fontWeight: active ? 500 : 300,
      }}
    >
      <span style={{ display: "flex", opacity: active ? 1 : 0.75 }}><Icon /></span>
      {item.label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await apiClient.delete("/api/admin/auth").catch(() => {});
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

        <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
          <NavLink item={topItem} pathname={pathname} />

          {navGroups.map((group) => (
            <div key={group.label} style={{ marginTop: "20px" }}>
              <p style={{
                padding: "0 14px 6px",
                fontSize: "0.56rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--dim)",
                fontFamily: "var(--font-body)",
                opacity: 0.7,
              }}>
                {group.label}
              </p>
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </div>
          ))}
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
