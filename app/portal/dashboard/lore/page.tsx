"use client";

export default function LorePage() {
  return (
    <div className="mx-auto max-w-2xl font-terminal text-[#4ade80]">
      <h1 className="mb-6 text-2xl tracking-widest text-[#4ade80] text-glow-strong">
        // LORE_LOG
      </h1>

      <div className="space-y-6 border-l-2 border-[#4ade80]/30 pl-6 text-lg leading-relaxed">
        <p>
          <span className="text-[#4ade80]/50">[thebe562]</span> — welcome to the
          crew. you found the seam, that's step one.
        </p>
        <p>
          TASMOC's public site was never the target. it's a decoy — a pharma
          front with a PAM portal buried behind it. SecureGate. that's the wall
          between us and secret_ops.
        </p>
        <p>
          I've been at it alone for weeks. got a foothold but not enough. I need
          the crew on this — recon, exploitation, whatever it takes.
        </p>
        <p className="text-[#4ade80]/70">
          entry point:{" "}
          <span className="text-[#4ade80]">pam-ctf.duckdns.org</span>
        </p>
        <p className="text-[#4ade80]/70">
          nothing else is handed to you. no hints, no login, no map. that's the
          job — find the way in yourself.
        </p>
        <p className="pt-4 text-sm tracking-widest text-[#4ade80]/40">
          — end of transmission —
        </p>
      </div>
    </div>
  );
}
