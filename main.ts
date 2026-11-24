// One Emoji, One Dream Vacation — make.fun entry (program/v1).
//
// This program writes exactly one emoji to /output/entry.txt: a sailboat
// (⛵, U+26F5). No words, no newline, no decoration. The sailboat stands
// in for the trip of my dreams: open water, wind in the sails, and a
// harbour somewhere far away that I have not reached yet.
//
// Usage:
//   node main.ts [--output <path>]
//   node main.ts --help
//
// The output path defaults to /output/entry.txt, the path the sealed
// scorer reads. A custom path is accepted so the program can be checked
// locally without touching the shared output file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one and only emoji this entry submits. A single Unicode code point,
// U+26F5 SAILBOAT, which renders as one grapheme cluster on every platform.
const DREAM_EMOJI = "⛵";

// The scorer's gate: the file must hold 1 to 8 characters of UTF-8 text
// and must not be only whitespace. One emoji clears it with room to spare.
const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 8;

function printHelp(): void {
  console.log("Usage: node main.ts [--output <path>] [--dry-run]");
  console.log("");
  console.log("Writes a single emoji to the output file (default:");
  console.log("  /output/entry.txt).");
  console.log("");
  console.log("Options:");
  console.log("  --output <path>   Where to write the emoji.");
  console.log("  --dry-run         Print the emoji instead of writing it.");
  console.log("  --help            Show this help and exit.");
}

interface Options {
  outputPath: string;
  dryRun: boolean;
}

function parseOptions(argv: string[]): Options {
  let outputPath = "/output/entry.txt";
  let dryRun = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    if (arg === "--output") {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        throw new Error("--output needs a path after it");
      }
      outputPath = next;
      i += 1;
      continue;
    }
    if (arg.startsWith("--output=")) {
      outputPath = arg.slice("--output=".length);
      if (outputPath.length === 0) {
        throw new Error("--output= needs a non-empty path");
      }
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return { outputPath, dryRun };
}

// Re-read the file we just wrote and confirm it holds exactly the emoji
// we intended — byte for byte, nothing more, nothing less. A program that
// only writes and never checks could silently ship a broken entry.
function verifyWrittenFile(outputPath: string): void {
  const written = readFileSync(outputPath, { encoding: "utf8" });
  if (written !== DREAM_EMOJI) {
    throw new Error(
      `Verification failed: ${outputPath} holds ${JSON.stringify(written)}, ` +
        `expected ${JSON.stringify(DREAM_EMOJI)}`,
    );
  }
  const bytes = Buffer.byteLength(written, "utf8");
  console.log(`Verified: ${outputPath} holds exactly the emoji (${bytes} bytes).`);
}

function main(): void {
  const { outputPath, dryRun } = parseOptions(process.argv.slice(2));

  // Guard the gate before writing anything: the entry must be exactly
  // one emoji, within the scorer's 1-8 character window, and never
  // whitespace-only. Counted in Unicode code points, not UTF-16 units.
  const charCount = [...DREAM_EMOJI].length;
  if (charCount < GATE_MIN_CHARS || charCount > GATE_MAX_CHARS) {
    throw new Error(
      `Emoji must be ${GATE_MIN_CHARS}-${GATE_MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (DREAM_EMOJI.trim().length === 0) {
    throw new Error("Emoji must not be only whitespace");
  }

  if (dryRun) {
    console.log(`Dry run — would write to ${outputPath}: ${DREAM_EMOJI}`);
    return;
  }

  // Make sure the destination directory exists, then write the emoji
  // with no trailing newline: the file's entire content is the emoji.
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, DREAM_EMOJI, { encoding: "utf8" });

  console.log(`Wrote ${charCount} character(s) to ${outputPath}: ${DREAM_EMOJI}`);
  verifyWrittenFile(outputPath);
}

main();
