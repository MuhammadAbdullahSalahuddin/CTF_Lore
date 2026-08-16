// lib/useScrollCorruption.ts
"use client";

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useScrollCorruption() {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Progress tracked across the trigger zone only — not the whole page.
  // start = trigger enters viewport bottom, end = trigger exits viewport top
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "start 0.9"],
  });

  const corruption = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return { triggerRef, corruption };
}
