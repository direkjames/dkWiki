---
title: Keeping the economy healthy
description: Presets, the fix for each way a market economy breaks, and what to do when something goes wrong.
audience: staff
order: 10
visibility: private
---

dkStock pays players money for items. That money did not exist before, so a stock market is a money faucet by design. With sensible settings that is fine. With careless settings, players can drain your economy in an afternoon. This page is **left out of the published wiki**, because it explains where the limits are.

> [!NOTE] dkStock gives you the tools
> The prices, taxes and limits are your choice, and so is the result on your server. Run `/stock audit` after every change.

## Quick start

:::steps
1. Pick the preset that fits your server (below).
2. Copy its `items.yml` and its `config.yml` lines. The presets ship in the plugin's `docs/presets` folder.
3. Run `/stock reload`, then `/stock audit`. Fix anything it reports as a warning.
4. For the first week, run `/stock economy` once a day and watch the numbers.
5. Before you add other ways to earn money (jobs, quests, daily rewards), check they don't pay more for the same item than dkStock sells it for.
:::

## Pick a preset

Prices on their own mean nothing. What matters is how they compare with everything else on your server, such as what players earn from jobs and what ranks, kits and land cost. The presets are three sets that already work together. Every price, tax, limit and stock size in a preset was checked with `/stock audit`, and none has a buy-and-sell loop or a crafting loop.

| | Conservative | Balanced | Generous |
|---|---|---|---|
| For | Skyblock, OneBlock, prison, small economies | Survival, SMP, most servers | Rich economies with expensive ranks and land |
| Coal | 1.5 | 3 | 12 |
| Iron ingot | 4 | 8 | 32 |
| Gold ingot | 10 | 20 | 80 |
| Emerald | 20 | 40 | 160 |
| Diamond | 40 | 80 | 320 |
| Netherite scrap | 75 | 150 | 600 |
| `tax-percent` | 15 | 10 | 7 |
| `multiplier` | 0.02 | 0.01 | 0.01 |
| `regen.percent` | 1 | 2 | 3 |
| Diamonds one player can sell per day | 25 | 50 | 100 |
| Most one player can earn from diamonds per day | 1,000 | 4,000 | 32,000 |
| Rough most the whole market can pay out per day | about 21,000 | about 100,000 | about 714,000 |

The last row comes from `/stock audit`. It is a ceiling for the long run when players sell everything as fast as the market takes it, so real numbers are usually lower. Use it to compare presets, not as a forecast.

| Game mode | Start with | Why |
|---|---|---|
| Survival / SMP | Balanced | Players mine by hand, so supply is naturally limited. |
| Skyblock / OneBlock | Conservative | Items come from generators with no end. Keep the daily limits and think about lowering them. |
| Factions | Balanced, with daily limits | Raiding moves items between players, and a rich faction can dump a whole vault. |
| Anarchy | Conservative | Duplicated items are the real danger. Cheap prices and limits make a dupe worth less. Consider `allow-sell: false` on your most valuable items. |
| Prison | Conservative | Mines refill forever, just like a generator. |
| Rich "OP economy" servers | Generous | Everything costs more, so everything pays more. Keep the limits. |

When you change numbers in a preset, run the audit again and keep these two rules, because they stop crafting from making money:

- A block costs exactly 9 times its ingot (4 times for quartz and amethyst blocks).
- A raw ore costs the same as, or more than, the ingot it smelts into.

## How economies break, and the fix for each

**1. Endless item sources.** A OneBlock, a cobble generator, an iron farm, a prison mine or a dupe turns time into money with no end, and the market's stock refills by itself.
- Use daily limits (`limits.daily-sell`, or `daily-sell` on each item).
- Keep prices low for items that come from generators.
- Lower `regen.percent`.
- Turn off `allow-sell` for anything players can produce without effort, or that you can't guard against dupes.

**2. Buy-and-sell loops.** Every trade moves the price. If the move is large and the tax is small, a player can sell a big stack, buy it back for less and keep the difference. One item at a time can lose money while a stack of hundreds makes it, so `/stock audit` tests trades of many sizes up to your maximum stock. Keep `tax-percent` above the minimum for your `multiplier`, plus a few points of margin:

| `multiplier` | Lowest `tax-percent` with no loop |
|---|---|
| 0.005 | 3 |
| 0.01 | 5 |
| 0.02 | 12 |
| 0.03 | 16 |
| 0.05 | 24 |
| 0.08 | 28 |
| 0.1 | 35 |

