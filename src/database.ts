import { knex as setupKnex, type Knex } from 'knex'

export const configDatabase:Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  }
}

export const knex = setupKnex(configDatabase)
