---
title: Price alerts and charts
description: Get told once when an item reaches a price you chose, and see how a price moved over time.
audience: players
order: 3
---

## Price alerts

An alert tells you once when an item's price reaches a number you choose.

| Command | What it does |
|---|---|
| `/stock alert add <item> <above\|below> <price>` | Tells you when the price goes above or below that number. |
| `/stock alert list` | Shows your alerts, with their ids. |
| `/stock alert remove <id\|all>` | Removes one alert or all of them. |

For example, `/stock alert add diamond below 70` tells you when diamonds become cheaper than 70. Each player can have 10 alerts by default (`alerts.max-per-player`), and staff can turn alerts off.

## Price charts

- Press **Q** on an item in the market window to open a bar chart of its price.
- `/stock chart <item> [24h|7d|all]` shows a small text chart in chat with the low, high, average and change.
- Each item's description also has a 24-hour trend line.

Price samples are saved every 10 minutes by default, and only for items that changed. They are kept for 14 days by default (`price-history.keep-days`), so `7d` and `all` can only go back that far.
