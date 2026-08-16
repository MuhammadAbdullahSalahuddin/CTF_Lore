// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useScrollCorruption } from "@/lib/useScrollCorruption";
import CorporateHome from "@/components/corporate/CorporateHome";
import TerminalOverlay from "@/components/hacker/TerminalOverlay";

export default function LorePage() {
  const { triggerRef, corruption } = useScrollCorruption();
  const [handoff, setHandoff] = useState(false);

  // Once corruption maxes out, lock scroll and mount the terminal.
  // Runs once — handoff never reverts even if corruption value dips
  // afterward (e.g. from a resize-triggered recalculation).
  useEffect(() => {
    const unsubscribe = corruption.on("change", (v) => {
      if (v >= 0.98 && !handoff) {
        setHandoff(true);
        window.scrollTo({ top: 0, behavior: "instant" });
        document.body.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      }
    });
    return unsubscribe;
  }, [corruption, handoff]);

  // Everything below is driven straight off scroll position through the
  // trigger zone — no timers, fully reversible until handoff fires.
  const filter = useTransform(
    corruption,
    [0, 0.5, 1],
    [
      "saturate(1) brightness(1) blur(0px)",
      "saturate(0.15) brightness(0.9) blur(0px)",
      "saturate(0) brightness(0.35) blur(1px)",
    ],
  );
  const skew = useTransform(corruption, [0, 1], [0, -0.4]);
  const scale = useTransform(corruption, [0, 1], [1, 0.97]);
  const tintOpacity = useTransform(corruption, [0.4, 1], [0, 0.35]);
  const grainOpacity = useTransform(corruption, [0.3, 1], [0, 0.5]);

  return (
    <div className="relative">
      {/* The corporate page itself — filter/skew/scale applied directly
          to this wrapper, so degradation actually renders (fixes the
          earlier DefacementOverlay bug where filter sat on a sibling
          with display:contents and touched nothing). */}
      <motion.div style={{ filter, skewY: skew, scale }} className="origin-top">
        <CorporateHome triggerRef={triggerRef} />
      </motion.div>

      {/* Phosphor-green color tint, rising with corruption. Sits above
          the corporate layer, doesn't intercept clicks/scroll. */}
      <motion.div
        style={{ opacity: tintOpacity }}
        className="pointer-events-none fixed inset-0 z-30 bg-[#4ade80] mix-blend-color"
      />

      {/* Grain texture, same rise curve. Requires public/textures/grain.png
          — until that's added this just renders as nothing, harmless. */}
      <motion.div
        style={{ opacity: grainOpacity }}
        className="pointer-events-none fixed inset-0 z-30 mix-blend-overlay"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(/flat-design-vhs-effect-background/8548084.jpg)",
            backgroundSize: "180px",
          }}
        />
      </motion.div>

      {handoff && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <TerminalOverlay />
        </motion.div>
      )}
    </div>
  );
}
