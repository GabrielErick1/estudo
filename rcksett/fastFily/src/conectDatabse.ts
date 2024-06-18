import {knex as setupKenex} from "knex"

export const config = {
    client: "sqlite3",
    connection: {
      filename: './temp/app.db',
    },
    useNullAsDefault: true,
  
}

export const knex = setupKenex(config)