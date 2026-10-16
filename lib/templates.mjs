// Page templates: the shared layout, doc pages, the chest-menu home page and the 404.

import { esc } from './util.mjs';
import { icon } from './icons.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400..700&family=JetBrains+Mono:wght@400..600&display=swap';

const AUDIENCE = { players: 'Players', staff: 'Staff', developers: 'Developers' };

const brandMark = `<svg class="brand-mark" width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" focusable="false"><path d="M13 2.5 22.5 8v10L13 23.5 3.5 18V8z" fill="var(--accent)"/><path d="M13 13 3.5 8 13 2.5 22.5 8z" fill="#fff" fill-opacity=".38"/><path d="M13 13v10.5L3.5 18V8z" fill="#000" fill-opacity=".14"/></svg>`;

const themeScript = `(function(){try{var t=localStorage.getItem('dkwiki-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

function head(site, { title, description, assets }) {
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<meta name="author" content="${esc(site.cfg.author)}">
<link rel="icon" href="${site.base}assets/favicon.svg" type="image/svg+xml">
<script>${themeScript}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${site.base}assets/style.css?v=${assets.css}">
</head>`;
}

function topbar(site) {
  return `<header class="topbar">
<button type="button" class="icon-btn nav-toggle" data-nav-toggle aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${icon('menu')}</button>
<a class="brand" href="${site.base}">${brandMark}<span class="brand-name">dk suite</span><span class="brand-sub">wiki</span></a>
<span class="spacer"></span>
<button type="button" class="search-btn" data-search-open aria-label="Search the wiki">${icon('search', { size: 18 })}<span class="search-label">Search</span><kbd>Ctrl K</kbd></button>
<button type="button" class="icon-btn theme-toggle" data-theme-toggle aria-label="Switch to dark theme" aria-pressed="false"><span class="ti ti-sun">${icon('sun')}</span><span class="ti ti-moon">${icon('moon')}</span></button>
</header>`;
}

function searchDialog() {
  return `<dialog class="search" id="search" aria-label="Search the wiki">
<form method="dialog" class="search-form" role="search">
${icon('search', { size: 20 })}
<input type="search" id="search-input" placeholder="Search commands, settings, features" autocomplete="off" spellcheck="false" aria-controls="search-results" aria-label="Search">
<button type="submit" class="icon-btn" aria-label="Close search">${icon('close', { size: 18 })}</button>
</form>
<div id="search-results" class="search-results" role="listbox" aria-label="Results"></div>
<p class="search-hint" id="search-hint">Type to search. Use the arrow keys and Enter to open a result.</p>
</dialog>`;
}

function sidebar(site, current) {
  const groups = site.sections
    .map((s) => {
      const open = current ? current.section === s || s.kind === 'guide' : s.kind === 'guide';
      const items = s.pages
        .map((p) => {
          const here = current === p;
          return `<li><a href="${p.url}"${here ? ' aria-current="page"' : ''}>${esc(p.isIndex ? 'Overview' : p.title)}${p.private ? ' <span class="nav-status">private</span>' : ''}</a></li>`;
        })
        .join('');
      const dot = s.kind === 'plugin' ? `<span class="dot p-${esc(s.id.replace(/^dk/, ''))}" aria-hidden="true"></span>` : '';
      const status = s.status === 'writing' ? '<span class="nav-status">writing</span>' : '';
      return `<details class="nav-group"${open ? ' open' : ''}><summary>${dot}<span class="nav-title">${esc(s.title)}</span>${status}</summary><ul>${items}</ul></details>`;
    })
    .join('');
  const soon = site.plugins
    .filter((p) => !p.docs)
    .map((p) => `<li><span class="soon" title="Docs coming">${esc(p.title)}</span></li>`)
    .join('');
  return `<nav class="sidebar" id="sidebar" aria-label="Wiki">${groups}<div class="nav-soon"><p>Coming next</p><ul>${soon}</ul></div></nav>`;
}

function footer(site) {
  return `<footer class="site-footer"><p>Written by ${esc(site.cfg.author)} for the dk suite.</p></footer>`;
}

function shellScripts(site, assets) {
  return `<script src="${site.base}assets/app.js?v=${assets.js}" defer></script>`;
}

function badges(page) {
  const out = page.audience.map((a) => `<span class="aud aud-${esc(a)}">${esc(AUDIENCE[a] || a)}</span>`);
  if (page.private) out.push('<span class="aud aud-private">Private: not published</span>');
  const v = page.section.version;
  if (v && page.section.kind === 'plugin') out.push(`<span class="ver">Documents ${esc(page.section.title)} ${esc(v)}</span>`);
  return out.length ? `<div class="meta">${out.join('')}</div>` : '';
}

