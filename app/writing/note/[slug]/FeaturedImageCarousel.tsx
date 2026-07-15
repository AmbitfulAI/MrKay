"use client";

import { useState } from "react";
import Image from "next/image";

export function FeaturedImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <Image
        key={index}
        src={images[index]}
        alt=""
        fill
        unoptimized
        priority={index === 0}
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          transition: "opacity 0.4s ease",
        }}
        sizes="100vw"
      />

      {/* Controls */}
      <button
        onClick={prev}
        aria-label="Previous image"
        style={{
          position: "absolute",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "color-mix(in srgb, var(--bg) 70%, transparent)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
          backdropFilter: "blur(8px)",
        }}
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        style={{
          position: "absolute",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "color-mix(in srgb, var(--bg) 70%, transparent)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
          backdropFilter: "blur(8px)",
        }}
      >
        →
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === index ? "24px" : "6px",
              height: "6px",
              background:
                i === index
                  ? "var(--gold)"
                  : "color-mix(in srgb, var(--text) 40%, transparent)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
