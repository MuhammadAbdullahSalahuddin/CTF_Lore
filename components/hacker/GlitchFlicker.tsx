// components/hacker/GlitchFlicker.tsx
"use client";

import { useEffect, useState, useRef } from "react";

const GLITCH_FRAMES = [
  "/Glitchframes/Glitch1.webp",
  "/Glitchframes/Glitch2.webp",
  "/Glitchframes/Glitch3.webp",
  "/Glitchframes/Glitch4.webp",
  "/Glitchframes/Glitch5.webp",
  "/Glitchframes/Glitch8.webp",
  "/Glitchframes/Glitch9.webp",
  "/Glitchframes/Glitch10.webp",
];

interface GlitchFlickerProps {
  durationMs?: number;
  onComplete: () => void;
}

// Preloads every frame into the browser's image cache before the flicker
// starts cycling. Without this, the first few random frame picks on a
// cold (incognito) load stall on network fetch and show as a black
// screen instead of a glitch frame — this is what fixes that.
function usePreloadImages(srcs: string[]) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    srcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === srcs.length && !cancelled) setReady(true);
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [srcs]);

  return ready;
}

// Rapidly cycles through glitch stock images at randomized intervals,
// simulating a signal-breakup effect, then calls onComplete once done.
export default function GlitchFlicker({
  durationMs = 3000,
  onComplete,
}: GlitchFlickerProps) {
  const [frame, setFrame] = useState(GLITCH_FRAMES[0]);
  const [visible, setVisible] = useState(true);
  const preloaded = usePreloadImages(GLITCH_FRAMES);
  const startedRef = useRef(false);

  useEffect(() => {
    // Don't start the flicker cycle until every frame is actually in
    // browser cache. This is the fix for the incognito black-screen —
    // previously the cycle started immediately and the first few
    // Math.random() picks would hit uncached, uncompressed images.
    if (!preloaded || startedRef.current) return;
    startedRef.current = true;

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
  }, [preloaded, durationMs, onComplete]);

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
