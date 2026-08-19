// components/hacker/GlitchFlicker.tsx
"use client";

import { useEffect, useState } from "react";

const GLITCH_FRAMES = [
  //   "/Glitchframes/Glitch1.jpg",
  "/Glitchframes/Glitch2.jpg",
  "/Glitchframes/Glitch3.jpg",
  "/Glitchframes/Glitch4.jpg",
  "/Glitchframes/Glitch5.jpg",
  //   "/Glitchframes/Glitch6.jpg",
  "/Glitchframes/Glitch8.jpg",
  "/Glitchframes/Glitch9.jpg",
  "/Glitchframes/Glitch10.jpg",
];

interface GlitchFlickerProps {
  durationMs?: number; // total flicker duration
  onComplete: () => void;
}

// Rapidly cycles through glitch stock images at randomized intervals,
// simulating a signal-breakup effect, then calls onComplete once done.
export default function GlitchFlicker({
  durationMs = 3000,
  onComplete,
}: GlitchFlickerProps) {
  const [frame, setFrame] = useState(GLITCH_FRAMES[0]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= durationMs) {
        setVisible(false);
        onComplete();
        return;
      }

      // Randomized frame pick + randomized on-screen duration per frame —
      // this irregularity is what sells it as "breaking up" rather than
      // a clean loop.
      setFrame(GLITCH_FRAMES[Math.floor(Math.random() * GLITCH_FRAMES.length)]);
      const nextDelay = 40 + Math.random() * 90; // 40–130ms per frame

      timeoutId = setTimeout(tick, nextDelay);
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [durationMs, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black">
      <img
        src={frame}
        alt=""
        className="h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
