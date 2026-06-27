"use client";

import { useSyncExternalStore } from "react";
import { PopupButton } from "react-calendly";
import { useSiteConfig } from "@/components/SiteConfigProvider";

const subscribe = () => () => {};

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CalendlyButton({ children, className, style }: Props) {
  const { calendlyUrl } = useSiteConfig();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;

  return (
    <PopupButton
      url={calendlyUrl}
      rootElement={document.body}
      text={typeof children === "string" ? children : "Book a Consultation"}
      className={className}
      styles={style}
    />
  );
}
