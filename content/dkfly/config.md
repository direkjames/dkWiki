---
title: Settings
description: Every dkFly config.yml setting: world blacklist, speed, the timer display, landing rules, combat, transfers and the shop.
audience: staff
order: 5
---

dkFly's settings live in `plugins/dkFly/config.yml`. Messages are in `messages.yml` and the shop is in `gui.yml`. Run `/flytime reload` after a change. Durations accept `30` (seconds), `45s`, `10m`, `1h30m` and `2d`.

dkFly works in any game mode, survival, skyblock or OneBlock. Island flight is left to BentoBox's own addon. Fly time is saved to the database every few minutes (`autosave-minutes`, 5 by default), and purchases, transfers and admin changes are always saved right away.

## WorldGuard

With WorldGuard installed, dkFly adds a region flag. Run `/rg flag <region> dkfly deny` to stop flying in a region. An unset flag or `allow` means flying is allowed. `dkfly.bypass.region` ignores it.

## AFK

While `afk.pause-timer` is on, time isn't charged while a player is AFK, and flight stays on. dkFly asks dkCore, which gets the answer from [dkAFK](../dkafk/index.md). If no AFK provider is installed, `use-purpur-afk-fallback` uses Purpur's built-in AFK state instead.

## Every setting

{{config:dkfly}}
