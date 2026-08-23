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
