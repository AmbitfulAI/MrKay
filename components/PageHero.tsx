interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-bg border-b border-border relative overflow-hidden s-pad-hero">
      <div aria-hidden className="absolute top-0 right-[10%] w-px h-full hidden md:block"
        style={{ background: "linear-gradient(180deg, transparent, var(--border) 40%, var(--border) 60%, transparent)" }} />
      <div className="container">
        <span className="eyebrow anim-fade-up block mb-6 md:mb-7">{eyebrow}</span>
        <h1 className="display text-text anim-fade-up anim-delay-1 max-w-[800px] mb-6 md:mb-8"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}>
          {title}
        </h1>
        <span className="gold-rule anim-fade-up anim-delay-2 mb-6 md:mb-7" />
        {subtitle && (
          <p className="text-muted font-light anim-fade-up anim-delay-3 max-w-[560px]"
            style={{ fontSize: "0.95rem", lineHeight: 1.85 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
