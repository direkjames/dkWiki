---
title: dkCodes
description: Redeem a code with /redeem to get rewards such as money, items and experience.
audience: players, staff
order: 0
---

dkCodes lets you type a code to get a reward. Staff hand codes out in Discord, on social media or as event prizes. It replaces the old RedeemCode plugin.

## How to redeem a code

:::steps
1. Type `/redeem <code>`, for example `/redeem WELCOME`.
2. The reward is given straight away: money, items, experience, or a message and a sound.
3. If your inventory was full, the items that didn't fit wait for you. Type `/redeem claim` to collect them.
:::

Typing is forgiving. `Xmas-2026`, `xmas2026` and `XMAS_2026` are the same code, and tab completion never reveals codes.

> [!NOTE] Why a code might not work
> A code can have a limit on total uses, uses per player, or uses per connection. It can also have a start date, an expiry date, a playtime requirement, a world requirement, a permission requirement or a cost. And after too many wrong guesses in a row, `/redeem` is locked for a while. The message you get says which one applies.

## Where to go next

:::contents
- [Redeeming codes](redeeming.md) :: What you can receive, referral codes and mystery codes.
- [Commands and permissions](commands.md) :: `/redeem`, and every `/dkcodes` staff command.
- [Making codes](creating-codes.md) :: Writing codes in `codes.yml`: limits, requirements and rewards.
- [Settings](config.md) :: Dates, the referral rules and the Discord webhook.
- [Safety](safety.md) :: How dkCodes stops guessing, double claims and lost rewards.
:::

## Try it yourself

Use a normal account for the player steps, since operators skip the cooldown and the lockout. Items marked *staff* need `dkcodes.admin`.

:::steps
1. Run `/redeem` with a code that is switched on. The reward arrives and a message confirms it.
2. Run the same code again. If the code allows one use per player, you are told you already used it.
3. Run `/redeem notacode`. You are told the code doesn't exist.
4. *Staff:* run `/dkcodes list`, then `/dkcodes info <code>` to see a code's limits and rewards.
5. *Staff:* run `/dkcodes gui` to open the code editor.
6. *Staff:* run `/dkcodes log` to see the redemption you just made.
:::
