---
title: Alerts and audit tuning
description: The thresholds behind every alert, the freeze lists and the config-audit checks.
audience: staff
order: 8
visibility: private
---

This page lists exactly where each alert trips and what the audit treats as a problem. It is **left out of the published wiki**, because anyone who knows the limits can stay just under them. Build the wiki with `WIKI_PRIVATE=1` (or run `npm run dev`) to read it.

Change values in `plugins/dkLedger/config.yml`, then run `/ledger reload`. Each alert has a `warning` level and a `critical` level, and a lower `sink-ratio` is worse, not better.

## Every threshold

{{config:dkledger:alerts,freeze,scan,profiles,checks}}
