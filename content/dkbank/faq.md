---
title: FAQ and troubleshooting
description: Answers to the questions players and staff ask most about dkBank, with a link for each fix.
audience: players, staff
order: 9
---

## Players

### Why am I not getting interest?

Check these in order:

- Is your bank balance above zero, and has a full period passed? `/bank interest` shows your progress.
- Money deposited during a cycle starts earning at the next payout. This is the lowest-balance rule. See [How interest works](interest.md).
- Is your bank locked by the alt-account limit? See [Alt-account limit](alt-limit.md).
- Is your tier's `cap` or `online-rate` set to 0? `/bank tiers` shows it.

### Why does AFK time pay less?

AFK time earns the offline rate instead of the online one, so AFK farms earn no more than logging off. See [How interest works](interest.md#afk-players).

### Can I lose money if the server crashes?

No. Every change is one database transaction with its history line, so it either fully happens or not at all. dkBank was crash-tested by killing it repeatedly in the middle of transactions, with every cent accounted for.

## Staff

### The bank says "no economy plugin was found"

Install Vault (or VaultUnlocked) and an economy plugin such as EssentialsX. The console says which one is missing at startup.

### dkBank didn't start and says a file "has a mistake"

This is a YAML error, usually a tab instead of spaces or a missing quote. The console names the file and line, and [yamlchecker.com](https://yamlchecker.com) helps. dkBank refuses to start rather than use wrong settings, and it never overwrites your file.

### A setting doesn't do anything

Check the console for "Unknown setting ... (a typo?)", then run `/bank admin reload`.

### Everyone is locked by the alt limit

Your proxy isn't forwarding IP addresses. Turn on IP forwarding (Velocity `player-info-forwarding-mode`, BungeeCord `ip_forward`), or set `alt-limit.enabled: false`.

### I changed `tiers.yml` or a menu and nothing changed

Run `/bank admin reload`. If a file has a mistake, the previous version is kept and the console says why.

### My menu is missing a new button after updating

Menu files are never changed after they're created, so your edits stay safe. Delete the file and reload to get the new default.

### Where do I get support?

Run `/bank admin info` and include its output, your server version and the console error (if any) in your report.
