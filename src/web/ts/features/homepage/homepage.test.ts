import {
  describe,
  test,
  expect,
  vi,
  beforeEach
} from "vitest";

import {
  populateLiveNavbar,
  convert,
  updateAmount,
  updateLock,
  resetUpdateLock
} from "./homepage";

import { ServiceContainerFake } from "../../container/services/ServiceContainerFake";
import type { ExchangeRates } from "../../services/ExchangeRate/ExchangeRateService";



describe("logic", () => {
  let container: ServiceContainerFake;
  let logger: typeof container.logger;

  beforeEach(() => {
    resetUpdateLock();
    container = new ServiceContainerFake();
    logger = container.logger;
  });

  test('populateLiveNavbar exits if their is no valid currency ID', () => {
    document.body.innerHTML = '';

    const result = populateLiveNavbar({
      rates: {
        USD: 1.09,
        BTC: 0.000015,
        XAU: 0.00047,
        XAG: 0.038,
        CAD: 1.01
      },
      logger
    });

    expect(result).toBeUndefined();
  });

  test('populateLiveNavbar exits if USD rate is equal to 0 or undefined', () => {
    const response = () => populateLiveNavbar({ rates: { USD: 0 }, logger });

    expect(response).toThrow('USD rate is missing or zero');
  });

  test('populateLiveNavbar return a window error if the metal rates is equal to 0', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
    document.body.innerHTML = '<span id="btc"></span>';

    populateLiveNavbar({ rates: { BTC: 0, USD: 1.09 }, logger });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
  });

  test('populateLiveNavbar return a window error if metal rate is undefined', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
    document.body.innerHTML = '<span id="btc"></span>';

    populateLiveNavbar({ rates: { USD: 1.09 }, logger });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
  });

  test('populateLiveNavbar return the price of each asset in USD if IDs exist and are not 0/undefined', () => {
    document.body.innerHTML = '<span id="btc">BTC:</span>';

    populateLiveNavbar({
      rates: {
        USD: 1.09,
        BTC: 0.000015,
        XAU: 0.00047,
        XAG: 0.038
      }, logger
    });

    const btcElement = document.getElementById('btc')
    const btcElementContent = btcElement?.textContent;

    expect(btcElementContent).toBe('BTC: $72,666.67');
  });

  test('convert return amount if the 2 currencies are the same', () => {

    const operation = {
      amount: 569,
      fromSelectBaseCurrency: 'USD',
      toSelectDesiredCurrency: 'USD',
      rates: {
        'EUR': 1.1,
        'USD': 0
      },
      base: 'EUR'
    };
    const result = convert(operation);

    expect(result).toBe(operation.amount);
  });

  test('convert return 0 if the rate is equal to 0  ', () => {
    const operation = {
      amount: 569,
      fromSelectBaseCurrency: 'USD',
      toSelectDesiredCurrency: 'EUR',
      rates: {
        'EUR': 1.1,
        'USD': 0
      },
      base: 'EUR'
    };

    const result = convert(operation);

    expect(result).toBe(0);
  });

  test('convert return amountInBase if toSelectDesiredCurrency = base', () => {
    const operation = {
      amount: 500,
      fromSelectBaseCurrency: 'CAD',
      toSelectDesiredCurrency: 'EUR',
      rates: {
        'EUR': 1.5,
        'CAD': 2
      },
      base: 'EUR'
    };

    const amountInBase = operation.amount / operation.rates.CAD

    const result = convert(operation);

    expect(result).toBe(amountInBase);
  });

  test('convert return the correct amount if toSelectDesiredCurrency is different from the base', () => {
    const operation = {
      amount: 500,
      fromSelectBaseCurrency: 'EUR',
      toSelectDesiredCurrency: 'USD',
      rates: {
        'USD': 1.5
      },
      base: 'EUR'
    };

    const result = convert(operation);

    expect(result).toBe(750);
  });

  test('convert return the correct amount if the rate is diferent from the Select Base Currency', () => {
    const operation = {
      amount: 100,
      fromSelectBaseCurrency: 'USD',
      toSelectDesiredCurrency: 'EUR',
      rates: {
        'EUR': 2,
        'USD': 2,
      },
      base: 'EUR'
    };

    const result = convert(operation);

    expect(result).toBe(50);
  });

  test('UpdateAmount call window alert with the correct message if amount is negative', async () => {
    // Create a spy on the window.alert method
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
    const firstInput = { value: -100 } as unknown as HTMLInputElement;
    const secondInput = { value: '' } as unknown as HTMLInputElement;
    const data = await container.exchangeRateService.loadRates();

    await updateAmount(data, firstInput, secondInput, false, 'EUR', 'USD', logger);

    expect(alertSpy).toHaveBeenCalled();

    expect(alertSpy).toHaveBeenCalledWith('Amount must be positive');

    alertSpy.mockRestore();
  });

  test('UpdateAmount update the second input with converted amount (not reverse)', async () => {
    const firstInput = { value: 100 } as unknown as HTMLInputElement;
    const secondInput = { value: '' } as unknown as HTMLInputElement;
    const data = await container.exchangeRateService.loadRates();

    await updateAmount(data, firstInput, secondInput, false, 'EUR', 'USD', logger);

    expect(secondInput.value).toBe('110.00');
  });

  test('UpdateAmount update the first input with converted amount (reverse)', async () => {
    const firstInput = { value: '' } as unknown as HTMLInputElement;
    const secondInput = { value: 110 } as unknown as HTMLInputElement;
    const data = await container.exchangeRateService.loadRates();

    await updateAmount(data, firstInput, secondInput, true, 'EUR', 'USD', logger);

    expect(firstInput.value).toBe('100.00');
  });

  test('UpdateAmount do nothing if loadRates failed', async () => {
    container.exchangeRateService.overrides.error = new Error('loadRates failed');

    const firstInput = { value: '' } as unknown as HTMLInputElement;
    const secondInput = { value: 100 } as unknown as HTMLInputElement;
    let data: ExchangeRates | null = null;
    try {
      data = await container.exchangeRateService.loadRates();
    } catch {
      // expected — loadRates is set to fail for this test
    }

    await updateAmount(data, firstInput, secondInput, true, 'EUR', 'USD', logger);

    expect(firstInput.value).toBe('');
  });

  test('updateLock called updateAmount when unlocked', async () => {
    const updateAmount = vi.fn();

    await updateLock(updateAmount);

    expect(updateAmount).toHaveBeenCalledTimes(1);
  });

  test('updateLock block every other call while running', async () => {
    const updateAmount = vi.fn();

    const slowUpdateAmount = async () => new Promise(
      resolve => setTimeout(resolve, 100)
    );

    updateLock(slowUpdateAmount); // start of a slow function
    await updateLock(updateAmount); // try to run immediately after

    expect(updateAmount).not.toHaveBeenCalled();
  });

  test('updateLock unlock when the function finishes', async () => {
    const updateAmount = vi.fn();

    await updateLock(updateAmount);
    await updateLock(updateAmount);

    expect(updateAmount).toHaveBeenCalledTimes(2);
  });

  test('updateLock unlock if the function throw an error', async () => {
    const updateAmount = vi.fn();
    try {
      await updateLock(() => { throw new Error('an issue occur'); });
    } catch (error) {

    }
    await updateLock(updateAmount);
    expect(updateAmount).toHaveBeenCalledTimes(1);
  });
});