// components/corporate/ProductGrid.tsx
"use client";

const PRODUCTS = [
  {
    name: "Cardivex",
    category: "Cardiovascular",
    description: "A once-daily therapy for management of chronic hypertension.",
  },
  {
    name: "Neurastol",
    category: "Neurology",
    description:
      "Clinically proven support for early-stage neurological disorders.",
  },
  {
    name: "Glycemid",
    category: "Endocrinology",
    description:
      "Advanced glycemic control for adult type-2 diabetes patients.",
  },
  {
    name: "Immunova",
    category: "Immunology",
    description:
      "Targeted immunomodulatory treatment for autoimmune conditions.",
  },
];

export default function ProductGrid() {
  return (
    <section className="bg-slate-50 px-8 py-24 md:px-16">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0f4c81]">
          Our Portfolio
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Therapies Trusted by Physicians Nationwide
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-4 h-10 w-10 rounded bg-[#0f4c81]/10" />
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0f4c81]">
              {p.category}
            </p>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {p.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
