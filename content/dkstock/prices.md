---
title: How prices work
description: How buying and selling move prices, what tax does, how prices recover, and how the hot item and daily limits fit in.
audience: players, staff
order: 2
---

## Buying and selling

- **Buying** costs the current price, with no tax. It lowers the market's stock by 1 and raises the price a little.
- **Selling** pays the current price minus tax (`tax-percent`, 10% by default). It raises the stock by 1 and lowers the price a little.
- Buying stops when the stock hits 0. Selling stops when the stock reaches the item's maximum.
- Bulk trades work out the price change after every single item, so buying 64 costs more than 64 times the first price.
- Prices never fall below the price floor (`price-floor`).

> [!WARNING] Keep the tax high enough
> If tax is too low for how far each trade moves the price, players can make money by buying and selling the same item in a loop. Big stacks make it worse. dkStock warns you in the console and on `/stock reload`, and `/stock audit` shows the details.

## Recovery

Every 10 minutes by default (`recovery.interval-minutes`), prices drift back toward their base price and stock moves back toward its starting level. Crashes, surges and heavy selling fade on their own. The pull is stronger when a price is far from its base and gentle when it is close.

Time the server was offline is caught up on startup, up to 24 hours by default. A price set by hand with `/stock setprice` (or stock set with `/stock setstock`) is left alone until the next trade on that item. `crash` and `surge` do fade.

## The daily hot item

One item each day pays more to sell and costs more to buy, both by the same percentage (15% by default). Because the buy and sell price move together, the gap between them stays the same, so buying and then selling can never make money from it.

The hot item changes at midnight Asia/Manila time by default and is announced to the server. Check it with `/stock hot`. Staff can pick it by hand with `/stock hot set <item>` or `/stock hot reroll`.

## Daily limits

Servers can limit how much of an item one player may buy or sell per day, either for everything (`limits.daily-buy`, `limits.daily-sell`) or per item. Bulk trades, `sellhand` and `sellall` go up to what is left and keep the rest in your inventory.

- `/stock limits` shows what you can still buy and sell today.
- Counts are saved, so relogging or restarting doesn't reset them.
- A new day starts at `limits.reset-time` (midnight Asia/Manila by default).
- Operators and anyone with `dkstock.limit.bypass` are never limited, so test with a normal account.

## Frozen items

Staff can stop all trading of an item with `/stock freeze <item>`, and allow it again with `/stock unfreeze <item>`. Other plugins can do it through the [API](developers.md). A frozen item stays frozen after a restart until someone unfreezes it.
