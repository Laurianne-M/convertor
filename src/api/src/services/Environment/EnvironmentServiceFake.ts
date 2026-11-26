import EnvironmentService from "./EnvironmentService.js";

/** Fake environment configuration for tests. */
export default class EnvironmentServiceFake implements EnvironmentService {
  /** @inheritdoc */
  getExchangeRatesURL(): string {
    return "https://example.test/latest";
  }
}
