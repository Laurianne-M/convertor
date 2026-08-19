import {describe, test, expect, beforeEach} from "vitest";
import {TestData} from "./TestData.js";
import request from "supertest";
import express, {type Express} from "express";
import {createV1Router} from "./router.js";

describe("/v1/latest", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
  });

  test("should return 200 with rates data when fetch succeed", async () => {
    app.use("/v1", createV1Router(TestData.fetchers.success));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(TestData.responses.success)
  });

  test("should return 500 when fetch fails with server error", async () => {
    app.use("/v1", createV1Router(TestData.fetchers.internalError));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(TestData.responses.internalError);
  });

  test("should return 401 when API key is invalid", async () => {
    app.use("/v1", createV1Router(TestData.fetchers.unauthorized));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(401);
    expect(response.body).toEqual(TestData.responses.unauthorized);
  });

  test("should return 400 when parameter is missing", async () => {
    app.use("/v1", createV1Router(TestData.fetchers.missingParameter));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(400);
    expect(response.body).toEqual(TestData.responses.missingParameter);
  });
});