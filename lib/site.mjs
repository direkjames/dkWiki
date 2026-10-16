// Reads content/, works out every page's address, and renders each page's Markdown.

import fs from 'node:fs';
import path from 'node:path';
import { idMaker, parseFrontMatter, stripTags } from './util.mjs';
import { renderMarkdown } from './markdown.mjs';
import { makeGenerator } from './generate.mjs';

const read = (p) => fs.readFileSync(p, 'utf8');

export function loadSite(root, { base, includePrivate = false }) {
  const cfg = JSON.parse(read(path.join(root, 'site.json')));
  const siteBase = base.endsWith('/') ? base : `${base}/`;
  const contentDir = path.join(root, 'content');

  // ---- sections (one folder each)
  const sections = [];
  const excluded = new Set();
  for (const d of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const meta = JSON.parse(read(path.join(contentDir, d.name, '_section.json')));
    const section = { id: d.name, kind: 'plugin', status: 'ready', order: 100, ...meta, pages: [] };
    for (const f of fs.readdirSync(path.join(contentDir, d.name)).filter((n) => n.endsWith('.md'))) {
      const rel = `${d.name}/${f}`;
      const { data, body } = parseFrontMatter(read(path.join(contentDir, d.name, f)));
      const slug = f.replace(/\.md$/, '');
      if (!data.title) throw new Error(`${rel}: front matter needs a title`);
      if (!data.description) throw new Error(`${rel}: front matter needs a description`);
      const isPrivate = data.visibility === 'private';
      if (isPrivate && !includePrivate) {
        excluded.add(rel);
        continue;
      }
      section.pages.push({
        private: isPrivate,
        file: rel,
        section,
        slug,
        isIndex: slug === 'index',
        path: slug === 'index' ? `${d.name}/` : `${d.name}/${slug}/`,
        title: data.title,
        description: data.description,
        audience: (data.audience || '').split(',').map((s) => s.trim()).filter(Boolean),
        order: slug === 'index' ? 0 : Number(data.order ?? 100),
        body,
      });
    }
    section.pages.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    sections.push(section);
  }
  sections.sort((a, b) => a.order - b.order);

  const pages = sections.flatMap((s) => s.pages);
  const byFile = new Map(pages.map((p) => [p.file, p]));
  const url = (p) => siteBase + p;

  // ---- plugins (for the chest menu and the stack picture)
  const plugins = [
    ...sections
      .filter((s) => s.kind === 'plugin')
      .map((s) => ({
        id: s.id,
        title: s.title,
        icon: s.icon || s.id.replace(/^dk/, ''),
        tagline: s.tagline,
        status: s.status,
        docs: true,
        href: url(`${s.id}/`),
        pageCount: s.pages.length,
      })),
    ...cfg.upcoming.map((u) => ({ ...u, status: 'soon', docs: false, href: null, pageCount: 0 })),
  ];

  const generate = makeGenerator({ root, plugins });

  // ---- render
  for (const page of pages) {
    const dir = path.posix.dirname(page.file);
    const ctx = {
      uid: idMaker(),
      generate,
      includePrivate,
      resolveLink(href) {
        if (/^(https?:|mailto:)/.test(href)) return { href, external: true };
        {
          // a link to a page that is not published becomes plain text
          const f = href.split('#')[0];
          if (f.endsWith('.md') && excluded.has(path.posix.normalize(path.posix.join(dir, f)))) return { href: null };
        }
        if (href.startsWith('#')) return { href };
        if (href.startsWith('/')) return { href: siteBase + href.slice(1) };
        const [file, hash] = href.split('#');
        if (file.endsWith('.md')) {
          const target = path.posix.normalize(path.posix.join(dir, file));
          const t = byFile.get(target);
          if (!t) throw new Error(`${page.file}: link to "${href}" does not match a page`);
          return { href: url(t.path) + (hash ? `#${hash}` : '') };
        }
        throw new Error(`${page.file}: link "${href}" must be a .md file, an http(s) link or start with /`);
      },
    };
    const out = renderMarkdown(page.body, ctx);
    page.html = out.html;
    page.headings = out.headings.filter((h) => h.level <= 3);
    page.searchSections = out.sections;
    page.url = url(page.path);
  }

  const pageUrls = new Set(pages.map((p) => url(p.path)));
  return { cfg, base: siteBase, sections, pages, plugins, url, pageUrls, stripTags, excluded, includePrivate };
}
