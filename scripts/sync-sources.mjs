#!/usr/bin/env node
// Refreshes data/sources/<plugin>/ from each plugin's GitHub repo (public repos, shallow clone).
// Run it whenever a plugin changes:   npm run sync
// Or read unzipped project folders:   node scripts/sync-sources.mjs --from <folder>
// Then rebuild the site:              npm run build
//
// Optional: a local file named ".scrub" (kept out of git) lists rules, one per line, so a snapshot
// never carries a name you don't want on the wiki:
//   term              comment lines say "shop" instead; a real setting line naming it is left out
//   term => other     replaced everywhere (handy for swapping a real domain for example.com)

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sourcesPath = path.join(root, 'data/sources.json');
const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));

const args = process.argv.slice(2);
const fromAt = args.indexOf('--from');
const fromDir = fromAt === -1 ? null : path.resolve(args.splice(fromAt, 2)[1] ?? '');
const only = args;
const scrubFile = path.join(root, '.scrub');
const terms = fs.existsSync(scrubFile)
  ? fs.readFileSync(scrubFile, 'utf8').split('\n').map((t) => t.trim()).filter(Boolean)
  : [];

function scrub(text) {
  if (!terms.length) return text;
  const rules = terms.map((t) => {
    const [from, to] = t.split('=>').map((x) => x.trim());
    return { re: new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), to };
  });
  return text
    .split('\n')
    .flatMap((line) => {
      let out = line;
      for (const { re, to } of rules) {
        re.lastIndex = 0;
        if (!re.test(out)) continue;
        re.lastIndex = 0;
        if (to !== undefined) out = out.replace(re, to); // "term => replacement": replaced everywhere
        else if (/^\s*#/.test(out)) out = out.replace(re, 'shop'); // bare term: comments are reworded
        else return []; // bare term in a real setting: the line is left out
      }
      return [out];
    })
    .join('\n');
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dkwiki-sync-'));
let failed = 0;

for (const [name, src] of Object.entries(sources)) {
  if (only.length && !only.includes(name)) continue;
  const dir = path.join(tmp, name);
  try {
    if (fromDir) {
      // local project folder, named after the plugin (for example <folder>/dkStock)
      const local = fs.readdirSync(fromDir).find((d) => d.toLowerCase() === name);
      if (!local) throw new Error(`no folder named ${name} in ${fromDir}`);
      const outDir = path.join(root, 'data/sources', name);
      fs.mkdirSync(outDir, { recursive: true });
      for (const [file, rel] of Object.entries(src.files)) {
        fs.writeFileSync(path.join(outDir, file), scrub(fs.readFileSync(path.join(fromDir, local, rel), 'utf8')));
      }
      delete src.commit;
      src.snapshot = new Date().toISOString().slice(0, 10);
      console.log(`copied ${name} from ${path.join(fromDir, local)}`);
      continue;
    }
    execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${src.repo}`, dir], {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, GIT_LFS_SKIP_SMUDGE: '1', GIT_TERMINAL_PROMPT: '0' },
    });
    const sha = execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD']).toString().trim();
    const subject = execFileSync('git', ['-C', dir, 'log', '-1', '--format=%s']).toString().trim();
    const outDir = path.join(root, 'data/sources', name);
    fs.mkdirSync(outDir, { recursive: true });
    for (const [file, rel] of Object.entries(src.files)) {
      fs.writeFileSync(path.join(outDir, file), scrub(fs.readFileSync(path.join(dir, rel), 'utf8')));
    }
    src.commit = sha;
    console.log(`synced ${name} @ ${sha}  ${subject.slice(0, 70)}`);
  } catch (e) {
    failed++;
    console.error(`could not sync ${name} (${src.repo}): ${e.message.split('\n')[0]}. Keeping the saved copy.`);
  }
}

fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + '\n');
fs.rmSync(tmp, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
