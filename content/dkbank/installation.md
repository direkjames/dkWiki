---
title: Installation
description: What dkBank needs, how to install and update it, and how to move it to MySQL or a proxy network.
audience: staff
order: 8
---

## Requirements

| | |
|---|---|
| Server | Paper or Purpur. Spigot isn't supported. |
| Minecraft | 1.21.4 to 26.3, one jar for all of them. |
| Java | 21 or newer. Servers on 26.x need 25. |
| Economy | [Vault](https://www.spigotmc.org/resources/vault.34315/) (or VaultUnlocked) **and** an economy plugin such as EssentialsX or CMI. |
| Optional | PlaceholderAPI, for placeholders and for reading AFK status from other plugins. |

## First start

:::steps
1. Put `dkBank-<version>.jar` in `plugins/`, next to Vault and your economy plugin.
2. Start the server. dkBank creates `plugins/dkBank/` with `config.yml`, `messages.yml`, `tiers.yml`, the `menus/` folder and `bank.db`, its SQLite database.
3. Check the console for `Economy: EssentialsX (through Vault)`. If it says Vault or the economy is missing, banking stays off until they're there.
4. Join the server and type `/bank`.
:::

The defaults are ready to use: 1% interest per hour played, 1% per day away, and five buyable tiers from Basic to Diamond.

## Updating

Replace the jar and restart. dkBank upgrades its database by itself, and adds new settings, with their comments, to `config.yml` and `messages.yml` without touching yours. `tiers.yml` and the menu files are never changed after they're created. To get a new default menu, delete the file and run `/bank admin reload`.

> [!WARNING] Back up first
> Always keep a copy of `plugins/dkBank/` (or your MySQL database) before updating.

## MySQL or MariaDB

Use MySQL when several servers share one bank, such as a network, or if you simply prefer it. Create the database first, with `CREATE DATABASE dkbank;`, then set this in `config.yml` and restart.

```yaml title="config.yml"
storage:
  type: mysql          # or mariadb
  table-prefix: "dkbank_"
  mysql:
    host: "localhost"
    port: 3306
    database: "dkbank"
    username: "dkbank"
    password: "a good password"
    use-ssl: false
    pool-size: 6
```

Every server sharing the bank uses the same settings. Switching the storage type doesn't copy accounts over.

## Networks (Velocity, BungeeCord)

Turn on IP forwarding in the proxy. Without it, the alt-account limit sees every player as the proxy's address (dkBank warns about this and ignores local addresses). Players can switch servers freely, and interest is never paid twice for the same minutes.

## Reloading

`/bank admin reload` reloads `config.yml`, `messages.yml`, `tiers.yml` and the menus. If a file has a mistake such as a tab or a missing quote, nothing is reloaded and the console says where. At startup, dkBank refuses to start rather than run with wrong settings, and your file is never overwritten.

## With the rest of the dk suite

dkBank never needs dkCore. When dkCore is installed, it links to dkBank on its own: every dk plugin can use the bank through dkCore, dkAFK's AFK status is passed to dkBank, and dkBank shows in dkCore's "dk suite ready" summary. Never add dkCore to dkBank's `depend` or `softdepend`.
