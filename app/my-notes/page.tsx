import PageHero from "@/components/PageHero";
import NotesFilter from "@/components/NotesFilter";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import { getNotes } from "@/lib/data/notes";
import { CategoriesProvider } from "@/components/CategoriesProvider";

export const revalidate = 60;

export default async function MyNotes() {
  const { notes, categories: uniqueCategories } = await getNotes();

  return (
    <>
      <PageHero
        eyebrow="My Notes"
        title="Thinking Out Loud."
        subtitle="Notes, essays, and perspectives on leadership, strategy, faith, and the discipline of leading well — written as I think, not as I present."
      />

      <CategoriesProvider initial={uniqueCategories}>
        <NotesFilter posts={notes} />
      </CategoriesProvider>

      <section className="bg-surface border-t border-surface-2 s-pad">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <span className="eyebrow block mb-4">Stay in the Room</span>
              <h3 className="display text-text mb-5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.15 }}>
                Get the notes delivered directly.
              </h3>
              <span className="gold-rule mb-7" />
              <p className="text-muted font-light" style={{ fontSize: "0.9rem", lineHeight: 1.9 }}>
                Leadership, strategy, faith, and the occasional letter I needed to write. Straight to your inbox — no noise, no agenda.
              </p>
            </div>
            <div style={{ paddingTop: "8px" }}>
              <NewsletterForm variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Explore More</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem,2.5vw,2.2rem)" }}>
              See the work beyond the writing.
            </h3>
          </div>
          <Link href="/gallery" className="btn-outline shrink-0">Browse the Gallery</Link>
        </div>
      </section>
    </>
  );
}
