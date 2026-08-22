"use client";

import { useState } from "react";

// Placeholder data — replace with a live fetch from /api/ctf/scores later
const MOCK_SCORES = [
  { rank: 1, name: "0xAlice", points: 100, solvedAt: "14:02:11" },
  { rank: 2, name: "n3tw0rkBob", points: 25, solvedAt: "14:15:44" },
  { rank: 3, name: "crew2", points: 10, solvedAt: "14:20:03" },
];

export default function ScoreboardPage() {
  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!flag.trim()) {
      setStatus("enter a flag first.");
      return;
    }
    // Placeholder only — wire to POST /api/ctf/submit later
    setStatus("submission disabled — UI shell only.");
  };

  return (
    <div className="mx-auto max-w-2xl font-terminal text-[#4ade80]">
      <h1 className="mb-6 text-2xl tracking-widest">// SCOREBOARD</h1>

      {/* Submit form */}
      <div className="mb-10 border border-[#4ade80]/30 p-4">
        <div className="mb-3 text-sm tracking-widest text-[#4ade80]/50">
          SUBMIT_FLAG
        </div>
        <div className="flex gap-2">
          <input
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="CTF{...}"
            spellCheck={false}
            className="flex-1 border border-[#4ade80]/30 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[#4ade80]/30 focus:border-[#4ade80]"
          />
          <button
            onClick={handleSubmit}
            className="border border-[#4ade80] px-4 py-2 text-sm tracking-widest transition-colors hover:bg-[#4ade80]/10"
          >
            SUBMIT
          </button>
        </div>
        {status && (
          <div className="mt-2 text-sm text-[#4ade80]/60">{status}</div>
        )}
      </div>

      {/* Leaderboard table */}
      <div className="border border-[#4ade80]/30">
        <div className="flex gap-4 border-b border-[#4ade80]/30 px-4 py-2 text-xs tracking-widest text-[#4ade80]/50">
          <span className="w-10">RANK</span>
          <span className="flex-1">CREW</span>
          <span className="w-16 text-right">PTS</span>
          <span className="w-24 text-right">TIME</span>
        </div>
        {MOCK_SCORES.map((s) => (
          <div
            key={s.rank}
            className={`flex gap-4 px-4 py-2 text-sm ${
              s.rank === 1 ? "text-[#4ade80]" : "text-[#4ade80]/70"
            }`}
          >
            <span className="w-10">#{s.rank}</span>
            <span className="flex-1">{s.name}</span>
            <span className="w-16 text-right">{s.points}</span>
            <span className="w-24 text-right text-[#4ade80]/40">
              {s.solvedAt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
