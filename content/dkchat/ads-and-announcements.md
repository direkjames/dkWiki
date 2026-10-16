---
title: Advertisements and announcements
description: Rank-based /ad advertisements with a cost and cooldown, timed announcements, and clearing chat.
audience: players, staff
order: 4
---

## Advertisements

`/ad <message>` (also `/advertise`) posts your message to everyone. `/ad` on its own shows your cooldown.

Ads come in **tiers**. Each tier has a priority, a permission, a cooldown in seconds and a money cost taken through Vault. You use the highest-priority tier you have the permission for. The shipped tiers are `default` (permission `dkchat.ad`), `vip` (`dkchat.ad.vip`) and `mvp` (`dkchat.ad.mvp`). Better tiers have a shorter cooldown and a lower cost.

When you send an ad, dkChat checks in this order: your tier, the message length, your cooldown, your balance, and whether you are muted by LiteBans. Money is taken only when the ad is actually sent. Cooldowns are saved on the player, so relogs and restarts don't reset them. `dkchat.ad.bypass` skips both the cooldown and the cost.

The lines of an ad, an optional title and the sound are configurable. Start a line with `{center}` to centre it.

## Announcements

Timed announcements live in `announcements.yml`:

- An `interval` between announcements (minimum 10 seconds), and a `mode`: `random` (shuffled, no repeats until all have been shown) or `sequential`.
- `min-players` skips announcements when too few players are online.
- Each announcement can have a `permission` (only these players see it) and a `hide-permission` (these players don't).
- Lines support `{center}`, clickable links, PlaceholderAPI for each player, `{name}` and `{player}`.
- `/dchat announce <id>` sends one now, which is a quick way to test.

## Clearing chat

| Command | Permission | What it does |
|---|---|---|
| `/clearchat` (`/cc`, `/chatclear`) | `dkchat.clearchat` (everyone) | Clears your own chat. |
| `/clearchat all` | `dkchat.clearchat.all` (operators) | Clears the chat for everyone except players with `dkchat.clearchat.exempt`. |
