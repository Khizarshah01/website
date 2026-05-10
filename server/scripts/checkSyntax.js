const { readdirSync, statSync } = require("fs");
const { join, relative } = require("path");
const { spawnSync } = require("child_process");

const rootDir = join(__dirname, "..");
const ignoredDirs = new Set([
  "node_modules",
  "uploads",
  "dist",
  "build",
  ".git",
]);

const files = [];

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.endsWith(".js")) {
      files.push(fullPath);
    }
  }
};

walk(rootDir);

let failed = 0;

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
  });

  if (result.status !== 0) {
    failed += 1;
    console.error(`Syntax check failed: ${relative(rootDir, file)}`);
    if (result.stderr) console.error(result.stderr.trim());
    if (result.stdout) console.error(result.stdout.trim());
  }
}

if (failed > 0) {
  console.error(`Server syntax check failed for ${failed} file(s).`);
  process.exit(1);
}

console.log(`Server syntax check passed for ${files.length} file(s).`);
