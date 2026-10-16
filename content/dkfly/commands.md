---
title: Commands and permissions
description: Every dkFly command and permission, including the bypasses and the speed permissions.
audience: players, staff
order: 2
---

## Players

| Command | Permission | What it does |
|---|---|---|
| `/fly` | `dkfly.use` (everyone) | Turns your flight on or off. |
| `/flytime` (also `/ftime`) | `dkfly.use` | Shows your fly time. |
| `/flytime shop` | `dkfly.shop` (everyone) | Opens the fly shop. |
| `/flytime pay <player> <time>` | `dkfly.transfer` (everyone) | Sends fly time to a player. |
| `/flytime confirm` | `dkfly.transfer` | Confirms a transfer. |

## Staff

| Command | Permission | What it does |
|---|---|---|
| `/fly <player>` | `dkfly.others` | Toggles flight for another player. |
| `/flytime check <player>` | `dkfly.check.others` | Shows another player's fly time. |
| `/flytime give\|take\|set <player> <time>` | `dkfly.admin` | Changes a player's fly time. Saved instantly. |
| `/flytime reload` | `dkfly.admin` | Reloads the config, messages and shop. |

`dkfly.admin` includes `dkfly.others` and `dkfly.check.others`. Other plugins, such as crates, can run `/flytime give <player> <time>` as a reward.

## Bypasses and extras

| Permission | Allows |
|---|---|
| `dkfly.unlimited` | Flying without using fly time. |
| `dkfly.bypass.world` | Flying in blacklisted worlds. |
| `dkfly.bypass.region` | Ignoring the WorldGuard `dkfly` flag. |
| `dkfly.bypass.combat` | Not being affected by the combat tag. |
| `dkfly.bypass.cooldown` | No transfer cooldown. Operators have it. |
| The permissions in `speed.permissions` | Faster flight, for example `dkfly.speed.fast` and `dkfly.speed.faster`. |

## Command details

{{commands:dkfly}}

## Every permission

{{permissions:dkfly}}
