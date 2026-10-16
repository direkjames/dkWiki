---
title: For developers
description: How to build a new dk plugin on dkCore, and what its API gives you.
audience: developers
order: 3
---

Every dk plugin is built on dkCore. This page is the short version of dkCore's API for anyone writing one.

## Add dkCore to a plugin

dkCore is a `compileOnly` dependency: the server provides it, so never shade it into your jar.

```kotlin title="build.gradle.kts"
repositories {
    mavenLocal()
    mavenCentral()
    maven("https://repo.purpurmc.org/snapshots")
    maven("https://repo.papermc.io/repository/maven-public/")
}
dependencies {
    compileOnly("org.purpurmc.purpur:purpur-api:26.3.build.+")
    compileOnly("com.direk:dkcore:1.3.0")
}
```

```yaml title="plugin.yml"
author: direk james
depend: [dkCore]
```

Your main class extends `com.direk.dkcore.DkPlugin` instead of `JavaPlugin` and implements `enable()` and `disable()`.

:::steps
1. In the dkBank project, run `gradlew :api:publishToMavenLocal`. dkCore compiles against dkBank's Developer API.
2. Open dkCore in IntelliJ IDEA with Java 25 as both the Project SDK and the Gradle JVM.
3. Run `./gradlew build`. The jar `build/libs/dkCore-1.3.0.jar` goes in the server's `plugins/` folder.
4. Run `./gradlew publishToMavenLocal` so other dk plugins can compile against this dkCore. Repeat it whenever dkCore changes.
:::

## What the API gives you

| Class | What it gives you |
|---|---|
| `DkPlugin` | `cfg()` for config.yml, `messages()` for messages.yml, `tasks()`, `database()`, `economy()`, `core()`, `registerCommand()`, `listen()`, `reloadAll()` and `userConfigSections()` |
| `DkCore` | `DkCore.get()`, `players()`, `database()`, `economy()`, `isAfk(uuid)` and `hasAfkProvider()` |
| `config.ConfigFile` | A YAML file that adds new default keys automatically. Sections listed in `userSections` stay as the owner edited them |
| `message.Messages` | MiniMessage with `<prefix>`: `send`, `actionBar`, `get`, `parse`, plus the `Messages.text`, `styled` and `component` placeholders. Your plugin needs the message keys `no-permission`, `player-only` and `unknown-player` |
| `command.DkCommand` and `SubCommand` | A root command with sub commands, permissions, player-only checks and tab completion |
| `scheduler.Tasks` | `sync`, `later`, `async`, `timer` and `asyncTimer`. Repeating tasks cancel themselves when your plugin disables |
| `database.Database` | Shared SQLite or MySQL with `query`, `execute`, `createTables` and `upsert`, all on one ordered database thread. Prefix your tables, for example `dkfly_` |
| `player.PlayerService` | The `dk_players` table, and `find(name)` for online and offline players |
| `bank.BankService` | dkBank access: `give`, `take`, `transfer`, `balance`, `cachedBalance`, `has`, `tier`, `tierName`, `rank`, `isLocked` and `formatPlain`. Futures complete on the main thread |
| `economy.EconomyService` | The wallet through Vault: `balance`, `has`, `withdraw`, `deposit` and `formatPlain` |
| `gui.Menu` and `ItemBuilder` | Locked chest menus with click handlers |
| `afk.AfkService` and `DkAfkChangeEvent` | The AFK hook that the suite's AFK plugin registers |
| `util.TimeUtil` and `TimeFormatter` | Parse values like `1h30m`, and format seconds from a config section |
| `util.TextUtil` | `stripSection` and `stripColors` for text from other plugins |

## The bank and the wallet

- `economy().get()` is the **wallet** (Vault). `bank().get()` is **dkBank's bank**. They are separate on purpose.
- `bank().get()` is empty when dkBank isn't installed, so check it before use.
- dkBank never depends on dkCore. dkCore lists dkBank as a `softdepend`, so dkBank loads first. dkBank must never list dkCore back, or the two would wait on each other forever.
- When an AFK provider is registered, dkCore passes AFK status to dkBank, so AFK players earn the offline interest rate.

## Rules every dk plugin follows

- **Money.** Show amounts with `Messages.money("price", eco, amount)`, `eco.formatPlain(amount)` or `bank.formatPlain(amount)`. Never use `format(amount)`, because economy plugins may add colour codes such as `§0` that override the colours in your YAML.
- **Outside text.** `Messages.text(...)` removes `§` colour codes, so values from PlaceholderAPI or item names can't recolour your messages.
- **Author.** Every `plugin.yml` has `author: direk james`.
- **Tables.** Prefix every table with your plugin's name.
