// components/hacker/GlitchJitterLayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

// Random positional jitter — frequency and magnitude both scale with
// `intensity` (0→1). Purely visual noise during the locked cutscene,
// not tied to scroll at all.
export default function GlitchJitterLayer({
  intensity,
}: {
  intensity: MotionValue<number>;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.2);
  const frame = useRef<number>(0);

  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const v = intensity.get();
      if (Math.random() < 0.12 + v * 0.5) {
        setOffset({
          x: (Math.random() - 0.5) * 10 * v,
          y: (Math.random() - 0.5) * 6 * v,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
      setOpacity(0.15 + v * 0.35);
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(frame.current);
    };
  }, [intensity]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[35] mix-blend-overlay"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        backgroundImage: "url(/textures/grain.jpg)",
        backgroundSize: "180px",
        opacity,
      }}
    />
  );
}
