// components/hacker/DefacementOverlay.tsx
"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

// Replaces the RGB-split version. As corruption climbs: desaturate the
// corporate page toward monochrome, then tint it phosphor-green, then
// darken. No hue-shifting rainbow nonsense — one accent color throughout.
export default function DefacementOverlay({
  corruption,
}: {
  corruption: MotionValue<number>;
}) {
  const filter = useTransform(
    corruption,
    [0, 0.5, 1],
    [
      "saturate(1) brightness(1)",
      "saturate(0.15) brightness(0.9)",
      "saturate(0) brightness(0.35)",
    ],
  );
  const tintOpacity = useTransform(corruption, [0.4, 1], [0, 0.35]);

  return (
    <>
      <motion.div style={{ filter }} className="contents" />
      <motion.div
        style={{ opacity: tintOpacity }}
        className="pointer-events-none fixed inset-0 z-30 bg-[#4ade80] mix-blend-color"
      />
    </>
  );
}
