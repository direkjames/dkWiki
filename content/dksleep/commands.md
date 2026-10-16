---
title: Commands and permissions
description: The /sleep command for players, the /dksleep admin commands, and every dkSleep permission.
audience: players, staff
order: 2
---

## Players

| Command | Permission | What it does |
|---|---|---|
| `/sleep` | `dksleep.use` (everyone) | Starts a vote. If one is running, votes YES. |
| `/sleep yes`, `/sleep no` | `dksleep.use` | Votes. |

## Staff

| Command | Permission | What it does |
|---|---|---|
| `/dksleep reload` | `dksleep.admin` (operators) | Reloads the config and messages. This cancels running votes. |
| `/dksleep forceskip [world]` | `dksleep.admin` | Skips the night now. |
| `/dksleep cancel [world]` | `dksleep.admin` | Cancels the running vote. |
| `/dksleep status [world]` | `dksleep.admin` | Shows the vote state. |

`dksleep.bypass` (nobody by default) leaves a player out of votes.

## Command details

{{commands:dksleep}}

## Every permission

{{permissions:dksleep}}
