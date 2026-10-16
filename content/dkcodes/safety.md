---
title: Safety
description: How dkCodes stops code guessing, double claims, alt accounts and lost rewards, without lagging the server.
audience: staff
order: 4
---

## Against guessing

- A cooldown between every `/redeem` attempt, right or wrong.
- A lockout after too many wrong codes in a row, and staff with `dkcodes.alerts` are told.
- A full audit log of every redemption, lockout, reset and admin change (`/dkcodes log`, `/dkcodes history`).

## Against double claims and lost rewards

- `/redeem` checks run in memory on the main thread. There is no file or database access while a player waits.
- One database transaction checks **all** limits and records the use **before** any reward is given. A database error means "nothing given", never "free rewards".
- Mailbox items are deleted from the database first and only then given, so they can't be claimed twice.
- IP addresses are stored only as salted hashes, never as plain text.

## Against lag

All database work runs on dkCore's database thread, `codes.yml` saves on a background thread, and Discord posts go out on their own thread.

:::private
The lockout numbers and the other anti-abuse settings are on [Anti-abuse tuning](tuning.md), which is left out of the published wiki.
:::
