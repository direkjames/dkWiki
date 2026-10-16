// Generated content: tables built from the plugins' own plugin.yml and config.yml files, so the
// command, permission and setting lists on the wiki can never drift from the real plugins.
//
// In a page, put one of these on a line by itself:
//   {{permissions:dkbank}}               every permission from plugin.yml
//   {{commands:dkledger}}                every command from plugin.yml
//   {{config:dkledger}}                  every setting in config.yml, grouped by section
//   {{config:dkledger:alerts,freeze}}    only these sections
//   {{component:suite-stack}}            the layered picture of the suite

import fs from 'node:fs';
import path from 'node:path';
import { esc, slugify, unquote } from './util.mjs';
import { parseYaml, child, displayValue, describe, leaves } from './yamlloose.mjs';

export function makeGenerator({ root, plugins }) {
  const sources = JSON.parse(fs.readFileSync(path.join(root, 'data/sources.json'), 'utf8'));
  const cache = new Map();

  function load(name, file) {
    const key = `${name}/${file}`;
    if (cache.has(key)) return cache.get(key);
    const p = path.join(root, 'data/sources', name, file);
    if (!fs.existsSync(p)) throw new Error(`Missing source data/sources/${name}/${file} (run: npm run sync)`);
    const tree = parseYaml(fs.readFileSync(p, 'utf8'));
    cache.set(key, tree);
    return tree;
  }

  const sourceNote = (name, file) => {
    const s = sources[name];
    const sha = s?.commit ? ` at commit <code>${esc(s.commit)}</code>` : s?.snapshot ? ` (copy of ${esc(s.snapshot)})` : '';
    return `<p class="gen-note">Generated from <code>${esc(file)}</code> in ${esc(s?.repo ?? name)}${sha}.</p>`;
  };

  const who = (d) => {
    const v = unquote(d ?? 'op');
    if (v === 'op') return '<span class="who who-op">Operators</span>';
    if (v === 'true') return '<span class="who who-all">Everyone</span>';
    if (v === 'false') return '<span class="who who-none">Nobody (grant it)</span>';
    if (v === 'not op') return '<span class="who who-all">Non-operators</span>';
    return `<span class="who">${esc(v)}</span>`;
  };

  function permissions(name) {
    const tree = load(name, 'plugin.yml');
    const perms = child(tree, 'permissions');
    if (!perms) throw new Error(`${name}: no permissions in plugin.yml`);
    const rows = perms.children
      .map((p) => {
        const desc = unquote(child(p, 'description')?.value ?? '');
        const def = child(p, 'default')?.value;
        const kids = child(p, 'children')?.children.map((c) => c.key) ?? [];
        const incl = kids.length
          ? `<span class="includes">Includes ${kids.map((k) => `<code>${esc(k)}</code>`).join(' ')}</span>`
          : '';
        return `<tr><td><code>${esc(p.key)}</code></td><td>${who(def)}</td><td>${esc(desc)}${incl}</td></tr>`;
      })
      .join('');
    const html =
      `<div class="table-wrap" tabindex="0"><table class="gen"><thead><tr><th scope="col">Permission</th><th scope="col">Given to</th><th scope="col">What it allows</th></tr></thead><tbody>${rows}</tbody></table></div>` +
      sourceNote(name, 'plugin.yml');
    return { parts: [{ html }] };
  }

  function commands(name) {
    const tree = load(name, 'plugin.yml');
    const cmds = child(tree, 'commands');
    if (!cmds) throw new Error(`${name}: no commands in plugin.yml`);
    const rows = cmds.children
      .map((c) => {
        const aliasRaw = child(c, 'aliases');
        const aliases = aliasRaw ? displayValue(aliasRaw).replace(/^\[|\]$/g, '').split(',').map((a) => a.trim()).filter(Boolean) : [];
        const perm = unquote(child(c, 'permission')?.value ?? '');
        const usage = unquote(child(c, 'usage')?.value ?? '');
        const desc = unquote(child(c, 'description')?.value ?? '');
        const al = aliases.length ? `<span class="includes">Also <code>${aliases.map((a) => '/' + esc(a)).join('</code> <code>')}</code></span>` : '';
        return `<tr><td><code class="cmd" data-copy tabindex="0" role="button" title="Click to copy">/${esc(c.key)}</code>${al}</td><td>${perm ? `<code>${esc(perm)}</code>` : 'Everyone'}</td><td>${esc(desc)}${usage ? `<span class="includes">Usage <code>${esc(usage)}</code></span>` : ''}</td></tr>`;
      })
      .join('');
    const html =
      `<div class="table-wrap" tabindex="0"><table class="gen"><thead><tr><th scope="col">Command</th><th scope="col">Permission</th><th scope="col">What it does</th></tr></thead><tbody>${rows}</tbody></table></div>` +
      sourceNote(name, 'plugin.yml');
    return { parts: [{ html }] };
  }

  function config(name, arg, { uid }) {
    const tree = load(name, 'config.yml');
    const want = arg ? arg.split(',').map((s) => s.trim()).filter(Boolean) : null;

    // top-level scalars become one "general" group, every section becomes its own group
    const groups = [];
    const general = tree.children.filter((c) => !c.children.length);
    if (general.length && (!want || want.includes('general'))) {
      groups.push({ key: 'general', title: 'General', node: { comment: [], inline: '' }, items: general.map((n) => ({ path: n.key, node: n })) });
    }
    for (const sec of tree.children.filter((c) => c.children.length)) {
      if (want && !want.includes(sec.key)) continue;
      groups.push({ key: sec.key, title: sec.key, node: sec, items: [...leaves(sec)] });
    }
    if (want) {
      for (const w of want) if (w !== 'general' && !tree.children.some((c) => c.key === w)) throw new Error(`${name}: config.yml has no section "${w}"`);
    }

    const parts = groups.map((g) => {
      const id = uid(slugify(`${name}-${g.key}-settings`));
      const text = g.title === 'General' ? 'General settings' : `${g.title} settings`;
      const intro = describe(g.node);
      const rows = g.items
        .map(({ path: p, node }) => {
          const full = g.key === 'general' ? p : `${g.key}.${p}`;
          const rid = uid(slugify(`${name}-${full.replace(/\./g, '-')}`));
          const val = displayValue(node);
          const shown = val === '' ? '<span class="muted">empty</span>' : `<code>${esc(val.length > 90 ? val.slice(0, 87) + '…' : val)}</code>`;
          const d = describe(node);
          return `<tr id="${rid}"><td><code>${esc(g.key === 'general' ? p : p)}</code></td><td>${shown}</td><td>${d ? esc(d) : '<span class="muted">No description in the file.</span>'}</td></tr>`;
        })
        .join('');
      const html =
        `<h3 id="${id}">${esc(text)}<a class="hanchor" href="#${id}" aria-label="Link to section: ${esc(text)}"></a></h3>` +
        (intro ? `<p>${esc(intro)}</p>` : '') +
        `<div class="table-wrap" tabindex="0"><table class="gen"><thead><tr><th scope="col">Setting</th><th scope="col">Default</th><th scope="col">What it does</th></tr></thead><tbody>${rows}</tbody></table></div>`;
      return { heading: { level: 3, id, text }, html };
    });
    parts.push({ html: sourceNote(name, 'config.yml') });
    return { parts };
  }

  function component(name) {
    if (name === 'suite-stack') return { parts: [{ html: suiteStack(plugins) }] };
    throw new Error(`Unknown component "${name}"`);
  }

  return (kind, name, arg, helpers) => {
    switch (kind) {
      case 'permissions':
        return permissions(name);
      case 'commands':
        return commands(name);
      case 'config':
        return config(name, arg, helpers);
      case 'component':
        return component(name);
      default:
        throw new Error(`Unknown generator "${kind}"`);
    }
  };
}

