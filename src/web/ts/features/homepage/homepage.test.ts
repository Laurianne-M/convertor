import {
  describe,
  it,
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

const container = new ServiceContainerFake();
const logger = container.logger;

describe("logic", () => {
  describe("populateLiveNavbar", () => {
    it('exit the function if the currency ID doesnt exist ', () => {
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

    it('exit the function if USD rate is equal to 0 or undefined', () => {
      const response = () => populateLiveNavbar({ rates: { USD: 0 }, logger });

      expect(response).toThrow('USD rate is missing or zero');
    });

    it('should return a window error if the metal rates is equal to 0', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
      document.body.innerHTML = '<span id="btc"></span>';

      populateLiveNavbar({ rates: { BTC: 0, USD: 1.09 }, logger });

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
    });

    it('should return a window error if metal rate is undefined', () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
      document.body.innerHTML = '<span id="btc"></span>';

      populateLiveNavbar({ rates: { USD: 1.09 }, logger });

      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
    });

    it('should return the price of each asset in USD if IDs exist and are not 0/undefined', () => {
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
  });


  describe('convert', () => {
    it('should return amount if the 2 currencies are the same', () => {

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

    it('should return 0 if the rate is equal to 0  ', () => {
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

    it('should return amountInBase if toSelectDesiredCurrency = base', () => {
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

    it('should convert correclty if toSelectDesiredCurrency is different from the base', () => {
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

    it('should convert correclty if that rate is diferent from the Select Base Currency', () => {
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
  });

  describe('UpdateAmount', () => {

    it('should call window alert with the correct message if amount is negative', async () => {
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

    it('should update the second input with converted amount (not reverse)', async () => {
      const firstInput = { value: 100 } as unknown as HTMLInputElement;
      const secondInput = { value: '' } as unknown as HTMLInputElement;
      const data = await container.exchangeRateService.loadRates();

      await updateAmount(data, firstInput, secondInput, false, 'EUR', 'USD', logger);

      expect(secondInput.value).toBe('110.00');
    });

    it('should update the first input with converted amount (reverse)', async () => {
      const firstInput = { value: '' } as unknown as HTMLInputElement;
      const secondInput = { value: 110 } as unknown as HTMLInputElement;
      const data = await container.exchangeRateService.loadRates();

      await updateAmount(data, firstInput, secondInput, true, 'EUR', 'USD', logger);

      expect(firstInput.value).toBe('100.00');
    });

    it('should do nothing if loadRates failed', async () => {
      container.exchangeRateService.loadRates = vi.fn().mockResolvedValue(null);

      const firstInput = { value: '' } as unknown as HTMLInputElement;
      const secondInput = { value: 100 } as unknown as HTMLInputElement;
      const data = await container.exchangeRateService.loadRates();

      await updateAmount(data, firstInput, secondInput, true, 'EUR', 'USD', logger);

      expect(firstInput.value).toBe('');
    });
  });

  describe('updateLock', () => {
    beforeEach(() => {
      resetUpdateLock();
    });

    it('should called updateAmount when unlocked', async () => {
      const updateAmount = vi.fn();

      await updateLock(updateAmount);

      expect(updateAmount).toHaveBeenCalledTimes(1);
    });

    it('should block every other call while running', async () => {
      const updateAmount = vi.fn();

      const slowUpdateAmount = async () => new Promise(
        resolve => setTimeout(resolve, 100)
      );

      updateLock(slowUpdateAmount); // start of a slow function
      await updateLock(updateAmount); // try to run immediately after

      expect(updateAmount).not.toHaveBeenCalled();
    });

    it('should unlock when the function finishes', async () => {
      const updateAmount = vi.fn();

      await updateLock(updateAmount);
      await updateLock(updateAmount);


      expect(updateAmount).toHaveBeenCalledTimes(2);
    });

    it('should unlock if the function throw an error', async () => {
      const updateAmount = vi.fn();
      try {
        await updateLock(() => { throw new Error('an issue occur'); });
      } catch (error) {

      }
      await updateLock(updateAmount);
      expect(updateAmount).toHaveBeenCalledTimes(1);
    });
  });
});