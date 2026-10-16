---
title: dkLedger
description: The staff tool that shows where the server's money comes from, where it goes, and when something looks wrong.
audience: staff
order: 0
---

dkLedger is the suite's financial analyst. It records every money change on the server, wallet and bank, and turns that record into answers: how much money exists, which plugin is creating it, which players are earning far more than others, and whether a config change would break the economy.

Players don't use it. Staff use it to keep an Oneblock economy healthy.

## What it does

| Part | What it does |
|---|---|
| **Ledger** | Records every money change, wallet and bank, with the plugin that made it. New plugins are found automatically, with nothing to hook by hand. |
| **Item trades** | Records what players buy and sell in shops ([dkStock](../dkstock/index.md), EconomyShopGUI, and plugins that use the API): the item, the amount and the money. |
| **Playtime** | Each player's first join, plus minutes active and AFK per day, so it can show money earned per hour played. |
| **Progress** | Things that aren't money: OneBlock phases, dkBank tiers, and whatever other dk plugins report. Kept forever. |
| **Reasons** | dk plugins can say *why* money moved ("quest: daily_3"), not only which plugin moved it. |
| **Money supply** | Every hour: total money (wallets plus dkBank), money per active player, and how much the richest 10% hold. |
| **Alerts** | Warnings about growth, concentration, loops and big transfers. See [Alerts](alerts.md). |
| **Admin actions** | Freeze a player's outgoing money, write staff notes, resolve alerts, and (owners only) undo one ledger entry. |
| **Config audit** | `/ledger scan` checks your plugin configs for money loops and bad prices. See [Config audit and what-if](audit.md). |
| **What if** | `/ledger whatif` tests one change, such as a price or a bank rate, without editing any file. |
| **Price checker** | `/ledger price <item> [price]` tells you whether a sell price is Fair, OP or Meh. See [Price checker](price-checker.md). |
| **Weekly report** | An HTML page with charts, plus a Markdown copy, written every week to `plugins/dkLedger/reports/`. |
| **Menu** | `/ledger` in game opens supply, alerts, sources, top earners, the audit, frozen players and the weekly report. |
| **Login summary** | A few "while you were away" lines for staff when they join, only when something deserves a look. |
| **Web dashboard** | A read-only website with charts and a player lookup. See [Web dashboard](web-dashboard.md). |
| **Discord webhook** | Alerts, scan results, the weekly report, a daily summary, freezes and price checks posted to a Discord channel. See [Discord](discord.md). |
| **API** | `LedgerApi` and `LedgerAlertEvent`, for other dk plugins. See [For developers](developers.md). |

## Who can use it

`/ledger` needs `dkledger.admin`, which operators have. Undoing an entry (`/ledger reverse`) needs `dkledger.owner`, which is **not** given to operators on purpose. The full list is on [Commands and permissions](commands.md).

## A first tour

Do this on a test server first. Every step uses only commands from the [command list](commands.md).

:::steps
1. Run `/ledger`. A menu opens with the supply, alerts, sources, top earners, audit, frozen players and weekly report.
2. Run `/ledger supply`. It shows the money supply now and the change over 24 hours and 7 days.
3. Run `/eco give <yourself> 100`, then `/ledger player <yourself>`. The newest entries show the change with a source that names you as staff.
4. Run `/ledger sources day`. Money in and out is grouped by source, and your staff change is in the list.
5. Run `/ledger note <player> testing`, then `/ledger player <player>`. The note shows on their profile.
6. Run `/ledger freeze <player> testing`, then try `/pay` as that player. The payment is refused. Run `/ledger unfreeze <player>` to undo it.
7. Run `/ledger summary now`. You get the "while you were away" lines you would see on joining.
8. Run `/ledger scan` and then `/ledger findings` to see what the config audit reports.
9. Run `/ledger price diamond` to see whether the shops' diamond price is Fair, OP or Meh, and why.
:::

## Where to go next

:::contents
- [How money is recorded](how-it-works.md) :: What dkLedger sees, what it counts as earnings, and how long it keeps things.
- [Commands and permissions](commands.md) :: Every `/ledger` command.
- [Alerts](alerts.md) :: What dkLedger warns about and what to do when it does.
- [Config audit and what-if](audit.md) :: Finding money loops before players do.
- [Price checker](price-checker.md) :: Is a sell price Fair, OP or Meh?
- [Discord](discord.md) :: Posting alerts and reports to a channel.
- [Web dashboard](web-dashboard.md) :: Setting up the read-only website.
- [Settings](config.md) :: The settings staff change most.
- [For developers](developers.md) :: Reporting money reasons and reading alerts from your own plugin.
:::
