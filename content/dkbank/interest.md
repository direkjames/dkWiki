---
title: How interest works
description: The two kinds of interest, why AFK time pays less, the lowest-balance rule and the limits that keep it fair.
audience: players, staff
order: 2
---

Every bank account earns two kinds of interest, and each tier has its own rate for both.

## Online interest

Online interest is paid for time you **play**. Your tier's `online-rate` is paid for every online period, which is one hour by default. You get a message and a sound at each payout, and leaving part-way through an hour pays the minutes you played.

> [!NOTE] Example
> With 10,000 in the bank at 1% per hour, an hour of play pays +100. A 15-minute visit pays +25.

## Offline interest

Offline interest is paid when you **log in**, for the time you were away. Your tier's `offline-rate` is paid for every offline period, which is one day by default. It compounds, and only the first 7 days away count (by default). A "while you were away" message appears a few seconds after you join.

> [!NOTE] Example
> With 10,000 at 1% per day and 3 days away, you earn +303.01, the same as three daily payouts. Away for a month, only 7 days count.

## AFK players

Time spent AFK earns the **offline** rate instead of the online one, so AFK farms earn no more than logging off.

You count as AFK after 5 minutes (by default) without moving, looking around, chatting or using commands, or when an AFK plugin says so. dkBank reads this from PlaceholderAPI (EssentialsX and CMI are set up by default), and with dkCore and dkAFK installed it is told directly with no setup.

## The lowest-balance rule

Interest is paid on the **lowest balance since the last payout**. Money deposited just before a payout earns nothing until the payout after it, and withdrawing lowers what earns straight away. This stops the "deposit, collect, withdraw" trick.

## Limits per tier

| Setting | What it does |
|---|---|
| `cap` | Only the balance up to this earns interest. This keeps growth steady instead of snowballing, and is strongly recommended. |
| `max-per-payout` | The most interest in one payout, scaled by the time it covers, so logging in and out can't collect it repeatedly. |
| `max-balance` | Interest never takes a bank past its maximum balance. |

## Good to know

- Progress is saved every minute. A crash loses at most a minute of progress and never pays twice.
- Banks locked by the [alt-account limit](alt-limit.md) earn no interest.
- `/bank interest` shows your rates, what is earning and your next payout.
- Staff can run `/bank admin economy` to see how much interest the server is creating, which helps watch for inflation.
