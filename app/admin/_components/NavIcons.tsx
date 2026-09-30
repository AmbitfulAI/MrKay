const common = {
  width: 14,
  height: 14,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DashboardIcon() {
  return (
    <svg {...common}>
      <rect x="2" y="2" width="5" height="5" />
      <rect x="9" y="2" width="5" height="5" />
      <rect x="2" y="9" width="5" height="5" />
      <rect x="9" y="9" width="5" height="5" />
    </svg>
  );
}

export function HeroSlidesIcon() {
  return (
    <svg {...common}>
      <rect x="1.5" y="3" width="13" height="10" rx="1" />
      <circle cx="5" cy="6.5" r="1.1" />
      <path d="M2 11l3.5-3.5L8 10l2.5-2.5L14 11" />
    </svg>
  );
}

export function NotesIcon() {
  return (
    <svg {...common}>
      <path d="M4 1.5h6l2.5 2.5V14H4V1.5z" />
      <path d="M4 5h6M4 8h6M4 11h4" />
    </svg>
  );
}

export function CategoriesIcon() {
  return (
    <svg {...common}>
      <path d="M2 2h5l7 7-5 5-7-7V2z" />
      <circle cx="4.5" cy="4.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GalleryIcon() {
  return (
    <svg {...common}>
      <rect x="1.5" y="1.5" width="9" height="9" rx="1" />
      <rect x="5.5" y="5.5" width="9" height="9" rx="1" />
    </svg>
  );
}

export function TestimonialsIcon() {
  return (
    <svg {...common}>
      <path d="M3.2 4.2c-1.1 0-1.9.9-1.9 2.1 0 1.2.9 2.1 2 2.1 0 1.4-.9 2.3-1.8 2.3v1c1.8 0 3.2-1.4 3.2-3.7V6.3c0-1.1-.6-2.1-1.5-2.1z" />
      <path d="M10.1 4.2c-1.1 0-1.9.9-1.9 2.1 0 1.2.9 2.1 2 2.1 0 1.4-.9 2.3-1.8 2.3v1c1.8 0 3.2-1.4 3.2-3.7V6.3c0-1.1-.6-2.1-1.5-2.1z" />
    </svg>
  );
}

export function SuccessStoriesIcon() {
  return (
    <svg {...common}>
      <path d="M8 1.6l1.8 3.7 4 .6-2.9 2.9.7 4.1L8 11.1l-3.6 1.8.7-4.1L2.2 5.9l4-.6L8 1.6z" />
    </svg>
  );
}

export function FaqsIcon() {
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="6.3" />
      <path d="M6.2 6.4a1.85 1.85 0 1 1 2.5 1.7c-.7.35-.9.7-.9 1.3" />
      <circle cx="7.85" cy="11.1" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MarketplaceIcon() {
  return (
    <svg {...common}>
      <path d="M3.3 5h9.4l-.7 8H4l-.7-8z" />
      <path d="M5.5 5V3.6a2.5 2.5 0 0 1 5 0V5" />
    </svg>
  );
}

export function ImpactIcon() {
  return (
    <svg {...common}>
      <path d="M8 13.3S2.2 9.7 2.2 5.9c0-1.8 1.4-3.2 3.1-3.2 1 0 1.9.5 2.7 1.4.8-.9 1.7-1.4 2.7-1.4 1.7 0 3.1 1.4 3.1 3.2 0 3.8-5.8 7.4-5.8 7.4z" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 2v1.6M8 12.4V14M2 8h1.6M12.4 8H14M4.3 4.3l1.1 1.1M10.6 10.6l1.1 1.1M11.7 4.3l-1.1 1.1M5.4 10.6l-1.1 1.1" />
    </svg>
  );
}

export function ContactIcon() {
  return (
    <svg {...common}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
      <path d="M2 4.5l6 5 6-5" />
    </svg>
  );
}

export function SubscribersIcon() {
  return (
    <svg {...common}>
      <circle cx="6" cy="6" r="2.2" />
      <path d="M2 14c0-2.4 1.8-3.8 4-3.8s4 1.4 4 3.8" />
      <circle cx="12.2" cy="6.5" r="1.7" />
      <path d="M10.7 8.2c1.7.25 2.9 1.5 2.9 3.5" />
    </svg>
  );
}
