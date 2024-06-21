import { Knex, knex as setupKnex } from "knex";

export const config = {
  client: "sqlite3",
  connection: {
    filename: "./db/app.db",
  },
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
  useNullAsDefault: true,
} satisfies Knex.Config;

export const knex = setupKnex(config);
