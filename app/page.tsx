// app/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import CorporateHome from "@/components/corporate/CorporateHome";
import TerminalOverlay from "@/components/hacker/TerminalOverlay";
import GlitchFlicker from "@/components/hacker/GlitchFlicker";

type Phase = "browsing" | "stuck" | "glitching" | "terminal";

const BLOCKED_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Space",
  "Home",
  "End",
];

export default function LorePage() {
  const [phase, setPhase] = useState<Phase>("browsing");
  const lockedRef = useRef(false);

  useEffect(() => {
    if (phase !== "browsing") return;
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && !lockedRef.current) {
        lockedRef.current = true;
        setPhase("stuck");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phase]);

  useEffect(() => {
    if (phase === "browsing") return;
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (BLOCKED_KEYS.includes(e.code)) e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    return () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "stuck") return;
    const t = setTimeout(() => setPhase("glitching"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  const handleGlitchComplete = useCallback(() => setPhase("terminal"), []);

  return (
    <div className="relative overflow-x-hidden">
      <CorporateHome />

      {phase === "glitching" && (
        <GlitchFlicker durationMs={3000} onComplete={handleGlitchComplete} />
      )}

      {phase === "terminal" && (
        <>
          <div className="fixed inset-0 z-40 bg-black" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <TerminalOverlay />
          </motion.div>
        </>
      )}
    </div>
  );
}
