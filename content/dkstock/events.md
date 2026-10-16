---
title: Scheduled events
description: Crash or surge prices by themselves on a schedule, with a warning first. Off by default.
audience: staff
order: 8
---

dkStock can crash or surge prices on a schedule, for a bit of life in the market. It is off by default.

:::steps
1. Open `plugins/dkStock/events.yml` and set `enabled: true`.
2. Edit the two sample events or add your own. Each one has a `type` (`crash` or `surge`), a `percent`, the `items` it affects (or `all`), the `times` and `days` it happens, a `chance` and `warn-minutes`.
3. Run `/stock reload`, then `/stock events` to see each event and when it runs next.
:::

- Players are warned `warn-minutes` before an event starts and told when it does. Whether an event happens is decided when the warning goes out, so players are only warned about real events. An event that was due more than 2 minutes ago (the server was off) is skipped.
- To keep players guessing, use `pick` (choose that many items at random from the `items` list, or from every item) and a percent range such as `percent: "10-25"`. By default the warning only says that some prices are about to rise or fall, and the start message says which and by how much. Setting `reveal-in-warning: true` names them in the warning too.
- `/stock events run <id>` runs an event now, without a warning or a chance roll. It works even when scheduling is off, which makes it handy for testing.
- Events go through the same path as `/stock crash` and `surge`. They are written to the admin log, sent to the Discord webhook (the "By" field reads `Event: <name>`) and can be cancelled by other plugins through the [API](developers.md).
- Put times in quotes, like `"18:00"`. Without quotes, YAML reads it as a number.
- The permission is `dkstock.admin.events` (operators by default).

> [!WARNING] Events can be gamed when players know what is coming
> Keep events small. dkStock warns you on startup and on `/stock reload` when an event is bigger than your `tax-percent`, because that is when acting on the warning pays. Keep daily limits on, and use a `chance` below 100 with a short `warn-minutes` if you want a surprise.
