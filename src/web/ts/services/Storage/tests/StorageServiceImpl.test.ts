import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { StorageServiceImpl } from "../StorageServiceImpl";
import { ExchangeRate } from "../../ExchangeRate/ExchangeRateFallbackData";

const storage = new StorageServiceImpl();

describe('StorageServiceImpl', () => {
  beforeEach( () => {
    storage.clear(); 
  })

  it('should return the data if they exist', () => {
    storage.set('data', ExchangeRate);
     
    const result = storage.get('data');

    expect(result).toMatchObject(ExchangeRate);

  })

  it('should return null if data not exist', () => {
    const result = storage.get('data'); 

    expect(result).toBe(null)
  })

  it('should return new data if overwrite', () => {
    storage.set('data', ExchangeRate);

    const ExchangeRateV2 = {
    success: true,
    timestamp: Date.now(),
    base: "EUR",
    date: "2026-03-12",
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