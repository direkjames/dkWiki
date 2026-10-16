---
title: Settings
description: Every dkCommands config.yml setting: the hider, the blocker, cooldown saving, confirmations, warmups and logging.
audience: staff
order: 5
---

dkCommands' settings live in `plugins/dkCommands/config.yml`. Aliases are in `aliases.yml`, rules in `rules.yml` and messages in `messages.yml`. Cooldowns, daily uses and the command log are stored in dkCore's shared database, in tables that start with `dkcommands_`. Run `/dkcmd reload` after a change. No restart is needed.

For the hider groups and the blocker rules, read [Hider, blocker and log](hider-and-blocker.md) first. Their lists of commands are long, so the table below shows only the start of each.

## Every setting

{{config:dkcommands}}
