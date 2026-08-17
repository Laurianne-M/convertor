import {describe, test, expect, beforeEach} from "vitest";
import {fakeFetchSuccess, fakeFetchFailure, MOCK_RATES_DATA} from "./FakeFetch.js";
import request from "supertest";
import express, {type Express} from "express";
import {createV1Router} from "./router.js";

describe("/v1/latest", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
  });

  test("should return 200 with rates data when fetch succeed", async () => {
    app.use("/v1", createV1Router(fakeFetchSuccess));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCK_RATES_DATA)
  });

  test("should return 500 when fetch fails", async () => {
    app.use("/v1", createV1Router(fakeFetchFailure));

    const response = await request(app).get("/v1/latest");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Failed to fetch rates',
      status: 500,
    });
  });
});