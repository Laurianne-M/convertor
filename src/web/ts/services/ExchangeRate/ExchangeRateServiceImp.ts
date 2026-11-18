import type { 
  ExchangeRateService, 
  ExchangeRates,
  ExchangeRateAPIResponse 
} from "./ExchangeRateService";
import { fallbackData } from "./ExchangeRateFallbackData";
import type { TimeProviderServiceImpl } from "../TimeProvider/TImeProviderServiceImp";
import { AppConstants } from "../../constants.js"
import type { StorageService } from "../Storage/StorageService";
import type { LoggerService } from "../Logger/LoggerService";
import { config } from "../../config/env";

interface ExchangeRateServiceImplDependencies {
  timeProvider: TimeProviderServiceImpl
  storage: StorageService
  fetch: (url: string) => Promise<Response>
  logger: LoggerService;
}

export class ExchangeRateServiceImp implements ExchangeRateService {
  private readonly dependencies: ExchangeRateServiceImplDependencies

  constructor(dependencies: ExchangeRateServiceImplDependencies) {
    this.dependencies = dependencies
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
      AppConstants.DAY_IN_MILLISECONDS
    );
  }

  private getMockRates = (): ExchangeRateAPIResponse => {
    return fallbackData(this.dependencies.timeProvider)
  };

  public loadRates = async (): Promise<ExchangeRates> => {
    const data = await this.getDataFromLocalStorage();

    this.dependencies.logger.debug(`storage data: ${JSON.stringify(data)}`);

    if (!data || this.areDataOutdated(data && data.receivedAt)) {
       this.dependencies.logger.debug('fetching from internal API...');
      try {
        const url = `${config.apiBaseUrl}/v1/latest`;
        const res = await this.dependencies.fetch(url);
        const jsonData = (await res.json()) as ExchangeRateAPIResponse;

        if (!res.ok || !jsonData.rates) { // API returned an error
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
        this.dependencies.logger.warn(`API unavailable — using mock data: ${error}`);

        return this.getMockRates();
      };
    };

    return {
      rates: data.jsonData.rates,
      base: data.jsonData.base,
    }
  };
};