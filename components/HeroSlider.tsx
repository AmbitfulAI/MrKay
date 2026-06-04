"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

const slides = [
  {
    eyebrow: "Strategic Advisor",
    line1: "Built for the",
    line2: "Boardroom.",
    subtitle:
      "Clarity for the decisions that define careers and companies. Confidential. Considered. Consequential.",
    primary: { label: "Explore My Work", href: "/strategy", calendly: false },
    secondary: { label: "My Story", href: "/my-story", calendly: false },
  },
  {
    eyebrow: "Executive Coach",
    line1: "Built for the",
    line2: "Leader.",
    subtitle:
      "Building the behaviours, presence, and decision-making discipline that organisations actually need.",
    primary: { label: "How I Help", href: "/leadership", calendly: false },
    secondary: { label: "Let's Talk", href: "", calendly: true },
  },
  {
    eyebrow: "Trusted Confidant",
    line1: "Built for the",
    line2: "Conversation.",
    subtitle:
      "The counsel you can't get from inside the organisation. Direct, independent, and without agenda.",
    primary: { label: "Read the Work", href: "/testimonials", calendly: false },
    secondary: { label: "Let's Talk", href: "", calendly: true },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === current) return;
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 350);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setVisible(true);
      }, 350);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  const s = slides[current];

  return (
    <div
      className="container"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          minHeight: "clamp(380px, 52vh, 560px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span className="eyebrow block mb-8 md:mb-10">{s.eyebrow}</span>

        <h1
          className="display text-text max-w-[900px] mb-8 md:mb-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", lineHeight: 0.97 }}
        >
          {s.line1}
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            {s.line2}
          </em>
        </h1>

        <span className="gold-rule mb-6 md:mb-8" />

        <p
          className="text-muted font-light max-w-[520px] mb-10 md:mb-12"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}
        >
          {s.subtitle}
        </p>

        <div className="flex flex-wrap gap-4">
          {s.secondary.calendly ? (
            <CalendlyButton className="btn-solid">
              {s.secondary.label}
            </CalendlyButton>
          ) : (
            <Link href={s.primary.href} className="btn-solid">
              {s.primary.label}
            </Link>
          )}
          {s.secondary.calendly ? (
            <Link href={s.primary.href} className="btn-outline">
              {s.primary.label}
            </Link>
          ) : (
            <Link href={s.secondary.href} className="btn-outline">
              {s.secondary.label}
            </Link>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="hero-dots" style={{ marginTop: "40px" }}>
        {slides.map((_, i) => (
          <button
            key={i}
            className="hero-dot"
            data-active={i === current ? "true" : undefined}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
