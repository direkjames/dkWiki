---
title: Commands and permissions
description: Every /crates command for players and staff, the permissions, and the key commands other plugins can run.
audience: players, staff
order: 2
---

`/crates` also works as `/crate`. That is the name the vote plugin and PinataParty already use, for example `crate key give ...`. Admin commands don't show up in tab completion for players.

## Players

| Command | Permission | What it does |
|---|---|---|
| `/crates` | `dkcrates.use` (everyone) | Opens the crates menu: left-click opens, right-click previews, shift-click opens all. |
| `/crates open <crate> [amount\|all]` | `dkcrates.use` | Opens with your keys. |
| `/crates preview <crate>` | `dkcrates.use` | Shows the rewards and chances. |
| `/crates claim` | `dkcrates.use` | Gets rewards that didn't fit. It also says what you won. |

## Staff

These need `dkcrates.admin`, which operators have.

| Command | What it does |
|---|---|
| `/crates key give\|take\|set <player\|all> <crate> <amount> [-s] [-v]` | Manages keys. `-s` is silent. `-v` gives virtual keys even if the crate has a physical key. |
| `/crates key check <player>` | Shows a player's keys. |
| `/crates keyall <crate> <amount> [skip-afk] [-s]` | Gives keys to everyone online. `skip-afk` leaves out AFK players (dkAFK). |
| `/crates forceopen <player> <crate> [amount]` | Opens for a player without using keys. |
| `/crates setblock <crate>` | Makes the block you look at a crate. |
| `/crates removeblock` | Turns the block you look at back into a normal block. |
| `/crates blocks` | Lists crate blocks. |
| `/crates log <player> [page]` | What a player won, newest first. |
| `/crates limits <crate>` | Stock left and max-wins of limited rewards. |
| `/crates reset stock <crate> <reward>` | Refills a reward's stock. |
| `/crates reset wins <player> <crate> [reward]` | Lets a player win limited rewards again. |
| `/crates item save <id>` | Saves the held item (an exact copy) to `items.yml`. |
| `/crates item info` | Shows the held item as crate YAML, with a copy button. |
| `/crates item add <crate> <rarity> <weight> [reward]` | Saves the held item and adds it as a reward. |
| `/crates item addpool <crate> <reward> <weight> [entry]` | Adds the held item to a reward's pool. |
| `/crates item delete <id>`, `/crates item list` | Manages saved items. |
| `/crates reload` | Reloads config, messages, crates and saved items. |

Crate blocks can't be broken, blown up or moved by pistons.

## Every command and permission

{{commands:dkcrates}}

{{permissions:dkcrates}}

Crates can also have their own permission (`permission:` in the crate file) for donor crates, and rewards can have an `exclude-permission`.
