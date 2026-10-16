---
title: Aliases and rules
description: How to write command aliases in aliases.yml and cooldowns, warmups, costs, limits and confirmations in rules.yml.
audience: staff
order: 2
---

Change a file, then run `/dkcmd reload`. Aliases are registered live, so no restart is needed.

| File | What's in it |
|---|---|
| `config.yml` | The hider, the blocker, warmup and confirm settings, and the command log. See [Settings](config.md). |
| `aliases.yml` | Your aliases, such as `/crates` for `/warp Crates`. |
| `rules.yml` | Cooldowns, warmups, costs (wallet or dkBank), daily limits and confirmations. |
| `messages.yml` | Every message, prefix included (MiniMessage). |

## How to name a command

The same format is used everywhere a list of commands appears:

| Written as | Covers |
|---|---|
| `heal` | That command however it is typed: `/heal`, `/eheal`, `/essentials:heal`. |
| `warp crates` | Only `/warp crates`. Extra words are arguments, and `*` means any one word. |
| `lp*` | Every command starting with `lp`. `*` is anything and `?` is one character. |
| `essentials:*` | Every `/essentials:...` label. |
| `plugin:Multiverse-Core` | Every command of that plugin, with its name as in `/plugins`. |

## Aliases

Each alias becomes a real command: it shows in the `/` list, shows white (not red) while typing, and tab-completes.

| Setting | What it does |
|---|---|
| `enabled` | `false` ignores the alias. |
| `run` | The command lines to run, in order. Start a line with `[player]` (the default, uses the player's permissions), `[console]` (use with care) or `[message]` (sends the player a MiniMessage text). |
| `run-as` | `player` or `console`: the default for lines with no tag. |
| `permission` | Needed to use the alias. Players without it don't see it. Blank means everyone. |
| `description`, `usage` | Shown in `/help`, and when arguments are missing. |
| `tab-complete` | `auto` completes like the command it runs, `players` suggests online player names, `none` gives no suggestions. |
| `override` | `true` takes the name even if another plugin has a command with it. The plugin's command comes back if you remove the alias. |
| `allow-selectors` | `true` lets players type `@a`, `@p` or `@e` into `[console]` lines. Unsafe, and off by default. |

In `run`, `$1` to `$9` are the 1st to 9th word the player typed after the alias, `$2-` is the 2nd word and everything after it, `$*` is everything they typed, and `%player%` is the player's name.

```yaml title="plugins/dkCommands/aliases.yml"
aliases:
  # /goto <warp> runs /warp <warp>, with tab completion of warp names
  goto:
    description: 'Teleport to a warp.'
    usage: '/goto <warp>'
    run:
      - 'warp $1'

  # /starter gives a kit as console and tells the player
  starter:
    permission: 'dkcommands.alias.starter'
    run:
      - '[console] kit starter %player%'
      - '[message] <prefix><green>Enjoy your starter kit!'
```

Cooldowns, costs and other rules on the commands an alias runs also apply to the alias, so an alias can't be used to skip the cooldown of `/heal`.

## Rules

A rule adds restrictions to **any** command, including other plugins' commands.

| Setting | What it does |
|---|---|
| `enabled` | `false` ignores the rule. |
| `commands` | The commands the rule covers. |
| `cooldown` | Time between uses, such as `30s`, `5m` or `1h30m`. 0 means none. |
| `warmup` | A wait before the command runs. Moving or damage cancels it. 0 means none. |
| `cost` | Money per use. Taken only when the command really runs. |
| `cost-source` | `wallet` (the Vault economy) or `bank` (dkBank). |
| `daily-limit` | Uses per day, resetting at midnight in the `timezone` setting. 0 means unlimited. |
| `confirm` | `true` asks "are you sure?" first. |
| `worlds` | Only apply in these worlds. An empty list means everywhere. |
| `requires-permission` | Only apply to players who have this permission. Use it when the plugin checks permissions itself (EssentialsX, say), so players who can't use the command aren't charged or put on cooldown for trying. |
| `tiers` | Better values for players with a permission. The lowest cooldown, warmup and cost and the highest daily limit win. Values left out use the rule's own. |

Rules stack: if two rules cover a command, all of them apply, and costs add up. Cooldowns are per rule, so one rule covering `/heal` and `/feed` gives them a shared cooldown.

```yaml title="plugins/dkCommands/rules.yml"
rules:
  # /heal every 5 minutes, VIPs every 2 minutes
  heal:
    commands:
      - heal
    cooldown: 5m
    requires-permission: essentials.heal
    tiers:
      vip:
        permission: dkcommands.tier.vip
        cooldown: 2m

  # 3 uses of /repair per day, paid from the bank, with a confirmation
  repair:
    commands:
      - repair
    daily-limit: 3
    cost: 250
    cost-source: bank
    confirm: true
```

## Notes

- Rules apply to commands players **type** (and to your aliases). A command another plugin runs for the player in code, for example from a menu button, doesn't pass through dkCommands.
- Aliases register one tick after startup so they never steal a command from a plugin that loads later. If a name is taken, the alias is skipped with a warning unless `override: true`.
- Alias loops stop after 5 levels.
