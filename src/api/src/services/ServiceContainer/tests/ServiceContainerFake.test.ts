import {describe, expect, test} from "vitest";
import EnvironmentServiceFake
  from "../../Environment/EnvironmentServiceFake.js";
import {ExchangeRatesServiceFake}
  from "../../ExchangeRates/ExchangeRatesServiceFake.js";
import FirestoreServiceFake from "../../Firestore/FirestoreServiceFake.js";
import ServiceContainerFake from "../ServiceContainerFake.js";

describe("ServiceContainerFake", () => {
  test("provides fake implementations for all route services", () => {
    const container = new ServiceContainerFake();

    expect(container.environmentService)
      .toBeInstanceOf(EnvironmentServiceFake);
    expect(container.firestoreService)
      .toBeInstanceOf(FirestoreServiceFake);
    expect(container.exchangeRatesService)
      .toBeInstanceOf(ExchangeRatesServiceFake);
  });
});
