---
title: dkCrates
description: Open crates with keys to win rewards, preview the exact chances first, and claim anything that didn't fit.
audience: players, staff
order: 0
---

dkCrates adds crates to the server. You earn **keys** (from voting, events and staff), spend one to open a crate, and win a reward. Keys are normally virtual, so they live in your account and can't be lost, dropped or stolen. A crate can also use a physical key item.

## How to open a crate

:::steps
1. Type `/crates` to open the crates menu. Each crate shows how many keys you have.
2. **Left-click** a crate to open it with one key. **Right-click** to preview its rewards and exact chances. **Shift-click** to open all your keys at once.
3. Watch the row spin and slow down. The reward is already decided before it starts, so closing the menu or leaving never loses it.
4. If your inventory was full, the items that didn't fit wait for you. Type `/crates claim` to collect them.
:::

Some servers also have **crate blocks** in the world. Left-click one to preview it, right-click to open it with one key, and shift-right-click to open all your keys.

## What you can win

A crate can give items, a random pick from a pool ("A Random Sapling"), money, or run a command for you (for example, extra fly time with dkFly). The preview shows the rarity of every reward, your exact chance per key, and anything that is limited. Some rewards are limited per player or for the whole server, and the preview shows how many are left.

> [!NOTE] Mystery and donor crates
> A **mystery crate** has no preview, and the spin shows ??? until it stops. A **donor crate** shows a lock line if you don't have the rank to open it.

## Where to go next

:::contents
- [Using crates](using-crates.md) :: Keys, the menus, claiming, and what can limit a reward.
- [Commands and permissions](commands.md) :: Player and staff commands.
- [Crate files](crate-files.md) :: Writing a crate: rarities, rewards, pools and limits.
- [Settings](config.md) :: Menus, spin, blocks, holograms, sounds and logs.
- [Placeholders](placeholders.md) :: Key counts and stock for scoreboards and holograms.
- [Switching from ExcellentCrates](switching.md) :: What carries over and what doesn't.
:::

## Try it yourself

Use a normal account. Items marked *staff* need `dkcrates.admin`.

:::steps
1. *Staff:* run `/crates key give <you> vote 3` to give yourself three keys for the `vote` crate.
2. Run `/crates`. The menu shows 3 keys on that crate.
3. Right-click the crate to preview its rewards. Each one shows its rarity and chance.
4. Left-click to open one key and watch the spin.
5. Shift-click to open the rest at once. You get one summary message.
6. Run `/crates claim` if anything didn't fit.
7. *Staff:* run `/crates log <you>` to see what you won.
:::
