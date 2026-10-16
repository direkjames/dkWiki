---
title: Alerts
description: What dkLedger warns staff about, where alerts show up, and how to investigate and resolve one.
audience: staff
order: 3
---

An alert means something about the economy deserves a look. It isn't proof of a problem. A big quest reward or a sale can trip one, and the point is that a person checks.

## Where alerts show up

- In chat, for anyone with `dkledger.alerts`, with a sound if one is set.
- In `/ledger alerts [open|all] [page]` and in the `/ledger` menu.
- In the login summary when staff join, if there is a new one.
- On the Discord bot, through the `LedgerAlertEvent` the API fires.

Each alert is either a **warning** or **critical**. The same alert isn't repeated within a few hours unless it gets worse.

> [!NOTE] Quiet at first
> In the first days after installing, the money supply grows fast because it starts near zero. The growth checks stay quiet during this warm-up so you aren't flooded.

## What dkLedger watches

| Alert | It notices |
|---|---|
| **B1** Supply growth | The money supply, or money per active player, growing faster than normal. |
| **B2** Sources and sinks | One source making most of the new money, or too little money being removed compared with what is added. |
| **B3** Players far above the rest | A player earning many times the median, or a lot in the last hour. |
| **B4** Buy and sell loops | A player buying and selling with the same plugin again and again in a short time. |
| **B5** New money source | A plugin moving money for the first time. |
| **B6** Big staff changes | A large `/eco` or bank change made by staff. |
| **B7** Wealth concentration | A large share of all money held by the richest 10%. |
| **B8** Price swings | A shop price moving a lot within a few days. |
| **B9** Alt transfers | A player receiving a lot of money from accounts on the same connection. |
| **B10** Big transfers | One very large transfer between players. |

## When you get one

:::steps
1. Read it. The alert says what was noticed and for whom.
2. Open `/ledger player <name>` for a player, or `/ledger sources day` for a source. The newest entries show the exact amounts, with ids.
3. If it looks like a dupe, a loop or an exploit, run `/ledger freeze <player> <reason>` to stop them sending money while you look. They can still play.
4. Leave a record with `/ledger note <player> <text>`.
5. Run `/ledger resolve <id> <note>` when you've dealt with it, so the list shows only what is still open.
:::

If an exploit already put money in the wrong hands, an owner can undo single entries with `/ledger reverse <entry id>`.

:::private
The thresholds for every alert are in [Alerts and audit tuning](tuning.md), which is left out of the published wiki so players can't learn where the limits are.
:::
