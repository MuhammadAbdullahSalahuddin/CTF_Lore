"use client";

import { useEffect, useState } from "react";
import { useCrewAuthStore } from "@/store/crew-auth.store";

interface ScoreRow {
  crew_handle: string;
  submitted_at: string;
}

export default function ScoreboardPage() {
  const { accessToken } = useCrewAuthStore();
  const [scores, setScores] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [flagInput, setFlagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { status: "correct"; firstBlood: boolean }
    | { status: "incorrect" }
    | { status: "already" }
    | null
  >(null);

  const fetchScores = async () => {
    const res = await fetch("/api/crew/scores");
    if (res.ok) {
      const data = await res.json();
      setScores(data.scores);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 10_000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!accessToken || !flagInput.trim() || submitting) return;
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/crew/submit-flag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ flag: flagInput.trim() }),
      });
      const data = await res.json();

      if (data.alreadySolved) {
        setResult({ status: "already" });
      } else if (data.correct) {
        setResult({ status: "correct", firstBlood: data.firstBlood });
        setFlagInput("");
        fetchScores(); // refresh immediately, don't wait for the 10s poll
      } else {
        setResult({ status: "incorrect" });
      }
    } catch {
      setResult({ status: "incorrect" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl">// SCOREBOARD</h1>

      {/* Flag submission */}
      <div className="mb-8 border border-[#4ade80]/30 p-4">
        <div className="mb-2 text-sm text-[#4ade80]/50">SUBMIT FLAG</div>
        <div className="flex gap-2">
          <input
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="CTF{...}"
            spellCheck={false}
            className="flex-1 border-b border-[#4ade80]/40 bg-transparent px-1 py-1 outline-none focus:border-[#4ade80]"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting || !flagInput.trim()}
            className="border border-[#4ade80]/50 px-4 text-sm hover:border-[#4ade80] hover:bg-[#4ade80]/10 disabled:opacity-40 transition-colors"
          >
            {submitting ? "..." : "submit"}
          </button>
        </div>

        {result?.status === "correct" && (
          <p className="mt-2 text-sm text-[#4ade80]">
            {result.firstBlood
              ? "🩸 FIRST BLOOD — flag accepted."
              : "flag accepted."}
          </p>
        )}
        {result?.status === "incorrect" && (
          <p className="mt-2 text-sm text-red-400">incorrect flag.</p>
        )}
        {result?.status === "already" && (
          <p className="mt-2 text-sm text-[#4ade80]/50">already submitted.</p>
        )}
      </div>

      {/* Leaderboard */}
      {loading ? (
        <p className="text-[#4ade80]/50">syncing scoreboard...</p>
      ) : scores.length === 0 ? (
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
