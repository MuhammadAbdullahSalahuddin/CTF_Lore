// scripts/send-emails.ts
// Reads credentials.csv (name,email,password) and emails each player
// their login info + the three links. Run this AFTER bulk-create-players.ts.
import "dotenv/config";
import nodemailer from "nodemailer";
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";

// ── FILL THESE IN ──────────────────────────────────────────────
const LORE_SITE_URL   = "https://deadseam.duckdns.org";
const DISCORD_INVITE  = "https://discord.gg/6ydG9vnuF";
const WHATSAPP_LINK   = "https://chat.whatsapp.com/JlJ1Ild6rKtGmBCw7icy3R";
// ────────────────────────────────────────────────────────────────

// These come from environment variables, not hardcoded, so the
// real password never sits in the code itself.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // your Gmail address
    pass: process.env.SMTP_PASS, // the Gmail "app password", not your real password
  },
});

interface Credential {
  name: string;
  email: string;
  password: string;
}

function buildEmailHtml(c: Credential): string {
  return `
    <div style="font-family: monospace; background:#0d0d0d; color:#c8c8c8; padding:24px;">
      <div style="max-width:520px; margin:auto; border:1px solid #333; padding:32px; border-radius:8px;">
        <h1 style="color:#00ff88; font-size:1.2rem;">// Crew Access — Do Not Forward</h1>
        <p>Hey ${c.name}, you're in. Here's how you get started:</p>

        <div style="background:#1a1a1a; padding:16px; border-radius:4px; margin:12px 0;">
          <div style="color:#666; font-size:0.8rem;">LOGIN EMAIL</div>
          <div style="color:#00ff88; margin:4px 0 12px;">${c.email}</div>
          <div style="color:#666; font-size:0.8rem;">PASSWORD</div>
          <div style="color:#00ff88;">${c.password}</div>
        </div>

        <p>Start here: <a href="${LORE_SITE_URL}" style="color:#00ff88;">${LORE_SITE_URL}</a></p>
        <p>Discord: <a href="${DISCORD_INVITE}" style="color:#00ff88;">${DISCORD_INVITE}</a></p>
        <p>WhatsApp: <a href="${WHATSAPP_LINK}" style="color:#00ff88;">${WHATSAPP_LINK}</a></p>

        <p style="font-size:0.8rem; color:#666; margin-top:24px;">
          Keep this to yourself. Don't share your login with anyone else.
        </p>
      </div>
    </div>
  `;
}

async function main() {
  const csvContent = readFileSync("./credentials.csv", "utf8");
  const players: Credential[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const player of players) {
    try {
      await transporter.sendMail({
        from: `"SecureGate Crew" <${process.env.SMTP_USER}>`,
        to: player.email,
        subject: "[crew access] read this before the event",
        html: buildEmailHtml(player),
      });
      console.log(`Sent to ${player.email}`);
    } catch (err) {
      console.error(`Failed to send to ${player.email}:`, (err as Error).message);
    }

    // Small pause between sends — sending 20 emails in one second
    // is exactly the pattern Gmail's spam filter looks for.
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("Done sending emails.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});