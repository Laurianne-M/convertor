import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { StorageServiceFake } from "../StorageServiceFake";
import { ExchangeRate } from "../../ExchangeRate/ExchangeRateFallbackData";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";

let storageFake: StorageServiceFake;
let fakeTimeProvider = new TimeProviderServiceFake(new Date('2026-03-12T00:00:00Z'));
const mockData = ExchangeRate.fallbackData(fakeTimeProvider);


beforeEach(() => {
  storageFake = new StorageServiceFake();
  storageFake.clear();
})

describe('StorageServiceFake', () => {
  it('should return the data if they exist', () => {
    storageFake.set('data', mockData)

    const result = storageFake.get('data');

    expect(result).toEqual(mockData);
  })

  it('should return null if data doesnt exist', () => {
    const result = storageFake.get('data');

    expect(result).toBeNull;

  })

  it('should return new data if overwrite', () => {
    storageFake.set('data', mockData)

    const mockDataV2 = {
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
  
  storageFake.set('data', mockDataV2);

  const result = storageFake.get('data'); 

  expect(result).toEqual(mockDataV2);
  })

})