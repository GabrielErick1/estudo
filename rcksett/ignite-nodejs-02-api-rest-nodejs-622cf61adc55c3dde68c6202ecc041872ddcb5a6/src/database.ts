import { Knex, knex as setupKnex } from 'knex'
import path from 'path';
export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, '../', 'db', 'migrations')
  },
}

export const knex = setupKnex(config)
