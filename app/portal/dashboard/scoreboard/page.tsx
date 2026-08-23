"use client";

import { useEffect, useState } from "react";

interface ScoreRow {
  crew_handle: string;
  submitted_at: string;
}

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreRow[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/crew/scores");
      if (res.ok) {
        const data = await res.json();
        setScores(data.scores);
      }
    };

    fetchScores();
    const interval = setInterval(fetchScores, 10_000); // poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl">// SCOREBOARD</h1>
      {scores.length === 0 ? (
        <p className="text-[#4ade80]/50">no flags captured yet.</p>
      ) : (
        <ol className="space-y-2">
          {scores.map((s, i) => (
            <li
              key={s.crew_handle}
              className="flex justify-between border-b border-[#4ade80]/20 pb-2"
            >
              <span>
                #{i + 1} — {s.crew_handle}
              </span>
              <span className="text-[#4ade80]/50 text-sm">
                {new Date(s.submitted_at).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
