import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    `SELECT lp.crew_handle, fs.submitted_at
     FROM flag_submissions fs
     JOIN lore_players lp ON lp.id = fs.player_id
     ORDER BY fs.submitted_at ASC`,
  );

  return NextResponse.json({ scores: result.rows });
}
