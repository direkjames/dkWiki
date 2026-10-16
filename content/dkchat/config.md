---
title: Settings
description: Every dkChat config.yml setting, and what each file in the plugin folder holds.
audience: staff
order: 7
---

| File | What it holds |
|---|---|
| `config.yml` | General on and off switches. This page. |
| `formats.yml` | Chat formats per rank, and the name hover lines. See [Chat formats](formats.md). |
| `messages.yml` | Every message the plugin sends. |
| `announcements.yml` | Timed announcements. See [Advertisements and announcements](ads-and-announcements.md). |

Run `/dchat reload` after editing. Setting `chat.enabled: false` makes dkChat leave public chat alone, so vanilla or another plugin formats it.

## Every setting

{{config:dkchat}}
