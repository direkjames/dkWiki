---
title: Menus
description: The chest menus players use, and how staff edit their items, text and actions.
audience: staff
order: 5
---

Every menu is a file in `plugins/dkBank/menus/`: `main`, `deposit`, `withdraw`, `transfer`, `tiers`, `confirm-upgrade`, `history` and `top`. Each file's comments list the values and actions it supports.

Run `/bank admin reload` after editing. A file with a mistake keeps its previous version, and the console says what is wrong.

> [!NOTE] Your edits are safe
> Menu files are never changed after they're created. To get a new default menu after an update, delete the file and run `/bank admin reload`.

## Items

```yaml title="menus/main.yml"
items:
  balance:
    slot: 22                 # or slots: [10-16, 20]; 0 is the top left, 9 per row
    material: GOLD_BLOCK     # AIR leaves it empty; values like "<tier-icon>" work
    name: "<gold>Bank balance"
    lore:
      - "<white><balance>"
    glow: true
    amount: 1
    hide-tooltip: false      # true for background panes
    head: viewer             # PLAYER_HEAD: the player's own skin
    action: "open:deposit"   # or actions: [...]
    permission: dkbank.deposit   # hidden without it
```

Text is [MiniMessage](https://docs.advntr.dev/minimessage/format.html), and PlaceholderAPI placeholders work too. `fill` covers empty slots and `border` the outer ring.

## Custom heads

Copy a head's **Value** from [minecraft-heads.com](https://minecraft-heads.com) and use it as `texture`:

```yaml
  coins:
    slot: 13
    texture: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
    name: "<gold>Coins"
```

`material: "head:<Value>"` works too, which is handy for tier icons in `tiers.yml` and history items. A `textures.minecraft.net` link or just the texture id also works.

## Actions

| Action | Works in | What it does |
|---|---|---|
| `open:<menu>` | All menus | Opens main, deposit, withdraw, transfer, tiers, history or top. |
| `back` | All menus | Goes to the main menu. From the upgrade confirmation it goes to the tiers menu. |
| `close` | All menus | Closes the menu. |
| `command:<command>` | All menus | Runs a command as the player. `<player>` is their name. |
| `amount:<amount>` | deposit, withdraw | Moves a set amount, such as `amount:all`, `amount:half` or `amount:5k`. |
| `custom` | deposit, withdraw | Lets the player type an amount in chat. |
| `type-name` | transfer | Lets the player type a player's name in chat. |
| `previous` and `next` | transfer, history, top | Moves between pages. |
| `upgrade` | main | Starts confirming the next tier. |
| `confirm` | confirm-upgrade | Buys the tier. |

Opening any menu checks the player's permission for it, such as `dkbank.deposit`, whatever the file says.
