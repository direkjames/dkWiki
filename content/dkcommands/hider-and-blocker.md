---
title: Hider, blocker and log
description: Hide commands from the / list, block commands outright, and keep a record of what players run.
audience: staff
order: 3
---

## The hider

The hider removes commands from the list players see when they type `/`, and from tab completion. Players only ever see commands they have permission for, and the hider removes even more.

- **`mode: whitelist`** (recommended): players **only** see the commands listed in their groups.
- **`mode: blacklist`**: players see everything **except** the commands listed in their groups.
- **Groups stack.** Everyone has `default`. A player with `dkcommands.group.vip` also gets the `vip` group. Give the permission with LuckPerms and add as many groups as you like.
- `hide-namespaced` hides every namespaced label (`/essentials:heal`, `/minecraft:tp`).
- `show-aliases` always shows dkCommands aliases to players who have their permission.
- `block-execution: false` means a hidden command still works if typed, which suits commands used by clickable chat buttons, such as `/tpaccept`. `true` makes typing it act like it doesn't exist.
- Staff with `dkcommands.bypass.hider` (operators) see everything.

> [!NOTE] Hidden is not the same as forbidden
> The hider changes what players **see**. Permissions still decide what they can **use**.

## The blocker

Blocked commands can't be used and are hidden from the `/` list. They answer with the unknown-command message unless a rule has its own message. Each blocker rule lists `commands`, and can limit them to some `worlds`. Staff with `dkcommands.bypass.blocker` (operators) aren't blocked.

The shipped `server-info` rule stops players from seeing your plugin list, server version and full command list: `/plugins` also covers `/pl` and `/bukkit:pl`, and `/version` covers `/ver`, `/about` and `/icanhasbukkit`. Remove `help` from it if you use a custom help plugin.

With `custom-unknown-command: true`, the server's "Unknown or incomplete command" is replaced by the `unknown-command` message. Hidden and blocked commands use the same message, so players can't tell them apart.

## The command log

Every command players run is saved for `/dkcmd log`, and nothing is shown in chat.

- Entries older than `logging.keep-days` (14 by default) are deleted.
- `log-unknown-commands` also logs commands that don't exist, such as typos and players probing for plugins.
- Only the command name is saved for the commands in `hide-arguments` (login, register and similar), never what was typed after it, so passwords aren't stored.
- Players with `dkcommands.log.exempt` aren't logged.
