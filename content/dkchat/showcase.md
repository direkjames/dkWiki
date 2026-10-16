---
title: Showing items
description: Show your held item, inventory or ender chest in chat with [item], [inv] and [echest], and how dupes and spam are prevented.
audience: players, staff
order: 3
---

Type a tag in a chat message and it turns into something others can look at.

| Tag | Shows | Permission |
|---|---|---|
| `[i]`, `[item]` | The item in your hand. Hover it to see the full item. | `dkchat.showcase.item` |
| `[inv]`, `[inventory]` | Your inventory. Click it to open a preview. | `dkchat.showcase.inventory` |
| `[echest]`, `[ec]`, `[enderchest]` | Your ender chest. Click it to open a preview. | `dkchat.showcase.enderchest` |

Everyone has these by default, along with `dkchat.showcase.view` to open the previews. Each tag is shown once per message, and previews can be opened for 5 minutes by default after the message was sent.

## Cooldowns

Each tag has a cooldown, which is saved across relogs. A message on cooldown is blocked. `dkchat.showcase.bypasscooldown` (operators) skips them.

## How it is protected

- **Anti-dupe.** Inventories are copied the moment the message is sent. Previews open in a screen where every click and drag is cancelled, and every copied item is marked. If one ever appears outside a preview it is deleted and logged. Previews are closed when the plugin shuts down.
- **Anti-spam.** Cooldowns, and each tag shown once per message.
- **Anti-crash.** Oversized items, such as shulkers full of books, have their heavy data removed from the chat hover. The real item is untouched.
- **Bounded memory.** At most 500 previews are kept, oldest dropped first.

The tags, cooldowns, formats and expiry are all in the `showcase` section of `config.yml`.
