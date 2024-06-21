import { Knex, knex as setupKnex } from "knex";

import { env } from "./env";

export const config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
  useNullAsDefault: true,
} satisfies Knex.Config;

export const knex = setupKnex(config);
