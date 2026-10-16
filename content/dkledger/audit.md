---
title: Config audit and what-if
description: How dkLedger checks your plugin configs for money loops and bad prices, and how to test a change before making it.
audience: staff
order: 4
---

Alerts catch problems after they start. The config audit finds them before players do, by reading the configs of your economy plugins and working out what a player could profit from.

## The audit

Run `/ledger scan`. dkLedger reads your shop, crate, spawner, reward, bank and OneBlock files and reports problems. It also runs once on its own shortly after the server starts, and admins online are told if it finds critical problems.

What it looks for:

- **Money loops.** Buying and selling that makes a profit each round.
- **Bad prices.** Items that sell for more than they're worth, such as things players can make endlessly with generators and farms.
- **Crafting loops.** Crafting that turns cheap ingredients into something worth much more.
- **Spawner payback.** Spawners that pay for themselves too quickly.
- **Reward income per day.** How much money a typical player can collect each day from daily rewards, votes and quests.
- **Broken commands.** Commands in config files that don't exist.
- **Bank interest.** Bank tiers that pay too much per online hour.
- **OneBlock phases.** Phases that pay too much per block broken.
- **Sinks** and **price changes** over time.

| Command | What it does |
|---|---|
| `/ledger scan` | Runs the audit. |
| `/ledger findings` | Lists what the audit found. |
| `/ledger budget` and `/ledger report` | More views of the audit's results. Run each in game to see its output. |

## What if

`/ledger whatif <change>` runs the audit again with **one change**, and shows what the change fixes, what it breaks and what the money supply would look like over the next 30 days. It never edits a file.

You can try a change to a price, a spawner drop, a spawner price, a bank rate or a reward size. Type `/ledger whatif` on its own to see the exact options.

> [!TIP] Use it before editing a config
> When a finding says an item sells too high, test the new price with `/ledger whatif` first. You'll see the loops it removes and anything it opens up elsewhere.
