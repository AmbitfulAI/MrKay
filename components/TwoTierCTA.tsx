"use client";

import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";

interface TwoTierCTAProps {
  lane?: "career" | "founder" | "org" | "speaking" | "";
  headline?: string;
  className?: string;
}

export default function TwoTierCTA({ lane = "", headline, className = "" }: TwoTierCTAProps) {
  const contactHref = `/contact${lane ? `?lane=${lane}` : ""}#form`;

  return (
    <div className={`flex flex-col items-start gap-6 ${className}`}>
      {headline && (
        <h3 className="display text-text" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", lineHeight: 1.2 }}>
          {headline}
        </h3>
      )}
      <div className="flex flex-wrap gap-4">
        <CalendlyButton className="btn-solid">Let&apos;s Talk</CalendlyButton>
        <Link href={contactHref} className="btn-outline">Start the Conversation</Link>
      </div>
    </div>
  );
}
