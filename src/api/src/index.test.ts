import { describe, test, expect } from "vitest"; 
import { app } from "./index";
import request from "supertest";

describe("GET", () => {
  test('the endpoint /health should return 200 OK with status message', async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200); 
    expect(response.body).toEqual({
      "message": "Ok",
      "status": 200,
    });
  });
});