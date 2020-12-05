# monster-game-backend

Monster Game Backend

## Create db migrations

Example:

```sh
node_modules/.bin/sequelize model:generate --name User --attributes username:string,password:string,oauth_provider:string,oauth_uid:string
```

## Create db seeds

Example:

```sh
node_modules/.bin/sequelize seed:generate --name seed-users
```
