---
title: Using crates
description: How keys work, the menus, mass opening, claiming rewards, and what happens if you leave mid-opening.
audience: players
order: 1
---

## Keys

Keys are **virtual**: they are stored in the server's database against your account, and staff can give them even when you are offline. A crate can also use a **physical key** item, which you can hold and which can't be placed, crafted with or burned. When a crate has both, opening uses key items in your inventory first, then virtual keys.

You can type `/crates open <crate> [amount|all]` instead of clicking.

## The menus

| Click | What it does |
|---|---|
| Left-click a crate | Opens it with one key. |
| Right-click | Previews the rewards, with the exact percentage chance per key, the rarity, and every pool entry's chance. |
| Shift-click | Opens all your keys. |

If you don't have a key, a crate block gives you a small push back instead.

## Mass opening

Opening many keys at once is done in small batches per tick, so the server stays smooth. It is always instant and ends with one summary message, up to a maximum number of keys per go.

## Limited rewards

A reward can be limited **per player** (`max-wins`) or **for the whole server** (`stock`). Limited-out rewards are skipped when rolling, and the preview shows your real chances, how many are left and your wins so far. Hidden rewards can exclude players with a permission, who never get them and don't see them in the preview.

## If something goes wrong

- **Your inventory is full.** Items that don't fit go to `/crates claim`. They are never dropped into the void, and you get a reminder on join.
- **You leave or die mid-spin.** The reward is sent to `/crates claim`. A reload gives it right away.
- **You leave mid-opening.** Items and reward commands wait in `/crates claim`. Commands run when you claim.
- **Keys are taken first and the reward is rolled before anything is given,** so there are no rerolls and no lost rewards.
