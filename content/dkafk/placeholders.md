---
title: Placeholders and TAB
description: dkAFK's PlaceholderAPI values and how to show the AFK tag in the tab list.
audience: staff
order: 3
---

dkAFK needs PlaceholderAPI, and registers these placeholders:

| Placeholder | Value |
|---|---|
| `%dkafk_tag%` | The `afk-tag` while AFK, otherwise empty. |
| `%dkafk_afk%` | `true` or `false`. |
| `%dkafk_idle%` | Time since the last real activity, for example `4m 30s`. |
| `%dkafk_idle_seconds%` | The same, in seconds. |
| `%dkafk_afk_time%` | The idle time while AFK, otherwise empty. |

The old `%antiafk_...%` names also still work.

## TAB setup

Add the tag to the suffix in TAB's `groups.yml` (or wherever you set suffixes):

```yaml
_DEFAULT_:
  tabsuffix: "%dkafk_tag%"
```

If you already use a suffix, put the tag next to it, for example `"%luckperms-suffix%%dkafk_tag%"`. TAB refreshes placeholders every 500 ms by default, so the tag appears almost instantly.

`placeholder-format: legacy` gives section-sign colour codes, which TAB and most plugins read. Use `minimessage` for plugins that read MiniMessage.
