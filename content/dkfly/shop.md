---
title: The fly shop
description: How to edit the fly shop menu, its packages and prices, and use custom heads.
audience: staff
order: 3
---

The fly shop is `gui.yml`. Edit it, then run `/flytime reload`. Text uses MiniMessage. Slots start at 0 in the top-left corner, so a 3-row menu has slots 0 to 26.

## Packages

Each package in the file has a slot, a `time`, a `price`, and an optional `permission`. The key (`small`, `medium` and so on) is just an id.

| Setting | What it does |
|---|---|
| `slot` | Where the package goes. |
| `time` | The fly time given, such as `30s`, `15m`, `1h`, `1h30m` or `2d`. |
| `price` | The cost in server money (paid with the server economy, dkBank through Vault). |
| `permission` | Optional. Only players with it can buy. Leave it empty for everyone. |

In names and lore you can use `<time>` (the package time, or the player's fly time on the info item), `<price>`, `<balance>` and `<player>`.

## Other items

- `title` and `rows` set the menu's look.
- `filler` fills every empty slot. Set `enabled: false` to leave them empty.
- `info` shows the player's fly time and balance.
- `close` is the close button.

## Custom heads

Set `material` to `PLAYER_HEAD` and add a `texture` from minecraft-heads.com. Any of these work:

- the "Value" from the head's page (the "For Developers" section),
- just the texture id (the long code in the texture URL),
- the full `http://textures.minecraft.net/texture/...` address,
- `%player%` for the viewer's own head.

Turn the shop off with `shop.enabled: false` in `config.yml`.

> [!NOTE] Upgrading from 1.0.0
> The old shop section in `config.yml` is moved into `gui.yml` automatically, and the replaced settings (`landing.mode`, `actionbar-while-flying` and `bentobox`) are removed.
