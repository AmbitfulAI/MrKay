import PageHero from "@/components/PageHero";
import NotesFilter from "@/components/NotesFilter";
import Link from "next/link";
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

      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Stay Informed</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Want these perspectives delivered directly?
            </h3>
          </div>
          <Link href="/contact" className="btn-solid shrink-0">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
