import type { ExchangeRateService, ExchangeRates, ExchangeRateAPIResponse } from "./ExchangeRateService";
import { ExchangeRate } from "./ExchangeRateFallbackData";
import type { TimeProvider } from "../../timeProvider";
import { DAY_IN_MILLISECONDS, API_BASE_URL, API_KEY } from "../../constants.js"

interface ExchangeRateServiceImplDependencies {
    timeProvider: TimeProvider
    storage: Storage
    fetch: (url: string) => Promise<Response>
} 

export class ExchangeRateServiceImp implements ExchangeRateService {

    constructor(private readonly dependencies: ExchangeRateServiceImplDependencies) {
    } 
    
    private getDataFromLocalStorage = async () => {
        const dataStringified = this.dependencies.storage.getItem('data');
        return dataStringified && JSON.parse(dataStringified) || null; 
    };

    private areDataOutdated = (receivedAt: string) => {

        if (!receivedAt || isNaN(Date.parse(receivedAt))) {
            return true; 
        };

        // Take the actual date and remove 24 hours
        const checkDate = new Date(this.dependencies.timeProvider.currentDate().getTime() - DAY_IN_MILLISECONDS); 
        // If the data received is lower than the checkDate, then data is outdated
        return new Date(receivedAt).getTime() < checkDate.getTime(); 
    }; 

    private getMockRates = (): ExchangeRateAPIResponse => {
    return ExchangeRate.fallbackData
};

    public loadRates = async (): Promise<ExchangeRates> => {
        const data = await this.getDataFromLocalStorage(); 

        if (!data || this.areDataOutdated(data && data.receivedAt)) {
            try { 
                const params = {
                    access_key : API_KEY,
                };

                const queryString = new URLSearchParams(params).toString();
                const urlWithParams = `${API_BASE_URL}?${queryString}`;
                const res = await this.dependencies.fetch.call(window, urlWithParams);
                const jsonData = await res.json();

                if (!jsonData.rates) { // API returned an error
                    console.warn("API unavailable — using mock data");
                    const mockData = this.getMockRates();
                    this.dependencies.storage.setItem(
                        'data', 
                        JSON.stringify({
                            jsonData: mockData,
                            receivedAt: this.dependencies.timeProvider.currentDate()
                        }
                    ));

                    return {
                        rates: mockData.rates,
                        base: mockData.base
                    };
                };

                this.dependencies.storage.setItem(
                    'data', 
                    JSON.stringify({
                        jsonData,
                        receivedAt: this.dependencies.timeProvider.currentDate()
                    })
                );

                return {
                    rates: jsonData.rates,
                    base: jsonData.base,
                };
            } catch (error) {
                console.warn("API unavailable — using mock data");

                return this.getMockRates();
            };
        };

        return {
            rates: data.jsonData.rates,
            base: data.jsonData.base,
        }
    }; 
};