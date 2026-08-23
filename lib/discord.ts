export async function notifyFirstBlood(email: string) {
  const url = process.env.DISCORD_SOLVES_WEBHOOK_URL;
  if (!url) {
    console.log("[Discord] no webhook configured, skipping");
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🩸 **FIRST BLOOD!** \`${email}\` has captured the flag!`,
      }),
    });
  } catch (err) {
    console.error("[Discord] webhook failed:", err);
  }
}

export async function notifySolve(email: string) {
  const url = process.env.DISCORD_SOLVES_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `🚩 \`${email}\` captured the flag!` }),
    });
  } catch (err) {
    console.error("[Discord] webhook failed:", err);
  }
}
