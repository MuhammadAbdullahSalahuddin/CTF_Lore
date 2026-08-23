import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireCrewAuth } from "@/lib/require-crew-auth";
import { notifyFirstBlood, notifySolve } from "@/lib/discord";

const CORRECT_FLAG = process.env.CTF_FLAG ?? "";

export async function POST(request: NextRequest) {
  // requireCrewAuth returns either the verified payload, or a
  // NextResponse (401) if the token is missing/invalid — same guard
  // pattern as requireRole() on the PAM side, just for crew tokens
  const auth = await requireCrewAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { flag } = await request.json();
  if (!flag) {
    return NextResponse.json({ message: "flag is required" }, { status: 400 });
  }

  // Already solved? Return early, don't even attempt the INSERT —
  // saves a wasted query and gives a clearer response than a raw
  // constraint-violation error would
  const existing = await pool.query(
    `SELECT id FROM flag_submissions WHERE player_id = $1`,
    [auth.playerId],
  );
  if (existing.rows.length > 0) {
    return NextResponse.json({ message: "Already submitted", alreadySolved: true });
  }

  if (flag.trim() !== CORRECT_FLAG) {
    return NextResponse.json({ message: "Incorrect flag", correct: false });
  }

  // First-blood check MUST happen before the INSERT below — otherwise
  // this player's own row would already be counted, and nobody would
  // ever register as "first"
  const countBefore = await pool.query(`SELECT COUNT(*) FROM flag_submissions`);
  const isFirstBlood = Number(countBefore.rows[0].count) === 0;

  await pool.query(
    `INSERT INTO flag_submissions (player_id) VALUES ($1)`,
    [auth.playerId],
  );

  // Fire-and-forget — don't make the player wait on Discord's response
  // time before they get their own success confirmation
  if (isFirstBlood) {
    notifyFirstBlood(auth.email).catch(() => {});
  } else {
    notifySolve(auth.email).catch(() => {});
  }

  return NextResponse.json({ correct: true, firstBlood: isFirstBlood });
}
