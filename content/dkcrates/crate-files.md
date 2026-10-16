---
title: Crate files
description: How to write a crate: one file per crate, with rarities, rewards, random pools, limits and optional extras.
audience: staff
order: 3
---

There is **one file per crate** in `plugins/dkCrates/crates/`. The file name is the crate id: `vote.yml` becomes `vote`, as in `/crate key give %player% vote 1`. The example crates (`vote`, `pinata` and `appreciation`) are copied only on the very first start, and `vote.yml` explains every option. Run `/crates reload` after a change.

Problems (a wrong material, a missing rarity) are listed in the console on start and on `/crates reload`. The rest of the crate still loads.

## Rarities and rewards

A roll first picks a **rarity** by weight, then a **reward** inside that rarity by weight. Weights don't need to add up to 100: 70, 25 and 5 mean 70%, 25% and 5%.

```yaml title="plugins/dkCrates/crates/vote.yml"
display-name: "<green><bold>Vote Crate"
key-name: "<green>Vote Key"
icon: LIME_SHULKER_BOX
slot: 11

rarities:
  common:
    display-name: "<gray>Common"
    weight: 70

rewards:
  bone_meal:              # simplest: just an item
    rarity: common
    weight: 10
    item: BONE_MEAL
    amount: 32

  random_sapling:         # a random pick
    rarity: common
    weight: 10
    material: OAK_SAPLING
    display-name: "<green>A Random Sapling"
    pool:
      entries:
        oak:
          item: OAK_SAPLING
          weight: 5
        cherry:
          item: CHERRY_SAPLING
          weight: 2

  fly_time:               # a command
    rarity: common
    weight: 5
    material: FEATHER
    display-name: "<aqua>10 Minutes of Fly"
    commands:
      - "flytime give %player% 10m"

  money:                  # wallet money
    rarity: common
    weight: 5
    material: GOLD_INGOT
    display-name: "<gold>$500 - $1,500"
    money: 500-1500
```

- `item:` is what it **gives**. `material:` and `display-name:` are only how it **looks** in the preview. Without them, the icon and name come from the item.
- `weight` defaults to 1 and `amount` defaults to 1.
- A reward can give any mix of items, several items, a **random pool**, **console commands** and EssentialsX **wallet money**. Amounts and money can be ranges, such as `16-32` or `1000-5000`.
- A **pool** picks one entry (or `pick: 2+`) at random, and the win message names the result: *You won A Random Sapling: Cherry Sapling!*
- Commands can use PlaceholderAPI placeholders.

## Optional crate settings

All of these can be left out.

| Setting | What it does |
|---|---|
| `icon`, `slot` | The `/crates` menu icon and slot. The icon can be a material, `nexo:<id>` or a saved item id. Leave `slot` out to place it automatically. |
| `menu-lore` | Lines under the crate's icon (`<keys>` works). |
| `show-in-menu: false` | Hides it from `/crates`. It still opens from blocks and commands. |
| `preview: false` | Makes it a **mystery crate**: no preview, and the spin shows ??? until it stops. Staff can still look. |
| `permission` | Only players with this permission can open it (donor crates). The menu shows a lock line to others. |
| `exclude-permission` (on a reward) | Players with it never get the reward and don't see it in the preview. The chances shown for other rewards don't change. |
| `physical-key` | Gives and accepts a real key item too: `item`, `name`, `lore` and `glow`. |
| `animation` | `spin` or `instant`, for one key. Mass opening is always instant. |
| `particle` | An idle particle ring around this crate's blocks. |
| `hologram` | Lines above this crate's blocks (`<crate>`, `<key>`, `<rewards>`). |
| `max-wins`, `stock` (on a reward) | Limits per player, and for the whole server. |

## Items, Nexo and custom textures

- Use `item: nexo:<id>` anywhere an item goes: rewards, icons, keys and menu items.
- Items saved with `/crates item save` keep every component, so custom models survive. `item-model:` and `custom-model-data:` work for vanilla items.
- `/crates item add` writes Nexo items as `nexo:<id>`, and `/crates item info` shows the Nexo id.
- Make an item in game, then save it, show it as YAML, or add it as a reward with the `/crates item` commands. Don't edit the `data` in `items.yml` by hand.

## Files in the plugin folder

| File | What it holds |
|---|---|
| `config.yml` | Menus, mass open, spin, crate blocks, holograms, sounds, the claim reminder. See [Settings](config.md). |
| `messages.yml` | Every message (MiniMessage). Set a message to `""` to turn it off. |
| `crates/*.yml` | One file per crate. |
| `items.yml` | Items saved with `/crates item save`. |
| `blocks.yml` | Crate blocks. Use the commands instead of editing it. |

Data is stored in dkCore's database, in tables that start with `dkcrates_`: keys, claims, pending commands and wins, opened counts, wins, stock and the log. Old log entries are cleaned up (`logs.keep-days`, 90 by default).
