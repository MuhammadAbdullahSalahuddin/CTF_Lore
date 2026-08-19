// components/corporate/ProductGrid.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS = [
  {
    name: "Cardivex",
    category: "Cardiovascular",
    description: "A once-daily therapy for management of chronic hypertension.",
    image: "/images/cardiac.jpg",
  },
  {
    name: "Neurastol",
    category: "Neurology",
    description:
      "Clinically proven support for early-stage neurological disorders.",
    image: "/images/photo2_suppliment.png",
  },
  {
    name: "Glycemid",
    category: "Endocrinology",
    description:
      "Advanced glycemic control for adult type-2 diabetes patients.",
    image: "/images/randompills.png",
  },
  {
    name: "Immunova",
    category: "Immunology",
    description:
      "Targeted immunomodulatory treatment for autoimmune conditions.",
    image: "/images/Medicalbottle4.png",
  },
];

const CARDS_PER_PAGE = 2;

export default function ProductGrid() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = going back, 1 = going forward

  const totalPages = Math.ceil(PRODUCTS.length / CARDS_PER_PAGE);
  const visible = PRODUCTS.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const goNext = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };
  const goPrev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <section className="border-t border-slate-200 bg-slate-50 px-8 py-28 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0f4c81]">
              Our Portfolio
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Therapies Trusted by Physicians Nationwide
            </h2>
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              onClick={goPrev}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-[#0f4c81] hover:text-[#0f4c81]"
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-[#0f4c81] hover:text-[#0f4c81]"
            >
              →
            </button>
          </div>
        </div>

        {/* overflow-hidden clips the slide animation so cards don't spill
            outside the section bounds mid-transition */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid gap-6 md:grid-cols-2"
            >
              {visible.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/10] w-full bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-7">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#0f4c81]">
                      {p.category}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators — shows current page, standard carousel affordance */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
              }}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-[#0f4c81]" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
