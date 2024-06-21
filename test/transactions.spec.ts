import { afterAll, beforeAll, describe, test } from "vitest";
import request from "supertest";

import { app } from "../src/app";

describe("User", () => {
  beforeAll(async () => await app.ready());

  afterAll(async () => app.close());

  test("should create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });
});
