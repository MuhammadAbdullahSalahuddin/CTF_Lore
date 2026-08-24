export async function crewLogin(email: string, password: string) {
  const res = await fetch("/api/crew/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ accessToken: string }>;
}

export async function crewSilentRefresh() {
  try {
    const res = await fetch("/api/crew/refresh", { method: "POST" });
    if (!res.ok) return null;
    return res.json() as Promise<{ accessToken: string; email: string }>;
  } catch {
    return null;
  }
}

export async function crewLogout() {
  await fetch("/api/crew/logout", { method: "POST" });
}

export async function getProfile(accessToken: string) {
  const res = await fetch("/api/crew/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  return res.json() as Promise<{
    email: string;
    crew_handle: string;
    created_at: string;
  }>;
}

export async function updateCrewHandle(
  accessToken: string,
  crewHandle: string,
) {
  const res = await fetch("/api/crew/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ crew_handle: crewHandle }),
  });
  if (!res.ok) return null;
  return res.json();
}
