// Inline SVG icons (24x24, stroked). One place so pages, the chest menu and the UI share them.

const P = {
  core: '<path d="M12 3 20 7.5v9L12 21 4 16.5v-9z"/><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9"/>',
  bank: '<path d="M3.5 9.5 12 4l8.5 5.5z"/><path d="M5.5 12v5M9.5 12v5M14.5 12v5M18.5 12v5"/><path d="M3.5 20h17"/>',
  ledger: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path d="M9 8h6M9 11h4"/>',
  stock: '<rect x="4.5" y="9" width="4" height="6.5" rx="1"/><path d="M6.5 5.5V9M6.5 15.5v3"/><rect x="14.5" y="6" width="4" height="8.5" rx="1"/><path d="M16.5 3.5V6M16.5 14.5v4"/>',
  afk: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  sleep: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  codes: '<path d="M3.5 7.5h17v3a1.5 1.5 0 0 0 0 3v3h-17v-3a1.5 1.5 0 0 0 0-3z"/><path d="M14.5 8v2M14.5 11v2M14.5 14v2"/>',
  commands: '<rect x="3.5" y="4" width="17" height="16" rx="3.5"/><path d="m14 8.5-4 7"/>',
  crates: '<path d="M4 10V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2"/><rect x="4" y="10" width="16" height="9" rx="1.5"/><path d="M4 13.5h16M12 12.5v3"/>',
  chat: '<path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>',
  guide: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  glossary: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="m9.5 13 2-5.5 2 5.5M10.3 11.5h3.4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  edit: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m13.5 8 3 3"/>',
};

export function icon(name, { size = 20, cls = '' } = {}) {
  const body = P[name];
  if (!body) throw new Error(`Unknown icon "${name}"`);
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

export const hasIcon = (name) => name in P;
