---
title: How it stays safe
description: Why dkCommands rules follow the command and not the text typed, and how it avoids charging for commands that don't run.
audience: staff
order: 4
---

- **One command, every name.** Rules and blocks follow the command, not the text typed. `/heal`, `/eheal`, `/essentials:heal` and an alias that runs `/heal` all share the same cooldown and cost.
- **Charged only when it runs.** Checks happen first (at the lowest priority). Money is taken and cooldowns start only if no other plugin cancelled the command (at the monitor priority). Bank payments are refunded if the command doesn't run.
- **No relog or restart reset.** Long cooldowns and daily uses are saved to the database, and commands with rules wait until they are loaded at startup. Cooldowns at least `cooldowns.save-after` long are saved. Shorter ones stay in memory and still survive relogging.
- **Safe console aliases.** Players can't put `@a` or `@e` selectors, colour codes or control characters into `[console]` lines, and a `[console]` line can't let players choose the command.
- **Alias loops** stop after 5 levels.
- **Hidden means hidden.** Hidden commands are removed from the `/` list and from tab completion, even when a hacked client asks directly. Hidden and blocked commands answer with the same message as commands that don't exist.
