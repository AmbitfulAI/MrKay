import PageHero from "@/components/PageHero";
import NotesFilter from "@/components/NotesFilter";
import NewsletterForm from "@/components/NewsletterForm";
import { notes as staticNotes, categories as staticCategories, type Note } from "@/lib/notes";
import { sanityFetch } from "@/lib/sanity-fetch";
import { notesQuery } from "@/sanity/queries";

export const revalidate = 60;

interface SanityNote {
  _id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  blocks?: Array<{ children: Array<{ text: string }>; style: string }>;
}

function mapSanityNote(n: SanityNote): Note {
  return {
    slug: n.slug,
    title: n.title,
    category: n.category,
    date: n.date,
    excerpt: n.excerpt,
    body: (n.blocks ?? []).map((b) =>
      (b.children ?? []).map((c) => c.text ?? "").join("")
    ).filter(Boolean),
  };
}

export default async function MyNotes() {
  const sanityNotes = await sanityFetch<SanityNote>(notesQuery);

  const notes = sanityNotes.length > 0
    ? sanityNotes.map(mapSanityNote)
    : staticNotes;

  const uniqueCategories = sanityNotes.length > 0
    ? ["All", ...Array.from(new Set(sanityNotes.map((n) => n.category)))]
    : staticCategories;

  return (
    <>
      <PageHero
        eyebrow="My Notes"
        title="Thinking Out Loud."
        subtitle="Notes, essays, and perspectives on leadership, strategy, faith, and the discipline of leading well — written as I think, not as I present."
      />

      <NotesFilter posts={notes} categories={uniqueCategories} />

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
    </>
  );
}
