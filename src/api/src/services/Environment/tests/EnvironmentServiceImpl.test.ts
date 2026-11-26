import {describe, expect, test} from "vitest";
import {EnvironmentServiceImpl} from "../EnvironmentServiceImplV2.js";

describe("EnvironmentServiceImpl", () => {
  test("does not throw when API key and valid URL are present", () => {
    const service = () =>
      new EnvironmentServiceImpl({
        env: {
          EXCHANGE_RATES_API_URL: "https://api.example.com/v1",
          EXCHANGE_RATES_API_KEY: "test-api-key",
        },
      });

    expect(service).not.toThrow();
  });

  test("throws an error when EXCHANGE_RATES_API_URL is missing", () => {
    const service = () =>
      new EnvironmentServiceImpl({
        env: {
          EXCHANGE_RATES_API_KEY: "test-api-key",
        },
      });

    expect(service).toThrow(
      "[Environment Service] Missing required environment variable: " +
      "EXCHANGE_RATES_API_URL"
    );
  });

  test("throws an error when EXCHANGE_RATES_API_KEY is missing", () => {
    const service = () =>
      new EnvironmentServiceImpl({
        env: {
          EXCHANGE_RATES_API_URL: "https://api.example.com/v1",
        },
      });

    expect(service).toThrow(
      "[Environment Service] Missing required environment variable: " +
      "EXCHANGE_RATES_API_KEY"
    );
  });

  test("throws an error when EXCHANGE_RATES_API_URL is invalid", () => {
    const service = () =>
      new EnvironmentServiceImpl({
        env: {
          EXCHANGE_RATES_API_URL: "not a valid url",
          EXCHANGE_RATES_API_KEY: "test-api-key",
        },
      });

    expect(service).toThrow();
  });

  test("throws when EXCHANGE_RATES_API_URL has a trailing slash", () => {
    const service = () =>
      new EnvironmentServiceImpl({
        env: {
          EXCHANGE_RATES_API_URL: "https://api.example.com/v1/",
          EXCHANGE_RATES_API_KEY: "test-api-key",
        },
      });

    expect(service).toThrow(
      "[Environment Service] " +
      "EXCHANGE_RATES_API_URL must not end with a trailing slash"
    );
  });
});
