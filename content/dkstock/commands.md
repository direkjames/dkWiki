---
title: Commands and permissions
description: Every /stock command for players and admins, the permission each needs, and how to lock single items by rank.
audience: players, staff
order: 5
---

`/stock` also works as `/dkstock`. Item names are Minecraft item ids, such as `iron_ingot`.

## Players

| Command | What it does | Permission |
|---|---|---|
| `/stock` | Opens the market. | `dkstock.use` |
| `/stock search [words]` | Searches the market. | `dkstock.search` |
| `/stock hot` | Today's hot item and when it changes. | `dkstock.use` |
| `/stock alert add <item> <above\|below> <price>` | Tells you when a price reaches that number. | `dkstock.alert` |
| `/stock alert list`, `/stock alert remove <id\|all>` | Manage your alerts. | `dkstock.alert` |
| `/stock price <item>` | Buy price, sell price and stock of one item. | `dkstock.use` |
| `/stock limits` | What you can still buy and sell today. | `dkstock.use` |
| `/stock chart <item> [24h\|7d\|all]` | Price history as a small text chart. | `dkstock.chart` |
| `/stock top <board> [item] [24h\|7d\|30d\|all]` | Leaderboards: `sellers`, `spenders`, `active`, `biggest` and `net`. | `dkstock.top` |
| `/stock sellhand` | Sells the whole stack in your main hand. | `dkstock.sell.hand` |
| `/stock sellall` | Shows what everything in your inventory would sell for. | `dkstock.sell.all` |
| `/stock sellall confirm` | Confirms the sale (within 15 seconds by default). | `dkstock.sell.all` |
| `/stock help` | Lists the commands you can use. | none |

The `net` board needs `dkstock.top.net` as well. See [Leaderboards](leaderboards.md).

## Admins

All of these also work from the console.

| Command | What it does | Permission |
|---|---|---|
| `/stock setprice <item> <price>` | Sets an item's current price (not below the price floor). | `dkstock.admin.setprice` |
| `/stock setstock <item> <amount>` | Sets an item's current stock (0 up to its maximum). | `dkstock.admin.setstock` |
| `/stock reset <item>` | Resets an item to its base price and starting stock. | `dkstock.admin.reset` |
| `/stock reset all` | Resets every item. Asks you to confirm with `reset all confirm`. | `dkstock.admin.reset` |
| `/stock crash <percent> [item]` | Cuts prices by 1 to 99%, for one item or all. | `dkstock.admin.crash` |
| `/stock surge <percent> [item]` | Raises prices by 1 to 1000%, for one item or all. | `dkstock.admin.surge` |
| `/stock stats` | The biggest price movers and the lowest stock. | `dkstock.admin.stats` |
| `/stock history <player> [page]` | A player's trades, newest first. | `dkstock.admin.history` |
| `/stock audit` | Checks your settings and prices for ways to make free money, and estimates the most the market can pay out per day. | `dkstock.admin.audit` |
| `/stock economy [24h\|7d\|30d]` | Money players spent, money the market paid out, the money created, the biggest net earners and the items that paid out the most. | `dkstock.admin.economy` |
| `/stock freeze [item]` | Stops all trading of an item. With no item, lists frozen items. | `dkstock.admin.freeze` |
| `/stock unfreeze <item>` | Allows trading again. | `dkstock.admin.freeze` |
| `/stock hot set <item>`, `/stock hot reroll` | Picks today's hot item by hand. | `dkstock.admin.hot` |
| `/stock events`, `/stock events run <id>` | Lists [scheduled events](events.md), or runs one now. | `dkstock.admin.events` |
| `/stock discord test`, `/stock discord summary` | Tests the [Discord](discord.md) webhook, or sends the last 24 hours now. | `dkstock.admin.discord` |
| `/stock reload` | Reloads all config files and shows any problems found. | `dkstock.admin.reload` |

`crash` and `surge` announce themselves to the whole server unless `admin.broadcast` is `false`. Admin actions are recorded in the database.

## Locking single items by rank

Every item in `items.yml` gets its own permission, `dkstock.ore.<item>`, for example `dkstock.ore.diamond` or `dkstock.ore.raw_iron`. **Everyone has all of them by default**, so nothing changes until you take one away.

To lock an item, set its permission to `false` for a group or player in your permissions plugin (LuckPerms, for example). Or set `dkstock.ore.*` to `false` and give back only the items you want. Locked items are shown greyed out in the window and can't be bought or sold. The permissions are created when the server starts and on `/stock reload`, so a new item is covered straight away.

Each selling method also has its own permission. You could allow the window but not `sellall` for new players, for instance.

## Every permission

This table is generated from dkStock's own `plugin.yml`. The per-item `dkstock.ore.<item>` permissions are made while the server runs, so they aren't in the table.

{{permissions:dkstock}}
