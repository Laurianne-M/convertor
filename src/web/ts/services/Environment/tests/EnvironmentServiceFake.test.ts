import { describe, test, expect } from "vitest";
import { EnvironmentServiceFake } from "../EnvironmentServiceFake";

describe("EnvironmentServiceFake", () => {
  test("returns the default fake exchange rates URL", () => {
    const fakeService = new EnvironmentServiceFake();
    const expectedURL = "https://api.exchangeratesapi.io/v1/latest?access_key=fake_access_key_123"
    const ActualURL = fakeService.getExchangeRatesURL();

    expect(ActualURL).toBe(expectedURL);
  });
});