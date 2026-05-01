import type { 
  ExchangeRateService, 
  ExchangeRates,
  ExchangeRateAPIResponse 
} from "./ExchangeRateService";
import { ExchangeRate } from "./ExchangeRateFallbackData";
import type { TimeProviderServiceImpl } from "../TimeProvider/TImeProviderServiceImp";
import { DAY_IN_MILLISECONDS, API_BASE_URL, API_KEY } from "../../constants.js"
import type { StorageService } from "../Storage/StorageService";
import type { LoggerService } from "../Logger/LoggerService";

interface ExchangeRateServiceImplDependencies {
  timeProvider: TimeProviderServiceImpl
  storage: StorageService
  fetch: (url: string) => Promise<Response>
  logger: LoggerService;
}

export class ExchangeRateServiceImp implements ExchangeRateService {

  constructor(
    private readonly dependencies: ExchangeRateServiceImplDependencies
  ) {
  }

  private getDataFromLocalStorage = async () => {
    return this.dependencies.storage.get<{ jsonData: ExchangeRateAPIResponse; receivedAt: string }>('data');
  };

  private areDataOutdated = (receivedAt: string) => {

    if (!receivedAt || isNaN(this.dependencies.timeProvider.parseDate(receivedAt).getTime())) {
      return true;
    };

    // Take the actual date and remove 24 hours
    return this.dependencies.timeProvider.isOlderThan(
      this.dependencies.timeProvider.parseDate(receivedAt), 
      DAY_IN_MILLISECONDS
    );
  }

  private getMockRates = (): ExchangeRateAPIResponse => {
    return ExchangeRate.fallbackData(this.dependencies.timeProvider)
  };

  public loadRates = async (): Promise<ExchangeRates> => {
    const data = await this.getDataFromLocalStorage();

    this.dependencies.logger.debug(`storage data: ${JSON.stringify(data)}`);

    if (!data || this.areDataOutdated(data && data.receivedAt)) {
       this.dependencies.logger.debug('fetching from API...');
      try {
        const params = {
          access_key: API_KEY,
        };

        const queryString = new URLSearchParams(params).toString();
        const urlWithParams = `${API_BASE_URL}?${queryString}`;
        const res = await this.dependencies.fetch.call(window, urlWithParams);
        const jsonData = await res.json();

        if (!jsonData.rates) { // API returned an error
          this.dependencies.logger.warn("API unavailable — using mock data");
          const mockData = this.getMockRates();
          this.dependencies.storage.set(
            'data', 
            {
              jsonData: mockData,
              receivedAt: this.dependencies.timeProvider.currentDate()
            }
            );

          return {
            rates: mockData.rates,
            base: mockData.base
          };
        };

        this.dependencies.storage.set(
          'data',
          {
            jsonData,
            receivedAt: this.dependencies.timeProvider.currentDate()
          }
        );

        return {
          rates: jsonData.rates,
          base: jsonData.base,
        };
      } catch (error) {
        this.dependencies.logger.warn("API unavailable — using mock data");

        return this.getMockRates();
      };
    };

    return {
      rates: data.jsonData.rates,
      base: data.jsonData.base,
    }
  };
};