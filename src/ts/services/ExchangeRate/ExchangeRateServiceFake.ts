import type { ExchangeRateService, ExchangeRates } from "./ExchangeRateService";
import type { TimeProvider } from "../TimeProvider/TimeProviderService";
import { DAY_IN_MILLISECONDS } from "../../constants.js"

export class ExchangeRateServiceFake implements ExchangeRateService {
    public loadRatesCallCount = 0;
    private cachedData: { rates: ExchangeRates, receivedAt: Date } | null = null;
    private ratesToReturn: ExchangeRates;
    private shouldThrow: boolean;
    private timeProvider: TimeProvider;

    constructor(
        timeProvider: TimeProvider,
        ratesToReturn: ExchangeRates,
        shouldThrow = false
    ) {
        this.ratesToReturn = ratesToReturn;
        this.shouldThrow = shouldThrow;
        this.timeProvider = timeProvider;
    }

    loadRates = async (): Promise<ExchangeRates> => {
        this.loadRatesCallCount++;

        if (this.shouldThrow) {
            throw new Error('Network error');
        }

        const now = this.timeProvider.currentDate();
        const isOutdated = !this.cachedData || 
            (now.getTime() - this.cachedData.receivedAt.getTime()) > DAY_IN_MILLISECONDS;

        if (isOutdated) {
            this.cachedData = { rates: this.ratesToReturn, receivedAt: now };
        }

        return this.cachedData!.rates;
    }
}
