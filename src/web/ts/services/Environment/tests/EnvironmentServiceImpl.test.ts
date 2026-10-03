import { beforeEach, describe, expect, test, vi } from "vitest";
import { EnvironmentServiceImpl } from "../EnvironmentServiceImpl";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";

describe('EnvironmentServiceImpl', () => {
  let loggerFake: LoggerServiceFake;
  const VALID_API_BASE_URL = "https://api.exchangeratesapi.io";
  const VALID_API_KEY = "test_key_123";
  const createService = () => new EnvironmentServiceImpl({ logger: loggerFake });

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    loggerFake = new LoggerServiceFake();
  });

  test('instantiates successfully with a valid URL and API key', () => {
    vi.stubEnv("VITE_API_URL", VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    const service = createService();

    expect(service).toBeInstanceOf(EnvironmentServiceImpl);
    expect(service.getExchangeRatesURL()).toBe(
      `${VALID_API_BASE_URL}/v1/latest?access_key=${VALID_API_KEY}`
    );

    const debugLogs = loggerFake.logs.filter((log) => log.level === "debug");
    expect(debugLogs).toContainEqual({
      level: "debug",
      value: "[EnvironmentService] Environment initialization successful.",
    });
  });

  test('throws an error when VITE_API_URL is missing', () => {
    vi.stubEnv("VITE_API_URL", "");
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    expect(createService).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_API_URL"
    );
  });

  test('throws an error when VITE_EXCHANGE_RATES_API_KEY is missing', () => {
    vi.stubEnv("VITE_API_URL", VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", "");

    expect(createService).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_EXCHANGE_RATES_API_KEY"
    );
  });

  test('throws a format error when VITE_API_URL is invalid', () => {
    vi.stubEnv("VITE_API_URL", "invalid-url");
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    createService();

    const errorLog = loggerFake.logs.find((log) => log.level === "error");

    expect(errorLog).toBeDefined();
    expect(errorLog?.value).toBeInstanceOf(TypeError);
  });
});