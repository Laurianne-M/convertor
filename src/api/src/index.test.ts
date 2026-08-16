import {describe, test, expect} from "vitest";
import {app} from "./index.js";
import request from "supertest";

describe("/health", () => {
  test("should return 200 OK with status when GET succeeds", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      "message": "Ok",
      "status": 200,
    });
  });
});
