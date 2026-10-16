---
title: Settings
description: Every dkCrates config.yml setting: the menus, mass opening, the spin, crate blocks, holograms, sounds and logs.
audience: staff
order: 6
---

dkCrates' settings live in `plugins/dkCrates/config.yml`. Run `/crates reload` to apply a change. Crate icons come from each crate file. Items in the menu can be a material, a Nexo item (`nexo:<id>`) or an item saved with `/crates item save`.

The `menu.items` section adds decorations, info and buttons to the `/crates` menu. A button's `commands` run as the player when clicked, without the slash.

## Every setting

{{config:dkcrates}}

> [!TIP] The reward is decided before the spin
> The reward is picked before the spin starts, so closing the menu or leaving just gives the reward right away. With `spin.allow-close: false` the menu can't be closed (it opens again).

## Menu safety

Every menu icon is tagged. If one ever ends up in an inventory, it is deleted. Holograms use TextDisplay (no ProtocolLib), show a "Your keys" line that only each player sees, and are never saved into the world, so they can't duplicate.
