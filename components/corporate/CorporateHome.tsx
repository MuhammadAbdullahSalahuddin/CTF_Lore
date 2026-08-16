// components/corporate/CorporateHome.tsx
"use client";

import { MotionValue } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import AboutSection from "./AboutSection";
import Footer from "./Footer";

interface CorporateHomeProps {
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

// Plain, boring, fully clean corporate site. No CRT/glitch language lives
// in here at all — this component doesn't even know corruption exists.
// The overlay/parent handles all of that; this just renders the page.
export default function CorporateHome({ triggerRef }: CorporateHomeProps) {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <ProductGrid />
      <AboutSection />

      {/* Trigger zone — last stretch before the footer. Scroll progress
          through this div drives the corruption value in the parent. */}
      <div ref={triggerRef} className="h-[15vh] bg-slate-50" />

      <Footer />
    </div>
  );
}
