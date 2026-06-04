import PageHero from "@/components/PageHero";
import NotesFilter from "@/components/NotesFilter";
import NewsletterForm from "@/components/NewsletterForm";
import { notes, categories } from "@/lib/notes";

export default function MyNotes() {
  return (
    <>
      <PageHero
        eyebrow="My Notes"
        title="Thinking Out Loud."
        subtitle="Notes, essays, and perspectives on leadership, strategy, faith, and the discipline of leading well — written as I think, not as I present."
      />

      <NotesFilter posts={notes} categories={categories} />

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
