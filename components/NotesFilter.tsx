"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Note } from "@/lib/notes";
import { useNoteCategories } from "@/components/NoteCategoriesProvider";

interface Props {
  posts: Note[];
}

function NotesFilterInner({ posts }: Props) {
  const categories = useNoteCategories();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const active = searchParams.get("category") ?? "All";

  const setFilter = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category strip */}
      <section
        className="bg-surface border-b border-surface-2"
        style={{ padding: "0" }}
      >
        <div className="container">
          <div
            className="flex gap-0 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="blog-cat-tab"
                data-active={active === cat ? "true" : undefined}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="bg-bg s-pad-sm">
        <div className="container">
          <div className="flex flex-col">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/my-notes/${post.slug}`}
                className="blog-row"
              >
                <div className="blog-row-meta">
                  <span className="eyebrow">{post.category}</span>
                  <span
                    className="text-dim font-light"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      marginTop: "6px",
                      display: "block",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <div className="blog-row-body">
                  <h2
                    className="display text-text mb-3"
                    style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-muted font-light"
                    style={{ fontSize: "0.85rem", lineHeight: 1.85 }}
                  >
                    {post.excerpt}
                  </p>
                </div>
                <span className="blog-row-arrow">→</span>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p
                className="text-dim font-light"
                style={{ fontSize: "0.88rem", padding: "48px 0" }}
              >
                No notes in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function NotesFilter(props: Props) {
  return (
    <Suspense>
      <NotesFilterInner {...props} />
    </Suspense>
  );
}

