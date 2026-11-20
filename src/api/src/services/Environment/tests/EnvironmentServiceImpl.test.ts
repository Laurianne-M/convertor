import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { EnvironmentServiceImpl } from "../EnvironmentServiceImplDraft.js";

const VALID_API_BASE_URL = "https://api.example.com";
const VALID_API_KEY = "test-api-key";
const EXPECTED_EXCHANGE_RATES_URL =
  "https://api.example.com/v1/latest?access_key=test-api-key";

describe("EnvironmentServiceImpl", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("instantiates successfully with a valid URL and API key", () => {
    vi.stubEnv("API_URL", VALID_API_BASE_URL);
    vi.stubEnv("EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    const service = new EnvironmentServiceImpl();

    expect(service.getExchangeRatesURL()).toBe(EXPECTED_EXCHANGE_RATES_URL);
  });

  test("throws an error when API_URL is missing", () => {
    vi.stubEnv("API_URL", "");
    vi.stubEnv("EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    expect(() => new EnvironmentServiceImpl()).toThrowError(
      "[Environment Service] Missing required environment variable: API_URL"
    );
  });

  test("throws an error when EXCHANGE_RATES_API_KEY is missing", () => {
    vi.stubEnv("API_URL", VALID_API_BASE_URL);
    vi.stubEnv("EXCHANGE_RATES_API_KEY", "");

    expect(() => new EnvironmentServiceImpl()).toThrowError(
      "[Environment Service] Missing required environment variable: EXCHANGE_RATES_API_KEY"
    );
  });

  test("throws an error when API_URL is invalid", () => {
    vi.stubEnv("API_URL", "not-a-valid-url");
    vi.stubEnv("EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    expect(() => new EnvironmentServiceImpl()).toThrow();
  });
});