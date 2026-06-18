interface TestimonialItem {
  quote: string;
  name: string;
  context?: string;
}

interface Props {
  items: TestimonialItem[];
  cols?: 2 | 3;
}

export default function TestimonialStrip({ items, cols = 2 }: Props) {
  return (
    <div className={`t-strip${cols === 3 ? " t-strip-3" : ""}`}>
      {items.map((t, i) => (
        <div key={i} className="t-card">
          <span
            className="display"
            style={{
              fontSize: "3.5rem",
              color: "var(--gold)",
              lineHeight: 1,
              display: "block",
              marginBottom: "20px",
              opacity: 0.4,
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className="display text-text"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              fontStyle: "italic",
              lineHeight: 1.65,
              marginTop: "-20px",
              flex: 1,
            }}
          >
            {t.quote}
          </blockquote>
          <span className="gold-rule" style={{ marginTop: "auto", marginBottom: "16px" }} />
          <div>
            <p className="eyebrow">{t.name}</p>
            {t.context && (
              <p
                className="text-dim font-light"
                style={{ fontSize: "0.72rem", letterSpacing: "0.1em", marginTop: "4px" }}
              >
                {t.context}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
