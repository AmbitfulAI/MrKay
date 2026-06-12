import Link from "next/link";
import { ProductForm } from "../ProductForm";

export default function NewProduct() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/marketplace" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Marketplace</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
