// roast-fridge-v1: one-line roast of a fridge, written fresh for
// "One Line, One Laugh: Roast Your Fridge" (make.fun).
// Runtime: node22, no dependencies. Writes exactly one line to entry.txt.
const fs = require("node:fs");
const path = require("node:path");

const LINE =
  "My fridge hums all night like it pays rent, yet the coldest thing inside is a jar of pickles older than my last relationship, lit by a bulb that judges me at 2 a.m.";

// The judge rejects anything outside 1-200 chars, so fail loudly here
// instead of shipping a line the gate would throw away.
function validateLine(line) {
  if (typeof line !== "string" || line.trim().length === 0) {
    throw new Error("roast line must not be blank");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast line must be 1-200 chars, got ${line.length}`);
  }
  return line;
}

// One trailing newline: exactly one line in the file, nothing more.
function writeEntry(line, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, line + "\n", "utf8");
  return target;
}

const outDir = process.env.OUTPUT_DIR || "/output";
const target = writeEntry(validateLine(LINE), outDir);
console.log(`wrote ${LINE.length} chars to ${target}`);
