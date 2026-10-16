---
title: Settings
description: Every dkSleep setting, from the vote rules to the boss bar, plus how to change them for one world.
audience: staff
order: 3
---

dkSleep's settings live in `plugins/dkSleep/config.yml`, and every message is in `messages.yml` (MiniMessage; set a message to `""` to turn it off). Run `/dksleep reload` after a change. A reload cancels running votes.

## Per-world overrides

Everything under `settings` is the default for every world. To change a setting for one world, add it to `world-overrides` under the world's folder name:

```yaml title="plugins/dkSleep/config.yml"
world-overrides:
  survival_world:
    mode: ONE_PLAYER
  events_world:
    vote:
      quorum-percent: 75
      duration-seconds: 20
    well-rested:
      enabled: false
```

## Every setting

{{config:dksleep}}

`startup-banner: false` turns the console banner off and leaves one log line instead.