function pager(site, page) {
  const list = page.section.pages;
  const i = list.indexOf(page);
  const prev = list[i - 1];
  const next = list[i + 1];
  if (!prev && !next) return '';
  const a = (p, dir) =>
    p
      ? `<a class="pager-${dir}" href="${p.url}" rel="${dir === 'prev' ? 'prev' : 'next'}"><span class="pager-label">${dir === 'prev' ? 'Previous' : 'Next'}</span><span class="pager-title">${esc(p.isIndex ? `${page.section.title} overview` : p.title)}</span></a>`
      : '<span></span>';
  return `<nav class="pager" aria-label="Pages in ${esc(page.section.title)}">${a(prev, 'prev')}${a(next, 'next')}</nav>`;
}

export function renderPage(site, page, assets) {
  const s = page.section;
  const crumbs = page.isIndex
    ? `<li aria-current="page">${esc(s.title)}</li>`
    : `<li><a href="${site.url(`${s.id}/`)}">${esc(s.title)}</a></li><li aria-current="page">${esc(page.title)}</li>`;
  const toc = page.headings.length > 1
    ? `<aside class="toc" aria-label="On this page"><p class="toc-title">On this page</p><ol>${page.headings
        .map((h) => `<li class="toc-l${h.level}"><a href="#${h.id}">${esc(h.text)}</a></li>`)
        .join('')}</ol></aside>`
    : '<aside class="toc" aria-hidden="true"></aside>';
  const edit = `https://github.com/${site.cfg.repo}/edit/${site.cfg.branch}/content/${page.file}`;
  const title = page.isIndex ? `${s.title} - ${site.cfg.title}` : `${page.title} - ${s.title} - ${site.cfg.title}`;
  const pluginClass = s.kind === 'plugin' ? ` p-${s.id.replace(/^dk/, '')}` : ' p-core';
  return `<!doctype html>
<html lang="en" data-base="${site.base}">
${head(site, { title, description: page.description, assets })}
<body>
<a class="skip" href="#main">Skip to content</a>
${topbar(site)}
<div class="shell">
${sidebar(site, page)}
<main id="main" class="main${pluginClass}" tabindex="-1">
<article class="article">
<header class="page-head">
<nav aria-label="Breadcrumb" class="crumbs"><ol>${crumbs}</ol></nav>
<h1>${esc(page.title)}</h1>
<p class="lede">${esc(page.description)}</p>
${badges(page)}
</header>
<div class="prose">
${page.html}
</div>
${pager(site, page)}
<p class="edit"><a class="ext" href="${edit}" target="_blank" rel="noopener noreferrer">${icon('edit', { size: 16 })}Suggest a fix to this page</a></p>
</article>
${toc}
</main>
</div>
${footer(site)}
<div class="scrim" data-nav-close></div>
${searchDialog()}
<div class="toast" role="status" aria-live="polite" id="toast"></div>
${shellScripts(site, assets)}
</body>
</html>`;
}

// ------------------------------------------------------------------ home

const SLOTS = {
  4: { kind: 'page', id: 'guide', title: 'How it fits together', lore: 'Start here: the suite in one picture.', icon: 'guide', color: 'core', page: 'start/how-the-suite-fits.md' },
  10: { kind: 'plugin', id: 'dkbank' },
  11: { kind: 'plugin', id: 'dkledger' },
  12: { kind: 'plugin', id: 'dkstock' },
  13: { kind: 'plugin', id: 'dkcore' },
  14: { kind: 'plugin', id: 'dkafk' },
  15: { kind: 'plugin', id: 'dksleep' },
  16: { kind: 'plugin', id: 'dkcodes' },
  21: { kind: 'plugin', id: 'dkcommands' },
  22: { kind: 'plugin', id: 'dkcrates' },
  26: { kind: 'page', id: 'glossary', title: 'Glossary', lore: 'What the words on this wiki mean.', icon: 'glossary', color: 'core', page: 'start/glossary.md' },
};

const STATUS = {
  ready: ['Docs ready', 'ok'],
  writing: ['Docs being written', 'wip'],
  soon: ['Docs coming', 'later'],
};

