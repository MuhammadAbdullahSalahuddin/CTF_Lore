"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const LINES = [
  {
    speaker: "[thebe562]",
    text: "welcome to the crew. you found the seam, that's step one.",
  },
  {
    speaker: null,
    text: "TASMOC's public site was never the target. it's a decoy — a pharma front with a PAM portal buried behind it. SecureGate. that's the wall between us and secret_ops.",
  },
  {
    speaker: null,
    text: "I've been at it alone for weeks. got a foothold but not enough. I need the crew on this — recon, exploitation, whatever it takes.",
  },
];

const SEEN_KEY = "lore_intro_seen";

export default function LorePage() {
  const [revealed, setRevealed] = useState(0);
  const [entryPointShown, setEntryPointShown] = useState(false);
  const [footerShown, setFooterShown] = useState(false);

  // Gate: don't render anything until we've checked localStorage —
  // this avoids a flash where the animation briefly starts, then
  // suddenly jumps to fully-revealed a frame later
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(SEEN_KEY) === "true";
    if (alreadySeen) {
      // Skip straight to the fully-revealed end state — no typing at all
      setRevealed(LINES.length);
      setEntryPointShown(true);
      setFooterShown(true);
    }
    setChecked(true);
  }, []);

  // Once the whole sequence finishes typing for the FIRST time,
  // record it so future visits skip the animation entirely
  useEffect(() => {
    if (footerShown) {
      localStorage.setItem(SEEN_KEY, "true");
    }
  }, [footerShown]);

  if (!checked) return null; // brief blank frame, avoids the flash described above

  return (
    <div className="mx-auto max-w-2xl font-terminal text-[#4ade80]">
      <h1 className="mb-6 text-2xl tracking-widest text-[#4ade80] text-glow-strong">
        // LORE_LOG
      </h1>

      <div className="space-y-6 border-l-2 border-[#4ade80]/30 pl-6 text-lg leading-relaxed">
        {LINES.map((line, i) => {
          if (i > revealed) return null;
          const isActive = i === revealed;

          return (
            <p key={i} style={{ whiteSpace: "pre-wrap" }}>
              {line.speaker && (
                <span className="text-[#4ade80]/50">{line.speaker} — </span>
              )}
              {isActive ? (
                <TypeAnimation
                  sequence={[line.text, 400, () => setRevealed((r) => r + 1)]}
                  wrapper="span"
                  speed={80}
                  cursor={false}
                  style={{ lineHeight: 1.7 }}
                />
              ) : (
                <span>{line.text}</span>
              )}
            </p>
          );
        })}

        {revealed >= LINES.length && (
          <p className="text-[#4ade80]/70">
            {!entryPointShown ? (
              <TypeAnimation
                sequence={[
                  "entry point: ",
                  200,
                  () => setEntryPointShown(true),
                ]}
                wrapper="span"
                speed={80}
                cursor={false}
              />
            ) : (
              <>
                entry point:{" "}
                <span className="text-[#4ade80]">pam-ctf.duckdns.org</span>
              </>
            )}
          </p>
        )}

        {entryPointShown && (
          <p className="text-[#4ade80]/70">
            nothing else is handed to you. no hints, no login, no map. that's
            the job — find the way in yourself.
          </p>
        )}

        {entryPointShown && !footerShown && (
          <TypeAnimation
            sequence={[
              500,
              "— end of transmission —",
              () => setFooterShown(true),
            ]}
            wrapper="p"
            speed={70}
            cursor={false}
            className="pt-4 text-sm tracking-widest text-[#4ade80]/40"
          />
        )}
        {footerShown && (
          <p className="pt-4 text-sm tracking-widest text-[#4ade80]/40">
            — end of transmission —
          </p>
        )}
      </div>
    </div>
  );
}
