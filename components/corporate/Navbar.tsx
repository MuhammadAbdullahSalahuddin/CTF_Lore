// components/corporate/Navbar.tsx
"use client";

const NAV_LINKS = ["Products", "Research", "About", "Careers", "Contact"];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <img src="/images/tasmoc-logo.svg" className="h-12 w-12" />

        <span className="text-lg font-semibold tracking-tight text-slate-900">
          TASMOC
        </span>
      </div>

      <ul className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
        {NAV_LINKS.map((link) => (
          <li
            key={link}
            className="cursor-pointer transition-colors hover:text-[#0f4c81]"
          >
            {link}
          </li>
        ))}
      </ul>

      <button className="rounded bg-[#0f4c81] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0d3d68]">
        Investor Relations
      </button>
    </nav>
  );
}
