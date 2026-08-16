// components/shared/CRTFrame.tsx
"use client";

// Permanent viewport-level texture: vignette + scanlines + grain.
// This wraps the ENTIRE app (both corporate and hacker states) so the
// CRT "monitor" feeling never breaks, even during the corporate phase —
// it just reads as very faint until the takeover, then intensifies.
export default function CRTFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2vw] bg-[#0a0f0d]">
      {children}

      {/* scanlines — thin repeating horizontal lines, cheap CSS gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 2px, #000 3px)",
        }}
      />

      {/* grain — animated noise texture, looped PNG or SVG turbulence */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(/flat-design-vhs-effect-background/8548084.jpg)",
          backgroundSize: "180px",
        }}
      />

      {/* vignette — radial darkening toward the edges */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
