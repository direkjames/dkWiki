---
title: How votes work
description: The two modes, how quorum and majority are decided, who is left out, and the protections against abuse.
audience: players, staff
order: 1
---

## Two modes

The mode is set for each world.

- **`VOTE`** (the default): players vote to skip the night.
- **`ONE_PLAYER`**: one player sleeping skips the night, after a short delay in bed (5 seconds by default).

Only Overworld-type worlds are handled. The Nether and the End have no night, and the world blacklist lets staff leave any world to vanilla's own sleep rules.

## Deciding a vote

- **Quorum:** a share of the eligible players must vote before the result counts (50% by default). With 20 eligible players, 10 votes are needed.
- **Majority:** more than a share of the votes must be YES (50% by default, a simple majority). A tie fails.
- **Starting a vote:** getting into a bed (`start-with-bed`) or typing `/sleep` (`start-with-command`). Leaving the bed never cancels a vote.
- **Ending early:** once the quorum is reached and one side has won, or every eligible player has voted, the vote ends right away. Otherwise it runs for 30 seconds by default.
- **Starter and bed votes:** the player who starts the vote votes YES, and getting into a bed during a vote counts as YES.
- **No voters:** if nobody is able to vote, because everyone is AFK, creative or similar, the night is skipped right away.

## Who is left out

Excluded players can't vote and don't count towards the quorum. By default that is players who are:

- AFK (this needs [dkAFK](../dkafk/index.md)),
- in spectator or creative mode,
- operators,
- vanished (vanish plugins that use the standard `vanished` metadata),
- NPCs, or holding the `dksleep.bypass` permission.

Each rule can be turned off in the `exclude` section.

## When the night is skipped

- The clock fast-forwards over a few seconds (3 by default). Only the clock moves and no extra game ticks are simulated, so it costs the server nothing.
- Rain and thunder clear. A thunderstorm during the day can be voted away too.
- The phantom timer resets for everyone online, or only for that world.
- Voters get a short Regeneration boost (the "well-rested" effect). In `ONE_PLAYER` mode the sleepers get it.

## Protections against abuse

- After a vote fails, no new vote can start in that world for a while (60 seconds by default).
- Changing your vote has a short cooldown (3 seconds by default), so nobody can spam chat.
- Bed messages are rate-limited.

## The sleeping gamerule

dkSleep sets vanilla's `playersSleepingPercentage` gamerule to 101 in the worlds it handles, so vanilla never skips the night on its own. It saves the original value in `data.yml` and puts it back when dkSleep is disabled, a world is blacklisted or a world unloads. Because it is saved to disk, a crash can't lose it.
