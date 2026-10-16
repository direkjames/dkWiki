---
title: Settings
description: Every dkBank setting in config.yml with its default, plus how fees, durations and the AFK options behave.
audience: staff
order: 7
---

dkBank's settings are in `plugins/dkBank/config.yml`. Messages are in `messages.yml`, tiers in [tiers.yml](tiers.md) and the chest menus in [menus](menus.md). Run `/bank admin reload` after a change. Storage settings and command aliases need a restart instead.

> [!NOTE] Mistakes are caught for you
> Durations accept `30s`, `15m`, `1h`, `7d` or `1d 12h`. A wrong value is replaced with a safe default and named in the console, and unknown settings (usually typos) are reported too. If the whole file has a YAML mistake, dkBank refuses to start rather than run with the wrong settings, and it never overwrites your file.

## How fees work

- **Withdrawal fee** (`fees.withdraw-percent`) is taken out of what you receive. At 2%, withdrawing 100 gives you 98.
- **Transfer fee** (`fees.transfer-percent`) is paid by the sender on top. At 2%, sending 100 costs 102.
- `limits.max-per-transaction` also limits `all` and `half`: they are reduced to it.
- The maximum balance is set per tier in `tiers.yml`, not here.

## Showing money the way you like

`currency.symbol`, `symbol-position`, `thousands-separator` and `decimal-separator` change how amounts look, so `1.234,56` is possible. `short-from` shows amounts at or above a size in short form everywhere ($1.2M), and `use-economy-format: true` uses your economy plugin's formatting instead.

## Dates and time zone

`history.date-format` takes a [Java date pattern](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html). Set `history.timezone` to a name such as `Asia/Manila`, or leave it empty to use the server's.

## Every setting

This part is generated from dkBank's own `config.yml`, so nothing is missing.

{{config:dkbank}}
