---
title: Making codes
description: How to write codes in codes.yml, with limits, dates, requirements, mystery pools and every reward type.
audience: staff
order: 3
---

Codes live in `plugins/dkCodes/codes.yml`. You can edit the file and run `/dkcodes reload`, or use `/dkcodes gui` and the `/dkcodes` commands.

Code names are 3 to 32 letters, numbers, `-` or `_`. Players can type them in any case and with or without dashes.

## Settings for a code

Every setting is optional.

| Setting | What it does |
|---|---|
| `enabled` | `false` makes the code act like it doesn't exist. |
| `max-uses` | Total uses for everyone. `-1` is unlimited. |
| `uses-per-player` | Uses for each player. `-1` is unlimited. |
| `uses-per-ip` | Uses for each connection, which slows alt accounts down. `-1` is unlimited. |
| `starts`, `expires` | When the code starts and ends, as `yyyy-MM-dd` or `yyyy-MM-dd HH:mm`. A date without a time expires at the end of that day. |
| `player` | Only this player can use it. |
| `referral-owner` | Makes it a referral code owned by this player. |
| `requirements` | `permission`, `min-playtime` (such as `2h30m`), `worlds`, and `cost` (money taken to redeem). |
| `rewards` | What the player gets. |
| `owner-rewards` | For referral codes: given to the owner each time someone uses it. |
| `mystery` | Reward pools with a `weight` each. One pool is picked at random and given on top of `rewards`. |

## Reward types

One per line, written as `type: value`. `%player%`, `%uuid%`, `%code%` and `%owner%` work in all of them.

| Type | Example | What it does |
|---|---|---|
| `command` | `give %player% diamond 5` | Runs from the console. |
| `money` | `1000` | Pays the player's balance through dkCore's economy. |
| `item` | `diamond 5` | Any amount, split into stacks. |
| `itemstack` | (saved with `/dkcodes additem`) | An exact saved item. Don't edit it by hand. |
| `xp`, `xp-levels` | `500`, `5` | Experience points, or levels. |
| `message` | `<green>Thanks %player%!` | A MiniMessage text to the player. |
| `title` | `<gold>Welcome!\|<gray>Enjoy your stay` | A title and subtitle, split by a bar. |
| `sound` | `entity.player.levelup 1 1` | A sound, with volume and pitch. |
| `broadcast` | `<gold>%player% redeemed %code%!` | A message to everyone. |

## An example

```yaml title="plugins/dkCodes/codes.yml"
codes:
  WELCOME:
    enabled: true
    uses-per-player: 1
    uses-per-ip: 2
    requirements:
      min-playtime: 10m
    rewards:
      - 'money: 500'
      - 'item: bread 16'
      - 'message: <green>Welcome to the server, %player%!'
      - 'sound: entity.player.levelup 1 1'
```

And a mystery code, with a weight for each pool:

```yaml title="plugins/dkCodes/codes.yml"
codes:
  MYSTERY-BOX:
    max-uses: 100
    expires: '2026-12-31'
    rewards:
      - 'message: <light_purple>Opening your mystery box...'
    mystery:
      common:
        weight: 70
        rewards:
          - 'item: iron_ingot 16'
      rare:
        weight: 25
        rewards:
          - 'item: diamond 3'
```
