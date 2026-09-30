import type { ContentBlock } from "@/lib/notes";

interface Props {
  title: string;
  category: string;
  excerpt: string;
  contentBlocks: ContentBlock[];
  featuredImage?: string;
}

export function NotePreview({ title, category, excerpt, contentBlocks, featuredImage }: Props) {
  return (
    <div style={{ position: "sticky", top: "40px" }}>
      <p className="eyebrow" style={{ marginBottom: "16px", opacity: 0.7 }}>Live Preview</p>
      <div style={{ border: "1px solid var(--surface-2)", maxHeight: "80vh", overflowY: "auto" }}>
        {featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={featuredImage} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
        )}
        <div style={{ padding: "28px 24px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "10px", fontSize: "0.55rem" }}>
            {category || "Category"}
          </span>
          <h2 className="display text-text" style={{ fontSize: "1.5rem", lineHeight: 1.1, marginBottom: "20px" }}>
            {title || "Note title"}
          </h2>
          <div className="note-body" style={{ maxWidth: "none" }}>
            {excerpt && <p className="note-lead" style={{ fontSize: "0.95rem" }}>{excerpt}</p>}
            <span className="gold-rule" style={{ margin: "24px 0" }} />
            {contentBlocks.length === 0 && (
              <p className="text-dim font-light" style={{ fontSize: "0.8rem" }}>Body content will appear here as you write.</p>
            )}
            {contentBlocks.map((block, bi) => {
              if (block.type === "image") {
                return (
                  <div key={bi} className="note-inline-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={block.content} alt={block.caption || title} style={{ width: "100%", height: "auto", display: "block" }} />
                    {block.caption && <p className="note-inline-caption">{block.caption}</p>}
                  </div>
                );
              }
              if (block.type === "heading") {
                const Tag = `h${block.level ?? 2}` as "h2" | "h3" | "h4";
                return <Tag key={bi} className="note-heading" style={{ fontSize: "1.2rem" }} dangerouslySetInnerHTML={{ __html: block.content }} />;
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={bi} className="note-quote">
                    <p style={{ fontSize: "1rem" }} dangerouslySetInnerHTML={{ __html: block.content }} />
                    {block.caption && <cite>{block.caption}</cite>}
                  </blockquote>
                );
              }
              if (block.type === "list") {
                const List = block.style === "ordered" ? "ol" : "ul";
                return (
                  <List key={bi} className="note-list" style={{ fontSize: "0.9rem" }}>
                    {(block.items ?? []).map((item, ii) => <li key={ii} dangerouslySetInnerHTML={{ __html: item }} />)}
                  </List>
                );
              }
              if (block.type === "delimiter") {
                return <div key={bi} className="note-delimiter" />;
              }
              return <p key={bi} className="note-para" style={{ fontSize: "0.9rem" }} dangerouslySetInnerHTML={{ __html: block.content }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
