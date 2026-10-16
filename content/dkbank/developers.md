---
title: For developers
description: The dkBank Developer API: reading and changing balances and tiers, telling dkBank who is AFK, and listening to events.
audience: developers
order: 10
---

The Developer API is MIT licensed, unlike dkBank itself. Use it to read and change bank balances and tiers, and to react to what happens in the bank. Plugins built on dkCore can also reach the bank through [dkCore's `bank()` service](../dkcore/developers.md) without depending on dkBank.

## Add it to your plugin

The API classes are inside the dkBank jar on the server. Your plugin only compiles against them (`compileOnly`) and must not include them in its own jar.

```kotlin title="build.gradle.kts"
dependencies {
    // with the API jar in a libs folder
    compileOnly(files("libs/dkBank-API-1.1.0.jar"))
    // or, after ./gradlew :api:publishToMavenLocal in the dkBank project
    compileOnly("dev.direk:dkBank-API:1.1.0")
}
```

```yaml title="plugin.yml"
depend: [dkBank]        # or softdepend, if dkBank is optional for you
```

## Use it

```java
DkBankAPI bank = DkBankAPI.get();

// Add 500 to a player's bank (a reward). The future completes on the main thread.
bank.give(player.getUniqueId(), new BigDecimal("500"), "MyPlugin").thenAccept(result -> {
    if (result.success()) player.sendMessage("Reward added! Bank: " + bank.format(result.balance()));
    else player.sendMessage("Couldn't add it: " + result.failure());
});

// Read from memory (online players), no waiting:
Optional<BigDecimal> balance = bank.cachedBalance(player.getUniqueId());
BankTier tier = bank.tierOf(player);
int place = bank.rank(player.getUniqueId());
```

| Method | What it does |
|---|---|
| `account(uuid)` | Loads an account: balance, name and bought tier. |
| `cachedBalance(uuid)` | The balance of an online player, from memory. |
| `has(uuid, amount)` | Whether the bank holds at least that much. |
| `give(uuid, amount, source)` | Adds money. Respects the tier's maximum balance. |
| `take(uuid, amount, source)` | Removes money. Fails if there isn't enough. |
| `transfer(from, to, amount)` | Moves money between banks, with no fees. |
| `tiers()`, `tier(id)` | The tiers from `tiers.yml`. |
| `tierOf(player)` | An online player's tier, including permission tiers. |
| `boughtTier(uuid)`, `setTier(uuid, id, source)` | The tier an account bought, and setting it for free. |
| `isLocked(player)` | Whether the alt-account limit locks their bank. |
| `leaderboard()`, `rank(uuid)` | The leaderboard from its last update, and a player's place on it. |
| `format(amount)` | An amount the way dkBank shows money. |

> [!WARNING] Never wait on a future on the main thread
> Methods that return a `CompletableFuture` work in the background and complete on the main thread. Call them from any thread, but never use `join()` or `get()` on the main thread, because that freezes the server.

## Tell dkBank who is AFK

AFK players earn the offline interest rate. If your plugin knows who is AFK, register an `AfkSource` (since 1.1.0) and dkBank asks it directly, with no PlaceholderAPI needed.

```java
Bukkit.getServicesManager().register(AfkSource.class, uuid -> afkManager.isAfk(uuid),
        this, ServicePriority.Normal);
```

It is asked on the main thread about once a minute per online player, so read from memory. A player counts as AFK if any source, dkBank's idle time or a placeholder says so. dkCore uses this to pass on dkAFK's status.

## Events

All events fire on the main thread.

| Event | When it fires | Can you cancel it? |
|---|---|---|
| `BankPreTransactionEvent` | A player is about to deposit, withdraw or send money. | Yes, with an optional message. |
| `BankTransactionEvent` | Any bank balance changed: deposits, interest, staff, plugins. | No |
| `BankUpgradeEvent` | A player is about to buy a tier. | Yes, with an optional message. |
| `BankTierChangeEvent` | An account's bought tier changed. | No |

```java
@EventHandler
public void onDeposit(BankPreTransactionEvent event) {
    if (event.getAction() == BankPreTransactionEvent.Action.DEPOSIT && inCombat(event.getPlayer())) {
        event.setCancelled(true);
        event.setCancelMessage(Component.text("No banking during combat!"));
    }
}
```

The `example` folder of the dkBank project is a complete small addon that uses all of this.