If you aren't sure, use `tax-percent: 10` with `multiplier: 0.01`, which is the default.

**3. Crafting loops.** If prices don't match recipes, there is free money, for example an ingot that sells for 8 next to a block that sells for 90. Keep to the two rules above. The audit checks the common pairs (ingot and block, nugget and ingot, raw ore and ingot, raw ore and block, quartz, amethyst, glowstone, ancient debris) when both items are in your market. Be careful with crash and surge: if you crash only one item of a pair, the pair is out of line until the price drifts back. Crash or surge the whole group together, or use `/stock crash <percent>` for everything.

**4. Other ways to earn the same item.** If a jobs plugin, a quest and dkStock all pay for a diamond, players stack all three. If another shop sells an item cheaper than dkStock's **sell** price (the buy price minus tax), players buy there and sell here. List every way to earn money for your top five items and compare them. Run `/stock economy` for a few days after adding a money source.

**5. Prices that recover on their own.** Drift and regen make a dumped item worth money again after a while. That is why daily limits matter. If the audit's payout ceiling is larger than you are happy with, lower `regen.percent`, lower prices or add limits.

**6. Alt accounts.** Daily limits are per player, so a player with five accounts has five limits. Require something before players can sell, such as a playtime requirement or a rank: set `dkstock.sell.gui`, `dkstock.sell.hand` and `dkstock.sell.all` to `false` for new players. Lock the expensive items behind ranks with `dkstock.ore.<item>`.

**7. Admin mistakes.** A price set far too high or too low is an instant exploit, and `/stock setprice` holds the value until the next trade, so a typo stays in place. Try changes on a test server, run `/stock audit` after every change, and use `/stock stats` to spot the items that moved the most. Put a price back with `/stock reset <item>`. Keep `price-floor` at about 5 to 10 percent of your cheapest item. The audit warns you when it drops below 2 percent.

**8. Warnings before events.** See [Scheduled events](events.md).

## Watching your economy

| Command | What it tells you |
|---|---|
| `/stock audit` | Checks your settings for loops and risky values. It never changes anything. |
| `/stock economy [24h\|7d\|30d]` | How much the market paid out, how much players spent, the difference, the biggest net earners and the items that paid out the most. |
| `/stock history <player>` | Every trade one player made. |
| `/stock top biggest [item] [period]` | The biggest single trades. One far above the rest is worth a look. |

When you read `/stock economy`:

- *Compared with the period before* shows whether money created is rising or falling, and *per active player* is a fairer health number than the total.
- *Money created* is what the market paid out minus what players spent. A positive number is normal. What matters is the trend.
- If it keeps rising faster than your sinks (rank shops, land claims, repairs, taxes), prices across your server drift up. That is inflation.
- One net earner far ahead of everyone else usually means a farm, a dupe or an exploit. Open their `/stock history`.

dkStock only sees its own trades. Money from jobs, quests and other plugins isn't in these numbers. [dkLedger](../dkledger/index.md) sees all of it.

## Something is going wrong

:::steps
1. **Stop the bleeding.** Set `dkstock.sell.gui`, `dkstock.sell.hand` and `dkstock.sell.all` to `false` for your default group (this stops all selling), or set `allow-sell: false` on one item and run `/stock reload`.
2. **Find out what happened.** Run `/stock economy 24h` and open the history of the top earners.
3. **Fix the cause.** Common causes are a loop (fix tax, multiplier or prices), an endless source (add limits, lower prices) or a dupe (disable selling that item, then deal with the player).
4. **Put prices back.** `/stock reset all confirm` returns every price and stock to the base values. Money players already earned stays in your economy plugin. Restore it from your economy plugin's backups if you need to.
5. **Check again.** Run `/stock audit` before you open trading again.
:::

## Settings cheat sheet

| Setting | Safer | Riskier |
|---|---|---|
| `tax-percent` | 10 or more | 0 to 5 |
| `multiplier` | 0.01 to 0.02 | 0.05 or more |
| `price-floor` | 5 to 10 percent of your cheapest item | 0.01 |
| `limits.daily-sell`, item `daily-sell` | Set, with money-sized caps | 0 (no limit) |
| `regen.percent` | 1 to 2 | 5 or more |
| Block, ingot and raw prices | Block = 9 x ingot, raw = ingot | Anything else |
| `allow-sell` on dupe-able items | `false` | `true` |
| Operators with `dkstock.limit.bypass` | Few | Many |
