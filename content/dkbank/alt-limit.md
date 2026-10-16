---
title: Alt-account limit
description: Why a bank can be locked, how many accounts per connection can use it, and how staff allow an account.
audience: players, staff
order: 4
---

Some players make extra accounts to farm interest or starting money. dkBank only lets the first few accounts that play from one internet connection use the bank. Accounts after that are **locked**.

## If your bank is locked

A locked bank can't take deposits, transfers or upgrades, and it earns no interest. You are told why when you join, and the main menu shows a "Bank locked" item. If the server allows it, you can still withdraw money you already had.

If you share a connection with family or a roommate and you both play, ask a staff member. They can allow your account, and an allowed account doesn't take up one of the places.

## How it works

- Only the first `max-accounts` accounts (3 by default) on a connection can use the bank.
- Only logins in the last 30 days (by default) count, so someone who moved away stops counting.
- Staff with `dkbank.alts.bypass` (operators by default) are never locked.
- With `locked-can-withdraw: true` (the default), locked accounts can still take out money they already had.

> [!NOTE] Privacy
> Addresses are stored as salted one-way hashes, never as the address itself, and they are forgotten after 30 days (by default).

## For staff

:::steps
1. Run `/bank admin alts <player>` to list the accounts on that player's latest connection and see which are locked.
2. Run `/bank admin alts <player> allow` to let that account use the bank anyway.
3. Run `/bank admin alts <player> reset` to undo it.
:::

> [!STAFF] Proxies and Bedrock
> Behind Velocity or BungeeCord, IP forwarding must be on, otherwise every player looks like the proxy's address. Bedrock players need Floodgate to pass their real address. Local addresses such as 127.0.0.1 and 192.168.x.x are never locked, and the console warns when players join from one. If everyone is locked, turn on IP forwarding or set `alt-limit.enabled: false`.
