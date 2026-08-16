// components/corporate/Footer.tsx
"use client";

const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Careers",
  "Investor Relations",
  "Contact Us",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-8 py-12 md:px-16">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[#0f4c81]" />
          <span className="text-sm font-semibold text-slate-700">
            TASMOC Pharmaceuticals
          </span>
        </div>

        <ul className="flex flex-wrap gap-6 text-sm text-slate-500">
          {FOOTER_LINKS.map((link) => (
            <li key={link} className="cursor-pointer hover:text-slate-700">
              {link}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        © 2026 TASMOC Pharmaceuticals. All rights reserved.
      </p>
    </footer>
  );
}
