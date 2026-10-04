import { describe, test, expect } from "vitest";
import { EnvironmentServiceFake } from "../EnvironmentServiceFake";

describe("EnvironmentServiceFake", () => {
  test("returns the default fake exchange rates URL", () => {
    const fakeService = new EnvironmentServiceFake();
    const expectedURL = "https://api.exchangeratesapi.io/v1/latest?access_key=fake_access_key_123"
    const ActualURL = fakeService.getExchangeRatesURL();

    expect(ActualURL).toBe(expectedURL);
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