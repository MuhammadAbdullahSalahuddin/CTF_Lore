// components/hacker/PixelBurnTransition.tsx
"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface PixelBurnTransitionProps {
  onComplete: () => void;
}

export default function PixelBurnTransition({
  onComplete,
}: PixelBurnTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const controls = animate(400, 100, {
      duration: 2,
      ease: "easeIn",
      onUpdate: (value) => {
        el.style.maskSize = `${value}% ${value}%`;
        el.style.setProperty("-webkit-mask-size", `${value}% ${value}%`);
      },
      onComplete,
    });

    return () => controls.stop();
  }, [onComplete]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-40 bg-black"
      style={
        {
          WebkitMaskImage: "url(/textures/burn-mask.png)",
          maskImage: "url(/textures/burn-mask.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          maskSize: "400% 400%",
        } as React.CSSProperties
      }
    />
  );
}
