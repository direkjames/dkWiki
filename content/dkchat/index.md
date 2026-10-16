---
title: dkChat
description: Ranked chat formats, private messages, ignore, [item] and [inv] tags, advertisements and timed announcements.
audience: players, staff
order: 0
---

dkChat is the server's global chat. It gives each rank its own chat style, adds private messaging and ignoring, lets you show items and inventories in chat, and sends timed announcements.

## What you can do in chat

- **Show off.** Type `[item]` to show the item in your hand, `[inv]` to show your inventory, or `[echest]` to show your ender chest. Click the tag in chat to look. See [Showing items](showcase.md).
- **Message privately.** `/msg <player> <message>`, and `/r <message>` to reply. See [Private messages and ignore](private-messages.md).
- **Ignore someone.** `/ignore <player>` hides their messages. `/ignore list` shows who you ignore.
- **Advertise.** `/ad <message>` posts a message to everyone. It can cost money and has a cooldown. See [Advertisements and announcements](ads-and-announcements.md).
- **Clear your chat.** `/clearchat` clears only your own screen.
- **Hover a name** to see a tooltip with the player's username, rank and ping.

## Where to go next

:::contents
- [Chat formats](formats.md) :: How ranks get their own look, and how colours and placeholders work.
- [Private messages and ignore](private-messages.md) :: `/msg`, `/r`, social spy and `/ignore`.
- [Showing items](showcase.md) :: `[item]`, `[inv]` and `[echest]`, and the protection behind them.
- [Advertisements and announcements](ads-and-announcements.md) :: `/ad`, timed announcements and clearing chat.
- [Commands and permissions](commands.md) :: Every command and permission.
- [Settings](config.md) :: Every `config.yml` setting.
- [Security and compatibility](security.md) :: What players can't do, and how dkChat works with other plugins.
:::

## Try it yourself

Operators have every colour permission and the highest format, so test with a normal account. Items marked *staff* need `dkchat.admin`.

:::steps
1. Say something in chat. It shows in your rank's format. Hover your name to see the tooltip.
2. Hold an item and type `[item]` in a message. Other players see the item and can hover it.
3. Type `[inv]`. Click the tag in chat to open a read-only copy of your inventory.
4. Run `/msg <player> hello`, then have them run `/r hi`.
5. Run `/ignore <player>`. Their public chat and messages stop reaching you. Run it again to stop ignoring.
6. *Staff:* run `/dchat format` to see which format you are using.
7. *Staff:* run `/dchat announce <id>` to send an announcement now, and `/dchat reload` after editing the files.
:::
