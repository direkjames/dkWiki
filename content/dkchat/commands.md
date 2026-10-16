---
title: Commands and permissions
description: Every dkChat command and permission, from /msg and /ignore to /ad and the colour permissions.
audience: players, staff
order: 5
---

`/dchat` is the main command. Commands are registered in code, so they aren't listed in `plugin.yml`.

| Command | Permission | What it does |
|---|---|---|
| `/dchat help` | none | The command list. |
| `/dchat format` | none | Shows which chat format you are using. |
| `/dchat reload` | `dkchat.admin` | Reloads all config files. |
| `/dchat announce <id>` | `dkchat.admin` | Sends an announcement right now. |
| `/dchat view <id>` | `dkchat.showcase.view` | Opens an `[inv]` or `[echest]` preview. This is what the click in chat uses. |
| `/msg <player> <message>` (`/m`, `/tell`, `/whisper`, `/w`) | `dkchat.msg` | Sends a private message. |
| `/r <message>` (`/reply`) | `dkchat.msg` | Replies to the last person you talked to. |
| `/spy` (`/socialspy`) | `dkchat.spy` | Turns private message spy on or off. |
| `/ignore <player>`, `/ignore list` | `dkchat.ignore` | Ignores or unignores a player, or lists who you ignore. |
| `/ad <message>` (`/advertise`) | A tier permission | Posts an advertisement. `/ad` alone shows your cooldown. |
| `/clearchat` (`/cc`, `/chatclear`) | `dkchat.clearchat` | Clears your own chat. |
| `/clearchat all` | `dkchat.clearchat.all` | Clears chat for everyone except `dkchat.clearchat.exempt`. |

## Other permissions

`dkchat.format.<name>` is whatever permission you set on a format in `formats.yml`. `dkchat.ad.vip` and `dkchat.ad.mvp` give better `/ad` tiers (set in `config.yml`). `dkchat.msg.seevanished` lets staff message and tab-complete vanished players.

## Every permission

{{permissions:dkchat}}
