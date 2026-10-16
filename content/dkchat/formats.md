---
title: Chat formats
description: How chat formats are chosen by rank, the placeholders they can use, and how colours, nicknames and glyphs are handled.
audience: staff
order: 1
---

Chat formats live in `formats.yml`. Every text in dkChat's files supports legacy `&` codes, HEX colours (`&#FF00AA` or `<#FF00AA>`) and MiniMessage. Run `/dchat reload` after editing.

## Choosing a format

Each player gets the **highest `priority`** format they have the `permission` for. A format with an empty permission (`""`) is available to everyone, so keep one as your default. Operators have every permission, so they always get the highest format.

```yaml title="plugins/dkChat/formats.yml"
formats:
  default:
    priority: 0
    permission: ""
    format: "%luckperms_prefix%<gray>{name}</gray> <dark_gray>»</dark_gray> <white>{message}"

  vip:
    priority: 10
    permission: "dkchat.format.vip"
    format: "%luckperms_prefix%<gold>{name}</gold> <dark_gray>»</dark_gray> <yellow>{message}"
    hover:
      - "<gold><bold>{name}"
      - "<gray>Username: <white>{player}"
      - "<gray>Rank: <gold>VIP"
```

`/dchat format` shows which format you are using.

## Placeholders in a format

| Placeholder | Meaning |
|---|---|
| `{name}` | The display name, including EssentialsX `/nick` nicknames. |
| `{player}` | The real Minecraft username. |
| `{message}` | The chat message. |
| `%...%` | Any PlaceholderAPI placeholder. |

## Name tooltips

A tooltip appears when you hover a name in chat. `default-hover` in `formats.yml` is used by any format that doesn't set its own `hover`. Set `hover: []` on a format to turn the tooltip off for it, or `name-hover.enabled: false` in `config.yml` to turn them off everywhere.

## Nested placeholders and Nexo glyphs

If a value contains more placeholders (a LuckPerms prefix set to `%nexo_dev% &7Dev`), dkChat expands them for the identifiers listed in `placeholders.nested-identifiers` in `config.yml` (the default is `nexo`). Other identifiers are never expanded inside values. Only list plugins you trust. `%nexo_glyphid%` gives a `<glyph:glyphid>` tag, or the raw unicode for default-font glyphs, and dkChat leaves the tag in the text for Nexo to render.

## What players can type

Players can use colours in their own messages only if they have the matching permission:

| Permission | Lets a player use |
|---|---|
| `dkchat.color.legacy` | `&` colours and named MiniMessage colours such as `<red>` |
| `dkchat.color.format` | Bold, italic, underline and strikethrough |
| `dkchat.color.magic` | Obfuscated text |
| `dkchat.color.hex` | HEX colours |
| `dkchat.color.gradient` | `<gradient>` and `<rainbow>` |
| `dkchat.color.*` | All of the above |

Operators have all of them. See [Security and compatibility](security.md) for what players can never do.
