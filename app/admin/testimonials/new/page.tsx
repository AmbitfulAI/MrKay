import Link from "next/link";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonial() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/testimonials" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Testimonials</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Testimonial</h1>
      </div>
      <TestimonialForm />
    </div>
  );
}
