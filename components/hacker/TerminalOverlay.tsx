// components/hacker/TerminalOverlay.tsx
'use client'

import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'
import { HANDLER, GROUP_NAME, TARGET_URL } from '@/lib/constants'

export default function TerminalOverlay() {
  const [showButton, setShowButton] = useState(false)

  return (
    <div className="relative w-[90vw] max-w-2xl font-terminal text-[#4ade80]">
      <div className="border-2 border-dashed border-[#4ade80]/50 bg-[#0a0f0d]/90 p-8">
        <div className="mb-6 text-sm tracking-widest text-[#4ade80]/50">
          UPLINK — {GROUP_NAME}
        </div>

        <TypeAnimation
          sequence={[
            600,
            `> ${HANDLER}: nice, you actually found the seam.\n`,
            700,
            `> ${HANDLER}: nice, you actually found the seam.\n> TASMOC's public shell was never the target.\n`,
            900,
            `> ${HANDLER}: nice, you actually found the seam.\n> TASMOC's public shell was never the target.\n> real target sits behind their PAM portal.\n`,
            800,
            `> ${HANDLER}: nice, you actually found the seam.\n> TASMOC's public shell was never the target.\n> real target sits behind their PAM portal.\n> entry: ${TARGET_URL}\n`,
            300,
            () => setShowButton(true),
          ]}
          wrapper="div"
          speed={65}
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: '1.25rem',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
          cursor
          repeat={0}
        />

        {showButton && (
          <a
            href={`https://${TARGET_URL}`}
            className="mt-8 inline-block border-2 border-dashed border-[#4ade80] px-6 py-2 text-lg tracking-widest text-[#4ade80] transition-colors hover:bg-[#4ade80]/10"
          >
            ACKNOWLEDGE
          </a>
        )}
      </div>
    </div>
  )
}