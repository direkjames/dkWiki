# dk suite wiki

The public wiki for the dk suite: commands, settings and how-it-works for each plugin, written so a
player or a staff member can be sent straight to the page that answers their question.

Author: direk james

## Run it

Needs Node 20 or newer. There is nothing to install.

| Command | What it does |
| --- | --- |
| `npm run dev` | Private preview at http://localhost:4173, including staff-only pages |
| `npm run build` | Builds the public site into `dist/` |
| `npm run check` | Builds, then checks links, anchors, headings, accessibility, contrast and private-page leaks |
| `npm run sync` | Refreshes the plugin.yml and config.yml snapshots in `data/sources/` from each plugin's GitHub repo |

## Write a page

Pages are Markdown files in `content/<plugin>/`. Each plugin folder has a `_section.json` with its
name, version and status. Front matter takes `title`, `description`, `audience` (players, staff,
developers), `order` and `visibility`.

Extras beyond plain Markdown:

- Callouts: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!STAFF]`, `> [!PLAYERS]`
- `:::steps`, `:::details` and `:::contents` blocks
- `{{permissions:plugin}}`, `{{commands:plugin}}` and `{{config:plugin:section,section}}` build tables from the synced plugin files, so they never drift from the code
- Link to other pages with `.md` paths (`[Tiers](tiers.md)`). A broken link fails the build.

## Keep something out of the public wiki

Add `visibility: private` to a page's front matter, or wrap text in a `:::private` block. The public
build leaves it out and removes links to it. The dev server shows it. Use this for anything that helps
people dodge a limit, such as alert thresholds.

## Publish

Pushing to `main` builds and deploys to GitHub Pages through `.github/workflows/pages.yml`. In the
repo settings, set Pages to deploy from GitHub Actions. The site base is `/dkWiki/`; set `WIKI_BASE`
to change it.

## Local scrub rules

An optional `.scrub` file (ignored by git) lets `npm run sync` swap or drop words in the snapshots.
Run `npm run check` after a sync to confirm nothing slipped through.
