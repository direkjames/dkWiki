---
title: dkSleep
description: Skip the night by getting into a bed or typing /sleep, then vote with a click.
audience: players, staff
order: 0
---

dkSleep lets a server skip the night without everybody having to lie in bed at once. Get into a bed, or type `/sleep`, and a vote starts. If enough players say YES, the clock jumps to morning.

## How to skip the night

:::steps
1. Get into a bed, or type `/sleep`. A vote starts and you vote YES automatically.
2. Everyone else sees a message with clickable **[YES]** and **[NO]** buttons, and a boss bar counting down.
3. Click a button, or type `/sleep yes` or `/sleep no`. You can change your mind while the vote runs.
4. If enough players voted and YES wins, the night is skipped and rain and thunder clear.
:::

Players who voted YES get a short Regeneration boost as a thank-you.

> [!NOTE] Some players don't count
> Players who are AFK, in spectator or creative mode, vanished, or operators can't vote and don't count towards the quorum. A player marked with `dksleep.bypass` is always left out. See [How votes work](votes.md).

## Where to go next

:::contents
- [How votes work](votes.md) :: Quorum, majority, who is left out, and what stops abuse.
- [Commands and permissions](commands.md) :: `/sleep` for players and `/dksleep` for staff.
- [Settings](config.md) :: Modes, vote rules, per-world overrides and the boss bar.
:::

## Try it yourself

Operators don't count in votes by default, so test with normal accounts. Items marked *staff* need `dksleep.admin`.

:::steps
1. At night, run `/sleep`. A vote starts, a boss bar appears and the message has [YES] and [NO] buttons.
2. With a second account, click **[YES]**. The vote updates in chat.
3. When enough players have voted YES, the night is skipped and the weather clears.
4. *Staff:* run `/dksleep status` during a vote to see its state.
5. *Staff:* run `/dksleep cancel` to end a running vote, or `/dksleep forceskip` to skip the night now.
:::
