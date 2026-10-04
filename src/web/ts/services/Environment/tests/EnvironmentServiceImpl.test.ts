import { beforeEach, describe, expect, test, vi } from "vitest";
import { EnvironmentServiceImpl } from "../EnvironmentServiceImpl";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";
import { TEST_DATA } from "../../../tests/TestData";

describe('EnvironmentServiceImpl', () => {
  let logger: LoggerServiceFake; 

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    logger = new LoggerServiceFake();
  });

  test('instantiates successfully with a valid URL and API key', () => {
    vi.stubEnv("VITE_API_URL", TEST_DATA.VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", TEST_DATA.VALID_API_KEY);

    const service = new EnvironmentServiceImpl({ logger });

    const actualURL = service.getExchangeRatesURL();
    const expectedURL = TEST_DATA.DEFAULT_EXCHANGE_RATES_URL;

    expect(actualURL).toBe(expectedURL);
  });

  test('throws an error when VITE_API_URL is missing', () => {
    vi.stubEnv("VITE_API_URL", "");
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", TEST_DATA.VALID_API_KEY);

    expect(() =>  new EnvironmentServiceImpl({ logger })).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_API_URL"
    );
  });

  test('throws an error when VITE_EXCHANGE_RATES_API_KEY is missing', () => {
    vi.stubEnv("VITE_API_URL", TEST_DATA.VALID_API_BASE_URL);
    vi.stubEnv("VITE_EXCHANGE_RATES_API_KEY", "");

    expect(() => new EnvironmentServiceImpl({ logger })).toThrowError(
      "[Environment Service] Missing required environment variable: VITE_EXCHANGE_RATES_API_KEY"
    );
  });

});