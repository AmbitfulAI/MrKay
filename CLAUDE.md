# MrKay — Claude Code Rules

## Project

Executive consulting site for Kayode Kolade (TheKayodeKolade.com).
Next.js 16 App Router · TypeScript · Custom CSS · MongoDB · Cloudinary.

---

## Stack rules

- **No Tailwind.** The project uses a custom utility-class system defined in `app/globals.css`. Do not install or reference Tailwind.
- **No Sanity.** The CMS migration to MongoDB is complete. Do not add new Sanity imports, queries, or schemas.
- **No `npm run build`** unless explicitly asked. Iterate and report; don't verify via build.
- **No new dependencies** without asking first.

---

## CSS conventions

### Design tokens — always use these variables, never raw hex or rgb

| Token | Use |
|---|---|
| `var(--bg)` | Page background |
| `var(--surface)` | Elevated surface (cards, sections) |
| `var(--surface-2)` | Borders between surface elements |
| `var(--text)` | Primary text |
| `var(--muted)` | Secondary text |
| `var(--dim)` | Tertiary / metadata text |
| `var(--border)` | Structural borders |
| `var(--gold)` | Brand accent — CTAs, highlights, rules |

### Named utility classes — prefer these over inline styles

| Class | Description |
|---|---|
| `display` | Brand serif (headlines) |
| `eyebrow` | Caps label above a heading |
| `gold-rule` | Horizontal gold accent line |
| `btn-solid` | Primary CTA button (gold fill) |
| `btn-outline` | Secondary CTA button (gold border) |
| `hover-gold` | Muted → gold on hover |
| `container` | Max-width 1280px, 40px side padding |
| `s-pad` | Section vertical padding 140px |
| `s-pad-md` | Section vertical padding 100px |
| `s-pad-sm` | Section vertical padding 80px |
| `form-group` | Form field wrapper |
| `form-label` | Uppercase label above inputs |
| `form-input` | Input / textarea / select |
| `stats-cell` | Credibility strip cell |
| `service-card` | Service grid card |

### Responsive font sizing

Use `clamp()` for all display text. Standard scale:
- Hero h1: `clamp(2.2rem, 4.8vw, 4.8rem)`
- Section h2: `clamp(1.8rem, 3.5vw, 3rem)`
- Sub-heading: `clamp(1.4rem, 2.5vw, 2.2rem)`
- Body: `0.9rem` (fixed), line-height `1.85–1.9`
- Eyebrow: `0.58rem`, `letter-spacing: 0.28em`, uppercase

### Responsive breakpoints (defined in globals.css)

- `sm` — `≥640px`
- `md` — `≥768px`
- `lg` — `≥1024px`

Use `md:` prefix classes for two-column layouts. Use `sm:` for button stacking (`flex-col sm:flex-row`).

---

## Data architecture

### MongoDB models — `lib/models/`

| Model | Purpose |
|---|---|
| `HeroSlide` | Homepage hero slides (order, eyebrow, line1, line2, subtitle, imageUrl, CTAs) |
| `Testimonial` | Client quotes (quote, clientName, clientContext, order, pages) |
| `SuccessStory` | Case studies (code, title, sector, client, result, story) |
| `Note` + `NoteCategory` | Writing / blog posts |
| `GalleryImage` | Visual diary |
| `ImpactOrg` | Pro bono / board work |
| `Product` | Marketplace items |
| `SiteConfig` | Global settings (contactEmail, footerBlurb, linkedInUrl, instagramUrl, footerTagline, statsBar) |
| `Faq` | Contact page FAQs |
| `Subscriber` | Newsletter signups |
| `ContactSubmission` | Form submissions |

### Fetching pattern

Server components: `await connectDB()` then Mongoose `.find().lean()`.
Always provide a static fallback array for when the DB is empty.
Use `export const revalidate = 60` on data-fetching pages.

### Admin API routes — `app/api/admin/*`

All CRUD operations go through these routes using `sanityClient` ← **wrong, these now use Mongoose directly**. Do not introduce Sanity client calls.

### Image uploads

Dynamic images use Cloudinary via `app/api/admin/upload/route.ts`. Static local assets stay in `assets/`.

---

## Component patterns

### Two-tier CTA

Every lane page and the homepage closing section uses:
```tsx
<CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
<Link href="/contact?lane=[id]#form" className="btn-outline">Start the Conversation</Link>
```
Or use `<TwoTierCTA lane="..." />` for the standard pattern.

### HeroSlider

Accepts `slides?: SanitySlide[]` from the server (MongoDB). Falls back to `FALLBACK_SLIDES` when DB is empty. Slide interface uses nested `primary`/`secondary` objects.

### ContactSection

Client component with Suspense boundary. Posts to `/api/contact`. Lane pre-selection via `?lane=` query param.

---

## Code style

- **No comments** unless the *why* is genuinely non-obvious.
- **No placeholder TODOs** left in committed code.
- **Prefer editing existing files** over creating new ones.
- **No error handling for scenarios that can't happen.** Only validate at system boundaries.
- **Static fallbacks required** for every MongoDB fetch — never render nothing when DB is empty.
- **Async server components** for any page that fetches from MongoDB.
- **`"use client"`** only when the component uses state, effects, or browser APIs.

---

## Git

- Active branch for client work: `feature/custom-admin`
- Do not merge into `main` without asking.
- Commit messages: `type: short description` (feat / fix / merge / refactor / docs).
