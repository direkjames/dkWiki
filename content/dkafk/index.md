---
title: dkAFK
description: How the server decides you are AFK, what happens when you are, and how to mark yourself AFK with /afk.
audience: players, staff
order: 0
---

dkAFK works out who is away from their keyboard. It was called DirekAntiAFK before it joined the dk suite. Other dk plugins ask dkCore whether a player is AFK, and dkCore asks dkAFK, so one answer is shared by the whole suite. [dkBank](../dkbank/index.md) pays AFK players the lower offline interest rate, [dkStock](../dkstock/index.md) stops AFK players trading, [dkSleep](../dksleep/index.md) leaves them out of night votes, and [dkFly](../dkfly/index.md) stops charging fly time.

## What happens when you go AFK

:::steps
1. After a few minutes with no real activity, you are marked AFK. A tag like **[AFK]** shows next to your name in the tab list.
2. A little later, a window asks "Are you still there?". Click the button to carry on playing.
3. If you don't answer in time, you are moved to the AFK area. Your position is saved first.
4. As soon as you are active again by moving, looking around or chatting, you are taken back to where you were.
:::

The exact times are set by staff, and the second one is picked at random inside a range so nobody can learn when the window will appear. Logging out and back in quickly doesn't reset your timer either.

## Going AFK on purpose

Type `/afk` to mark yourself AFK straight away. Moving, looking around or chatting brings you back. `/afk` again also brings you back, but only if you were active recently, so it can't be used to reset the timer.

## Why standing in a farm doesn't help

dkAFK only counts real play. Things that look like activity but aren't, such as being carried by water or a minecart, or a macro or auto-clicker doing the work, don't keep you active. Teleports never count. Players in creative or spectator mode, and operators, are not checked.

## Where to go next

:::contents
- [Commands and permissions](commands.md) :: `/afk` for players, and `/dkafk` for staff.
- [Settings](config.md) :: Times, the check window, the actions and who is exempt.
- [Placeholders and TAB](placeholders.md) :: Show the AFK tag in the tab list.
- [Upgrading from DirekAntiAFK](upgrading.md) :: Keeping old settings, commands and permissions working.
- [For developers](developers.md) :: Asking whether a player is AFK from your own plugin.
:::

:::private
How detection decides what counts, and how to tune it, is on [How detection decides](detection.md). It is left out of the published wiki so nobody can learn how to dodge it.
:::

## Try it yourself

Operators are skipped by default, so test with a normal account in survival, or set `exempt-ops: false`. Items marked *staff* need `dkafk.admin`.

:::steps
1. Run `/afk`. A tag appears next to your name and a message tells you that you are AFK.
2. Move or look around. The tag disappears.
3. *Staff:* run `/dkafk list` while someone is AFK. They appear with their idle time.
4. *Staff:* run `/dkafk check <player>`. It shows their status, idle time and why recent actions were ignored.
5. *Staff:* run `/dkafk debug <player>` and play normally for a minute. It shows what counts and what doesn't. Run it again to stop.
6. *Staff:* set `afk-time` to `1m` in `config.yml`, run `/dkafk reload`, stand still and wait for the tag and the check window.
:::
