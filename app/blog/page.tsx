import PageHero from "@/components/PageHero";
import Link from "next/link";

const posts = [
  {
    slug: "the-cost-of-unclear-leadership",
    date: "May 2026",
    category: "Leadership",
    title: "The Cost of Unclear Leadership",
    excerpt:
      "When executives avoid defining what they stand for, organisations fill the vacuum — rarely well. Clarity of position is not a luxury. It is the precondition for everything else.",
  },
  {
    slug: "governance-is-not-compliance",
    date: "April 2026",
    category: "Board Advisory",
    title: "Governance Is Not Compliance",
    excerpt:
      "Too many boards conflate the two. Compliance is a floor, not a ceiling. The boards that navigate genuine complexity are those that treat governance as a thinking discipline, not an audit exercise.",
  },
  {
    slug: "succession-the-conversation-nobody-wants",
    date: "March 2026",
    category: "Executive Strategy",
    title: "Succession: The Conversation Nobody Wants",
    excerpt:
      "Organisations that plan for succession only when forced to are organisations that have already lost. The real work — identifying, developing, and preparing successors — happens years before the transition.",
  },
  {
    slug: "what-media-ready-actually-means",
    date: "February 2026",
    category: "Media & Speaking",
    title: "What 'Media Ready' Actually Means",
    excerpt:
      "It is not polish. It is not a set of rehearsed answers. It is knowing what you believe, why you believe it, and how to hold that position under pressure — in any room, with any audience.",
  },
  {
    slug: "the-difference-between-authority-and-position",
    date: "January 2026",
    category: "Leadership",
    title: "The Difference Between Authority and Position",
    excerpt:
      "Position is granted. Authority is earned — through consistency, competence, and the willingness to make decisions others defer. The executives who last understand this distinction early.",
  },
];

const categories = ["All", "Leadership", "Board Advisory", "Executive Strategy", "Media & Speaking"];

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Perspectives"
        title="Thinking on Leadership & Strategy."
        subtitle="Essays and perspectives on the challenges that define executive life — strategy, governance, succession, and the discipline of leading well."
      />

      {/* Category strip */}
      <section className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="blog-cat-tab"
                data-active={i === 0 ? "true" : undefined}
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
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-row">
                <div className="blog-row-meta">
                  <span className="eyebrow">{post.category}</span>
                  <span
                    className="text-dim font-light"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.18em", marginTop: "6px", display: "block" }}
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Stay Informed</span>
            <h3
              className="display text-text"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}
            >
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
