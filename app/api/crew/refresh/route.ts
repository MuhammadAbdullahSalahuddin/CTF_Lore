import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { signCrewAccessToken, verifyCrewToken } from "@/lib/crew-auth";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("crewRefreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    const payload = await verifyCrewToken(refreshToken);
    if (payload.type !== "crew_refresh") {
      return NextResponse.json(
        { message: "Invalid token type" },
        { status: 401 },
      );
    }

    const result = await pool.query(
      `SELECT id, email FROM lore_players WHERE id = $1`,
      [payload.playerId],
    );
    const player = result.rows[0];

    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 401 },
      );
    }

    const accessToken = await signCrewAccessToken(player.id, player.email);
    return NextResponse.json({ accessToken, email: player.email });
  } catch {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 },
    );
  }
}
