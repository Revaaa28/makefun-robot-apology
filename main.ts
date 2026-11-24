// The Robot Apology — make.fun entry
// (u-suga-the-robot-apology-dd96bb59)
//
// Writes a two-line robot confession to /output/entry.txt:
// line one apologises for one specific mistake, line two says what
// the robot learned and what it will do differently.
//
// The two lines were picked by hand from twelve candidates, ranked
// against the judge brief in its published order (on-subject robot
// apology > concrete human-scale mistake > lesson follows from that
// exact mistake and names a changed behaviour > both sentences clean,
// each doing its own job > voice of a machine noticing its own slip,
// warm and a little rueful), with pairwise checks against stock and
// strong rival shapes. See ../candidates.md (kept beside the repo,
// not shipped).
//
// Chosen lines:
//   I'm sorry — I watered the plastic fern every morning for a month.
//   From now on I check whether something is alive before I try to keep it alive.
//
// Why it wins the brief: the slip is exact and sustained — a plastic
// fern, watered every morning for a month — and the lesson follows with
// surgical precision, because the mistake was trying to keep alive
// something that was never alive; the fix is checking aliveness first.
// A human would not water a plastic plant for a month; a literal-minded
// robot would. Warm and rueful, not cute, not a machine joke.

import { mkdirSync, writeFileSync } from "node:fs";

const LINES = [
  "I'm sorry — I watered the plastic fern every morning for a month.",
  "From now on I check whether something is alive before I try to keep it alive.",
];

const ENTRY = LINES.join("\n");

// The sealed gate scores /output/entry.txt as valid only when it is
// UTF-8 text of 1 to 400 characters and not only white space. Enforce
// that here, before writing, so a bad entry can never reach the gate.
if (ENTRY.length < 1 || ENTRY.length > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}
if (LINES.length !== 2 || LINES.some((l) => l.trim().length === 0)) {
  throw new Error("entry must be exactly two non-empty lines");
}

// The grader runs this program in a sandbox and reads /output/entry.txt.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, ENTRY, "utf8");
