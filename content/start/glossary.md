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
- **Alias.** A short command that runs a longer one, made by dkCommands. See [Aliases and rules](../dkcommands/rules.md).
- **Cooldown.** The wait before you can use a command again. dkCommands sets cooldowns on commands, and dkStock puts one on `sellall`.
- **Crate.** A chest you open with a key to win a reward. See [dkCrates](../dkcrates/index.md).
- **Drift.** In dkStock, prices slowly move back toward their base price after trades, and stock refills. See [How prices work](../dkstock/prices.md).
- **Fly time.** How long you can fly with dkFly. It counts down only while you are in the air. See [dkFly](../dkfly/index.md).

## I to M

- **Interest.** Money the bank adds to your balance. dkBank pays two kinds: *online* interest for time played and *offline* interest for time away. See [How interest works](../dkbank/interest.md).
- **Ledger.** The record dkLedger keeps of every money change, wallet and bank, with the source that caused it.
- **Locked bank.** A bank that can't take deposits, transfers, upgrades or earn interest because of the alt-account limit.
- **Lowest-balance rule.** dkBank pays interest on the lowest balance you held since the last payout. Money deposited just before a payout starts earning at the next one.
- **Money supply.** All the money in the economy: every wallet plus every bank. dkLedger counts it every hour and watches how fast it grows.
- **Hot item.** The one item dkStock pays more for, and charges more for, each day. See [How prices work](../dkstock/prices.md).
- **Key.** What you spend to open a crate. dkCrates keys are virtual: they are kept in your account.
- **Mystery code.** A dkCodes code that picks a reward at random from several pools. See [Making codes](../dkcodes/creating-codes.md).

## O to W

- **Offline interest.** Paid when you log in, for the time you were away, compounding, up to 7 days by default.
- **Online interest.** Paid for time you actually play, using the online rate of your tier.
- **Payout.** The moment interest is added to your bank balance.
- **Placeholder.** Text like `%dkbank_balance%` that PlaceholderAPI swaps for a live value on scoreboards and tab lists.
- **Sink.** Anything that removes money from the economy, such as fees or the price of a tier upgrade. A healthy economy needs sinks to balance money that plugins create.
- **Source.** What caused a money change: a plugin name, `staff:<name>`, or `console`. dkLedger groups money by source.
- **Vault.** A plugin that lets other plugins use one shared economy. Our wallet balance comes through it.
- **Wallet.** The money you carry, shown by `/bal`. It is separate from your bank.
- **Quorum.** In dkSleep, the share of eligible players who must vote before a vote counts. See [How votes work](../dksleep/votes.md).
- **Referral code.** A dkCodes code that belongs to a player. Whoever uses it gets a reward, and so does the owner.
- **Stock.** In dkStock, how many of an item the market holds right now. Buying lowers it and selling raises it.
- **Tax (selling tax).** The percent dkStock takes off a sale. It is why buying and selling the same item in a loop never makes money.
- **Warmup.** A short wait before a command runs, cancelled if you move or take damage. Set by dkCommands.
- **Webhook.** A Discord address a plugin can post messages to. dkStock, dkLedger and dkCodes can use one.
