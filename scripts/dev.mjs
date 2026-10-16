#!/usr/bin/env node
// Local preview: builds the FULL wiki (including private pages) at http://localhost:4173/
// and rebuilds when a file changes. Never publish this build: use `npm run build` for that.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT || 4173);
const env = { ...process.env, WIKI_BASE: '/', WIKI_PRIVATE: '1' };

function build() {
  const r = spawnSync(process.execPath, ['build.mjs'], { cwd: root, env, encoding: 'utf8' });
  process.stdout.write(r.stdout || '');
  if (r.status !== 0) process.stderr.write(r.stderr || '');
  return r.status === 0;
}

build();

let timer;
for (const dir of ['content', 'theme', 'lib', 'data']) {
  fs.watch(path.join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
}
fs.watch(path.join(root, 'site.json'), () => { clearTimeout(timer); timer = setTimeout(build, 150); });

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(dist, p);
    if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'content-type': types['.html'] });
      res.end(fs.readFileSync(path.join(dist, '404.html')));
      return;
    }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`\nPrivate preview at http://localhost:${port}/  (do not publish this build)`));
