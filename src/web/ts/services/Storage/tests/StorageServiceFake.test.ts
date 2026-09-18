import { describe, test, expect, beforeEach } from "vitest";
import { StorageServiceFake } from "../StorageServiceFake";
import { fallbackData } from "../../ExchangeRate/ExchangeRateFallbackData";
import { TimeProviderServiceFake } from "../../TimeProvider/TimeProviderServiceFake";



describe('StorageServiceFake', () => {
  let storageFake: StorageServiceFake;
  const fakeTimeProvider = new TimeProviderServiceFake();
  const mockData = fallbackData(fakeTimeProvider);


  beforeEach(() => {
    storageFake = new StorageServiceFake();
    storageFake.clear();
  })

  test('should return the data if they exist', () => {
    storageFake.set('data', mockData)

    const result = storageFake.get('data');

    expect(result).toEqual(mockData);
  })

  test('should return null if data doesnt exist', () => {
    const result = storageFake.get('data') ?? null;

    expect(result).toBeNull();

  })

  test('should return new data if overwrite', () => {
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