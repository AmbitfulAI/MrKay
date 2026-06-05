"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

export interface GalleryImage {
  src: StaticImageData | string;
  alt: string;
  title: string;
  caption?: string;
  category: string;
  span?: "wide" | "tall" | "normal";
}

interface Props {
  images: GalleryImage[];
  categories: string[];
}

export default function GalleryGrid({ images, categories }: Props) {
  const [active, setActive]     = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      {/* ── Filter tabs ── */}
      <div className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="blog-cat-tab"
                data-active={active === cat ? "true" : undefined}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <button
                key={img.alt + i}
                className={`gallery-item${img.span === "wide" ? " gallery-wide" : img.span === "tall" ? " gallery-tall" : ""}`}
                onClick={() => setLightbox(i)}
                aria-label={`View ${img.title}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 580px"
                />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-cat eyebrow">{img.category}</span>
                  <span className="gallery-overlay-title display">{img.title}</span>
                  {img.caption && (
                    <span className="gallery-overlay-caption">{img.caption}</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-dim font-light" style={{ fontSize: "0.88rem", padding: "48px 0" }}>
              No images in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ✕
          </button>

          {filtered.length > 1 && (
            <>
              <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">←</button>
              <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">→</button>
            </>
          )}

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-wrap">
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
                priority
              />
            </div>
            <div className="lightbox-meta">
              <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>{filtered[lightbox].category}</span>
              <p className="display text-text" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>{filtered[lightbox].title}</p>
              {filtered[lightbox].caption && (
                <p className="text-dim font-light" style={{ fontSize: "0.82rem", marginTop: "8px", lineHeight: 1.7 }}>{filtered[lightbox].caption}</p>
              )}
              <p className="text-dim font-light" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", marginTop: "16px" }}>
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
