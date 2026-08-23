import { NextRequest, NextResponse } from "next/server";
import { verifyCrewToken } from "@/lib/crew-auth";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("crewRefreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  try {
    const payload = await verifyCrewToken(refreshToken);
    if (payload.type !== "crew_refresh") throw new Error("wrong token type");
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/portal/login", request.url),
    );
    response.cookies.delete("crewRefreshToken");
    return response;
  }
}

export const config = {
  matcher: ["/portal/dashboard/:path*"],
};
