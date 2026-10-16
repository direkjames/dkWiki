---
title: Leaderboards and placeholders
description: Rank players by what they earned, spent or traded, and show the rankings on holograms and scoreboards.
audience: players, staff
order: 4
---

## In chat

`/stock top <board> [item] [24h|7d|30d|all]` shows a leaderboard. It uses 7 days by default. Add an item to rank one item only, for example `/stock top sellers diamond 30d`.

| Board | Ranks players by |
|---|---|
| `sellers` | Money earned from selling |
| `spenders` | Money spent buying |
| `active` | Number of trades |
| `biggest` | Their single biggest trade (it shows what it was) |
| `net` | Money earned minus money spent. Operators only by default. |

`24h`, `7d` and `30d` look at the trade history, so they can only go back as far as `history.keep-days` (30 by default). `all` uses lifetime stats that are kept separately and are never deleted.

> [!STAFF] The net board is closed on purpose
> A public money board encourages farming. To open the net board to players, give them `dkstock.top.net`.

## PlaceholderAPI

If PlaceholderAPI is installed, dkStock registers its placeholders by itself. It works fine without PlaceholderAPI.

**Per player** (all time, as plain numbers, so other plugins can rank them). Add `_formatted` at the end for money in your server's currency format, and `_<item>` for one item.

| Placeholder | Value |
|---|---|
| `%dkstock_earned%` | Money earned from selling |
| `%dkstock_spent%` | Money spent buying |
| `%dkstock_net%` | Earned minus spent |
| `%dkstock_trades%` | Number of trades |
| `%dkstock_items_sold%`, `%dkstock_items_bought%` | Items sold or bought |
| `%dkstock_best_trade%` | Their single biggest trade |
| `%dkstock_earned_diamond%`, `%dkstock_items_sold_diamond%` | The same, for one item |
| `%dkstock_net_formatted%` | Money with the currency format, such as `$1,234.50` |

**Hot item** (no player needed): `%dkstock_hot_item%`, `%dkstock_hot_bonus%` and `%dkstock_hot_resets_in%`.

**Leaderboard lines** (for holograms, scoreboards and signs): `%dkstock_top_<board>_<period>_<rank>_<field>%`, and for one item `%dkstock_top_<item>_<board>_<period>_<rank>_<field>%`.

- `<board>`: `sellers`, `spenders`, `active`, `biggest` or `net`
- `<period>`: `24h`, `7d`, `30d` or `all`
- `<rank>`: 1 to 50
- `<field>`: `name`, `value` (plain number), `formatted` (currency format), and for the biggest board also `action`, `amount` and `item`

Examples: `%dkstock_top_sellers_7d_1_name%`, `%dkstock_top_sellers_7d_1_formatted%` and `%dkstock_top_iron_ingot_sellers_all_3_name%`. An empty rank shows `-`.

Leaderboard placeholders read a saved copy that refreshes every 30 seconds by default (`leaderboards.cache-seconds`), so a hologram that updates every second adds no load to the server or the database.

## Holograms

dkStock doesn't draw holograms itself. Use a hologram plugin that understands PlaceholderAPI, such as DecentHolograms or FancyHolograms, and put the placeholders straight into the lines, one line per rank. For example, a weekly top-3 sellers hologram:

```text
&6&lTop sellers (7 days)
&e1. &f%dkstock_top_sellers_7d_1_name% &7- &a%dkstock_top_sellers_7d_1_formatted%
&e2. &f%dkstock_top_sellers_7d_2_name% &7- &a%dkstock_top_sellers_7d_2_formatted%
&e3. &f%dkstock_top_sellers_7d_3_name% &7- &a%dkstock_top_sellers_7d_3_formatted%
```

You don't need ajLeaderboards for this. If you already use it, point it at a per-player placeholder such as `%dkstock_earned%` and it builds its own daily, weekly and monthly boards from that number.
