import fastify from "fastify";
import cookie from "@fastify/cookie";

import { transactionsRoutes } from "./routes/transactions";

export const app = fastify();

app.register(cookie);

// Global middlewares
// app.addHook("preHandler", async (request, reply) => {
//   console.log(`Route ${request.method} ${request.url}`);
// });

app.register(transactionsRoutes, {
  prefix: "transactions",
});
