import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  hint?: string;
  newHref?: string;
  newLabel?: string;
  children: React.ReactNode;
}

export function AdminPage({ title, subtitle, hint, newHref, newLabel, children }: Props) {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: hint ? "12px" : "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>{title}</h1>
          {subtitle && (
            <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{subtitle}</p>
          )}
        </div>
        {newHref && (
          <Link href={newHref} className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>
            {newLabel ?? "+ New"}
          </Link>
        )}
      </div>
      {hint && (
        <p className="text-dim font-light" style={{ fontSize: "0.72rem", marginBottom: "40px", lineHeight: 1.7 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}
