// components/hacker/GlitchText.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

interface GlitchTextProps {
  text: string;
  corrupted: string; // what it degrades toward at full intensity
  corruption: MotionValue<number>;
  className?: string;
}

export default function GlitchText({
  text,
  corrupted,
  corruption,
  className,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const unsubscribe = corruption.on("change", (v) => {
      if (v < 0.15) {
        setDisplay(text);
        return;
      }

      const target = v > 0.75 ? corrupted : text;
      const scrambleAmount = Math.min(v * 1.4, 1);

      const next = target
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() < scrambleAmount * 0.4
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : char;
        })
        .join("");

      setDisplay(next);
    });
    return unsubscribe;
  }, [corruption, text, corrupted]);

  return (
    <motion.span
      className={className}
      style={{
        textShadow: useTransform(
          corruption,
          [0, 1],
          ["0 0 0 transparent", "2px 0 0 #ff003c, -2px 0 0 #00fff9"],
        ),
      }}
    >
      {display}
    </motion.span>
  );
}
