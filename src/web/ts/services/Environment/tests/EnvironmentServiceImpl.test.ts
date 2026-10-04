import { beforeEach, describe, expect, test, vi } from "vitest";
import { EnvironmentServiceImpl } from "../EnvironmentServiceImpl";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";

describe('EnvironmentServiceImpl', () => {
  const VALID_API_BASE_URL = "https://api.exchangeratesapi.io";
  const VALID_API_KEY = "test_key_123";
  //const createService = () => new EnvironmentServiceImpl({ logger: loggerFake });
  //let loggerFake: LoggerServiceFake; 

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('instantiates successfully with a valid URL and API key', () => {
    vi.stubEnv("VITE_API_URL", VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    const logger = new LoggerServiceFake();
    const service = new EnvironmentServiceImpl({ logger });

    const actualURL = service.getExchangeRatesURL();
    const expectedURL = `${VALID_API_BASE_URL}/v1/latest?access_key=${VALID_API_KEY}`

    expect(actualURL).toBe(expectedURL);
  });

  test('throws an error when VITE_API_URL is missing', () => {
    vi.stubEnv("VITE_API_URL", "");
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", VALID_API_KEY);

    const logger = new LoggerServiceFake();

    expect(() =>  new EnvironmentServiceImpl({ logger })).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_API_URL"
    );
  });

  test('throws an error when VITE_EXCHANGE_RATES_API_KEY is missing', () => {
    vi.stubEnv("VITE_API_URL", VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", "");

    const logger = new LoggerServiceFake();

    expect(() => new EnvironmentServiceImpl({ logger })).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_EXCHANGE_RATES_API_KEY"
    );
  });

});