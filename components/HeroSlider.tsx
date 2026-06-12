"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

import execBg      from "@/assets/KK_Exec_bg.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";

interface Slide {
  eyebrow: string;
  line1: string;
  line2: string;
  subtitle: string;
  image: StaticImageData;
  imagePos: string;
  primary:   { label: string; href: string; calendly: boolean };
  secondary: { label: string; href: string; calendly: boolean };
}

const slides: Slide[] = [
  {
    eyebrow: "Executive Operating System Architect · Fractional COO · Coach",
    line1: "Clarity → Architecture",
    line2: "→ Momentum.",
    subtitle: "You're at the kind of inflection point where the next move matters — in your career, your business, or your organisation. The effort is there. The traction isn't. That gap is rarely an ambition problem. It's an architecture problem.",
    image: execBg,
    imagePos: "center 20%",
    primary:   { label: "Find Your Path", href: "/career-clarity", calendly: false },
    secondary: { label: "Meet Kayode",    href: "/my-story",       calendly: false },
  },
  {
    eyebrow: "Organisational Systems & Execution",
    line1: "Growing Faster Than",
    line2: "Your Systems Can Carry.",
    subtitle: "Your people are capable. Execution still depends on heroic effort. Operating models, governance, and execution architecture that make performance repeatable — not accidental.",
    image: upperbodyImg,
    imagePos: "center top",
    primary:   { label: "See How We Fix This", href: "/organisational-systems", calendly: false },
    secondary: { label: "Let's Talk",          href: "",                        calendly: true  },
  },
  {
    eyebrow: "Founder & Business Architecture",
    line1: "Building Hard. So Why",
    line2: "Isn't It Compounding?",
    subtitle: "Vision, drive, and too many ideas — but the offer isn't sharp, the business depends entirely on you, and activity isn't converting into traction. Let's fix the architecture.",
    image: facecardImg,
    imagePos: "center top",
    primary:   { label: "Pressure-Test Your Model", href: "/founder-architecture", calendly: false },
    secondary: { label: "Let's Talk",               href: "",                      calendly: true  },
  },
];

const INTERVAL   = 5000;
const CONTENT_MS = 400; // content fade duration
const IMAGE_MS   = 800; // image cross-fade duration (slower = smoother)

export default function HeroSlider() {
  const [current,        setCurrent]        = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(), INTERVAL);
  };

  const advance = () => {
    setContentVisible(false);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setContentVisible(true);
    }, CONTENT_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setContentVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setContentVisible(true);
    }, CONTENT_MS);
    resetTimer();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const s = slides[current];

  return (
    <>
      {/* ── Background images — all rendered, current one fades in ── */}
      {slides.map((slide, i) => (
        <Image
          key={i}
          src={slide.image}
          alt=""
          aria-hidden
          fill
          priority={i === 0}
          sizes="100vw"
          style={{
            objectFit:      "cover",
            objectPosition: slide.imagePos,
            opacity:        i === current ? 0.18 : 0,
            transition:     `opacity ${IMAGE_MS}ms ease`,
            pointerEvents:  "none",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 30%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)",
        }}
      />

      {/* ── Slide content ── */}
      <div
        className="container"
        onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
        onMouseLeave={resetTimer}
      >
        <div style={{
          opacity:        contentVisible ? 1 : 0,
          transform:      contentVisible ? "translateY(0)" : "translateY(10px)",
          transition:     `opacity ${CONTENT_MS}ms ease, transform ${CONTENT_MS}ms ease`,
          minHeight:      "clamp(380px, 52vh, 560px)",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
        }}>
          <span className="eyebrow block mb-8 md:mb-10">{s.eyebrow}</span>

          <h1
            className="display text-text max-w-[900px] mb-8 md:mb-10"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)", lineHeight: 1.05 }}
          >
            {s.line1}<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{s.line2}</em>
          </h1>

          <span className="gold-rule mb-6 md:mb-8" />

          <p
            className="text-muted font-light max-w-[520px] mb-10 md:mb-12"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}
          >
            {s.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={s.primary.href} className="btn-solid">{s.primary.label}</Link>
            {s.secondary.calendly
              ? <CalendlyButton className="btn-outline">{s.secondary.label}</CalendlyButton>
              : <Link href={s.secondary.href} className="btn-outline">{s.secondary.label}</Link>
            }
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="hero-nav">
          <button className="hero-arrow" onClick={prev} aria-label="Previous slide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className="hero-dot"
                data-active={i === current ? "true" : undefined}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button className="hero-arrow" onClick={next} aria-label="Next slide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
