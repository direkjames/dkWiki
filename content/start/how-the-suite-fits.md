---
title: How the suite fits together
description: Which plugin does what, and how dkCore, dkBank, dkAFK and the rest connect to each other.
audience: players, staff
order: 1
---

The dk suite is a set of plugins written for our server. They share one foundation, dkCore, so they look the same, save their data in one place and understand each other.

{{component:suite-stack}}

## Three links worth knowing

- **Money has two places.** Your *wallet* is the balance `/bal` shows (EssentialsX, through Vault). Your *bank* belongs to [dkBank](../dkbank/index.md). They are separate on purpose: deposits and withdrawals move money between them.
- **AFK time pays less.** dkAFK tells dkCore who is AFK. dkCore passes that to dkBank, which pays AFK players the offline interest rate instead of the online one. Standing still in an AFK farm earns no more than logging off.
- **dkLedger watches all of it.** It records every wallet and bank change along with the plugin that caused it, so staff can see where money comes from and where it goes.

## What needs what

| Plugin | Needs dkCore? | Notes |
|---|---|---|
| dkCore | n/a | The foundation. Installed first. |
| dkBank | No | Works alone, so it can run on any server. When dkCore is installed it links to dkBank on its own. |
| dkLedger | Yes | Also reads Vault, EssentialsX and dkBank to record money. |
| dkStock | Yes | Built on dkCore like the rest of the suite. |

> [!TIP] Why dkBank doesn't depend on dkCore
> dkCore lists dkBank as an optional plugin to load first. If dkBank listed dkCore back, the two would wait for each other and neither would start. So the link only goes one way.

## Which page should I read?

:::contents
- [I want to use the bank](../dkbank/index.md) :: Players start with the dkBank overview.
- [I manage the economy](../dkledger/index.md) :: Staff start with the dkLedger overview.
- [I'm writing a plugin](../dkcore/developers.md) :: Developers start with the dkCore API.
- [I don't know a word](glossary.md) :: The glossary explains the terms used across the wiki.
:::
