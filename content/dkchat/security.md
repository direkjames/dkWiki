---
title: Security and compatibility
description: What players can never do in chat, how dkChat keeps memory and the main thread safe, and how it works with EssentialsX, DiscordSRV, LiteBans and more.
audience: staff
order: 6
---

## Security

- **No click or command injection.** Player messages can't use click, hover, insert or similar tags. PlaceholderAPI values are cleaned of those tags too, so custom tags or nicknames from other plugins can't add a `run_command` click. Display names and item names have click, hover and insert removed before they are shown.
- **PlaceholderAPI placeholders are never parsed in what players type.**
- **Colour permissions can't be bypassed.** Players without `dkchat.color.hex` get a parser that only knows named colours, so no escape trick enables HEX.
- **Typed values in plugin messages,** like a name in `/msg`, are never parsed as tags.
- **Main thread safety.** Inventories are only read on the main thread. LiteBans checks run off the main thread.
- **Bounded memory.** At most 500 previews are kept, expired previews and cooldowns are cleaned every minute, per-player data is dropped on quit, and `/msg` and `/r` are unregistered when the plugin disables.
- **Older config files.** Missing options use the defaults built into the jar, and the console lists which ones are missing.

## Compatibility

- **EssentialsX nicknames.** Keep `change-displayname: true` in the Essentials config. If Essentials adds rank prefixes to display names (`add-prefix-suffix`), turn that off so prefixes don't show twice.
- **DiscordSRV.** dkChat formats chat through Paper's chat event and passes the coloured message along, so DiscordSRV relays it. If your DiscordSRV config has `UseModernPaperChatEvent`, set it to `true`.
- **LiteBans.** Muted players' public chat is cancelled by LiteBans before dkChat formats it. Muted players also can't use `/msg` or `/r`.
- **Vanish.** Players the sender can't see are treated as offline in `/msg`, `/r` and tab completion.
- **Spy and ignore data** are saved on each player, so they survive relogs and restarts.

dkChat needs Purpur or Paper 26.x and Java 25. PlaceholderAPI, EssentialsX, LuckPerms, LiteBans, Vault (any economy, such as dkBank) and DiscordSRV are all optional.
