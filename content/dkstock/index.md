---
title: dkStock
description: A living market where you buy and sell items, and prices move with every trade.
audience: players, staff
order: 0
---

dkStock is the server's market. Open it with `/stock`, left-click an item to buy it and right-click to sell it. Prices move with every trade: buying pushes a price up, selling pushes it down, and over time prices drift back toward where they started. What players buy and sell really does matter.

## What you can do

- **Buy and sell** from a chest-style window with live prices and stock.
- **Find items** with category tabs and a search button.
- **Catch the daily hot item.** One item pays more to sell and costs more to buy each day.
- **Set price alerts** and be told once when an item reaches the price you chose.
- **Check history** with a price chart for any item.
- **Sell fast** with `/stock sellhand` and `/stock sellall`.
- **Compete** on the leaderboards: top sellers, biggest spenders, most active traders and more.

## Your first minutes

:::steps
1. Type `/stock` to open the market. Tabs across the top filter by category.
2. Hover an item to see its buy price, sell price and how many the market has left.
3. Left-click an item to buy one. Right-click to sell one. Hold Shift for a bigger amount. See [Using the market](using-the-market.md).
4. Check today's hot item with `/stock hot`.
5. Want to wait for a better price? Set an alert with `/stock alert add diamond below 70`. See [Price alerts and charts](alerts-and-charts.md).
:::

> [!TIP] Selling pays less than buying costs
> A sale is taxed, so you get a little less than the price you would pay to buy the same item. This is on purpose. It stops anyone making money by buying and selling the same thing in a loop. See [How prices work](prices.md).

## Where to go next

:::contents
- [Using the market](using-the-market.md) :: The window, the clicks, selling fast and what can be sold.
- [How prices work](prices.md) :: Tax, price moves, recovery, the hot item and daily limits.
- [Price alerts and charts](alerts-and-charts.md) :: Get told when a price is right and see how it moved.
- [Leaderboards and placeholders](leaderboards.md) :: Rankings, and values for holograms and scoreboards.
- [Commands and permissions](commands.md) :: Every command for players and staff.
- [Settings](config.md) :: Every `config.yml` setting.
- [Items, window and messages](items.md) :: Setting what the market sells and how the window looks.
- [Scheduled events](events.md) :: Automatic crashes and surges.
- [Discord](discord.md) :: Posting big trades and a daily summary to a channel.
- [FAQ and troubleshooting](faq.md) :: Fixes for the problems people hit most.
- [For developers](developers.md) :: The public API and events.
- [Changelog](changelog.md) :: What changed in each version.
:::

## Try it yourself

Run these on a test server with a normal (non-operator) account, because operators skip daily limits. Items marked *staff* need operator rights.

:::steps
1. Run `/stock`. A window opens with category tabs, a search button and a hot item icon.
2. Left-click an item to buy one. Your wallet (`/bal`) goes down by its price and the market's stock goes down by one.
3. Right-click the same item to sell one back. You get a little less than you paid, because of tax.
4. Run `/stock price <item>` to see its buy price, sell price and stock.
5. Press Q on an item in the window to open its price chart.
6. Run `/stock sellhand` with a stack of a plain item in your hand.
7. Run `/stock alert add <item> above <price>` and then `/stock alert list`. The alert appears in the list.
8. *Staff:* run `/stock setprice <item> <price>`, then `/stock reset <item>` to put it back.
9. *Staff:* run `/stock audit` to check your settings for ways to make free money.
:::

## For server owners

dkStock needs dkCore and an economy that dkCore can use (Vault with an economy plugin such as EssentialsX). It pays players straight into their wallet. Start with [Settings](config.md) and [Items, window and messages](items.md).

:::private
The economy guide, with ready-made price presets and the fix for each way an economy breaks, is on [Keeping the economy healthy](economy.md). It is left out of the published wiki.
:::
