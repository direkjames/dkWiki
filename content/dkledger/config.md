---
title: Settings
description: The dkLedger settings staff change most: time zone, recording, tracking, the login summary, the web dashboard and the weekly report.
audience: staff
order: 6
---

dkLedger's settings live in `plugins/dkLedger/config.yml`. Run `/ledger reload` after a change. Every number has a safe default, so deleting a line puts it back to the default (dkCore adds it back).

Alert thresholds, the freeze lists and the audit checks are tuned in separate sections that aren't listed on this public page.

## Every setting

{{config:dkledger:general,ledger,tracking,login-summary,web,weekly-report}}
