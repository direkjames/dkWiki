---
title: Items, window and messages
description: How to set what the market sells, how the window looks, which tabs it has, and how to edit messages.
audience: staff
order: 7
---

## items.yml

Each key is a Minecraft item id. The `minecraft:` prefix is optional.

```yaml title="plugins/dkStock/items.yml"
diamond:
  base-price: 80.0
  start-stock: 50
  max-stock: 500
```

| Setting | Required | What it does |
|---|---|---|
| `base-price` | Yes | The price when the market is fresh (above 0). |
| `start-stock` | Yes | How many the market starts with. |
| `max-stock` | Yes | The market stops buying from players at this amount. |
| `allow-buy` | No | `false` means players can't buy it. |
| `allow-sell` | No | `false` means players can't sell it. |
| `slot` | No | Pins the item to an exact slot in the window (counting from 0). |
| `page` | No | The page for that slot (1 by default). |
| `daily-buy` | No | This item's daily buy limit per player. Overrides `limits.daily-buy`. 0 means no limit. |
| `daily-sell` | No | This item's daily sell limit per player. Overrides `limits.daily-sell`. 0 means no limit. |
| `drift` | No | `false` means this item's price never drifts back toward its base price. |
| `regen` | No | `false` means this item's stock never regenerates. |

- **The item id is also how prices are saved.** If you rename a key, that item starts over at its base price and stock.
- Each item can appear only once. Duplicates and unknown item ids are skipped with a warning.
- The default list sells ingots and finished gems, so players smelt ores first. Storage blocks such as `iron_block` are included as comments. To enable one, remove the `#` signs and price it at about 9 times the ingot, so players can't profit from crafting.

## gui.yml

| Setting | What it does |
|---|---|
| `title` | The window title (MiniMessage). |
| `rows` | Number of rows, 1 to 6. |
| `item-slots` | Where items go, such as `["10-16", "19-25"]`. Items continue onto new pages when full. |
| `fill` | Decoration for empty slots: `enabled`, `material`, `name`. |
| `previous-page`, `next-page` | The page buttons: `enabled`, `slot`, `material`, `name`. In the names, `<page>` and `<pages>` are filled in. |
| `close` | The close button: `enabled`, `slot`, `material`, `name`. |
| `search`, `hot`, `clear-filter` | The search button, the hot item icon and the clear-filter button. |
| `categories` | `enabled`, the **All** tab (`all`) and the `slots` the category tabs use. |

The page buttons only appear when there is a page to go to. Bad slots and overlaps are reported as warnings when you reload.

## categories.yml

Each category has a `name`, an `icon`, and the items it holds, by exact `items` and/or `patterns` (such as `*_ingot`). An item goes to the first category that matches it. Anything left over goes to `other`.

## messages.yml

`messages.yml` holds every message. Text uses MiniMessage, such as `<red>` and `<gold>`.

- `prefix` is shown wherever a message contains `<prefix>`. Change it, or remove `<prefix>` from a message to hide it.
- Prices are shown in plain text with the colour from your messages, never black.
- Missing message keys are added for you, but the existing `help` and `help-admin` lines are yours. Delete those two lines and restart to get the newest help text.
