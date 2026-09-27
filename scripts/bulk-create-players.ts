// scripts/bulk-create-players.ts
import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync } from "fs";
import bcrypt from "bcrypt";
import { pool } from "../lib/db";

interface Participant {
  name: string;
  email: string;
  phone: string;
  username: string;
}

async function main() {
  const csvContent = readFileSync("./participants.csv", "utf8");
  const participants: Participant[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const outputLines: string[] = ["name,email,password,username"];

  for (const person of participants) {
    const password = Math.random().toString(36).slice(2, 10);
    const passwordHash = await bcrypt.hash(password, 12);

    try {
      await pool.query(
        `INSERT INTO lore_players (email, password_hash, crew_handle, phone)
         VALUES ($1, $2, $3, $4)`,
        [person.email, passwordHash, person.username, person.phone],
      );
      console.log(`Created: ${person.email} (handle: ${person.username})`);
      outputLines.push(
        `${person.name},${person.email},${password},${person.username}`,
      );
    } catch (err) {
      console.error(`Failed for ${person.email}:`, (err as Error).message);
    }
  }

  writeFileSync("./credentials.csv", outputLines.join("\n"));
  console.log("Done — see credentials.csv");
  await pool.end();
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});