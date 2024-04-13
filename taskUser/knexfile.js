// Update with your config settings.

/**
 * @type {Object.<string, import("knex").Knex.Config>}
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const knexConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
    },
    pool: {
      afterCreate: (conn, callback) =>
        conn.run('PRAGMA foreign_keys = ON', callback),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations',
      ),
    },
    useNullAsDefault: true,
  },
};

export default knexConfig;
