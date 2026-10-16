#!/usr/bin/env node
// Builds the wiki into dist/. No dependencies: only Node 20+.
//   npm run build                      for GitHub Pages (base from site.json)
//   WIKI_BASE=/ npm run build          for opening the site at the root, e.g. with npm run dev

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadSite } from './lib/site.mjs';
import { renderPage, renderHome, render404 } from './lib/templates.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'site.json'), 'utf8'));
const base = process.env.WIKI_BASE || cfg.base;

const t0 = Date.now();
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });

const includePrivate = process.env.WIKI_PRIVATE === '1';
const site = loadSite(root, { base, includePrivate });

// ---- assets (hashed so browsers never keep an old stylesheet)
const hash = (file) => crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
const assets = {
  css: hash(path.join(root, 'theme/style.css')),
  js: hash(path.join(root, 'theme/app.js')),
};
for (const f of ['style.css', 'app.js']) fs.copyFileSync(path.join(root, 'theme', f), path.join(dist, 'assets', f));
fs.writeFileSync(
  path.join(dist, 'assets/favicon.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="M13 2.5 22.5 8v10L13 23.5 3.5 18V8z" fill="#7c5cff"/><path d="M13 13 3.5 8 13 2.5 22.5 8z" fill="#fff" fill-opacity=".38"/><path d="M13 13v10.5L3.5 18V8z" fill="#000" fill-opacity=".14"/></svg>\n',
);

// ---- pages
const write = (rel, content) => {
  const out = path.join(dist, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
};
write('index.html', renderHome(site, assets));
write('404.html', render404(site, assets));
for (const page of site.pages) write(path.join(page.path, 'index.html'), renderPage(site, page, assets));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

// ---- search index (long sections are split into chunks so nothing is cut off)
const CHUNK = 900;
function chunks(text) {
  if (text.length <= CHUNK) return [text];
  const out = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + CHUNK, text.length);
    if (end < text.length) {
      const sp = text.lastIndexOf(' ', end);
      if (sp > i + CHUNK * 0.6) end = sp;
    }
    out.push(text.slice(i, end).trim());
    if (end >= text.length) break;
    i = Math.max(end - 80, i + 1); // a little overlap so a phrase on the boundary is still found
  }
  return out;
}
const index = [];
for (const p of site.pages) {
  p.searchSections.forEach((s, i) => {
    const text = i === 0 ? `${p.description} ${s.text}`.trim() : s.text;
    for (const piece of chunks(text)) {
      index.push({ t: p.isIndex ? `${p.section.title} overview` : p.title, g: p.section.title, h: s.heading, u: p.url + (s.id ? `#${s.id}` : ''), x: piece });
    }
  });
}
write('search-index.json', JSON.stringify(index));

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(
  `Built ${site.pages.length} pages and ${index.length} search entries (${kb(fs.statSync(path.join(dist, 'search-index.json')).size)}) in ${Date.now() - t0} ms. Base: ${site.base}${includePrivate ? '  (PRIVATE build: do not publish)' : ''}`,
);
