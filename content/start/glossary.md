---
title: Glossary
description: Plain-language meanings for the words used across the dk suite pages.
audience: players, staff, developers
order: 2
---

Terms are in alphabetical order.

## A to F

- **AFK** means away from keyboard. dkBank treats a player as AFK after 5 minutes (by default) without moving, looking around, chatting or using commands, or when an AFK plugin such as dkAFK says so.
- **Alert.** A warning dkLedger shows staff when something about the economy looks wrong, for example money being created faster than usual. See [Alerts](../dkledger/alerts.md).
- **Alt account.** An extra account played from the same internet connection. dkBank only lets the first few (3 by default) use the bank. See [Alt-account limit](../dkbank/alt-limit.md).
- **Bank.** A second balance, kept by dkBank, that earns interest. It is separate from your wallet.
- **Bank tier.** A level of bank account: Basic, Silver, Gold and so on. Each tier has its own maximum balance and interest cap. See [Tiers](../dkbank/tiers.md).
- **Cap (interest cap).** Only the part of your balance up to the cap earns interest. A tier with a 100,000 cap pays interest on 100,000 even if you hold more.
- **Compact amounts.** Bank commands accept `1.5k`, `2m`, `1b`, `all` and `half` instead of full numbers.
- **dkCore.** The shared foundation of every dk plugin. See [dkCore](../dkcore/index.md).
- **Freeze.** A dkLedger staff action that stops a player sending money to other players. They can still earn, buy and play.

## I to M

- **Interest.** Money the bank adds to your balance. dkBank pays two kinds: *online* interest for time played and *offline* interest for time away. See [How interest works](../dkbank/interest.md).
- **Ledger.** The record dkLedger keeps of every money change, wallet and bank, with the source that caused it.
- **Locked bank.** A bank that can't take deposits, transfers, upgrades or earn interest because of the alt-account limit.
- **Lowest-balance rule.** dkBank pays interest on the lowest balance you held since the last payout. Money deposited just before a payout starts earning at the next one.
- **Money supply.** All the money in the economy: every wallet plus every bank. dkLedger counts it every hour and watches how fast it grows.

## O to W

- **Offline interest.** Paid when you log in, for the time you were away, compounding, up to 7 days by default.
- **Online interest.** Paid for time you actually play, using the online rate of your tier.
- **Payout.** The moment interest is added to your bank balance.
- **Placeholder.** Text like `%dkbank_balance%` that PlaceholderAPI swaps for a live value on scoreboards and tab lists.
- **Sink.** Anything that removes money from the economy, such as fees or the price of a tier upgrade. A healthy economy needs sinks to balance money that plugins create.
- **Source.** What caused a money change: a plugin name, `staff:<name>`, or `console`. dkLedger groups money by source.
- **Vault.** A plugin that lets other plugins use one shared economy. Our wallet balance comes through it.
- **Wallet.** The money you carry, shown by `/bal`. It is separate from your bank.
