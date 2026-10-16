---
title: Settings
description: The dkCodes settings for dates, the referral rules, delivery after joining and the Discord webhook.
audience: staff
order: 6
---

dkCodes' settings live in `plugins/dkCodes/config.yml`. Codes are in `codes.yml` and messages in `messages.yml`. Usage data and the audit log are stored in dkCore's database, in tables that start with `dkcodes_`. Run `/dkcodes reload` after a change.

The settings that protect `/redeem` from guessing are tuned in a section that isn't listed on this public page.

## Every setting

{{config:dkcodes:general,referral,discord}}
