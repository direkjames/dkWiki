---
title: Commands and permissions
description: Every /ledger command, what it needs, and the permissions that control alerts and the login summary.
audience: staff
order: 2
---

`/ledger` also works as `/dkledger`. It needs `dkledger.admin`, which operators have, except `reverse`, which needs `dkledger.owner`.

Add `day`, `week` or `month` to commands that take a period.

| Command | What it does |
|---|---|
| `/ledger` | Opens the menu for players, or shows help in the console. |
| `/ledger supply` | The money supply now, and its change over 24 hours and 7 days. |
| `/ledger sources [day\|week\|month]` | Money in and out, grouped by source. |
| `/ledger top [day\|week\|month]` | The top earners. |
| `/ledger items [day\|week\|month]` | Items bought and sold in shops. |
| `/ledger reasons [day\|week\|month]` | Money grouped by the reason dk plugins gave. |
| `/ledger player <name>` | A player's earnings, first join, playtime, money per hour played, progress, items traded, sources, newest entries (with ids) and staff notes. |
| `/ledger alerts [open\|all] [page]` | Lists alerts. |
| `/ledger resolve <id> [note]` | Marks an alert as resolved, with an optional note. |
| `/ledger freeze <player> [reason]` | Stops a player sending money to others. |
| `/ledger unfreeze <player>` | Lets them send money again. |
| `/ledger frozen` | Lists frozen players. |
| `/ledger note <player> <text>` | Adds a staff note to a player. |
| `/ledger reverse <entry id>` | Undoes one ledger entry. Asks you to confirm. Owners only. |
| `/ledger scan`, `findings`, `budget`, `report` | The config audit. See [Config audit and what-if](audit.md). |
| `/ledger whatif <change>` | The simulator. Type it alone to see the options. |
| `/ledger weekly` | Writes the weekly report now. |
| `/ledger reload` | Reloads `config.yml` and `messages.yml`. |
| `/ledger summary [now\|mute\|off\|on]` | Shows the "while you were away" summary now, mutes it for today, or turns it off or on for you. |
| `/ledger web`, `/ledger web logout` | A one-time sign-in link for the [web dashboard](web-dashboard.md), or signs everyone out. |

## Command details

{{commands:dkledger}}

## Permissions

`dkledger.alerts` gets alerts in chat, and `dkledger.summary` gets the login summary. Both are included in `dkledger.admin`.

{{permissions:dkledger}}
