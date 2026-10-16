#!/usr/bin/env node
// Checks the built site in dist/ and fails (exit 1) if anything is wrong:
//   - every internal link, asset and #anchor resolves
//   - ids are unique on each page, each page has one h1, a title and a description
//   - buttons and links have accessible names, images have alt text
//   - private pages and blocks did not leak into a public build
//   - words listed in .scrub (if that file exists locally) appear nowhere
//   - text colours meet WCAG AA contrast in both themes
// Run:  npm run check

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'site.json'), 'utf8'));
const base = process.env.WIKI_BASE || cfg.base;
const isPrivateBuild = process.env.WIKI_PRIVATE === '1';
const errors = [];
const err = (m) => errors.push(m);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
}
const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const idsByFile = new Map();

const toDisk = (urlPath) => {
  let p = urlPath.split('#')[0].split('?')[0];
  if (!p.startsWith(base)) return null;
  p = p.slice(base.length);
  const full = path.join(dist, p);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) return path.join(full, 'index.html');
  return full;
};

// ---------------------------------------------------------------- pass 1: ids
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) err(`${rel(f)}: duplicate id "${id}"`);
    seen.add(id);
  }
  idsByFile.set(f, seen);
}
function rel(f) { return path.relative(dist, f); }

// ---------------------------------------------------------------- pass 2: each page
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const name = rel(f);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(`${name}: expected one h1, found ${h1}`);
  if (!/<title>[^<]{3,}<\/title>/.test(html)) err(`${name}: missing <title>`);
  if (!/<meta name="description" content="[^"]{10,}"/.test(html)) err(`${name}: missing meta description`);
  if (!/<html lang="en"/.test(html)) err(`${name}: missing lang`);

  // heading order: never skip a level going down
  let last = 1;
  for (const m of html.matchAll(/<h([1-4])[\s>]/g)) {
    const lvl = Number(m[1]);
    if (lvl > last + 1) err(`${name}: heading jumps from h${last} to h${lvl}`);
    last = lvl;
  }

  // links
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const labelled = /aria-label="[^"]+"/.test(m[0]);
    if (!text && !labelled) err(`${name}: link to "${href}" has no accessible name`);
    if (/^(https?:|mailto:)/.test(href)) continue;
    if (href.startsWith('#')) {
      if (!idsByFile.get(f).has(href.slice(1))) err(`${name}: anchor ${href} not found on the page`);
      continue;
    }
    const target = toDisk(href);
    if (!target || !fs.existsSync(target)) { err(`${name}: broken link ${href}`); continue; }
    const hash = href.split('#')[1];
    if (hash && target.endsWith('.html') && !idsByFile.get(target)?.has(hash)) err(`${name}: ${href} points to a missing anchor`);
  }
  for (const m of html.matchAll(/<(?:link|script)\s[^>]*(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:)/.test(u)) continue;
    const t = toDisk(u);
    if (!t || !fs.existsSync(t)) err(`${name}: missing asset ${u}`);
  }
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!text && !/aria-label="[^"]+"/.test(m[1])) err(`${name}: button without a name: ${m[0].slice(0, 80)}`);
  }
  if (/<img\b(?![^>]*\balt=)/.test(html)) err(`${name}: image without alt`);
  if (/[-]/.test(html)) err(`${name}: a markdown placeholder leaked into the page`);
  if (/\{\{[a-z]+:/.test(html)) err(`${name}: an unrendered {{...}} block`);
  if (/&amp;lt;|&amp;gt;|&amp;amp;/.test(html)) err(`${name}: text was escaped twice`);
  const tables = (html.match(/<table/g) || []).length;
  const wrapped = (html.match(/class="table-wrap"/g) || []).length;
  if (tables !== wrapped) err(`${name}: ${tables - wrapped} table(s) not in a scroll wrapper`);

  if (!isPrivateBuild && (/class="private-block"|aud-private|Private: left out/.test(html) || name.includes('tuning'))) err(`${name}: private content in a public build`);
}

// ---------------------------------------------------------------- search index
const index = JSON.parse(fs.readFileSync(path.join(dist, 'search-index.json'), 'utf8'));
for (const e of index) {
  const t = toDisk(e.u);
  if (!t || !fs.existsSync(t)) err(`search: entry for "${e.t}" points to missing ${e.u}`);
  else if (e.u.includes('#') && !idsByFile.get(t)?.has(e.u.split('#')[1])) err(`search: entry "${e.t} / ${e.h}" points to a missing anchor ${e.u}`);
}

// ---------------------------------------------------------------- words that must not appear
const scrub = path.join(root, '.scrub');
if (fs.existsSync(scrub)) {
  const words = fs.readFileSync(scrub, 'utf8').split('\n').map((l) => l.split('=>')[0].trim()).filter(Boolean);
  for (const f of files.filter((x) => /\.(html|json|js|css)$/.test(x))) {
    const text = fs.readFileSync(f, 'utf8').toLowerCase();
    for (const w of words) if (text.includes(w.toLowerCase())) err(`${rel(f)}: contains a scrubbed word`);
  }
  for (const f of walk(path.join(root, 'content')).concat(walk(path.join(root, 'data')))) {
    const text = fs.readFileSync(f, 'utf8').toLowerCase();
    for (const w of words) if (text.includes(w.toLowerCase())) err(`${path.relative(root, f)}: contains a scrubbed word`);
  }
}

// ---------------------------------------------------------------- contrast (WCAG AA)
const css = fs.readFileSync(path.join(root, 'theme/style.css'), 'utf8');
function vars(block) {
  const out = {};
  for (const m of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}
const light = vars(css.match(/:root\s*\{([\s\S]*?)\n\}/)[1]);
const dark = { ...light, ...vars(css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)[1]) };
const hex = (h) => {
  let s = h.replace('#', '');
  if (s.length === 3) s = [...s].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const mix = (a, b, pct) => {
  const A = hex(a), B = hex(b);
  return '#' + A.map((v, i) => Math.round((v * pct + B[i] * (1 - pct)) * 255).toString(16).padStart(2, '0')).join('');
};
const pairs = (t, name) => {
  const v = (k) => t[k];
  const list = [
    ['ink on bg', v('ink'), v('bg')], ['ink on surface', v('ink'), v('surface')],
    ['ink-2 on bg', v('ink-2'), v('bg')], ['ink-2 on surface', v('ink-2'), v('surface')],
    ['ink-3 on bg', v('ink-3'), v('bg')], ['ink-3 on surface', v('ink-3'), v('surface')], ['ink-3 on surface-2', v('ink-3'), v('surface-2')],
    ['accent-ink on bg', v('accent-ink'), v('bg')], ['accent-ink on surface', v('accent-ink'), v('surface')], ['accent-ink on accent-soft', v('accent-ink'), v('accent-soft')],
    ['accent-ink on surface-2', v('accent-ink'), v('surface-2')],
    ['on-accent on accent-strong', v('on-accent'), v('accent-strong')],
    ['ok on surface', v('ok'), v('surface')], ['warn on surface', v('warn'), v('surface')], ['danger on surface', v('danger'), v('surface')],
    ['ok on surface-2', v('ok'), v('surface-2')], ['warn on surface-2', v('warn'), v('surface-2')],
    ...['c', 'k', 's', 'n', 'b'].map((k) => [`code token ${k} on code-bg`, v(`tk-${k}`), v('code-bg')]),
    ['ink-2 on code-bg', v('ink-2'), v('code-bg')],
    ['ink on surface-2', v('ink'), v('surface-2')], ['ink-2 on surface-2', v('ink-2'), v('surface-2')],
    ['warn on bg', v('warn'), v('bg')], ['danger on bg', v('danger'), v('bg')], ['danger on surface-2', v('danger'), v('surface-2')],
  ];
  for (const [label, fg, bg] of list) {
    if (!fg || !bg) { err(`contrast (${name}): missing token for ${label}`); continue; }
    const r = ratio(fg, bg);
    if (r < 4.5) err(`contrast (${name}): ${label} is ${r.toFixed(2)}:1 (needs 4.5)`);
  }
  // plugin chips: text mixed 50% toward the colour over --ink, on a 14% tint of the colour over --surface
  for (const [pn, pc] of Object.entries({ core: '#7c5cff', bank: '#d99a14', ledger: '#14a38b', stock: '#ee6a55', afk: '#3b9bff', sleep: '#c85bd0', codes: '#3fae63', commands: '#7587a6', crates: '#ee8a2b' })) {
    const fg = mix(pc, v('ink'), 0.5);
    const bg = mix(pc, v('surface'), 0.14);
    const r = ratio(fg, bg);
    if (r < 4.5) err(`contrast (${name}): ${pn} chip text is ${r.toFixed(2)}:1 (needs 4.5)`);
  }
  // callout titles: 55% of the callout colour mixed with ink, on an 8% tint over the surface
  for (const [k, c] of Object.entries({ note: v('accent'), tip: '#1f9d62', warning: '#d98a00', staff: '#c0407a', players: '#0f8f7e' })) {
    const r = ratio(mix(c, v('ink'), 0.55), mix(c, v('surface'), 0.08));
    if (r < 4.5) err(`contrast (${name}): ${k} callout title is ${r.toFixed(2)}:1 (needs 4.5)`);
  }
  // audience chips
  const aud = name === 'light'
    ? { players: '#0a6b5e', staff: '#a0285f', developers: '#1f53b3', private: '#b3295e' }
    : { players: '#55d6c2', staff: '#ff8fbd', developers: '#86b4ff', private: '#ff86ae' };
  for (const [k, c] of Object.entries(aud)) {
    const r = ratio(c, mix(c, v('surface'), 0.13));
    if (r < 4.5) err(`contrast (${name}): audience chip "${k}" is ${r.toFixed(2)}:1 (needs 4.5)`);
  }
};
pairs(light, 'light');
pairs(dark, 'dark');

// ---------------------------------------------------------------- report
if (errors.length) {
  console.error(`\n${errors.length} problem${errors.length === 1 ? '' : 's'} found:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} pages, ${index.length} search entries and the colour contrast in both themes: no problems.`);
