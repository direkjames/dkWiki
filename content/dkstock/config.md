---
title: Settings
description: Every dkStock config.yml setting, from tax and price movement to limits, the hot item and alerts.
audience: staff
order: 6
---

Everything lives in `plugins/dkStock/`. Run `/stock reload` after a change. It lists every problem it found, and if a file is invalid dkStock keeps the previous working setup.

| File | What it holds |
|---|---|
| `config.yml` | Tax, price movement, limits, cooldowns. This page. |
| `items.yml`, `gui.yml`, `categories.yml`, `messages.yml` | What is sold, the window, the tabs and every message. See [Items, window and messages](items.md). |
| `discord.yml`, `events.yml` | The [Discord](discord.md) webhook and [scheduled events](events.md). |

dkStock stores its data in dkCore's SQLite database, in tables that start with `dkstock_`. dkCore must use SQLite. dkStock turns itself off with a clear message if it doesn't.

> [!WARNING] Keep tax high enough for your multiplier
> `tax-percent` must be high enough for `multiplier`, or players can make money by buying and selling the same item in a loop. Run `/stock audit` after changing either.

> [!NOTE] The hot item keeps its gap
> The hot bonus moves the buy and the sell price together, so the gap between them (your tax) stays the same.

## Every setting

{{config:dkstock}}

## Data and history

- Live prices and stock, every trade and every admin action are stored in the database. Each change is written as it happens, in the background, so it never slows the server down.
- **Backups:** back up the database while the server is **stopped**.
- **Reset the whole market:** `/stock reset all confirm`. Config files aren't touched.
- Trade history older than `history.keep-days` is deleted at startup. The lifetime stats behind the all-time leaderboards are small and are never deleted.
- `/stock history` finds players who are online or that the server has seen before.

## Known limits

- Single server only. There is no proxy or network support, and SQLite is the only supported database.
- Vanilla items only.