function suiteStack(plugins) {
  const chip = (p) =>
    p.docs
      ? `<a class="chip chip-${esc(p.id)}" href="${esc(p.href)}">${esc(p.title)}</a>`
      : `<span class="chip chip-${esc(p.id)} chip-soon" title="Docs coming">${esc(p.title)}</span>`;
  const bank = plugins.find((p) => p.id === 'dkbank');
  const others = plugins.filter((p) => !['dkcore', 'dkbank', 'dkafk', 'dkchat'].includes(p.id));
  const afk = plugins.find((p) => p.id === 'dkafk');
  const chat = plugins.find((p) => p.id === 'dkchat');
  const core = plugins.find((p) => p.id === 'dkcore');
  return `<figure class="stack" aria-label="How the dk suite is layered">
<div class="layer layer-plugins">
  <p class="layer-title">Plugins players and staff use</p>
  <div class="chips">${others.map(chip).join('')}</div>
  <p class="layer-note">Each of these is built on dkCore.</p>
</div>
<div class="layer-link" aria-hidden="true"></div>
<div class="layer layer-core">
  <p class="layer-title">${core?.docs ? `<a href="${esc(core.href)}">dkCore</a>` : 'dkCore'}</p>
  <p class="layer-note">The shared foundation: one database, one message style, menus, tasks, money formatting, and services for the wallet, the bank and AFK status.</p>
</div>
<div class="layer-link" aria-hidden="true"></div>
<div class="layer layer-side">
  <div>
    <p class="layer-title">${bank ? chip(bank) : 'dkBank'}</p>
    <p class="layer-note">Stands on its own. dkCore links to it when both are installed, so every dk plugin can use the bank.</p>
  </div>
  <div>
    <p class="layer-title">${afk ? chip(afk) : 'dkAFK'}</p>
    <p class="layer-note">Reports who is AFK through dkCore. dkBank pays AFK players the offline interest rate, and dkStock, dkSleep and dkFly use it too.</p>
  </div>
  <div>
    <p class="layer-title">${chat ? chip(chat) : 'dkChat'}</p>
    <p class="layer-note">Stands on its own. It formats the server's chat and doesn't need dkCore.</p>
  </div>
  <div>
    <p class="layer-title"><span class="chip chip-plain">Vault and EssentialsX</span></p>
    <p class="layer-note">The wallet balance, shown by <code>/bal</code>. The bank is separate from it on purpose.</p>
  </div>
</div>
</figure>`;
}
