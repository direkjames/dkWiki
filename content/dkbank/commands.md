---
title: Commands and permissions
description: Every dkBank command for players and staff, the permission each needs, and how amounts are written.
audience: players, staff
order: 1
---

`/bank` also works as `/dkbank`. Amounts accept `1000`, `1.5k`, `2m`, `1b`, `all` and `half`.

## Players

Every player has these by default, through the permission `dkbank.use`.

| Command | Permission | What it does |
|---|---|---|
| `/bank`, `/bank menu` | `dkbank.use` | Opens the bank menu, or shows your balance in chat if menus are off. |
| `/bank balance` | `dkbank.use` | Shows your balance in chat. |
| `/bank deposit [amount]` | `dkbank.deposit` | Moves money from your wallet into your bank. With no amount, opens the deposit menu. |
| `/bank withdraw [amount]` | `dkbank.withdraw` | Moves money from your bank into your wallet. With no amount, opens the withdraw menu. |
| `/bank pay [player] [amount]` | `dkbank.pay` | Sends money to another player's bank. With no arguments, opens the send-money menu. |
| `/bank history [page]` | `dkbank.history` | Shows your transactions. With no page, opens the history menu. |
| `/bank interest` | `dkbank.interest` | Shows your rates, what is earning and the next payout. |
| `/bank tiers` | `dkbank.tiers` | Lists all tiers. |
| `/bank upgrade [confirm]` | `dkbank.upgrade` | Buys the next tier. |
| `/bank top [page]` | `dkbank.top` | Shows the leaderboard. |

## Staff

Staff commands come from `dkbank.admin`, which operators have by default.

| Command | Permission | What it does |
|---|---|---|
| `/bank balance <player>`, `/bank admin balance <player>` | `dkbank.balance.others` | Shows another player's bank balance. |
| `/bank admin give <player> <amount>` | `dkbank.admin.give` | Adds money to a bank. Logged in their history. |
| `/bank admin take <player> <amount>` | `dkbank.admin.take` | Removes money from a bank. Logged in their history. |
| `/bank admin set <player> <amount>` | `dkbank.admin.set` | Sets a bank balance. Logged in their history. |
| `/bank admin history <player> [page]` | `dkbank.admin.history` | Shows anyone's transaction history. |
| `/bank admin tier <player> <tier\|default>` | `dkbank.admin.tier` | Sets a player's bought tier for free. `default` puts them back on the first tier. |
| `/bank admin alts <player> [allow\|reset]` | `dkbank.admin.alts` | Lists the accounts on their connection. `allow` lets an account use the bank anyway. |
| `/bank admin economy [days]` | `dkbank.admin.economy` | Shows money in banks, interest created and the top earners. |
| `/bank admin info` | `dkbank.admin.info` | Shows versions and setup, for support requests. |
| `/bank admin reload` | `dkbank.admin.reload` | Reloads the configuration. |

## Other permissions

| Permission | Given to | What it does |
|---|---|---|
| `dkbank.tier.<name>` | Nobody by default | Gives that tier, for example `dkbank.tier.gold`. Use it for ranks and donor perks. |
| `dkbank.alts.bypass` | Operators | The player is never locked by the alt-account limit. |

## Every permission

This table is generated from dkBank's own `plugin.yml`, so it is always complete.

{{permissions:dkbank}}
