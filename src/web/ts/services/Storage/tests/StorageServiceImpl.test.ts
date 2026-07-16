// @vitest-environment happy-dom
import { describe, test, expect, beforeEach } from "vitest";
import { JSDOM } from 'jsdom';
import { StorageServiceImpl } from "../StorageServiceImpl";
import { ExchangeRate } from "../../ExchangeRate/ExchangeRateFallbackData";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";
import { LoggerServiceFake } from "../../Logger/LoggerServiceFake";

const dom = new JSDOM('', { url: 'http://localhost' });
global.localStorage = dom.window.localStorage;
const logger = new LoggerServiceFake();
const storage = new StorageServiceImpl(logger);
const fakeTimeProvider = new TimeProviderServiceFake();
const mockExchangeRate = ExchangeRate.fallbackData(fakeTimeProvider);

describe('StorageServiceImpl', () => {
  beforeEach( () => {
    storage.clear(); 
  })

  test('should return the data if they exist', () => {
    storage.set('data', mockExchangeRate);
     
    const result = storage.get('data');

    expect(result).toMatchObject(mockExchangeRate);

  })

  test('should return null if data not exist', () => {
    const result = storage.get('data'); 
    expect(result).toBe(null)
  })

  test('should return new data if overwrite', () => {
    storage.set('data', mockExchangeRate);

    const ExchangeRateV2 = {
    success: true,
    timestamp: fakeTimeProvider.currentDate().getTime(),
    base: "EUR",
    date: fakeTimeProvider.currentDate().toISOString().split('T')[0],
    rates: {
      USD: 2.10,
      EUR: 1,
      GBP: 0.86,
      JPY: 180.4,
      CAD: 1.48,
      AUD: 1.66,
      BTC: 0.000015,
      XAU: 0.00047,
      XAG: 0.038
    }
  }
  
  storage.set('data', ExchangeRateV2);

  const result = storage.get('data');

  expect(result).toMatchObject(ExchangeRateV2);

  })

})