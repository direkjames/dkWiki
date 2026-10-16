---
title: dkCommands
description: Command aliases, cooldowns, warmups, costs, daily limits, confirmations, a command hider and a command blocker.
audience: players, staff
order: 0
---

dkCommands controls how commands behave on the server. Staff use it to add rules to any command, even another plugin's, and to decide which commands players can see.

## What players notice

- **Aliases.** A short command like `/goto crates` that runs a longer one. Aliases show in the `/` list and tab-complete like real commands.
- **Cooldowns.** "You can use `/heal` again in 4m 30s."
- **Warmups.** A short wait before a command runs. Moving or taking damage cancels it.
- **Costs.** Some commands charge money from your wallet or your bank, and only when the command actually runs.
- **Daily limits.** Some commands can only be used a few times a day.
- **Confirmations.** Dangerous commands ask "are you sure?" first. Type `/dkconfirm` (or `/confirm`), or click the button.
- **A shorter `/` list.** Players only see the commands staff want them to see, and hidden or blocked commands answer like commands that don't exist.

## Where to go next

:::contents
- [Commands and permissions](commands.md) :: `/dkconfirm` for everyone, and `/dkcmd` for staff.
- [Aliases and rules](rules.md) :: Writing `aliases.yml` and `rules.yml`.
- [Hider, blocker and log](hider-and-blocker.md) :: Controlling what players can see, use and what is recorded.
- [How it stays safe](protection.md) :: Why rules can't be dodged by typing the command another way.
- [Settings](config.md) :: Every `config.yml` setting.
:::

## Try it yourself

Use a normal account. Operators skip cooldowns, costs and limits. Items marked *staff* need `dkcommands.admin`. These steps use the examples in `rules.yml`, which ship switched off. Turn on `heal` first and run `/dkcmd reload`.

:::steps
1. Run `/heal`. It works. Run it again straight away and you are told how long to wait.
2. Run `/essentials:heal`. The same cooldown applies, because the rule follows the command and not the text typed.
3. *Staff:* run `/dkcmd check <player> heal`. It says what would happen and why: whether it is hidden or blocked, which rule applies and how much cooldown is left.
4. *Staff:* run `/dkcmd cooldowns <player>` to see active cooldowns, then `/dkcmd reset <player> heal` to clear them.
5. *Staff:* run `/dkcmd log` to see the commands that were run.
:::
