// A purpose-built Markdown renderer for the wiki (no dependencies).
// Supports: headings, paragraphs, lists (nested), tables, fenced code with title, blockquotes and
// callouts (> [!NOTE]), horizontal rules, :::details / :::steps / :::contents containers, and
// {{kind:name:arg}} lines that pull in generated content (see generate.mjs).
// All text is HTML-escaped; raw HTML in Markdown is not allowed.

import { esc, slugify, stripTags, unescapeEntities } from './util.mjs';
import { highlight } from './highlight.mjs';

const OPEN = '';
const CLOSE = '';
const ESCAPED = '';

const CALLOUTS = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  staff: 'Staff only',
  players: 'For players',
};

// ---------------------------------------------------------------- inline

export function inline(text, ctx) {
  const codes = [];
  let s = text;

  // code spans first, so nothing inside them is touched
  s = s.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_, __, code) => {
    codes.push(code.trim());
    return OPEN + (codes.length - 1) + CLOSE;
  });

  // backslash escapes so \* \_ \| etc. stay literal
  s = s.replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, (_, ch) => ESCAPED + ch.charCodeAt(0) + CLOSE);

  s = esc(s);

  // autolinks <https://...>
  s = s.replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, (_, url) => `<a class="ext" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);

  // links [text](href "title")
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_, label, href, title) => {
    const r = ctx.resolveLink(unescapeEntities(href));
    if (r.href === null) return label;
    const t = title ? ` title="${title}"` : '';
    if (r.external) return `<a class="ext" href="${esc(r.href)}"${t} target="_blank" rel="noopener noreferrer">${label}</a>`;
    return `<a href="${esc(r.href)}"${t}>${label}</a>`;
  });

  // emphasis
  s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*(?=[^\s*])([^*]*?[^\s*])\*(?![*\w])/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_(?=[^\s_])([^_]*?[^\s_])_(?!\w)/g, '$1<em>$2</em>');

  // restore code spans
  s = s.replace(new RegExp(`${OPEN}(\\d+)${CLOSE}`, 'g'), (_, n) => {
    const code = codes[Number(n)];
    const isCmd = /^\/[a-z][\w-]*(\s|$)/i.test(code);
    return isCmd
      ? `<code class="cmd" data-copy tabindex="0" role="button" title="Click to copy">${esc(code)}</code>`
      : `<code>${esc(code)}</code>`;
  });

  // restore escapes
  s = s.replace(new RegExp(`${ESCAPED}(\\d+)${CLOSE}`, 'g'), (_, n) => esc(String.fromCharCode(Number(n))));
  return s;
}

// ---------------------------------------------------------------- blocks

const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const FENCE_RE = /^```\s*([\w+-]*)\s*(.*)$/;
const HEADING_RE = /^(#{1,4})\s+(.*?)\s*#*\s*$/;
const HR_RE = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;
const DIRECTIVE_RE = /^:::(\w+)\s*(.*)$/;
const GEN_RE = /^\{\{(\w+):([\w.-]+)(?::([^}]*))?\}\}\s*$/;
const TABLE_SEP_RE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

const indentOf = (l) => l.match(/^ */)[0].length;

function splitRow(line) {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|') && !t.endsWith('\\|')) t = t.slice(0, -1);
  const cells = [];
  let cur = '';
  let inCode = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '`') inCode = !inCode;
    if (c === '\\' && t[i + 1] === '|') {
      // an escaped pipe is a literal pipe, in code or text
      cur += inCode ? '|' : '\\|';
      i++;
      continue;
    }
    if (c === '|' && !inCode) {
      cells.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  cells.push(cur.trim());
  return cells;
}

function startsBlock(line, next) {
  return (
    !line.trim() ||
    FENCE_RE.test(line) ||
    HEADING_RE.test(line) ||
    HR_RE.test(line) ||
    /^\s*>/.test(line) ||
    LIST_RE.test(line) ||
    DIRECTIVE_RE.test(line) ||
    GEN_RE.test(line) ||
    (line.includes('|') && next !== undefined && TABLE_SEP_RE.test(next) && next.includes('-'))
  );
}

export function renderMarkdown(src, ctx) {
  const state = {
    uid: ctx.uid,
    headings: [],
    sections: [{ id: '', heading: '', text: '' }],
  };
  const html = blocks(src.replace(/\r\n/g, '\n').split('\n'), ctx, state, true);
  const sections = state.sections.filter((s) => s.heading || s.text.trim());
  return { html, headings: state.headings, sections };
}

function record(state, html) {
  const text = stripTags(html);
  if (text) state.sections.at(-1).text += (state.sections.at(-1).text ? ' ' : '') + text;
}

