"use client";

import { useSyncExternalStore } from "react";
import { PopupButton } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/thekayodekolade"; // ← replace with your Calendly link

const subscribe = () => () => {};

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CalendlyButton({ children, className, style }: Props) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return (
    <PopupButton
      url={CALENDLY_URL}
      rootElement={document.body}
      text={typeof children === "string" ? children : "Book a Consultation"}
      className={className}
      styles={style}
    />
  );
}
