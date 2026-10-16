---
title: dkCore
description: The shared foundation that every dk plugin is built on. You never use it directly, but it is why the suite feels like one product.
audience: players, staff
order: 0
---

dkCore does the work every dk plugin would otherwise repeat. It has no menus or crates of its own. It makes sure that dkBank, dkLedger, dkStock and the rest behave the same way, share their data and show money the same way.

## What it gives every dk plugin

- **One database.** Every dk plugin saves into the same SQLite or MySQL database, each with its own table prefix (`dkbank_`, `dkledger_` and so on), so nothing collides.
- **One player list.** dkCore keeps a table of players and can find one by name whether they are online or not.
- **One message style.** Messages use MiniMessage with a shared `<prefix>`, so every plugin sounds alike.
- **Chest menus.** A locked menu system with click handlers, so players can't pull items out of a menu.
- **Services.** Ready-made access to the wallet (Vault), to dkBank's bank, and to AFK status.
- **A task scheduler** that cancels its repeating tasks when a plugin turns off.

## Money looks the same everywhere

Economy plugins sometimes add their own colour codes to the amounts they return, for example making a number black. That would override the colours in a plugin's messages. So every dk plugin shows money through dkCore's formatting, which strips those codes. If a price ever shows in the wrong colour, that is a bug, not a setting.

## Startup summary

When the server starts, the console shows the dkCore banner with its version, the server, Java, the database and how long startup took. Once the server finishes loading, a "dk suite ready" summary lists every dk plugin as OK or DISABLED, plus the economy and AFK provider in use. Turn it off with `startup-banner: false` in [the settings](config.md).

## Try it yourself

:::steps
1. Run `/dkcore` as an operator. It prints the dkCore version, the database type, the economy provider and the bank provider.
2. Check the console after a restart. You should see the banner, then the "dk suite ready" summary with every dk plugin marked OK.
3. Run `/dkcore reload`. It replies that the config was reloaded.
4. Change a database setting and run `/dkcore reload` again. The reply reminds you that database changes need a restart, and they only apply after one.
:::

## Where to go next

:::contents
- [Commands and permissions](commands.md) :: `/dkcore` and who can run it.
- [Settings](config.md) :: Choosing SQLite or MySQL, and the banner and debug switches.
- [For developers](developers.md) :: Using dkCore in a new dk plugin.
:::
