import fastify from "fastify";

import { knex } from "./database";

const SERVER_PORT = Number(process.env.PORT) || 3333;

const app = fastify();

app.get("/hello", async () => {
  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app.listen({ port: SERVER_PORT }).then(() => {
  console.log(`HTTP Server is running on port \x1b[32m${SERVER_PORT}\x1b[36m`);
});
