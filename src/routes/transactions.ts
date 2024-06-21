import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select("*");

    return {
      transactions,
    };
  });

  app.get("/:id", async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);
    const transaction = await knex("transactions").where("id", id).select("*");

    return {
      transaction,
    };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions").sum("amount", { as: "amount" });

    return { summary };
  });

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debt"]),
    });

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 60s * 60min * 24h * 7d
      });
    }

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : -1,
      session_id: sessionId,
    });

    reply.status(201).send();
  });
}
