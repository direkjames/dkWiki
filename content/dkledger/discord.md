---
title: Discord
description: Post alerts, scan results, the weekly report, a daily summary, freezes and price checks to a Discord channel.
audience: staff
order: 6
---

dkLedger can post to one Discord channel with a **webhook**. There is no bot, no token and no extra plugin. It is off until you turn it on and paste a webhook address.

:::steps
1. In Discord, open the channel's settings, then **Integrations**, then **Webhooks**, then **New Webhook**, then **Copy Webhook URL**.
2. Open `plugins/dkLedger/discord.yml`, paste the address into `webhook-url` and set `enabled: true`.
3. Run `/ledger reload`, then `/ledger discord test`.
:::

## What can be sent

Every kind of message has its own switch in `discord.yml`.

| Switch | Sends |
|---|---|
| `alerts` | Every new alert, from `min-severity` up. |
| `scans` | The startup config scan, when it finds at least `min-critical` critical problems. Scans you start by hand are never sent. |
| `weekly-report` | A short weekly report at the day and time set in `config.yml`. |
| `daily-summary` | Money supply, money created or removed, biggest faucets and sinks, open alerts, at a time you choose. |
| `freezes` | Staff freezing or unfreezing a player. |
| `price-checks` | The verdict of every `/ledger price`. Off by default. |

`/ledger discord status` shows what is switched on, `/ledger discord test` sends a test message, and `/ledger discord daily` or `weekly` sends that message now.

## Safety

- **Treat the webhook address like a password.** Anyone with it can post in your channel.
- Only real Discord webhook addresses are accepted, and the address is never written to the console or chat.
- Mentions are always off, so a player named `@everyone` pings nobody.
- Messages are sent on their own thread, so the server never waits for Discord. Discord's rate limits are obeyed, and `max-messages-per-minute` drops the extra messages instead of flooding the channel.
- dkLedger only reports. It never freezes or changes anything by itself.
