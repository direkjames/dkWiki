---
title: Settings
description: Every dkCore setting, from choosing SQLite or MySQL to the startup banner.
audience: staff
order: 2
---

dkCore's settings live in `plugins/dkCore/config.yml`. Most dk plugins store their data in the database configured here, so this is the file to look at first when you move the suite to MySQL.

> [!NOTE] Updates keep your edits
> When dkCore updates and adds a setting, the new line is added to your file with its default. Settings you already changed stay as you set them.

## Choosing a database

- **SQLite** is the default. It needs no setup and stores everything in one file, `dk-suite.db`, inside the `plugins/dkCore/` folder.
- **MySQL** is for when several servers should share the same data, or when you want to manage the database yourself.

To switch to MySQL, set `database.type` and fill in the connection:

```yaml title="plugins/dkCore/config.yml"
database:
  type: mysql
  mysql:
    host: localhost
    port: 3306
    database: dksuite
    username: root
    password: 'your password'
    pool-size: 8
```

Create the database first, then restart the server. Switching the type does not copy existing data across.

> [!WARNING] The first start needs internet
> On first start the server downloads the database drivers (HikariCP, SQLite and MySQL). A server with no outside access can't start dkCore the first time.

{{config:dkcore}}
