import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const failures = [];
const requiredHeroClasses = [
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone",
  "hero-phone-notch",
  "hero-phone-header",
  "hero-phone-thread",
  "hero-phone-composer",
];
const bannedHex = [
  "6ebe49",
  "3d6b28",
  "168c80",
  "55baa8",
  "5bc98b",
  "2b7a4b",
  "236a42",
  "d9b8ff",
  "632ca6",
  "a259ff",
  "c7f0d8",
  "a8e6c1",
];
const skippedDirectories = new Set([".git", ".next", "node_modules", ".vercel"]);
const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".md",
  ".json",
  ".svg",
  ".txt",
  ".example",
]);

function walk(directory, files = []) {
  for (const name of readdirSync(directory)) {
    if (skippedDirectories.has(name)) continue;
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

function fail(message) {
  failures.push(message);
}

const verifierPath = join(root, "scripts/verify.mjs");
const textFiles = walk(root).filter(
  (path) =>
    path !== verifierPath &&
    (textExtensions.has(extname(path)) || path.endsWith(".env.example")),
);
const corpus = textFiles
  .map((path) => `${relative(root, path)}\n${readFileSync(path, "utf8")}`)
  .join("\n");
const hero = readFileSync(join(root, "src/components/HeroDemo.tsx"), "utf8");
const heroJobs = readFileSync(join(root, "src/data/hero-jobs.ts"), "utf8");
const page = readFileSync(
  join(root, "src/app/(protected)/page.tsx"),
  "utf8",
);
const styles = readFileSync(join(root, "src/app/globals.css"), "utf8");
const jobs = readFileSync(join(root, "src/data/jobs.ts"), "utf8");
const quotes = readFileSync(join(root, "src/data/quotes.ts"), "utf8");

for (const path of [
  "src/components/HeroDemo.tsx",
  "src/data/hero-jobs.ts",
  "src/components/QuoteWall.tsx",
  "src/data/quotes.ts",
  "public/brand/teradata-watercolor-header.png",
  "public/brand/teradata-wordmark.svg",
  "public/brand/teradata-wordmark-source.txt",
]) {
  if (!existsSync(join(root, path))) fail(`missing ${path}`);
}

for (const className of requiredHeroClasses) {
  if (!hero.includes(className)) fail(`HeroDemo is missing ${className}`);
  if (!styles.includes(`.${className}`)) {
    fail(`globals.css is missing .${className}`);
  }
}

const heroJobCount = heroJobs.match(/^\s+id: "/gm)?.length ?? 0;
if (heroJobCount !== 8) fail(`expected 8 HERO_JOBS, found ${heroJobCount}`);
if (!heroJobs.includes("export const HERO_JOBS")) {
  fail("hero jobs registry is not exported");
}
if (!page.includes("<HeroDemo />")) fail("protected page does not render HeroDemo");
if (!page.includes("<QuoteWall />")) fail("protected page does not render QuoteWall");

const quoteCount = quotes.match(/source: "https:\/\/x\.com\//g)?.length ?? 0;
if (quoteCount !== 6) fail(`expected 6 sourced quotes, found ${quoteCount}`);
const artifactCount = jobs.match(/when: "Artifact ready"/g)?.length ?? 0;
if (artifactCount !== 3) {
  fail(`expected 3 final artifact scenes, found ${artifactCount}`);
}

if (!corpus.includes("Teradata x SpaceXAI")) fail("missing page title");
if (!corpus.includes("Mike Kelly")) fail("missing footer owner");
if (!corpus.includes("michael.kelly@cursor.com")) fail("missing footer email");
if (!corpus.includes("SITE_PASSWORD")) fail("missing SITE_PASSWORD gate");
if (/(?:Datadog|Seagate|Concentrix)/i.test(corpus)) {
  fail("prior customer name remains");
}
if (/What we heard/i.test(corpus)) fail("What we heard remains");
if (corpus.includes("\u2014")) fail("em dash remains");
if (corpus.includes("land2expand")) fail("password is hardcoded");

const priorHex = new RegExp(`#(?:${bannedHex.join("|")})\\b`, "i");
if (priorHex.test(corpus)) fail("prior customer brand hex remains");

const provenance = readFileSync(
  join(root, "public/brand/teradata-wordmark-source.txt"),
  "utf8",
).trim();
if (
  provenance !==
  "https://www.teradata.com/Content/Assets/svg-defs.svg#teradata-logo"
) {
  fail("wordmark provenance is not teradata.com");
}

if (failures.length) {
  for (const message of failures) console.error(message);
  process.exit(1);
}

console.log("verify ok");
