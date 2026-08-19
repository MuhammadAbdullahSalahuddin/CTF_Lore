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
// components/corporate/CorporateHome.tsx — drop the prop entirely
export default function CorporateHome() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <ProductGrid />
      <AboutSection />
      <Footer />
    </div>
  );
}
