---
title: For developers
description: The dkStock API: read prices, preview trades, freeze items, change the market and react to trade events.
audience: developers
order: 12
---

dkStock has a public API so other plugins can read the market, react to trades and change prices. It is a separate module (`dkstock-api`) with no code from the plugin itself, so you compile against it and dkStock provides the real thing at runtime.

`DkStockApi.API_VERSION` is `2`. Within one API version, methods and events are only added, never removed or changed. A breaking change raises `API_VERSION`. Call `api.apiVersion()` if you want to be safe.

## Add it to your project

Publish the API to your local Maven repository from the dkStock project, then depend on it:

```shell
./gradlew :api:publishToMavenLocal
```

```kotlin title="build.gradle.kts"
repositories {
    mavenLocal()
}
dependencies {
    compileOnly("com.direk:dkstock-api:1.0.0")
}
```

```yaml title="plugin.yml"
depend: [dkStock]        # or softdepend, if dkStock is optional for you
```

Always use `compileOnly`. Don't shade the API into your jar. The dependency contains only the API (`com.direk.dkstock.api`), not the plugin.

```java
DkStockApi api = DkStockApi.find();   // null if dkStock is not running
if (api == null) return;
```

If dkStock is a soft dependency, keep every line that touches `DkStockApi` in a separate class that you load only when the plugin is present.

## Freezing items and the hot item

```java
api.freeze("diamond", "MyPlugin");       // false if unknown or already frozen
api.unfreeze("diamond", "MyPlugin");
api.isFrozen("diamond");
api.frozenItems();                       // Set<String>
api.hotItems();                          // today's hot item ids (empty if the feature is off)
api.priceFactor("diamond");              // 1.0, or e.g. 1.15 while it is the hot item
```

A frozen item answers every buy and sell with `QuoteStatus.FROZEN`. Frozen items stay frozen after a restart until someone unfreezes them. `freeze` and `unfreeze` must be called on the main thread.

## Reading the market

Item ids are lowercase Minecraft names, such as `iron_ingot`. A `minecraft:` prefix and capital letters are accepted and cleaned up.

```java
api.itemIds();                         // all items in the market
api.item("diamond").ifPresent(info -> {
    info.price();                      // current market price
    info.stock();                      // current stock
    info.buyPrice();                   // OptionalDouble: empty if buying is not possible right now
    info.sellPrice();                  // price after tax, empty if selling is not possible right now
});

TradeQuote quote = api.previewSell("gold_ingot", 64);
if (quote.ok()) {
    double money = quote.total();      // what 64 would pay, with tax and the price moving as it sells
} else {
    QuoteStatus why = quote.status();  // OUT_OF_STOCK, STOCK_FULL, SELL_DISABLED, ...
}
```

A preview can be smaller than what you asked for (`quote.amount()`), for example when the stock only has room for part of it. Nothing is changed by a preview.

```java
PlayerStats stats = api.playerStats(player.getUniqueId());              // lifetime numbers
PlayerStats iron  = api.playerStats(player.getUniqueId(), "iron_ingot");

api.priceHistory("diamond", Duration.ofDays(7)).thenAccept(points -> { /* PricePoint(time, price, stock) */ });

api.leaderboard(LeaderboardType.SELLERS, LeaderboardPeriod.WEEK, null, 10)
   .thenAccept(rows -> { /* LeaderboardEntry(rank, player, value) */ });
```

## Threads

- Everything that only reads the market (`item`, `buyPrice`, `previewBuy`, `playerStats` and so on) is quick and safe to call from the main thread.
- `priceHistory` and `leaderboard` return a `CompletableFuture`. It may finish on another thread, so go back to the main thread before touching Bukkit objects.
- Changing the market (`setPrice`, `setStock`, `adjustPrices`, `reset`, `resetAll`) and all events must happen on the main thread.

## Changing the market

Every change needs a `source`: a short name for who did it, usually your plugin's name. It is written to the admin log, shown in `/stock stats`, and given to the event, so server owners can see where a price change came from.

```java
api.setPrice("diamond", 120.0, "MyEventPlugin");
api.setStock("diamond", 500, "MyEventPlugin");
api.adjustPrices("iron_ingot", -25, "MyEventPlugin");   // 25% down; null for every item
api.reset("diamond", "MyEventPlugin");
```

These throw `IllegalArgumentException` for an unknown item or a value that isn't allowed (a price below the price floor, stock above the maximum, a drop of 100% or more). Each returns `AdjustResult.DONE`, or `CANCELLED` if another plugin cancelled the `DkStockMarketAdjustEvent`. Changes made through the API are handled exactly like `/stock setprice`, `crash` and `surge`.

## Events

All events run on the main thread.

| Event | Cancellable | When |
|---|---|---|
| `DkStockPreTradeEvent` | Yes | A player is about to buy or sell. Nothing has been taken or paid yet. |
| `DkStockTradeEvent` | No | A trade finished. Gives the new price and stock. |
| `DkStockMarketAdjustEvent` | Yes | A price or stock is about to be changed by hand (command, API). Not fired for normal trading or recovery. |

```java
@EventHandler
public void onPreTrade(DkStockPreTradeEvent event) {
    if (event.getType() == TradeType.SELL && event.getAmount() > 1000) {
        event.setCancelled(true);
        event.setCancelMessage(Component.text("Too many at once!"));  // optional
    }
}

@EventHandler
public void onTrade(DkStockTradeEvent event) {
    getLogger().info(event.getPlayer().getName() + " " + event.getType() + " "
            + event.getAmount() + " " + event.getItemId() + " for " + event.getTotal());
}
```

- With `/stock sellall`, a pre-trade event is fired for each item. Cancelled items are left out and the rest is sold. Trade events are fired for each item that sold.
- The event shows the total the player pays or receives, tax included.
- `DkStockMarketAdjustEvent#getValue()` is `NaN` for resets.

## Project layout

The project has three modules: `core` (the market logic, with no Minecraft code and unit tests), `api` (the public API and events, `com.direk:dkstock-api`) and `plugin` (the plugin itself). dkStock needs dkCore published to your local Maven repository, and you need JDK 25. Build with `./gradlew build`; the jar is in `plugin/build/libs/`.
