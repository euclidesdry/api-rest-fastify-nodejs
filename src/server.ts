import fastify from "fastify";

import { env } from "./env";
import { knex } from "./database";

const app = fastify();

app.get("/hello", async () => {
  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server is running on port \x1b[32m${env.PORT}\x1b[36m`);
});
