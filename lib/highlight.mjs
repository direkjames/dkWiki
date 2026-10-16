// Tiny syntax highlighter: just enough for the YAML, Java/Kotlin and shell snippets in the wiki.
// Every piece of text is escaped before it is wrapped, so code can never inject HTML.

import { esc } from './util.mjs';

const span = (cls, text) => `<span class="tk-${cls}">${esc(text)}</span>`;

function yamlLine(line) {
  // whole-line comment
  if (/^\s*#/.test(line)) return span('c', line);
  let code = line;
  let comment = '';
  // trailing comment outside quotes
  let quote = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === '\\' && quote === '"') i++;
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '#' && i > 0 && /\s/.test(line[i - 1])) {
      code = line.slice(0, i);
      comment = line.slice(i);
      break;
    }
  }
  const km = code.match(/^(\s*(?:-\s+)?)("[^"]*"|'[^']*'|[^\s:#"'][^:]*?)(:)(\s.*|)$/);
  let out;
  if (km) {
    out = esc(km[1]) + span('k', km[2]) + esc(km[3]) + yamlValue(km[4]);
  } else {
    out = yamlValue(code);
  }
  return out + (comment ? span('c', comment) : '');
}

function yamlValue(text) {
  return text
    .split(/("(?:[^"\\]|\\.)*"|'[^']*'|\b-?\d+(?:\.\d+)?[kmbKMB]?\b|\b(?:true|false|yes|no|null)\b)/)
    .map((part, i) => {
      if (i % 2 === 0) return esc(part);
      if (part[0] === '"' || part[0] === "'") return span('s', part);
      if (/^(true|false|yes|no|null)$/.test(part)) return span('b', part);
      return span('n', part);
    })
    .join('');
}

const CODE_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*")|(@\w+)|\b(import|package|public|private|protected|class|interface|new|return|if|else|try|catch|throw|void|final|static|val|var|fun|override|extends|implements|compileOnly|true|false|null|this)\b|\b(\d+(?:\.\d+)?)\b/g;

function codeBlock(src) {
  let out = '';
  let last = 0;
  for (const m of src.matchAll(CODE_RE)) {
    out += esc(src.slice(last, m.index));
    if (m[1]) out += span('c', m[1]);
    else if (m[2]) out += span('s', m[2]);
    else if (m[3]) out += span('a', m[3]);
    else if (m[4]) out += span('b', m[4]);
    else out += span('n', m[5]);
    last = m.index + m[0].length;
  }
  return out + esc(src.slice(last));
}

function shellBlock(src) {
  return src
    .split('\n')
    .map((l) => (/^\s*#/.test(l) ? span('c', l) : esc(l)))
    .join('\n');
}

export function highlight(lang, code) {
  switch ((lang || '').toLowerCase()) {
    case 'yaml':
    case 'yml':
      return code.split('\n').map(yamlLine).join('\n');
    case 'java':
    case 'kotlin':
    case 'kts':
    case 'groovy':
      return codeBlock(code);
    case 'bash':
    case 'sh':
    case 'shell':
      return shellBlock(code);
    default:
      return esc(code);
  }
}
