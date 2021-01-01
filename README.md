# monster-game-backend

Monster Game Backend

## Create db migrations

Example:

```sh
yarn sequelize model:generate --name User --attributes username:string,password:string,oauth_provider:string,oauth_uid:string
```

## Create db seeds

Example:

```sh
yarn sequelize seed:generate --name seed-users
```

## Run db migrations

Example:

```sh
yarn db:migrate
```
