---
title: Switching from ExcellentCrates
description: What to do first, what keeps working, and what does not carry over when moving to dkCrates.
audience: staff
order: 5
---

dkCrates and ExcellentCrates both use `/crate` and `/crates`, so **remove ExcellentCrates first**.

- `crate key give <player> <crate> <amount>` works the same way, so the vote plugin and PinataParty need no changes.
- The crate id is the file name: `vote.yml` becomes `vote`.
- **Keys players still have in ExcellentCrates are not moved over.** Give them back with `/crates key give` before you switch.
