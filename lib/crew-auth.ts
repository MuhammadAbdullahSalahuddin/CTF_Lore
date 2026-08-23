import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.CREW_JWT_SECRET;
  if (!secret) throw new Error("CREW_JWT_SECRET is not configured");
  return new TextEncoder().encode(secret);
}

export async function signCrewAccessToken(playerId: string, email: string) {
  return new SignJWT({ playerId, email, type: "crew_access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function signCrewRefreshToken(playerId: string) {
  return new SignJWT({ playerId, type: "crew_refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyCrewToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}
