---
title: How money is recorded
description: How dkLedger sees every wallet and bank change, what it counts as earnings, and how long it keeps its records.
audience: staff, developers
order: 1
---

dkLedger doesn't need each plugin to report its money. It watches the places money has to pass through.

## Where it watches

- **Vault.** dkLedger sits in front of the real economy (EssentialsX) and passes every call straight through, so nothing changes for other plugins. Successful deposits and withdrawals are recorded along with the plugin that made them. It registers itself early, in `onLoad`, at the highest priority, so plugins get it when they look up the economy.
- **EssentialsX.** `/eco` (from staff, the console or other plugins' reward commands), `/pay`, `/sell` and direct API use. Changes already recorded through Vault aren't counted twice.
- **dkBank.** Every bank change. Deposits and withdrawals move money between a player's own wallet and bank, so they only count as their fee. Interest creates money. Upgrades and fees remove it.

## What a source is

Every entry has a source, which says who caused it. Sources are plugin names, plus `staff:<name>`, `console`, `Essentials /pay`, `Essentials /sell`, `dkBank`, `dkBank transfers`, `dkBank interest` and `dkBank upgrades`.

Two settings in [the config](config.md) tell dkLedger how to treat sources:

- `ledger.transfer-sources` lists sources that move money *between players*. They aren't counted as earnings, and they feed the transfer checks.
- `ledger.internal-sources` lists sources that move money *between a player's own wallet and bank*. Only their fees count.

## Why money moved

A source says which plugin moved money. A **reason** says why, for example "quest: daily_3" or "vote reward". dk plugins can label their payments, and the reasons then show up in `/ledger reasons`. See [For developers](developers.md) for how.

## What else it tracks

- **Item trades:** what players buy and sell in shops.
- **Playtime:** each player's first join, plus minutes active and AFK per day.
- **Progress:** OneBlock phases, dkBank tiers and anything dk plugins report.

AFK counts from EssentialsX's AFK status. Without it, a player idle for the configured number of minutes counts as AFK.

## Money supply

Every hour (`ledger.snapshot-minutes`), dkLedger counts everyone's wallet plus their dkBank balance. That number is the **money supply**. The count reads a few wallets per tick, so it never freezes the server.

## How long it keeps things

| What | Kept for |
|---|---|
| Single money entries, item trades and hourly prices | 90 days by default (`ledger.keep-entries-days`) |
| Daily totals (per source, reason, player and item), daily prices, supply snapshots, alerts, playtime and progress | Forever |

Everything is stored in dkCore's shared database, in tables that start with `dkledger_`. Tables from older versions are updated on startup.

> [!NOTE] Privacy
> IP addresses are never stored. The alt-transfer check keeps only a salted hash, with the salt in `plugins/dkLedger/data/salt.txt`.
