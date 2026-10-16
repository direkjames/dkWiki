---
title: Using the market
description: How the market window works, what each click does, and how to sell quickly with sellhand and sellall.
audience: players
order: 1
---

Open the market with `/stock`.

## The window

| Click | What it does |
|---|---|
| Click a tab | Shows one category. Click **All items** to go back. |
| Click the compass | Search. Type what you want in chat, or type `cancel`. |
| Click the hot item | Jumps to it. |
| Q (drop key) on an item | Opens the price history chart. |
| Left-click an item | Buy 1. |
| Shift + left-click | Buy several (16 by default). |
| Right-click | Sell 1. |
| Shift + right-click | Sell all of that item you are carrying. |

Each item's description shows its buy price, sell price, how many the market has left, and its 24-hour trend. The window updates by itself when prices, stock or your limits change.

You can also search with `/stock search <words>`.

## What can be sold

Only **plain** items can be sold. Renamed, enchanted or otherwise modified items are refused, so nobody can sell a custom item as a normal one.

Selling stops when the market already has as much of an item as it will hold. Buying stops when the market runs out. Both are shown in the item's description.

## Selling fast

| Command | What it does |
|---|---|
| `/stock sellhand` | Sells the whole stack in your main hand. |
| `/stock sellall` | Shows what everything in your inventory would sell for. |
| `/stock sellall confirm` | Confirms the sale. You have 15 seconds by default. |

`sellall` only looks at the hotbar and main inventory. Armor and your off-hand are never touched. Items the market can't buy right now (stock full, or selling turned off) stay in your inventory, and you are told which. There is also a short cooldown before you can sell everything again.

## Why a trade might be refused

- **You are AFK.** AFK players can't buy or sell, so nobody can farm the market while away. Move or look around and try again.
- **You hit a daily limit.** Servers can limit how much of an item one player can buy or sell per day. `/stock limits` shows what you have left.
- **The item is frozen.** Staff can pause trading of an item. They can do it with a command, and so can other plugins.
- **The item is locked for your rank.** Locked items show greyed out.
- **The payment failed.** If the economy plugin refuses it, for example because of a money cap, the trade is cancelled and nothing is taken.

> [!NOTE] Messages can be hard to read with the window open
> Trade results are sent as chat messages. Close the window to read them.
