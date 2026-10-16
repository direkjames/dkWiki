---
title: Settings
description: Every dkAFK setting: the AFK timeline, the check window, the actions, the AFK tag and who is exempt.
audience: staff
order: 2
---

dkAFK's settings live in `plugins/dkAFK/config.yml`. Run `/dkafk reload` after a change. New settings are added to your file automatically on startup, with their comments, so you never need to regenerate it after an update. Times accept `300` (seconds), `5m`, `1h30m` or `1:30`.

## Going live

:::steps
1. Install dkCore and PlaceholderAPI, then put the dkAFK jar in `plugins/` and start the server.
2. In `config.yml`, set `afk-time`, `action-time` and your `actions` (your AFK area warp). Keep `freeze-on-actions` a little longer than the warp's delay.
3. Add `%dkafk_tag%` to your TAB suffix. See [Placeholders and TAB](placeholders.md).
4. If EssentialsX is installed, turn off its `auto-afk` and `auto-afk-kick`, so the two don't conflict.
5. Test with a non-operator account in survival, using `/dkafk debug <player>` to watch what counts.
6. Run `/dkafk reload` after any change.
:::

## The timeline

```yaml title="plugins/dkAFK/config.yml"
afk-time: "5m"
action-time: "6m-10m"   # or a fixed time like "10m"
```

With a range, every AFK period picks its own random time inside it, so players can't learn when the window comes. Here the tag appears after 5 minutes and the check somewhere between 6 and 10 minutes. All times are counted from the player's last real activity. The actions only run once per AFK period, so a player standing in the AFK area isn't sent there again.

## Actions

```yaml title="plugins/dkAFK/config.yml"
actions:
  - "[message] <prefix><gray>Sending you to the AFK area."
  - "[console] warp AFKZone %player%"

freeze-on-actions: "5s"
```

Line types are `[console]` (the default), `[player]`, `[message]`, `[broadcast]` and `[teleport] world x y z [yaw pitch]`. `%player%` and PlaceholderAPI placeholders work in every line.

**Warps with a warmup.** Many warp plugins cancel the teleport if the player moves during the countdown. AFK players in water pools, bubble columns, minecarts or boats keep moving, so the warp would never happen. While `freeze-on-actions` is set, dkAFK takes the player out of any vehicle and holds them in place (they can still turn their head) until the warp teleports them or the time runs out. Set it a little longer than your warp delay. `[teleport]` avoids the warmup entirely if you'd rather use fixed coordinates.

## Every setting

The detection tuning is left out of this public page.

{{config:dkafk:general,check,actions,return,afk-command,worlds}}

## Messages and placeholders in text

All config text goes through PlaceholderAPI for the player it is about, then MiniMessage.

- `%player%` is the player's name (built in, no expansion needed).
- `%dkafk_idle%` and the other `%dkafk_...%` placeholders.
- Any other PlaceholderAPI placeholder, such as `%player_world%` (needs `/papi ecloud download Player`).
- `<prefix>` is the configured prefix.

On startup the console shows the dkAFK logo, version, hooks, the AFK timeline and who is exempt. Turn it off with `startup-banner: false`.
