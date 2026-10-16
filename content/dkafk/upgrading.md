---
title: Upgrading from DirekAntiAFK
description: Move from the old DirekAntiAFK plugin to dkAFK without losing your settings, commands or permissions.
audience: staff
order: 4
---

:::steps
1. Stop the server, delete `DirekAntiAFK-<version>.jar` from `plugins/` (keep its folder), and put in dkCore and the dkAFK jar. Don't run both jars at once.
2. On first start, dkAFK copies `plugins/DirekAntiAFK/` into `plugins/dkAFK/`, so your config carries over. Once you've checked it, you can delete the old folder.
3. Everything from DirekAntiAFK keeps working, so nothing else has to change on day one.
:::

| Old | New | Does the old name still work? |
|---|---|---|
| `/antiafk`, `/aafk` | `/dkafk` | Yes, as aliases |
| `antiafk.admin`, `antiafk.bypass` | `dkafk.admin`, `dkafk.bypass` | Yes, they grant the new ones |
| `%antiafk_...%` | `%dkafk_...%` | Yes, both are registered |
| Saved return spots and rejoin timers on players | Moved to dkAFK automatically when they join | n/a |
| Plugins with `depend: [DirekAntiAFK]` | n/a | Yes, dkAFK provides that name |

When it suits you, switch TAB and LuckPerms to the new names.
