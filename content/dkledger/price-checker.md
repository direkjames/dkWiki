---
title: Price checker
description: Check whether a sell price is Fair, OP or Meh before you set it, with the reasons and a fair range.
audience: staff
order: 5
---

`/ledger price` checks **sell prices** only, because those are the money faucets. Players earn them, so too high is **OP** and too low is **Meh**.

```text
/ledger price cobblestone            what the shops pay now
/ledger price diamond 90             a price you are thinking of
/ledger price diamond 90 dkStock     the same, as the dkStock price
```

## What it compares the price with

1. **The item's own buy price.** Selling for as much as it costs to buy is a money loop.
2. **The other shops' sell prices.** More than `price-check.market-op-ratio` times their median is OP, and less than `market-meh-ratio` times is Meh.
3. **Renewable limits** (`checks.renewables`): items players can make forever with a generator or farm.
4. **Recipes.** Buying the ingredients, crafting and selling must not make money, and crafting should not lose value either.
5. **Spawners.** A drop that makes more than `price-check.spawner-hourly-max` money per hour from one spawner is OP.
6. **dkStock's hot-item day.** The base price is held low enough that the peak (with the hot bonus) still stays under the limits.

## What you get back

You get the verdict (Fair, OP, Meh or Unknown), the fair range, and the reasons. When you give a price, you also see what it would do to the whole [audit](audit.md), the same as `/ledger whatif price`.

- **Nothing is changed in any file.**
- **Unknown** means nothing compares with the item: no other shop, recipe, farm limit or spawner uses it. Judge those by hand.
- The Discord webhook can post every verdict (`price-checks`, off by default). See [Discord](discord.md).
