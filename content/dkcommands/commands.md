---
title: Commands and permissions
description: /dkconfirm for players, the /dkcmd staff commands, and every dkCommands permission, including the bypass permissions.
audience: players, staff
order: 1
---

## Players

| Command | Permission | What it does |
|---|---|---|
| `/dkconfirm` (also `/confirm`) | `dkcommands.confirm` (everyone) | Confirms a command that asked for confirmation. You can also click the button in chat. |

## Staff

`/dkcommands` is the admin command. It also works as `/dkcmd` and `/dkcmds`, because `/dkc` belongs to dkCodes. It needs `dkcommands.admin`.

| Command | What it does |
|---|---|
| `/dkcmd reload` | Reloads every file, re-registers aliases and refreshes everyone's command list. |
| `/dkcmd check <player> <command>` | Shows what would happen if that player ran the command, and why: hidden, blocked, which rule applies, and the cooldown left. |
| `/dkcmd log [player\|all] [page]` | The commands players ran, newest first. |
| `/dkcmd aliases` | Every alias and whether it registered. |
| `/dkcmd cooldowns <player>` | Active cooldowns and uses today. |
| `/dkcmd reset <player> [rule]` | Clears cooldowns and daily uses. |

## Bypass permissions

Operators have the bypasses below, except `confirm`. Confirmations stay on for operators on purpose, because they protect staff too.

| Permission | What it skips |
|---|---|
| `dkcommands.bypass.cooldown` | Cooldowns |
| `dkcommands.bypass.warmup` | Warmups |
| `dkcommands.bypass.cost` | Costs |
| `dkcommands.bypass.limit` | Daily limits |
| `dkcommands.bypass.blocker` | The blocker: use and see blocked commands |
| `dkcommands.bypass.hider` | The hider: see every command |
| `dkcommands.bypass.*` | All of the above except confirmations |
| `dkcommands.bypass.confirm` | Confirmations. Nobody has it by default. |

Two more: `dkcommands.group.<name>` gives a player a [hider group](hider-and-blocker.md), and `dkcommands.log.exempt` keeps a player's commands out of the log.

## Command details

{{commands:dkcommands}}

## Every permission

{{permissions:dkcommands}}