function blocks(lines, ctx, state, top) {
  const out = [];
  const emit = (h) => {
    out.push(h);
    if (top) record(state, h);
  };
  let i = 0;
  const n = lines.length;

  while (i < n) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }

    // fenced code
    let m = line.match(FENCE_RE);
    if (m) {
      const lang = m[1];
      const info = m[2];
      const titleM = info.match(/title="([^"]*)"/);
      const buf = [];
      i++;
      while (i < n && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++; // closing fence
      const code = buf.join('\n');
      const label = titleM ? titleM[1] : lang || '';
      emit(
        `<figure class="code"><figcaption><span>${esc(label)}</span><button type="button" class="copy" data-copy-code aria-label="Copy code">Copy</button></figcaption><pre><code${lang ? ` class="lang-${esc(lang)}"` : ''}>${highlight(lang, code)}</code></pre></figure>`,
      );
      continue;
    }

    // heading
    m = line.match(HEADING_RE);
    if (m) {
      const level = Math.max(2, m[1].length); // the page title is the only h1
      const inl = inline(m[2], ctx);
      const text = stripTags(inl);
      const id = state.uid(slugify(text));
      state.headings.push({ level, id, text });
      if (top) state.sections.push({ id, heading: text, text: '' });
      out.push(
        `<h${level} id="${id}">${inl}<a class="hanchor" href="#${id}" aria-label="Link to section: ${esc(text)}"></a></h${level}>`,
      );
      i++;
      continue;
    }

    if (HR_RE.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    // generated content
    m = line.match(GEN_RE);
    if (m) {
      const res = ctx.generate(m[1], m[2], m[3], { uid: state.uid });
      for (const part of res.parts) {
        if (part.heading) {
          state.headings.push(part.heading);
          if (top) state.sections.push({ id: part.heading.id, heading: part.heading.text, text: '' });
        }
        if (top) record(state, part.html);
      }
      out.push(res.parts.map((p) => p.html).join('\n'));
      i++;
      continue;
    }

    // containers
    m = line.match(DIRECTIVE_RE);
    if (m) {
      const name = m[1];
      const arg = m[2].trim();
      let depth = 1;
      const buf = [];
      i++;
      while (i < n) {
        if (DIRECTIVE_RE.test(lines[i])) depth++;
        else if (/^:::\s*$/.test(lines[i])) {
          depth--;
          if (depth === 0) break;
        }
        buf.push(lines[i++]);
      }
      i++;
      if (name === 'private') {
        if (ctx.includePrivate) emit(`<div class="private-block"><p class="private-label">Private: left out of the published wiki</p>${blocks(buf, ctx, state, false)}</div>`);
      } else if (name === 'details') {
        const inner = blocks(buf, ctx, state, false);
        emit(`<details class="more"><summary>${inline(arg || 'More', ctx)}</summary><div class="more-body">${inner}</div></details>`);
      } else if (name === 'steps') {
        emit(`<div class="steps">${blocks(buf, ctx, state, false)}</div>`);
      } else if (name === 'contents') {
        const rows = [];
        for (const l of buf) {
          const lm = l.match(/^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:::\s*(.*))?$/);
          if (!lm) continue;
          const r = ctx.resolveLink(lm[2]);
          if (r.href === null) continue;
          rows.push(
            `<a class="row" href="${esc(r.href)}"><span class="t">${inline(lm[1], ctx)}</span><span class="d">${inline(lm[3] || '', ctx)}</span></a>`,
          );
        }
        emit(`<nav class="contents">${rows.join('')}</nav>`);
      } else {
        throw new Error(`Unknown container ":::${name}"`);
      }
      continue;
    }

    // blockquote / callout
    if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < n && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''));
      const cm = buf[0].match(/^\[!(\w+)\]\s*(.*)$/);
      if (cm && CALLOUTS[cm[1].toLowerCase()]) {
        const kind = cm[1].toLowerCase();
        const title = cm[2] || CALLOUTS[kind];
        const body = blocks(buf.slice(1), ctx, state, false);
        emit(
          `<aside class="callout callout-${kind}"><p class="callout-title">${inline(title, ctx)}</p>${body}</aside>`,
        );
      } else {
        emit(`<blockquote>${blocks(buf, ctx, state, false)}</blockquote>`);
      }
      continue;
    }

    // table
    if (line.includes('|') && i + 1 < n && TABLE_SEP_RE.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < n && lines[i].trim() && lines[i].includes('|')) rows.push(splitRow(lines[i++]));
      const th = head
        .map((h) => `<th scope="col">${h ? inline(h, ctx) : '<span class="sr-only">Details</span>'}</th>`)
        .join('');
      const trs = rows
        .map((r) => {
          const cells = head.map((_, c) => `<td>${inline(r[c] ?? '', ctx)}</td>`).join('');
          return `<tr>${cells}</tr>`;
        })
        .join('');
      emit(`<div class="table-wrap" tabindex="0"><table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }

    // list
    m = line.match(LIST_RE);
    if (m) {
      const base = m[1].length;
      const ordered = /\d/.test(m[2]);
      const startNum = ordered ? parseInt(m[2], 10) : 1;
      const items = [];
      while (i < n) {
        const mm = lines[i].match(LIST_RE);
        if (!mm || mm[1].length !== base || /\d/.test(mm[2]) !== ordered) break;
        const contentIndent = mm[1].length + mm[2].length + 1;
        const itemLines = [mm[3]];
        let loose = false;
        i++;
        while (i < n) {
          const l = lines[i];
          if (!l.trim()) {
            let j = i + 1;
            while (j < n && !lines[j].trim()) j++;
            if (j < n && indentOf(lines[j]) > base) {
              itemLines.push('');
              loose = true;
              i++;
              continue;
            }
            break;
          }
          const ind = indentOf(l);
          if (ind > base) {
            itemLines.push(l.slice(Math.min(ind, contentIndent)));
            i++;
            continue;
          }
          break;
        }
        let h = blocks(itemLines, ctx, state, false);
        if (!loose && h.startsWith('<p>')) h = h.replace('<p>', '').replace('</p>', '');
        items.push(`<li>${h}</li>`);
      }
      const tag = ordered ? 'ol' : 'ul';
      const startAttr = ordered && startNum !== 1 ? ` start="${startNum}"` : '';
      emit(`<${tag}${startAttr}>${items.join('')}</${tag}>`);
      continue;
    }

    // paragraph
    const buf = [line];
    i++;
    while (i < n && !startsBlock(lines[i], lines[i + 1])) buf.push(lines[i++]);
    const text = buf.map((l, idx) => (idx < buf.length - 1 && / {2,}$/.test(l) ? l.trimEnd() + '\u0001' : l.trim())).join(' ');
    emit(`<p>${inline(text, ctx).replace(/\u0001/g, '<br>')}</p>`);
  }

  return out.join('\n');
}
