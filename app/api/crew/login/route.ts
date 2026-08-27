import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { redis } from "@/lib/redis";
import { signCrewAccessToken, signCrewRefreshToken } from "@/lib/crew-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const result = await pool.query(
      `SELECT id, email, password_hash, crew_handle FROM lore_players WHERE email = $1`,
      [email],
    );
    const player = result.rows[0];

    if (!player) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const attemptsKey = `crew_login_attempts:${email}`;
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) await redis.expire(attemptsKey, 300);

    if (attempts > 8) {
      return NextResponse.json(
        { message: "Too many attempts, try again shortly" },
        { status: 429 },
      );
    }

    const passwordMatch = await bcrypt.compare(password, player.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    await redis.del(attemptsKey);

    const accessToken = await signCrewAccessToken(player.id, player.email);
    const refreshToken = await signCrewRefreshToken(player.id);

    const response = NextResponse.json({
      accessToken,
      crewHandle: player.crew_handle,
    });

    response.cookies.set("crewRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // same-origin now — no cross-site cookie needed
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Crew login error:", error);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }
}
