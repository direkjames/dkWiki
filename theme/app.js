/* dk suite wiki: theme toggle, search, copy buttons, mobile menu and the table-of-contents highlight.
   No dependencies. Everything on the site still reads fine if this file fails to load. */
(() => {
  'use strict';
  const root = document.documentElement;
  const base = root.dataset.base || '/';
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // ------------------------------------------------------------ toast
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1600);
  }

  // ------------------------------------------------------------ theme
  const themeBtn = $('[data-theme-toggle]');
  function syncThemeButton() {
    if (!themeBtn) return;
    const dark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncThemeButton();
  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('dkwiki-theme', next); } catch (e) { /* private mode: still works for this visit */ }
    syncThemeButton();
  });

  // ------------------------------------------------------------ copy
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  document.addEventListener('click', async (e) => {
    const codeBtn = e.target.closest('[data-copy-code]');
    if (codeBtn) {
      const code = codeBtn.closest('figure')?.querySelector('pre code');
      if (code && (await copyText(code.textContent))) {
        const old = codeBtn.textContent;
        codeBtn.textContent = 'Copied';
        setTimeout(() => (codeBtn.textContent = old), 1400);
        toast('Copied to clipboard');
      } else toast('Could not copy. Select the text and copy it by hand.');
      return;
    }
    const cmd = e.target.closest('code[data-copy]');
    if (cmd) {
      if (await copyText(cmd.textContent)) {
        cmd.classList.add('copied');
        setTimeout(() => cmd.classList.remove('copied'), 1000);
        toast(`Copied ${cmd.textContent.split(/\s/)[0]}`);
      } else toast('Could not copy. Select the text and copy it by hand.');
    }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('code[data-copy]')) {
      e.preventDefault();
      e.target.click();
    }
  });

  // ------------------------------------------------------------ mobile navigation
  const navToggle = $('[data-nav-toggle]');
  const sidebar = $('#sidebar');
  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    navToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) $('summary', sidebar)?.focus();
    else if (document.activeElement && sidebar?.contains(document.activeElement)) navToggle?.focus();
  }
  navToggle?.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  $('[data-nav-close]')?.addEventListener('click', () => setNav(false));
  sidebar?.addEventListener('click', (e) => { if (e.target.closest('a') && matchMedia('(max-width: 860px)').matches) setNav(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setNav(false); });
  const current = $('[aria-current="page"]', sidebar || document);
  if (sidebar && current) sidebar.scrollTop = Math.max(0, current.offsetTop - sidebar.clientHeight / 3);

  // ------------------------------------------------------------ table of contents highlight
  const tocLinks = new Map($$('.toc a').map((a) => [a.getAttribute('href').slice(1), a]));
  if (tocLinks.size && 'IntersectionObserver' in window) {
    const heads = $$('.prose h2[id], .prose h3[id]');
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) (en.isIntersecting ? visible.add(en.target.id) : visible.delete(en.target.id));
        const first = heads.find((h) => visible.has(h.id));
        if (!first) return;
        tocLinks.forEach((a) => a.classList.remove('active'));
        tocLinks.get(first.id)?.classList.add('active');
      },
      { rootMargin: '-72px 0px -70% 0px' },
    );
    heads.forEach((h) => io.observe(h));
  }

  // ------------------------------------------------------------ search
  const dlg = $('#search');
  const input = $('#search-input');
  const results = $('#search-results');
  const hint = $('#search-hint');
  if (!dlg || !input || !results) return;
  hint.setAttribute('role', 'status');

  let index = null;
  let loading = null;
  let active = -1;
  let shown = [];

  function loadIndex() {
    if (index) return Promise.resolve(index);
    loading ||= fetch(`${base}search-index.json`)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((rows) => (index = rows.map((r) => ({ ...r, tl: r.t.toLowerCase(), hl: r.h.toLowerCase(), gl: r.g.toLowerCase(), xl: r.x.toLowerCase() }))));
    return loading;
  }

  const cmdLike = (t) => new RegExp('/(?:[a-z]+ )?' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  function run(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const phrase = terms.join(' ');
    const out = [];
    for (const e of index) {
      let score = 0;
      let all = true;
      for (const t of terms) {
        let s = 0;
        if (e.hl.includes(t)) s += e.hl.startsWith(t) ? 12 : 8;
        if (e.tl.includes(t)) s += 5;
        if (e.gl.includes(t)) s += 2;
        if (e.xl.includes(t)) s += 1;
        if (!s) { all = false; break; }
        score += s;
      }
      if (!all) continue;
      if (terms.length > 1) {
        if (e.hl.includes(phrase)) score += 10;
        if (e.tl.includes(phrase)) score += 6;
        if (e.xl.includes(phrase)) score += 10;
      }
      // a term written like a command ("/ledger freeze" or "/bank") is probably what they want
      for (const t of terms) if (cmdLike(t).test(e.xl)) score += 3;
      // shorter passages are more precise than long ones
      score += 4 * (1 - Math.min(e.xl.length, 1000) / 1000);
      out.push({ e, score });
    }
    out.sort((a, b) => b.score - a.score);
    const seen = new Set();
    return out.filter(({ e }) => (seen.has(e.u) ? false : seen.add(e.u))).slice(0, 12).map((o) => o.e);
  }

  function snippet(text, terms) {
    const lower = text.toLowerCase();
    let at = -1;
    for (const t of terms) { const i = lower.indexOf(t); if (i !== -1 && (at === -1 || i < at)) at = i; }
    const start = Math.max(0, (at === -1 ? 0 : at) - 40);
    const piece = text.slice(start, start + 170);
    const frag = document.createDocumentFragment();
    if (start > 0) frag.append('… ');
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    piece.split(re).forEach((part, i) => {
      if (i % 2 === 1) { const m = document.createElement('mark'); m.textContent = part; frag.append(m); }
      else frag.append(part);
    });
    if (start + 170 < text.length) frag.append(' …');
    return frag;
  }

  function select(i) {
    const rows = $$('.res', results);
    if (!rows.length) return;
    active = (i + rows.length) % rows.length;
    rows.forEach((r, n) => r.setAttribute('aria-selected', String(n === active)));
    rows[active].scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', rows[active].id);
  }

  function render(q) {
    results.replaceChildren();
    active = -1;
    input.removeAttribute('aria-activedescendant');
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) { shown = []; hint.textContent = 'Type to search. Use the arrow keys and Enter to open a result.'; return; }
    shown = run(q);
    if (!shown.length) {
      const p = document.createElement('p');
      p.className = 'search-empty';
      p.textContent = `Nothing matches "${q}". Try a shorter word, like a command name or a setting.`;
      results.append(p);
      hint.textContent = 'No results.';
      return;
    }
    shown.forEach((e, n) => {
      const a = document.createElement('a');
      a.className = 'res';
      a.id = `res-${n}`;
      a.href = e.u;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', 'false');
      const top = document.createElement('div');
      top.className = 'res-top';
      const t = document.createElement('span'); t.className = 'res-title'; t.textContent = e.t;
      const g = document.createElement('span'); g.className = 'res-group'; g.textContent = e.g;
      top.append(t, g);
      a.append(top);
      if (e.h && e.h !== e.t) { const h = document.createElement('div'); h.className = 'res-head'; h.textContent = e.h; a.append(h); }
      const s = document.createElement('div'); s.className = 'res-snip'; s.append(snippet(e.x, terms));
      a.append(s);
      results.append(a);
    });
    hint.textContent = `${shown.length} result${shown.length === 1 ? '' : 's'}`;
    select(0);
  }

  async function openSearch() {
    if (!dlg.open) dlg.showModal();
    input.focus();
    input.select();
    try { await loadIndex(); render(input.value); }
    catch (e) { results.replaceChildren(); const p = document.createElement('p'); p.className = 'search-empty'; p.textContent = 'Search could not load. Open the wiki from its web address (not as a file) and try again.'; results.append(p); }
  }

  $$('[data-search-open]').forEach((b) => b.addEventListener('click', openSearch));
  input.addEventListener('input', () => { if (index) render(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(active - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const rows = $$('.res', results);
      if (rows[active]) location.href = rows[active].href;
    }
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  results.addEventListener('click', () => dlg.close());
  document.addEventListener('keydown', (e) => {
    const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); dlg.open ? dlg.close() : openSearch(); }
    else if (e.key === '/' && !typing && !dlg.open) { e.preventDefault(); openSearch(); }
  });
  // show the right shortcut on Apple devices
  if (/Mac|iPhone|iPad/.test(navigator.platform)) $$('kbd').forEach((k) => { if (k.textContent === 'Ctrl K') k.textContent = '⌘K'; });
})();
