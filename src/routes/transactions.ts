import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debt"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : -1,
    });

    reply.status(201).send();
  });
}
