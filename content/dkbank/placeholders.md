---
title: Placeholders
description: The PlaceholderAPI values dkBank provides for scoreboards, tab lists and other plugins.
audience: staff
order: 6
---

dkBank adds placeholders to PlaceholderAPI. Everything comes from memory, never the database, so scoreboards and tab lists can refresh as often as they like, from any thread. Offline players only have a balance if they're on the leaderboard.

Test one with `/papi parse me %dkbank_balance%`.

| Placeholder | Example | What it shows |
|---|---|---|
| `%dkbank_balance%` | `$12,500.00` | Bank balance, formatted like the rest of dkBank. |
| `%dkbank_balance_short%` | `$12.5K` | Bank balance in short form. |
| `%dkbank_balance_full%` | `$12,500.00` | Bank balance, always in full. |
| `%dkbank_balance_raw%` | `12500.00` | A plain number, for other plugins' maths. |
| `%dkbank_max_balance%` | `$1,000,000.00` | The most the tier can hold. |
| `%dkbank_room%` | `$987,500.00` | Space left before the maximum. |
| `%dkbank_tier%` | Silver | The tier name, coloured. Add `_plain` for no colour or `_id` for the name used in `tiers.yml`. |
| `%dkbank_next_tier%` | Gold | The next tier. Empty at the top. |
| `%dkbank_next_tier_cost%` | `$150,000.00` | The price of the next tier. Empty at the top. |
| `%dkbank_online_rate%` | `1` | Online interest, in percent. |
| `%dkbank_offline_rate%` | `1` | Offline interest, in percent. |
| `%dkbank_cap%` | `$100,000.00` | The interest cap. |
| `%dkbank_next_payout%` | `35m` | Playtime until the next payout. Add `_seconds` for a number. |
| `%dkbank_locked%` | `false` | Whether the alt-account limit locks the bank. |
| `%dkbank_rank%` | `7` | Leaderboard place, or `-` if not on it. |
| `%dkbank_top_name_<n>%` | `%dkbank_top_name_1%` | The name at leaderboard place n, or `-` if empty. |
| `%dkbank_top_balance_<n>%` | `$5,200,000.00` | The balance at place n. Use `%dkbank_top_balance_short_<n>%` for short form. |
| `%dkbank_total%` | `$84,100,000.00` | All banks together. Add `_short` for short form. |
| `%dkbank_accounts%` | `1520` | The number of accounts. |
