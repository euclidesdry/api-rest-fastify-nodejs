import { Knex, knex as setupKnex } from "knex";

import { env } from "./env";

const connection = (
  env.DATABASE_CLIENT === "sqlite"
    ? {
        filename: env.DATABASE_URL,
      }
    : env.DATABASE_URL
) satisfies Knex.Config["connection"];

export const config = {
  client: env.DATABASE_CLIENT,
  connection,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
  useNullAsDefault: true,
} satisfies Knex.Config;

export const knex = setupKnex(config);