function chest(site) {
  const byId = new Map(site.plugins.map((p) => [p.id, p]));
  const pageByFile = new Map(site.pages.map((p) => [p.file, p]));
  let n = 0;
  const cells = [];
  for (let i = 0; i < 27; i++) {
    const def = SLOTS[i];
    const col = i % 9;
    const row = Math.floor(i / 9);
    const side = col <= 1 ? ' tip-left' : col >= 7 ? ' tip-right' : '';
    const pos = (row === 0 ? ' tip-below' : '') + side;
    if (!def) {
      cells.push('<span class="slot" aria-hidden="true"></span>');
      continue;
    }
    const idx = n++;
    let name, lore, status, href, ic, color;
    if (def.kind === 'plugin') {
      const p = byId.get(def.id);
      if (!p) throw new Error(`home: no plugin "${def.id}"`);
      name = p.title;
      lore = p.tagline;
      status = STATUS[p.status] || STATUS.soon;
      href = p.docs ? p.href : null;
      ic = p.icon;
      color = def.id.replace(/^dk/, '');
    } else {
      const t = pageByFile.get(def.page);
      if (!t) throw new Error(`home: no page "${def.page}"`);
      name = def.title;
      lore = def.lore;
      status = ['Open page', 'ok'];
      href = t.url;
      ic = def.icon;
      color = def.color;
    }
    const tip = `<span class="tip${pos}" aria-hidden="true"><span class="tip-name">${esc(name)}</span><span class="tip-lore">${esc(lore)}</span><span class="tip-status tip-${status[1]}">${esc(status[0])}</span></span>`;
    const label = `${name}. ${lore} ${status[0]}.`;
    const style = `style="--i:${idx}"`;
    const inner = `<span class="item p-${esc(color)}">${icon(ic, { size: 26 })}</span>${tip}`;
    cells.push(
      href
        ? `<a class="slot slot-item" ${style} href="${href}" aria-label="${esc(label)}">${inner}</a>`
        : `<span class="slot slot-item is-soon" ${style} tabindex="0" role="img" aria-label="${esc(label)}">${inner}</span>`,
    );
  }
  return `<div class="chest" role="group" aria-label="The dk suite as a chest menu: pick a plugin to open its pages">
<p class="chest-title">dk suite</p>
<div class="chest-grid">${cells.join('')}</div>
</div>`;
}

export function renderHome(site, assets) {
  const byFile = new Map(site.pages.map((p) => [p.file, p]));
  const quick = (site.cfg.quick || [])
    .map((q) => {
      const t = byFile.get(q.page);
      if (!t) throw new Error(`site.json quick: no page "${q.page}"`);
      return `<a class="row" href="${t.url}"><span class="t">${esc(q.title)}</span><span class="d">${esc(q.desc)}</span></a>`;
    })
    .join('');
  return `<!doctype html>
<html lang="en" data-base="${site.base}">
${head(site, { title: `${site.cfg.title}: the dk suite, explained`, description: site.cfg.tagline, assets })}
<body class="home">
<a class="skip" href="#main">Skip to content</a>
${topbar(site)}
<main id="main" class="home-main" tabindex="-1">
<section class="hero">
<div class="hero-copy">
<h1>The dk suite, explained.</h1>
<p class="hero-lede">${esc(site.cfg.tagline)}</p>
<button type="button" class="hero-search" data-search-open aria-label="Search the wiki">${icon('search', { size: 20 })}<span>Search for a command, a setting or a feature</span><kbd>Ctrl K</kbd></button>
<p class="hero-hint">Or open a plugin from the chest. Hover or focus an item to see what it covers.</p>
</div>
<div class="hero-chest">${chest(site)}</div>
</section>
<section class="quick" aria-labelledby="quick-title">
<h2 id="quick-title">Quick answers</h2>
<nav class="contents">${quick}</nav>
</section>
</main>
${footer(site)}
${searchDialog()}
<div class="toast" role="status" aria-live="polite" id="toast"></div>
${shellScripts(site, assets)}
</body>
</html>`;
}

export function render404(site, assets) {
  return `<!doctype html>
<html lang="en" data-base="${site.base}">
${head(site, { title: `Page not found - ${site.cfg.title}`, description: 'This page does not exist.', assets })}
<body class="home">
<a class="skip" href="#main">Skip to content</a>
${topbar(site)}
<main id="main" class="home-main notfound" tabindex="-1">
<h1>That page doesn't exist.</h1>
<p>It may have moved or been renamed. Search for what you were looking for, or start from the home page.</p>
<p><button type="button" class="btn" data-search-open>Search the wiki</button> <a class="btn btn-quiet" href="${site.base}">Go to the home page</a></p>
</main>
${footer(site)}
${searchDialog()}
<div class="toast" role="status" aria-live="polite" id="toast"></div>
${shellScripts(site, assets)}
</body>
</html>`;
}
