---
title: Web dashboard
description: Set up dkLedger's read-only website with charts for the money supply, sources, top earners and players.
audience: staff
order: 5
---

dkLedger can run a small web server that shows the economy as charts: money supply, sources, top earners, alerts, items, reasons and a player lookup. It uses Java's own web server, so there is nothing extra to install.

Nothing on it can change the economy. Actions such as freezing a player stay in game and in the Discord bot.

## Set it up

:::steps
1. **Open a port.** On Pterodactyl, give the server an extra allocation (Admin, then Nodes, then Allocation, then Servers, then Build Configuration). If the VPS has a firewall, open the port, for example `ufw allow 25580/tcp`.
2. **Edit `config.yml`.** Set `web.enabled: true`, set `web.port` to the allocation's port, and set `web.public-url` to the address people will open, such as `http://ledger.example.com:25580`. Then run `/ledger reload`.
3. **Sign in.** Run `/ledger web` in game. It gives a button that opens the dashboard.
:::

The sign-in link works once and lasts 5 minutes. After that you stay signed in for `web.session-hours` (12 by default). `/ledger web logout` signs everyone out, and losing `dkledger.admin` ends a person's sessions.

## Use HTTPS

Without HTTPS the dashboard works, but the traffic isn't encrypted, so sign out when you're done. For a free, proper setup, put the dashboard behind a Cloudflare Tunnel or Caddy so it is served at `https://ledger.example.com`, then:

- set `web.public-url` to that address,
- set `web.trust-proxy: true`, and
- the sign-in cookie becomes HTTPS-only.

## How it is protected

- Sign-in keys are one-time and 256-bit, and only their hashes are kept.
- Cookies are HttpOnly.
- Failed sign-ins are limited per address.
- A strict Content-Security-Policy blocks outside scripts.
- Pages are never cached.
- Sessions live in memory, so a restart signs everyone out.
