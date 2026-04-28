import type { ExchangeRateService, ExchangeRates } from "./ExchangeRateService";
import type { TimeProvider } from "../TimeProvider/TimeProviderService";

export class ExchangeRateServiceFake implements ExchangeRateService {
  public loadRatesCallCount = 0;
  private ratesToReturn: ExchangeRates;
  private timeProvider: TimeProvider

  constructor(
    ratesToReturn: ExchangeRates,
    timeProvider: TimeProvider
  ) {
    this.ratesToReturn = ratesToReturn;
    this.timeProvider = timeProvider;
  }

  loadRates = async (): Promise<ExchangeRates> => {
    this.loadRatesCallCount++;
    
    return this.ratesToReturn;
  }
}
