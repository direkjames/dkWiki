---
title: Commands and permissions
description: /redeem for players and every /dkcodes staff command, with the permissions that go with them.
audience: players, staff
order: 2
---

## Players

| Command | Permission | What it does |
|---|---|---|
| `/redeem <code>` | `dkcodes.use` (everyone) | Redeems a code. Tab completion never shows codes. |
| `/redeem claim` | `dkcodes.use` | Gets reward items that didn't fit in your inventory. |

## Staff

`/dkcodes` (also `/dkc`) needs `dkcodes.admin`, which operators have. `/dkcodes help` lists everything.

| Subcommand | What it does |
|---|---|
| `gui [code]` | Opens the admin menu. |
| `list [page]` | Lists all codes. |
| `info [code]` | Shows a code's settings, rewards and uses. |
| `create [name]` | Makes a new code. |
| `delete [code]` | Deletes a code. Its usage history is kept. |
| `enable [code]`, `disable [code]` | Turns a code on or off. A disabled code acts like it doesn't exist. |
| `set [code] [setting] [value]` | Changes one setting: `max-uses`, `player-uses`, `ip-uses`, `starts`, `expires`, `player`, `referral`, `permission`, `playtime`, `worlds` or `cost`. |
| `addreward [code] [owner\|pool:name] [type] [value]` | Adds a reward: `money`, `item`, `command`, `xp`, `xp-levels`, `message`, `title`, `sound` or `broadcast`. |
| `addcmd [code] [command]` | A shortcut for a command reward. |
| `additem [code] [owner\|pool:name]` | Adds the item in your hand, exactly as it is. |
| `removereward [code] [owner\|pool:name] [number]` | Removes a reward. |
| `pool [code] add\|weight\|remove [name] [weight]` | Edits the pools of a mystery code. |
| `reset [player] [code]` | Lets a player use a code again. |
| `resetall [code] confirm` | Wipes all uses of a code. |
| `unlock [player]` | Removes a wrong-code lockout. |
| `history [player]` | A player's audit log. |
| `log [code] [page]` | The audit log. |
| `stats [code]` | Uses and players. |
| `referrals` | The top referral codes. |
| `reload` | Reloads the config, messages and codes. |

## Other permissions

- `dkcodes.alerts` shows an alert when a player is locked out for guessing. It is included in `dkcodes.admin`.
- `dkcodes.bypass` skips the `/redeem` cooldown and the wrong-code lockout. Operators have it.

## Command details

{{commands:dkcodes}}

## Every permission

{{permissions:dkcodes}}
