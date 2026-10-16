// A small, forgiving reader for the plugin.yml / config.yml files of the dk plugins.
// It is not a full YAML parser: it understands indentation, "key: value", simple "- item" lists,
// and keeps the comments written above each key, because those comments explain the setting.

import { unquote } from './util.mjs';

/** Split "value  # comment" without cutting inside quotes or brackets. */
function splitInlineComment(text) {
  let quote = null;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === '\\' && quote === '"') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') depth--;
    else if (c === '#' && depth <= 0 && (i === 0 || /\s/.test(text[i - 1]))) {
      return [text.slice(0, i).trim(), text.slice(i + 1).trim()];
    }
  }
  return [text.trim(), ''];
}

/** Comment lines that only decorate ("-----", "=====", "--- the ledger") are not descriptions. */
const isDecoration = (line) => /^[-=_*#\s]{3,}/.test(line) || /^-{2,}\s/.test(line);

export function parseYaml(text) {
  const root = { key: null, indent: -1, children: [], list: [], comment: [], inline: '', value: null };
  const stack = [root];
  let pending = [];
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim()) {
      pending = [];
      continue;
    }
    const cm = raw.match(/^\s*#\s?(.*)$/);
    if (cm) {
      pending.push(cm[1].trimEnd());
      continue;
    }
    const indent = raw.match(/^ */)[0].length;
    const body = raw.trim();

    if (body === '-' || body.startsWith('- ')) {
      while (stack.length > 1 && stack.at(-1).indent > indent) stack.pop();
      const owner = stack.at(-1);
      const [item] = splitInlineComment(body.slice(1).trim());
      owner.list.push(item);
      pending = [];
      continue;
    }

    const km = body.match(/^("[^"]*"|'[^']*'|[^\s:#][^:]*?):(?:\s+(.*))?$/);
    if (!km) {
      pending = [];
      continue;
    }
    while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1);
    const [value, inline] = splitInlineComment(km[2] ?? '');
    const node = {
      key: unquote(km[1]),
      indent,
      value: value === '' ? null : value,
      inline,
      comment: pending.filter((l) => !isDecoration(l)),
      children: [],
      list: [],
      parent,
    };
    parent.children.push(node);
    if (node.value === null) stack.push(node);
    pending = [];
  }
  return root;
}

export function child(node, key) {
  return node?.children.find((c) => c.key === key) ?? null;
}

/** Text shown for a value: a scalar as written, or a list as [a, b, c]. */
export function displayValue(node) {
  if (node.value !== null) return node.value;
  if (node.list.length) return `[${node.list.join(', ')}]`;
  return '';
}

/** Description for a node: the comment lines above it plus its same-line comment. */
export function describe(node) {
  const lines = [...node.comment];
  if (node.inline) lines.push(node.inline);
  // Join wrapped lines, but keep example lines ("  EssentialsX: ...") out of the running text.
  return lines
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
}

/** Walk every leaf under a node; yields { path, node }. */
export function* leaves(node, prefix = '') {
  for (const c of node.children) {
    const path = prefix ? `${prefix}.${c.key}` : c.key;
    if (c.children.length) yield* leaves(c, path);
    else yield { path, node: c };
  }
}
