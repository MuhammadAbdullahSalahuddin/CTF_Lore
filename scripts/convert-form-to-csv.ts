// scripts/convert-form-to-csv.ts
import * as XLSX from "xlsx";
import { writeFileSync } from "fs";

const SOURCE_FILE = "./Contact_Information__Responses_.xlsx"; // adjust path/filename as needed

const workbook = XLSX.readFile(SOURCE_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// These numbers are the column positions in YOUR form, in order:
// 0=Timestamp, 1=Full name, 2=Email, 3=Phone, 4=Username, 5=Quote, 6=Email Address(2nd)
const COL_NAME = 1;
const COL_EMAIL = 2;
const COL_PHONE = 3;
const COL_USERNAME = 4;

const outputLines = ["name,email,phone,username"];

for (const row of rows.slice(1)) { // slice(1) skips the header row
  const name = String(row[COL_NAME] ?? "").trim();
  const email = String(row[COL_EMAIL] ?? "").trim().toLowerCase();
  const phone = String(row[COL_PHONE] ?? "").trim();
  const username = String(row[COL_USERNAME] ?? "").trim();

  if (!name || !email || !username) {
    console.warn(`Skipping incomplete row: ${JSON.stringify(row)}`);
    continue;
  }

  outputLines.push(`"${name}","${email}","${phone}","${username}"`);
}

writeFileSync("./participants.csv", outputLines.join("\n"));
console.log(`Wrote ${outputLines.length - 1} players to participants.csv`);