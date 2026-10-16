---
title: How detection decides
description: What counts as real activity, how look macros, AFK pools and auto-clickers are caught, and how to tune it.
audience: staff
order: 6
visibility: private
---

This page is **left out of the published wiki**, because it explains how dkAFK tells real play from tricks. Build the wiki with `WIKI_PRIVATE=1` (or run `npm run dev`) to read it.

## What counts

All times are counted from the player's last real activity. **Real input** resets the timer and ends AFK.

| Counts | Doesn't count |
|---|---|
| Turning the camera to new directions | Tiny turns, or looking where they looked recently: **look macros** (back-and-forth, spinning, random camera wiggle) |
| Walking somewhere new while pressing movement keys | Being moved without pressing keys: **water currents, AFK pools, bubble columns, minecarts, boats, pistons, being pushed** |
| | Staying in the same small area: **jumping in one spot**, walking into a wall |
| | Walking or drifting in a loop back to recent spots |
| Chatting, answering the AFK check | The same message over and over |

**Click-type activity** (breaking, placing, clicking, attacking, fishing, eating, dropping items, inventory clicks, commands) keeps an active player active, but only for `detection.click-only-limit` (1 minute) after their last real input, and it can't end AFK. This stops auto-clickers and macros at any speed: someone who only clicks becomes AFK `afk-time` after they last looked around or moved. On top of that:

- The same action on the same target non-stop for longer than `detection.repeat.max-streak` stops counting (for example holding left-click on the oneblock, or a mob grinder).
- Clicks with machine-like timing stop counting (auto-clickers, held-down buttons), even through lag.

When either is caught, the credit it earned is taken back to when it started. Teleports (warps, `/is go`, the AFK area) never count as activity.

## Tuning

Use `/dkafk debug <player>` while someone plays normally or tries an AFK setup, then adjust `detection` in `config.yml`:

- Real players marked AFK while mining: raise `click-only-limit` (try 2m).
- A movement setup isn't caught: raise `movement.radius` or `movement.loop-memory`.
- An auto-clicker isn't caught (a very laggy connection): raise `clicks.tolerance-ms` (try 200).
- Fast-clicking players get flagged: lower `clicks.tolerance-ms` (try 100).

Performance: each mouse or movement update costs about 0.1 microseconds in the detection code, which allocates no memory, and everything else runs once per second. Empty minecarts and boats are skipped.

## Every detection setting

{{config:dkafk:detection}}
