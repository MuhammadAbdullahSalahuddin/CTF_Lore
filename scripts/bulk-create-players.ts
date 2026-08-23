import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync } from "fs";
import bcrypt from "bcrypt";
import { pool } from "../lib/db";

interface Participant {
  name: string;
  email: string;
}

async function main() {
  // 1. READ — participants.csv is plain text sitting on disk, this just
  //    loads it into memory as a string, then `parse` turns that string
  //    into an array of objects: [{ name: "...", email: "..." }, ...]
  const csvContent = readFileSync("./participants.csv", "utf8");
  const participants: Participant[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // This array collects output lines as we go — written to disk once,
  // at the very end, not row-by-row (avoids partial/corrupt files if
  // something crashes halfway through)
  const outputLines: string[] = ["name,email,password"];

  for (const person of participants) {
    // 2. GENERATE — a random password, one per player. Nothing here
    //    talks to the database yet, this is pure JavaScript.
    const password = Math.random().toString(36).slice(2, 10);

    // 3. HASH — same bcrypt call, same cost factor (12), as your
    //    manual test earlier. This must happen BEFORE step 4 — the
    //    database should never see the plaintext password at all.
    const passwordHash = await bcrypt.hash(password, 12);

    // 4. INSERT — this is the only line that actually reaches Postgres.
    //    pool.query() sends this exact SQL over the connection lib/db.ts
    //    set up. $1/$2/$3 are pg's placeholder syntax (not shell, not
    //    bash — this is why writing it this way sidesteps the whole
    //    shell-quoting problem from before entirely).
    try {
      await pool.query(
        `INSERT INTO lore_players (email, password_hash, crew_handle)
         VALUES ($1, $2, $3)`,
        [person.email, passwordHash, person.name],
      );
      console.log(`Created: ${person.email}`);
      outputLines.push(`${person.name},${person.email},${password}`);
    } catch (err) {
      // Most likely cause: UNIQUE constraint on email — Postgres itself
      // refusing a duplicate, exactly as discussed earlier
      console.error(`Failed for ${person.email}:`, (err as Error).message);
    }
  }

  // 5. WRITE — the only output artifact of this whole script. This file
  //    is what you'd actually use to send crew-access emails.
  writeFileSync("./credentials.csv", outputLines.join("\n"));
  console.log("Done — see credentials.csv");

  // 6. Close the connection pool cleanly, or the script hangs forever
  //    waiting on an open connection instead of exiting
  await pool.end();
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
