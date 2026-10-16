---
title: Placeholders
description: dkFly's PlaceholderAPI values for remaining fly time, on or off, and unlimited flight.
audience: staff
order: 4
---

dkFly registers these placeholders when PlaceholderAPI is installed:

| Placeholder | Value |
|---|---|
| `%dkfly_time%` | The remaining time, in the configured time format. |
| `%dkfly_time_seconds%` | The remaining time, in seconds. |
| `%dkfly_enabled%` | `true` or `false`. |
| `%dkfly_status%` | The status text from `placeholders.status-on` and `status-off`. |
| `%dkfly_unlimited%` | `true` or `false`. |

The `placeholders` section of `config.yml` sets the text shown for unlimited time (`∞` by default) and for on and off. The `time-format` section sets how times look: `compact` (1h 5m 3s) or `digital` (01:05:03).
