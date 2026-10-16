---
title: FAQ and troubleshooting
description: Short answers to the most common dkStock problems, from missing permissions to prices that move by themselves.
audience: players, staff
order: 11
---

## The market does not work

**"No economy found" in the console.** Install Vault and an economy plugin. Without an economy, nobody can buy or sell. dkStock has no money of its own and pays players into their wallet.

**`/stock` says I don't have permission.** Players need `dkstock.use` (everyone has it by default). Selling needs `dkstock.sell.gui`, `dkstock.sell.hand` or `dkstock.sell.all`, and buying needs `dkstock.buy`. Check your permissions plugin.

**One item is greyed out.** Its permission, `dkstock.ore.<item>` (for example `dkstock.ore.diamond`), is denied for that player. Everyone has them by default, so someone has set it to false.

**A player can't buy or sell any more today.** That is a daily limit. `/stock limits` shows what is left and when it resets. Operators and players with `dkstock.limit.bypass` are never limited, so test with a normal account.

**I can't sell my item.** Only the plain item can be sold. Renamed, enchanted or otherwise modified items are refused. Selling also stops when the market's stock of that item is full, and buying stops when it is empty.

**The trade failed with "transaction failed".** The economy plugin refused the payment, for example because of a money cap. Nothing was taken.

**Players say they can't trade.** If they are AFK, dkStock blocks trading (`afk.block-trading`). An item can also be frozen. `/stock freeze` with no item lists them.

**Config problems.** Run `/stock reload`. It lists every problem it found. If the config is invalid, dkStock keeps the previous working setup.

## Prices and stock look wrong

**An item shows a higher price than its base price.** It may be today's hot item (`/stock hot`). Both its buy and sell price are higher until the daily reset.

**Prices move back by themselves.** That is price drift. Prices drift toward `base-price`, and stock regenerates toward `start-stock`, even while the server is off. Turn it off in `config.yml`, or per item with `drift: false` and `regen: false`.

**A price I set didn't change after trading.** A price set with `/stock setprice` is held until the next trade on that item. Crashes and surges fade.

**Players are getting rich.** Run `/stock audit`, then `/stock economy 7d` to see how much money the market created.

## Backups and updating

**How do I back up?** Stop the server, then copy dkCore's database file (and its `-wal` and `-shm` files if they exist). Copying while it is running can give you a damaged copy. Restore by putting the files back while the server is stopped.

**How do I update?** Stop the server, copy `plugins/dkStock/` somewhere safe, replace the jar and start. The database upgrades itself on start and can't be moved back to an older version without your backup. Your `items.yml`, `gui.yml`, `categories.yml` and `messages.yml` are never overwritten, so new settings use built-in defaults until you add them.

**Move to another server.** Copy the whole `plugins/dkStock/` folder with the server stopped.

**Is it crash safe?** Every change is written as it happens, in the background. If the server crashes, at most the last few milliseconds are lost, and dkStock catches up price drift for the time the server was off.

## Discord, events and placeholders

**The Discord webhook does nothing.** Set `enabled: true` and a real webhook address in `discord.yml`, run `/stock reload`, then `/stock discord test`. The command says what is wrong, for example a deleted webhook. Big trades are only posted if they are at least `big-trades.min-total`.

**A scheduled event never runs.** Check `enabled: true` at the top of `events.yml`, that times are in quotes (`"18:00"`), and that `timezone` is right. `/stock events` shows each event's next run time. An event due while the server was off is skipped, and an event with a `chance` below 100 only happens that often.

**Placeholders show up as text.** Install PlaceholderAPI. Leaderboard placeholders refresh every 30 seconds by default. See [Leaderboards and placeholders](leaderboards.md).

## What to put in a bug report

- The dkStock and dkCore versions (`/version dkStock`), your server version (`/version`) and your economy plugin.
- What you did, what you expected and what happened.
- Any error from `logs/latest.log`, in full, as text.
- The relevant part of your config files, if it is about settings. Remove your Discord webhook address first.
