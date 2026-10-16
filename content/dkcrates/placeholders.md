---
title: Placeholders
description: dkCrates' PlaceholderAPI values for key counts, opened totals, reward stock and wins.
audience: staff
order: 4
---

dkCrates registers these placeholders when PlaceholderAPI is installed. dkCrates runs fine without it.

| Placeholder | Value |
|---|---|
| `%dkcrates_keys_<crate>%` | The player's keys for one crate. |
| `%dkcrates_keys_total%` | The player's keys for all crates. |
| `%dkcrates_opened_<crate>%` | How many times the player opened that crate. |
| `%dkcrates_opened_total%` | How many times the player opened any crate. |
| `%dkcrates_stock_<crate>_<reward>%` | Stock left of a limited reward. |
| `%dkcrates_wins_<crate>_<reward>%` | The player's wins of a limited reward. |
| `%dkcrates_crate_<crate>%` | The crate's display name. |

Replace `<crate>` and `<reward>` with the ids used in the crate file.
