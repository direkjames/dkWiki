---
title: Discord
description: Post big trades, hand-made market changes and a daily summary to a Discord channel with a webhook.
audience: staff
order: 9
---

dkStock can post to a Discord channel: big trades, market changes made by hand (crash, surge, reset, setprice, setstock) and a daily summary. It is off by default.

:::steps
1. In Discord, open the channel's settings, then **Integrations**, then **Webhooks**, then **New Webhook**, then **Copy Webhook URL**.
2. Open `plugins/dkStock/discord.yml`, paste the address into `webhook-url` and set `enabled: true`.
3. Run `/stock reload`, then `/stock discord test`. A test message should appear in the channel.
:::

Other settings in `discord.yml`: `big-trades.min-total` (the smallest trade, in money, that gets a message), `admin-actions`, `daily-summary` (time and time zone), and the name and picture shown on the messages.

- `/stock discord test` sends a test message, and `/stock discord summary` sends the last 24 hours now. The permission is `dkstock.admin.discord` (operators by default).
- **Treat the webhook address like a password.** Anyone with it can post in your channel. dkStock only accepts real `discord.com` webhook addresses, never prints the address in the console, and switches mentions off, so a player name can't ping `@everyone`.
- Messages are sent in the background. If Discord is slow or down, the server isn't affected, and the console shows at most one warning a minute.
- `discord.yml` is created on the first start of this version, with the webhook off.
