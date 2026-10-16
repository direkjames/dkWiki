---
title: Using fly time
description: How fly time is charged, how landing works, how transfers and the fly shop work, and what pauses the timer.
audience: players
order: 1
---

## How time is charged

Fly time is charged to the millisecond, and only while you are actually in the air. Walking on the ground with `/fly` on is free. The timer pauses while you are AFK, so standing still in the air doesn't drain it.

A boss bar (or the action bar, depending on the server) shows what is left. It starts full and empties as time runs out, going from green to yellow to red. Warnings flash with a sound at set moments before you run out, by default at 5 minutes, 1 minute, 30 seconds, 10 seconds and each of the last 5 seconds.

Servers can set a **maximum amount of fly time** a player can hold. Shop purchases, transfers and gifts respect it.

## Landing

- **Turning flight off yourself.** You must be within a few blocks of the ground or water (3 by default, which means no fall damage). Higher up, you are told to land first.
- **Flight is turned off for you.** If you run out of time, enter a restricted area or a staff member turns it off, you get landing protection: Slow Falling and no fall damage, depending on the reason. It ends as soon as you touch the ground.
- **Combat.** If you hit another player or get hit, flight turns off and you can't use `/fly` for a short time (15 seconds by default). You get no landing protection after combat.

## Flight speed

The normal fly speed is Minecraft's default. Servers can give faster speeds through permissions, and the fastest one you have is used.

## The fly shop

`/flytime shop` opens a menu of packages. Each shows how much time it gives and what it costs in server money. Click one to buy it. The purchase is saved instantly.

## Sending time to a friend

`/flytime pay <player> <time>` sends some of your fly time. By default you must then type `/flytime confirm` within 30 seconds, there is a cooldown between transfers (1 minute) and a minimum amount (1 minute), and the receiver can be offline. Servers can add a tax that makes some of the sent time disappear.

## Time formats

Wherever a time is asked for, you can write seconds (`30`), `45s`, `10m`, `1h30m` or `2d`.
