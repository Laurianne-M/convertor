import { describe, test, expect } from "vitest";
import { EnvironmentServiceFake } from "../EnvironmentServiceFake";
import { TEST_DATA } from "../../../tests/TestData";

describe("EnvironmentServiceFake", () => {
  test("returns the default fake exchange rates URL", () => {
    const fakeService = new EnvironmentServiceFake();
    const expectedURL = TEST_DATA.DEFAULT_EXCHANGE_RATES_URL;
    const actualURL = fakeService.getExchangeRatesURL();

    expect(actualURL).toBe(expectedURL);
  });

  test("allows overriding the exchange rates URL", () => {
    const customURL = "https://custom-api.example.com/v1/latest";
    const fakeServiceWithConstructor = new EnvironmentServiceFake(customURL);
    const actualConstructorURL = fakeServiceWithConstructor.getExchangeRatesURL();

    expect(actualConstructorURL).toBe(customURL);

    const fakeServiceWithProperty = new EnvironmentServiceFake();
    fakeServiceWithProperty.exchangeRatesURL = customURL;
    const actualPropertyURL = fakeServiceWithProperty.getExchangeRatesURL();
    
    expect(actualPropertyURL).toBe(customURL);
  });
});