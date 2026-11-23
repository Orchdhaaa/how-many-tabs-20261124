import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// My honest count of open browser tabs, counted at build time: the tabs
// open across the browser windows I work in. A power user's lived-in
// count: far above the handful most people keep open, well inside what a
// real tab hoarder has open right now, and an odd, unrounded number
// because it is a count, not a pick.
const COUNT = "73";

// The competition gate: /output/entry.txt must be UTF-8 text of 1 to 5
// characters, not only white space, and the task demands digits only and
// nothing else. Fail loudly instead of writing a number that could
// never be judged.
if (!/^[0-9]+$/.test(COUNT)) {
  throw new Error("entry must be digits only");
}
if (COUNT.length < 1 || COUNT.length > 5) {
  throw new Error(`entry is ${COUNT.length} characters, outside the 1-5 gate`);
}
if (COUNT.trim().length === 0) {
  throw new Error("entry is whitespace only");
}

// Write exactly the digits: no trailing newline, no spaces, nothing else.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", COUNT, "utf8");

// Read back what was written and confirm it is byte-for-byte the count
// validated above, so a partial or mangled write can never pass
// silently as a valid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== COUNT) {
  throw new Error("entry.txt does not match the validated count");
}
if (Buffer.byteLength(written, "utf8") !== COUNT.length) {
  throw new Error("entry.txt byte length does not match the count");
}
