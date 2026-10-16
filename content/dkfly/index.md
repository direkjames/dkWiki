---
title: dkFly
description: Fly for as long as your fly time lasts. Buy more in the fly shop, send time to friends, or win it from crates.
audience: players, staff
order: 0
---

dkFly gives players timed flight. You have an amount of **fly time**. Type `/fly` to turn flying on, and the time counts down only while you are actually in the air. Standing or walking with `/fly` on costs nothing.

## How to fly

:::steps
1. Type `/flytime` to see how much fly time you have.
2. Type `/fly` to turn flight on, and again to turn it off.
3. Watch the timer. A boss bar and warning sounds count down as your time runs low.
4. Land before you turn flight off: you can only switch it off within a few blocks of the ground or water.
5. Out of time? Open the fly shop with `/flytime shop` and buy more.
:::

Your toggle and your flight stay on when you log out, so you don't fall when you join. Time spent AFK isn't charged.

## Getting more fly time

- **Buy it** in the fly shop with `/flytime shop`.
- **Receive it** from a friend: `/flytime pay <player> <time>`, then `/flytime confirm`.
- **Win it** from rewards, such as a crate that runs `flytime give`.

## Things that stop flight

- **Blacklisted worlds,** such as the Nether and the End by default.
- **WorldGuard regions** that deny flight with the `dkfly` flag.
- **Combat.** Hitting or being hit by another player turns flight off for a short time.
- **Running out of time.** You get Slow Falling and no fall damage, so you land safely.

## Where to go next

:::contents
- [Using fly time](using-fly-time.md) :: The timer, the shop, transfers and landing rules.
- [Commands and permissions](commands.md) :: Every command and permission.
- [Settings](config.md) :: Every `config.yml` setting.
- [The fly shop](shop.md) :: Editing packages, prices and custom heads in `gui.yml`.
- [Placeholders](placeholders.md) :: Fly time on scoreboards and tab lists.
:::

## Try it yourself

Use a normal account. Items marked *staff* need `dkfly.admin`.

:::steps
1. *Staff:* run `/flytime give <you> 5m` to give yourself 5 minutes.
2. Run `/flytime`. It shows 5 minutes.
3. Run `/fly`, then jump and fly up. A boss bar shows your remaining time.
4. Land and run `/fly` again to turn it off. Your time stops counting down.
5. Run `/flytime shop` to open the fly shop.
6. Run `/flytime pay <friend> 1m`, then `/flytime confirm`. Your friend receives the time.
7. *Staff:* run `/flytime check <player>` to see another player's fly time.
:::
