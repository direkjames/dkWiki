---
title: For developers
description: Ask dkCore whether a player is AFK, and react when someone goes AFK or comes back.
audience: developers
order: 5
---

Other dk plugins never depend on dkAFK directly. They ask dkCore, which asks whichever AFK provider is registered (dkAFK). If dkAFK isn't installed, `isAfk` is always `false` and the event never fires, so your plugin keeps working without it. `core().hasAfkProvider()` tells you whether dkAFK is running.

## Is a player AFK right now?

This is safe to call from any thread, for example async chat.

```java
if (DkCore.get().isAfk(player.getUniqueId())) { /* ... */ }
// or, in a DkPlugin:
if (core().isAfk(player.getUniqueId())) { /* ... */ }
```

## React to a change

```java
@EventHandler
public void onAfkChange(DkAfkChangeEvent e) {
    if (e.isAfk()) { /* just went AFK */ } else { /* just came back */ }
}
```

`DkAfkChangeEvent` fires on the main thread. It isn't fired when an AFK player logs out, so clear any per-player state on `PlayerQuitEvent` as usual.

## Building dkAFK

Publish dkCore first (`./gradlew publishToMavenLocal` in the dkCore project), then open dkAFK in IntelliJ IDEA with Java 25 and run `./gradlew build`. The jar is `build/libs/dkAFK-<version>.jar`. The build also runs the detection unit tests. dkCore is never shaded into the jar.

## Project layout

| File or folder | What it does |
|---|---|
| `DkAfk.java` | The plugin entry point. Extends dkCore's `DkPlugin` and registers the AFK service. |
| `Settings.java` | Reads and validates `config.yml`. |
| `AfkManager.java` | The AFK timeline, check window, actions, return and `DkAfkChangeEvent`. |
| `ActivityListener.java` | Turns events into "counted" or "ignored". |
| `core/` | Detection logic with no Paper code, unit tested. |
| `command/`, `hook/`, `startup/` | `/dkafk`, PlaceholderAPI and the console banner. |
