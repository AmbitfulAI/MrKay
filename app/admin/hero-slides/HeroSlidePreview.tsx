interface Props {
  eyebrow: string;
  line1: string;
  line2: string;
  subtitle: string;
  imageUrl: string;
  imagePos: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export function HeroSlidePreview({ eyebrow, line1, line2, subtitle, imageUrl, imagePos, primaryLabel, secondaryLabel }: Props) {
  return (
    <div style={{ position: "sticky", top: "40px" }}>
      <p className="eyebrow" style={{ marginBottom: "16px", opacity: 0.7 }}>Live Preview</p>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--surface-2)",
          minHeight: "380px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "36px 32px",
          background: "var(--bg)",
        }}
      >
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: imagePos || "center top",
              opacity: 0.18,
            }}
          />
        )}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 30%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "14px", fontSize: "0.55rem" }}>
            {eyebrow || "Eyebrow text"}
          </span>
          <h2 className="display text-text" style={{ fontSize: "1.7rem", lineHeight: 1.05, marginBottom: "14px" }}>
            {line1 || "Headline"}
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{line2 || "Highlighted phrase"}</em>
          </h2>
          <span className="gold-rule" style={{ marginBottom: "14px" }} />
          <p className="text-muted font-light" style={{ fontSize: "0.78rem", lineHeight: 1.75, maxWidth: "320px", marginBottom: "20px" }}>
            {subtitle || "Subtitle paragraph goes here…"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <span className="btn-solid" style={{ pointerEvents: "none" }}>{primaryLabel || "Primary CTA"}</span>
            {secondaryLabel && <span className="btn-outline" style={{ pointerEvents: "none" }}>{secondaryLabel}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
