---
title: Tiers
description: What each bank tier holds and pays by default, how to buy the next one, and how staff set up tiers.
audience: players, staff
order: 3
---

Tiers are levels of bank account. Everyone starts on the first tier, and a better tier raises how much your bank can hold and how much of your balance earns interest.

## Buying the next tier

Type `/bank tiers` to see every tier and `/bank upgrade` to buy the next one. The price comes out of your **bank** balance, so upgrades take money out of the economy. You are asked to confirm first.

A rank or donor perk can also give you a tier through a permission, such as `dkbank.tier.gold`. Your tier is the highest of the one you bought and any you have by permission.

## The default tiers

> [!NOTE] These are dkBank's defaults
> Our server may use different numbers. `/bank tiers` shows what is really set here.

| Tier | Upgrade cost | Holds up to | Interest paid on up to | Most earned per online hour |
|---|---|---|---|---|
| Basic | Free (everyone starts here) | 250,000 | 25,000 | 250 |
| Silver | 25,000 | 1,000,000 | 100,000 | 1,000 |
| Gold | 150,000 | 5,000,000 | 500,000 | 5,000 |
| Platinum | 1,000,000 | 25,000,000 | 2,500,000 | 25,000 |
| Diamond | 5,000,000 | 100,000,000 | 10,000,000 | 100,000 |
| Black | Rank only, can't be bought | No limit | 25,000,000 | 250,000 |

Every default tier pays 1% per online hour and 1% per offline day. "Most earned per online hour" is 1% of the interest cap, which is what a player with at least that much banked earns in one hour of play.

## For staff

Tiers live in `tiers.yml` and go from lowest to highest. The first tier is everyone's starting tier. Run `/bank admin reload` after editing.

```yaml title="tiers.yml"
tiers:
  silver:
    display-name: "<white>Silver</white>"   # MiniMessage
    icon: IRON_INGOT                        # or "head:<Value from minecraft-heads.com>"
    upgrade-cost: 25000
    buyable: true                           # false = only through a rank permission
    max-balance: 1000000                    # 0 = no limit
    interest:
      online-rate: 1                        # percent per online period; decimals work (0.5, 1.25)
      offline-rate: 1                       # percent per offline period
      cap: 100000                           # only this much earns interest; 0 = no cap (not recommended)
      max-per-payout: 0                     # 0 = no limit
```

### Tiers from ranks

The permission `dkbank.tier.<name>` gives that tier while the player has it. These permissions aren't given to operators automatically. When a player has a tier by permission, `/bank upgrade` offers the first buyable tier above it. Permission tiers aren't kept if the permission is removed, but bought tiers are.

### Renaming and removing

The section name (`silver`) is saved in the database. Renaming or removing it moves its players back to the first tier, and the console warns you, so change `display-name` instead. To set anyone's tier for free, use `/bank admin tier <player> <tier>`, and `default` puts them back on the first tier.
