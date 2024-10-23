import { type Knex, knex as setupKnex } from 'knex'
import { env } from './env'

if (!env) throw new Error('env is not defined')

export const configDatabase: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: env.DATABASE_URL,
  },
}

export const knex = setupKnex(configDatabase)
