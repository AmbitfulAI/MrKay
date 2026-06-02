"use client";

import { useState } from "react";
import Link from "next/link";

export interface Product {
  id: string;
  type: "Book" | "Course";
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceNote?: string;
  tag?: string;
  href: string;
  available: boolean;
  coverAccent: string;
}

interface Props {
  products: Product[];
}

const types = ["All", "Books", "Courses"];

export default function MarketplaceGrid({ products }: Props) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.type === active.slice(0, -1)); // "Books" → "Book"

  return (
    <>
      {/* Filter */}
      <div className="bg-surface border-b border-surface-2" style={{ padding: "0" }}>
        <div className="container">
          <div className="flex gap-0">
            {types.map((t) => (
              <button
                key={t}
                className="blog-cat-tab"
                data-active={active === t ? "true" : undefined}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-surface-2">
            {filtered.map((p) => (
              <div key={p.id} className="product-card">
                {/* Cover */}
                <div className="product-cover" style={{ background: p.coverAccent }}>
                  <span className="product-cover-type eyebrow">{p.type}</span>
                  <h3 className="display product-cover-title">{p.title}</h3>
                  <p className="product-cover-sub">{p.subtitle}</p>
                  <div className="product-cover-rule" />
                  {p.tag && <span className="product-cover-tag">{p.tag}</span>}
                </div>

                {/* Info */}
                <div className="product-info">
                  <p className="text-muted font-light product-desc">{p.description}</p>

                  <div className="product-footer">
                    <div>
                      <span className="product-price">{p.price}</span>
                      {p.priceNote && (
                        <span className="text-dim font-light" style={{ fontSize: "0.72rem", display: "block", marginTop: "4px" }}>
                          {p.priceNote}
                        </span>
                      )}
                    </div>
                    {p.available ? (
                      <Link href={p.href} className="btn-solid" style={{ padding: "11px 28px", fontSize: "0.6rem" }}>
                        {p.type === "Book" ? "Get the Book" : "Enrol Now"}
                      </Link>
                    ) : (
                      <span className="product-coming">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
