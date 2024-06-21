import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { knex } from "../database";

import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      return {
        transactions,
      };
    },
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await knex("transactions")
        .where({
          id,
          session_id: sessionId,
        })
        .select("*");

      return {
        transaction,
      };
    },
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", {
          as: "amount",
        });

      return { summary };
    },
  );

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
      amount: type === "credit" ? amount : -amount,
      session_id: sessionId,
    });

    reply.status(201).send();
  });
}
