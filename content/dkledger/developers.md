---
title: For developers
description: How other dk plugins report why money moved, and how the Discord bot reads dkLedger's data and alerts.
audience: developers
order: 7
---

dkLedger has a small API, `LedgerApi`, and one event, `LedgerAlertEvent`. Use them to tell dkLedger *why* money moved, to report things it can't see itself, and to read its data from another plugin such as the dk suite's Discord bot.

## Add it to your plugin

```kotlin title="build.gradle.kts"
compileOnly("com.direk:dkledger:0.5.0")
```

```yaml title="plugin.yml"
softdepend: [dkLedger]
```

dkLedger compiles against several APIs from your local Maven repository, including dkCore's and dkBank's. Publish those first (`./gradlew publishToMavenLocal` in dkCore, `./gradlew :api:publishToMavenLocal` in dkBank), then run `./gradlew build` in dkLedger. The jar is `build/libs/dkLedger-<version>.jar`, and it goes in `plugins/` next to dkCore.

## Reading data and alerts

`LedgerApi` has everything `/ledger` has: supply, sources, player summaries, alerts and resolving them, freeze, unfreeze, notes, reverse, the scan and the simulator, plus items, reasons and activity. Futures complete on the main thread.

```java
LedgerApi.find().ifPresent(ledger -> ledger.supply().thenAccept(s -> { /* use the supply */ }));

@EventHandler
public void onAlert(LedgerAlertEvent e) { /* post e.getAlert() to a channel */ }
```

## Reporting from your own plugin

```java
LedgerApi ledger = LedgerApi.find().orElse(null);

// Why the money moved: every Vault call on this thread inside the block gets the reason.
try (LedgerApi.Label l = ledger.label("quest: daily_3")) {
    economy.depositPlayer(player, 500);
}

// Money that moves later or on another thread (a command, dkBank):
// the player's next change in 5 seconds gets this reason.
ledger.expect(player.getUniqueId(), "vote reward");

// Item trades dkLedger can't see by itself, and progress that isn't money.
ledger.itemTrade(this, player.getUniqueId(), "diamond", false, 16, 640);
ledger.progress(this, player.getUniqueId(), "quest", "daily_3", 0);
```

These calls never throw and can be made from any thread.

## Code layout

| Folder | What is in it |
|---|---|
| `audit/` | The config audit. Plain Java with no Bukkit, and tested. `whatif/` is the simulator built on top of it. |
| `ledger/` | Recording: the Vault proxy, the EssentialsX and dkBank hooks in `hook/`, source attribution and storage. |
| `supply/`, `detect/` | Snapshots, the live and hourly checks, and alerts. |
| `items/` | Item trades and daily item totals. |
| `players/` | Playtime (with AFK), first joins and progress events. |
| `web/` | The dashboard's server, sign-in and JSON. The page itself is in `resources/web/`. |
| `admin/` | Freeze, logins, and `LedgerActions`, which commands, menus and the API share. |
| `report/`, `gui/`, `command/`, `config/`, `api/` | The weekly report, menus, commands, settings and the API. |
