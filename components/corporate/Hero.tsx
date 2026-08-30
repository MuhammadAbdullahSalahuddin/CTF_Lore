// components/corporate/Hero.tsx
"use client";

export default function Hero() {
  return (
    <section className="grid items-center gap-12 px-8 py-24 md:grid-cols-2 md:px-16">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#0f4c81]">
          TASMOC Pharmaceuticals
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
          Advancing Healthcare Through Trusted Innovation
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
          For over three decades, TASMOC has delivered life-saving therapies to
          patients across the region — backed by rigorous research, regulatory
          excellence, and an unwavering commitment to quality.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="rounded bg-[#0f4c81] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0d3d68]">
            Our Research
          </button>
          <button className="rounded border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400">
            Learn More
          </button>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
        <img
          src="/images/labotry1.webp"
          alt="TASMOC research laboratory"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
