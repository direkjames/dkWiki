---
title: Private messages and ignore
description: Send private messages with /msg and /r, ignore players, and how staff social spy works.
audience: players, staff
order: 2
---

## Messaging

| Command | What it does |
|---|---|
| `/msg <player> <message>` | Sends a private message. Also `/m`, `/tell`, `/whisper` and `/w`. |
| `/r <message>` | Replies to the last person you talked to. Also `/reply`. |

The receiver hears a sound. Players you can't see, such as vanished staff, are treated as offline in `/msg`, `/r` and tab completion. If you have been muted with LiteBans, you can't use `/msg` or `/r` either.

## Ignoring

| Command | What it does |
|---|---|
| `/ignore <player>` | Ignores or unignores a player. |
| `/ignore list` | Shows who you are ignoring. |

Ignoring blocks private messages, and by default (`ignore.hide-public-chat`) hides their public chat too. Players who ignore the sender also don't see their `/ad` advertisements. You can ignore up to 50 players by default. Staff with `dkchat.ignore.exempt` can't be ignored. Your ignore list is saved on your player, so it survives relogs and restarts.

## Social spy

Staff with `dkchat.spy` see other players' private messages. It is on automatically and `/spy` (also `/socialspy`) turns it off and on. Messages to or from a player with `dkchat.spy.exempt` are hidden from spies. Operators don't get that permission automatically. Every private message between players is also written to the server console by default (`private-messages.log-to-console`).
