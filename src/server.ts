import fastify from "fastify";

import { env } from "./env";

import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(transactionsRoutes, {
  prefix: "transactions",
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server is running on port \x1b[32m${env.PORT}\x1b[36m`);
});
