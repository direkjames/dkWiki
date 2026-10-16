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

The checks are numbered A1 to A12 in the output and the report.

| Command | What it does |
|---|---|
| `/ledger scan` | Runs the audit. |
| `/ledger findings` | Lists what the audit found. |
| `/ledger budget` and `/ledger report` | More views of the audit's results. Run each in game to see its output. |

## Drops, not blocks (the OneBlock check)

A OneBlock phase block is not worth what that block sells for. Breaking stone gives cobblestone unless the player uses Silk Touch, ores give raw items, and mobs drop loot. The audit values what a player really gets, and assumes they pick the better of Silk Touch and a normal break.

- **Blocks:** normal drops (stone gives cobblestone, ores give raw metal or gems with Fortune, leaves give saplings, sticks and apples) against Silk Touch (the block itself). Raw metal is valued as the smelted ingot, and meat as cooked.
- **Mobs:** loot tables with Looting, weighted into the phase with the blocks.
- **Enchantment levels:** `checks.oneblock.fortune` and `checks.oneblock.looting` set the levels to assume. Servers that allow unsafe levels (above vanilla's maximum of III) should set the level players can really get, so the numbers show the worst case. The report also shows the same phase at vanilla's maximum, so you can see what the unsafe levels add.
- **Mobs and blocks share one roll** in AOneBlock's phase files. If your tests show another rate, change `checks.oneblock.mob-weight-factor` (0 leaves mobs out).
- **Unknown blocks and mobs** (new in a version, or from other plugins) are guessed: a block drops itself and a mob drops nothing. The report notes when this happened, so the number is a minimum, not a guess upward.
- Chest loot is read from the phase's `_chests.yml`.

## What if

`/ledger whatif <change>` runs the audit again with **one change**, and shows what the change fixes, what it breaks and what the money supply would look like over the next 30 days. It never edits a file.

You can try a change to a price, a spawner drop, a spawner price, a bank rate or a reward size. Type `/ledger whatif` on its own to see the exact options.

To test a price you are only thinking about, use the [Price checker](price-checker.md), which also shows what the price would do to the whole audit.

> [!TIP] Use it before editing a config
> When a finding says an item sells too high, test the new price with `/ledger whatif` first. You'll see the loops it removes and anything it opens up elsewhere.
