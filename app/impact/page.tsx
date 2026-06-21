import PageHero from "@/components/PageHero";
import CalendlyButton from "@/components/CalendlyButton";
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";

import headshotImg  from "@/assets/KK Headshot_BW.jpg";
import execImg      from "@/assets/KK_Exec_bg.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";

export const revalidate = 60;

const organisations = [
  {
    name: "Organisation Name One",
    category: "Education & Leadership",
    role: "Board Advisory Member",
    since: "2019",
    description:
      "Supporting the development of emerging leaders across underserved communities through structured mentorship, skills training, and access to senior professional networks.",
    href: "https://example.com",
    active: true,
    image: execImg,
    imageAlt: "TheKayodeKolade at Organisation Name One",
  },
  {
    name: "Organisation Name Two",
    category: "Governance & Policy",
    role: "Independent Advisor",
    since: "2021",
    description:
      "Providing independent counsel on governance reform and institutional strengthening for public sector organisations navigating structural transformation.",
    href: "https://example.com",
    active: true,
    image: upperbodyImg,
    imageAlt: "TheKayodeKolade at Organisation Name Two",
  },
  {
    name: "Organisation Name Three",
    category: "Youth Development",
    role: "Programme Mentor",
    since: "2020",
    description:
      "Mentoring young professionals at the early stages of their careers — helping them build clarity of direction, professional confidence, and the habits of excellent leadership.",
    href: "https://example.com",
    active: true,
    image: facecardImg,
    imageAlt: "TheKayodeKolade at Organisation Name Three",
  },
  {
    name: "Organisation Name Four",
    category: "Faith & Community",
    role: "Volunteer & Speaker",
    since: "2015",
    description:
      "Contributing to community building and values-based leadership development through speaking engagements, workshops, and long-term volunteer engagement.",
    href: "https://example.com",
    active: false,
    image: headshotImg,
    imageAlt: "TheKayodeKolade at Organisation Name Four",
  },
];

const causes = [
  { label: "Leadership Development",  body: "Equipping the next generation of African leaders with the capability, character, and confidence to lead at the highest levels." },
  { label: "Governance Reform",       body: "Contributing to institutions that strengthen public governance, board accountability, and the integrity of leadership structures." },
  { label: "Faith-Based Community",   body: "Serving within faith communities that build people — not just careers — and that ground leadership in purpose rather than position." },
  { label: "Education Access",        body: "Supporting access to quality professional education for young people who have the talent but not yet the opportunity." },
];

interface SanityOrg {
  _id: string;
  name: string;
  category: string;
  role?: string;
  since?: string;
  description?: string;
  url?: string;
  active?: boolean;
  imageUrl?: string;
  alt?: string;
}

type OrgItem = {
  name: string;
  category: string;
  role: string;
  since: string;
  description: string;
  href: string;
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  imageAlt: string;
};

export default async function Impact() {
  await connectDB();
  const sanityOrgs = await ImpactOrg.find().sort({ order: 1 }).lean<SanityOrg[]>();

  const activeOrgs: OrgItem[] = sanityOrgs.length > 0
    ? sanityOrgs.map((org) => ({
        name: org.name,
        category: org.category,
        role: org.role ?? "",
        since: org.since ?? "",
        description: org.description ?? "",
        href: org.url ?? "#",
        active: org.active ?? true,
        image: org.imageUrl || execImg,
        imageAlt: org.alt ?? `TheKayodeKolade at ${org.name}`,
      }))
    : organisations;

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Beyond the Boardroom."
        subtitle="Leadership without service is just ambition. These are the organisations and causes I give my time, counsel, and energy to — because the work doesn't stop at the consulting room door."
      />

      {/* ── Mission statement ── */}
      <section className="bg-surface border-b border-surface-2 s-pad-sm">
        <div className="container">
          <div className="flex gap-5 items-start max-w-[760px]">
            <span className="shrink-0 mt-1" style={{ display: "block", width: "1px", minHeight: "60px", background: "var(--gold)" }} />
            <p className="text-muted font-light" style={{ fontSize: "0.95rem", lineHeight: 1.9 }}>
              I believe that those who have been given access to knowledge, networks, and influence carry a responsibility to share them. The organisations listed here represent causes I care about deeply — not as a branding exercise, but as an extension of the same values that shape every professional engagement I take on.
            </p>
          </div>
        </div>
      </section>

      {/* ── Organisations ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <span className="eyebrow block mb-4">Organisations & Roles</span>
          <h2 className="display text-text mb-12 md:mb-16" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Where I show up.
          </h2>

          <div className="flex flex-col gap-[2px] bg-surface-2">
            {activeOrgs.map((org) => (
              <div key={org.name} className="bg-bg impact-org-card">
                {/* Content */}
                <div className="impact-org-content">
                  <div className="flex justify-between items-start flex-wrap gap-4" style={{ marginBottom: "16px" }}>
                    <div>
                      <span className="eyebrow block mb-3">{org.category}</span>
                      <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.2vw, 2rem)" }}>
                        {org.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="text-dim font-light" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                        Since {org.since}
                      </span>
                      <span style={{
                        display: "inline-block",
                        fontSize: "0.52rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        border: `1px solid ${org.active ? "var(--gold)" : "var(--surface-2)"}`,
                        color: org.active ? "var(--gold)" : "var(--dim)",
                        fontFamily: "var(--font-body)",
                      }}>
                        {org.active ? "Active" : "Past"}
                      </span>
                    </div>
                  </div>

                  <div style={{ borderLeft: "2px solid var(--surface-2)", paddingLeft: "20px", marginBottom: "24px" }}>
                    <p className="text-dim font-light" style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {org.role}
                    </p>
                  </div>

                  <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "28px" }}>
                    {org.description}
                  </p>

                  <a
                    href={org.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-gold"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    Visit Organisation →
                  </a>
                </div>

                {/* Proof-of-work image */}
                <div className="impact-org-image" style={{ position: "relative" }}>
                  <Image
                    src={org.image}
                    alt={org.imageAlt}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute top-0 right-0 w-[40px] h-[40px] pointer-events-none" style={{ borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
                  <div className="absolute bottom-0 left-0 w-[40px] h-[40px] pointer-events-none" style={{ borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Causes ── */}
      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-6">What I Care About</span>
              <h2 className="display text-text mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15 }}>
                The causes that shape the work.
              </h2>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                These are not just topics I advise on professionally. They are the things I believe in — the areas where I think leadership, done well, can change the conditions that affect the most people.
              </p>
            </div>
            <div className="flex flex-col" style={{ gap: "32px" }}>
              {causes.map((c) => (
                <div key={c.label} className="flex gap-5 items-start">
                  <span style={{ display: "block", width: "1px", minHeight: "52px", background: "var(--gold)", flexShrink: 0, marginTop: "4px" }} />
                  <div>
                    <span className="eyebrow block mb-3">{c.label}</span>
                    <p className="text-muted font-light" style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-bg border-t border-b border-surface-2 text-center s-pad-md">
        <div className="container max-w-[720px] mx-auto">
          <span className="eyebrow block mb-6">On Service</span>
          <blockquote className="display text-text" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.35, marginBottom: "24px" }}>
            "The measure of a leader is not what they achieve for themselves — it is what they make possible for others."
          </blockquote>
          <p className="eyebrow">— TheKayodeKolade</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Partner With Purpose</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Working on something worth supporting?
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            <Link href="/contact" className="btn-outline shrink-0">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
