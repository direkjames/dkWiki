---
title: Changelog
description: What changed in each dkBank version.
audience: staff, developers
order: 11
---

## 1.1.0: dk suite and startup banner

- **Startup banner.** The console shows the dkBank logo, version, author, server, Java, storage, tiers, placeholders and startup time. Once the server finishes loading it also shows the economy, how AFK players are detected and the dkCore link, with a red banner and the fix when something is missing. Set `startup-banner: false` to go back to plain log lines.
- **dk suite.** dkCore links to dkBank when both are installed. dk plugins can use the bank through dkCore, and dkAFK tells dkBank who is AFK. dkBank still works on its own without dkCore.
- **API.** A new `AfkSource` service lets any plugin tell dkBank who is AFK, with no placeholders. `afk-detection.use-afk-plugins` (default `true`) turns this on or off.
- Author name set to direk james.

## 1.0.0: first release

- **Bank.** Deposit, withdraw and send money between banks. Accepts `1.5k`, `2m`, `all` and `half`. Fees, limits and full history. Staff can give, take, set and view anyone's history.
- **Interest.** Online interest per hour played and compounding offline interest for time away, with separate rates. AFK players earn the offline rate. Interest is paid on the lowest balance since the last payout, with caps, a maximum per payout (scaled by time) and a maximum balance. Payout messages and sounds.
- **Tiers.** Buyable bank tiers with their own rates, interest cap and maximum balance. Tiers from rank permissions, upgrade confirmation and decimal rates.
- **Menus.** Main, deposit, withdraw, send money, tiers, upgrade confirmation, history and leaderboard. Every menu is editable in `menus/*.yml`, with custom heads from minecraft-heads.com, a live payout countdown, an animated balance and typed amounts hidden from chat.
- **Alt-account limit.** Only the first accounts per connection can use the bank. Addresses are stored as salted hashes, and staff can allow accounts.
- **Integrations.** 24 PlaceholderAPI placeholders served from memory, `/bank top`, an economy report for staff and short amounts ($1.2M).
- **Developer API.** Accounts, give, take, transfer, tiers, leaderboard and cancellable events.
- **Safety.** Every change is one database transaction, and crash-tested. SQLite or MySQL/MariaDB with automatic upgrades. A config file with a mistake is never overwritten, and typos are warned about.
- **Also new.** An update checker for staff, optional anonymous bStats, `/bank admin info` for support, and full documentation.

## Before 1.0.0

- 0.9.0: hardening with crash and load tests, two code reviews and heartbeat batching.
- 0.6.0: the Developer API and events. 0.5.0: placeholders, leaderboard and the economy report.
- 0.4.0: menus, the alt-account limit and custom heads. 0.3.x: tiers. 0.2.0: interest. 0.1.0: the core bank.
