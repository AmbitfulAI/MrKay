"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

import execBg       from "@/assets/KK_Exec_bg.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";

interface Slide {
  eyebrow:  string;
  line1:    string;
  line2:    string;
  subtitle: string;
  image:    StaticImageData;
  imagePos: string;
  primaryLabel:   string;
  primaryHref:    string;
  primaryCalendly: boolean;
  secondaryLabel:  string;
  secondaryHref:   string;
  secondaryCalendly: boolean;
}

const slides: Slide[] = [
  {
    eyebrow:  "Strategic Advisor · Architect · Coach",
    line1:    "Clarity → Architecture →",
    line2:    "Momentum.",
    subtitle: "Operating advisory for executives, founders, and organisations. For the decisions and systems that have to hold.",
    image:    execBg,
    imagePos: "center 20%",
    primaryLabel:   "Explore My Work",
    primaryHref:    "/career-executive-clarity",
    primaryCalendly: false,
    secondaryLabel: "Meet Kayode",
    secondaryHref:  "/meet-kayode",
    secondaryCalendly: false,
  },
  {
    eyebrow:  "Organisational Systems & Execution",
    line1:    "Growing Faster Than",
    line2:    "Your Systems Can Carry.",
    subtitle: "Your organisation isn't underperforming because people don't care. It's under-designed for the outcomes you want.",
    image:    upperbodyImg,
    imagePos: "center top",
    primaryLabel:   "Explore the Lane",
    primaryHref:    "/organisational-systems-execution",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref:  "",
    secondaryCalendly: true,
  },
  {
    eyebrow:  "Founder & Business Architecture",
    line1:    "Building Hard.",
    line2:    "So Why Isn't It Compounding?",
    subtitle: "You don't have an effort problem. You have an alignment problem. The architecture is what's missing.",
    image:    facecardImg,
    imagePos: "center top",
    primaryLabel:   "Explore the Lane",
    primaryHref:    "/founder-business-architecture",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref:  "",
    secondaryCalendly: true,
  },
  {
    eyebrow:  "Career & Executive Clarity",
    line1:    "You Know You Have More in You.",
    line2:    "You Just Can't Name the Direction Yet.",
    subtitle: "You've performed. You've grown. But the next move isn't obvious anymore — and another job won't fix that.",
    image:    execBg,
    imagePos: "center 35%",
    primaryLabel:   "Name Your Direction",
    primaryHref:    "/career-executive-clarity",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref:  "",
    secondaryCalendly: true,
  },
];

const INTERVAL   = 5500;
const CONTENT_MS = 400;
const IMAGE_MS   = 800;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Background images */}
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

      {/* Slide content */}
      <div
        className="container"
        onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
        onMouseLeave={resetTimer}
      >
        <div style={{
          opacity:        contentVisible ? 1 : 0,
          transform:      contentVisible ? "translateY(0)" : "translateY(10px)",
          transition:     `opacity ${CONTENT_MS}ms ease, transform ${CONTENT_MS}ms ease`,
          minHeight:      "clamp(300px, 48vh, 560px)",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
        }}>
          <span className="eyebrow block mb-4 md:mb-8">{s.eyebrow}</span>

          {current === 3 ? (
            /* Slide 4 — long sentences: line1 at shared size, line2 as smaller gold subtitle */
            <div className="mb-4 md:mb-8 max-w-[900px]">
              <h1
                className="display text-text"
                style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.8rem)", lineHeight: 1.0, marginBottom: "clamp(10px, 1.5vw, 20px)" }}
              >
                {s.line1}
              </h1>
              <p
                className="display"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)", fontStyle: "italic", color: "var(--gold)", lineHeight: 1.4 }}
              >
                {s.line2}
              </p>
            </div>
          ) : (
            /* Slides 1–3 — short fragments: both lines in one h1 at shared line1 size */
            <h1
              className="display text-text max-w-[1000px] mb-4 md:mb-8"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.8rem)", lineHeight: 0.97 }}
            >
              {s.line1}<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{s.line2}</em>
            </h1>
          )}

          <span className="gold-rule mb-4 md:mb-6" />

          <p
            className="text-muted font-light max-w-[520px] mb-5 md:mb-10"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}
          >
            {s.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {s.primaryCalendly
              ? <CalendlyButton className="btn-solid">{s.primaryLabel}</CalendlyButton>
              : <Link href={s.primaryHref} className="btn-solid">{s.primaryLabel}</Link>
            }
            {s.secondaryCalendly
              ? <CalendlyButton className="btn-outline">{s.secondaryLabel}</CalendlyButton>
              : <Link href={s.secondaryHref} className="btn-outline">{s.secondaryLabel}</Link>
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
