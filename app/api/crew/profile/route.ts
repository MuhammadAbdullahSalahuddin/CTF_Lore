import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { requireCrewAuth } from "@/lib/require-crew-auth";

export async function GET(request: NextRequest) {
  const auth = await requireCrewAuth(request);
  if (auth instanceof NextResponse) return auth;

  const result = await pool.query(
    `SELECT email, crew_handle, created_at FROM lore_players WHERE id = $1`,
    [auth.playerId],
  );
  const player = result.rows[0];

  if (!player) {
    return NextResponse.json({ message: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(player);
}

export async function PATCH(request: NextRequest) {
  const auth = await requireCrewAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { crew_handle } = await request.json();

  if (!crew_handle || typeof crew_handle !== "string") {
    return NextResponse.json(
      { message: "crew_handle is required" },
      { status: 400 },
    );
  }

  // Basic sanity bounds — matches the column's VARCHAR(50) limit, and
  // keeps display-name abuse (empty string, absurd length) out before
  // it ever reaches Postgres
  const trimmed = crew_handle.trim();
  if (trimmed.length < 1 || trimmed.length > 50) {
    return NextResponse.json(
      { message: "crew_handle must be 1–50 characters" },
      { status: 400 },
    );
  }

  await pool.query(`UPDATE lore_players SET crew_handle = $1 WHERE id = $2`, [
    trimmed,
    auth.playerId,
  ]);

  return NextResponse.json({ message: "Updated", crew_handle: trimmed });
}
