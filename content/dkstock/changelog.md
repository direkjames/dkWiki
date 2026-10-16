---
title: Changelog
description: What changed in each dkStock version.
audience: players, staff
order: 13
---

## 1.0.0

First release of dkStock, built on dkCore for Purpur 26.3 and Java 25.

- Market with live prices and stock, tax on sales, daily limits, price drift and stock regeneration.
- Category tabs and search in the market window.
- Daily hot item (resets at midnight Asia/Manila by default).
- Price alerts (`/stock alert`).
- AFK players can't trade (dkAFK, through dkCore).
- Item freezing (`/stock freeze`) and a freeze API for other plugins (API version 2).
- Prices are shown without the economy's colour codes, so they no longer turn black.
- Storage moved into dkCore's SQLite database (`dkstock_` tables).
- The command is `/stock`.
