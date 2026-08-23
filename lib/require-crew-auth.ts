import { NextRequest, NextResponse } from "next/server";
import { verifyCrewToken } from "@/lib/crew-auth";

export async function requireCrewAuth(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = await verifyCrewToken(authHeader.split(" ")[1]);
    if (payload.type !== "crew_access") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return {
      playerId: payload.playerId as string,
      email: payload.email as string,
    };
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
