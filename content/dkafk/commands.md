---
title: Commands and permissions
description: The /afk command for players, the /dkafk staff commands, and every permission, including the old antiafk names.
audience: players, staff
order: 1
---

## Players

| Command | Permission | What it does |
|---|---|---|
| `/afk` | `dkafk.afk` (everyone) | Marks you AFK, or brings you back. Limited to once every few seconds. |

Operators and other exempt players can use `/afk` too. They get the tag but never the check or the actions.

If EssentialsX is installed it has its own `/afk`. Add `afk` to `disabled-commands` in Essentials' `config.yml` so dkAFK's is used. `/dkafk:afk` always reaches dkAFK's.

## Staff

`/dkafk` also works as `/antiafk` and `/aafk`. It needs `dkafk.admin`, which operators have.

| Command | What it does |
|---|---|
| `/dkafk reload` | Reloads `config.yml`. |
| `/dkafk list` | Shows AFK players. |
| `/dkafk check <player>` | Shows status, idle time, last activity, and why recent actions were ignored. |
| `/dkafk debug <player>` | A live feed of what counts and what doesn't for that player. Run it again to stop. |

Commands are registered in code, so they aren't listed in `plugin.yml`.

## Who is skipped

- Players with `dkafk.bypass` are never marked AFK. Nobody has it by default.
- Operators are skipped while `exempt-ops: true` (the default). So are players in creative or spectator mode.
- **To test the plugin on yourself,** set `exempt-ops: false` and use survival mode. `/dkafk check <player>` and `/dkafk debug <player>` say when, and why, a player is exempt.
- If you use a wildcard (`*`) in LuckPerms, set `dkafk.bypass` to `false` for anyone who should still be checked.

## Every permission

The old `antiafk.admin` and `antiafk.bypass` still work and grant the new permissions.

{{permissions:dkafk}}
