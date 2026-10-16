---
title: dkBank
description: A bank with interest for the time you play and the time you're away, upgradeable tiers and chest menus.
audience: players, staff
order: 0
---

dkBank gives every player a bank account that is separate from their wallet. Money in the bank earns interest, both while you play and while you are away, and you can spend some of it on upgrading to a better tier.

## What you can do

- **Deposit and withdraw** between your wallet and your bank.
- **Send money** straight to another player's bank.
- **Earn interest** for playing and for being offline. AFK time earns the lower offline rate.
- **Buy tiers** that raise how much your bank can hold and how much of it earns interest.
- **See your history** of every deposit, payout and transfer, and the **leaderboard** of the richest banks.

Everything opens from `/bank`, which shows a chest menu. Every action also works as a typed command, like `/bank deposit 5k`.

## Your first minutes

:::steps
1. Type `/bank` to open the menu. It shows your balance, your tier and when your next payout is.
2. Deposit some money with `/bank deposit 5k`. Amounts accept `1.5k`, `2m`, `1b`, `all` and `half`.
3. Type `/bank interest` to see your rates, what is earning interest right now, and the next payout.
4. Keep playing. Interest is added to your bank balance every hour you play (by default), and you get a message and a sound each time.
5. When you can afford it, type `/bank tiers` to see the next tier, then `/bank upgrade` to buy it.
:::

> [!TIP] Deposit early, not just before a payout
> Interest is paid on the *lowest* balance you held since the last payout. Money you deposit right before a payout starts earning at the one after. See [How interest works](interest.md).

## Where to go next

:::contents
- [How interest works](interest.md) :: Online and offline interest, AFK, caps and examples.
- [Tiers](tiers.md) :: What each tier holds and pays, and how to get one.
- [Commands and permissions](commands.md) :: Every command for players and staff.
- [Menus](menus.md) :: How the chest menus work and how staff edit them.
- [Alt-account limit](alt-limit.md) :: Why a bank can be locked.
- [Placeholders](placeholders.md) :: Bank values for scoreboards and tab lists.
- [FAQ and troubleshooting](faq.md) :: Fixes for the problems people hit most.
:::

## Try it yourself

Run these on a test server to confirm dkBank works as described. Items marked *staff* need operator rights.

:::steps
1. Run `/bank`. A chest menu opens with your balance, tier and payout countdown.
2. Run `/bank deposit 1k`. Your wallet (`/bal`) goes down by 1,000 and your bank goes up by 1,000.
3. Run `/bank withdraw half`. Half of your bank balance returns to your wallet.
4. Run `/bank interest`. It lists your online and offline rate, what earns interest and the next payout.
5. Run `/bank history`. The deposit and withdrawal appear as lines.
6. Run `/bank pay` with no arguments. A menu asks who to pay and how much.
7. Run `/bank top`. The leaderboard shows the richest banks (it refreshes every few minutes).
8. *Staff:* run `/bank admin give <player> 100`, then `/bank admin history <player>`. The entry shows in their history.
9. *Staff:* set `interest.online.period` to `1m` in config.yml, run `/bank admin reload`, play for a minute and watch for the payout message.
:::

## For server owners

Install it, then tune it: [Installation](installation.md), [Settings](config.md), [Tiers](tiers.md) and [Menus](menus.md). Plugin authors can read [For developers](developers.md). Recent changes are in the [Changelog](changelog.md).
