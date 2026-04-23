import { currencies, metalCode, RATES_LOADING, NAV_BAR_ERROR } from '../constants.js'
import type { LoggerService } from '../services/Logger/LoggerService.js';
import type { ConvertOperation, RatesResponse } from '../types/logic.types.js';


export function populateLiveNavbar({ rates, logger }: { rates: Record<string, number>, logger: LoggerService }) {

  const usdRate = rates[currencies.USD.code];
  if (!usdRate) throw new Error('USD rate is missing or zero');

  Object.keys(metalCode).forEach(id => {

    const select = document.getElementById(id);
    if (!select) return;

    const symbol = metalCode[id];
    if (!symbol) return;
    const metalRate = rates[symbol] ?? 0;

    if (metalRate !== undefined && metalRate !== 0) {

      const price = usdRate / metalRate;

      const formattedPrice = price.toLocaleString(undefined, {
        maximumFractionDigits: 2
      });

      const metalName = select.textContent?.split(":")[0]
      select.textContent = `${metalName}: $${formattedPrice}`;

    } else {
      window.alert(NAV_BAR_ERROR);
      logger.warn(NAV_BAR_ERROR);
    };
  });
};


export const convert = (operation: ConvertOperation) => {
  const {
    amount,
    fromSelectBaseCurrency,
    toSelectDesiredCurrency,
    rates,
    base
  } = operation;

  if (fromSelectBaseCurrency === toSelectDesiredCurrency) return amount;


  // convert to base first
  if (fromSelectBaseCurrency !== base) {
    if (!rates[fromSelectBaseCurrency] || rates[fromSelectBaseCurrency] === 0) {
      return 0;
    }
  }

  const amountInBase = fromSelectBaseCurrency === base
    ? amount
    : amount / (rates[fromSelectBaseCurrency] ?? 1);

  // convert base → target
  if (toSelectDesiredCurrency !== base && !rates[toSelectDesiredCurrency]) {
    return 0;
  }

  return toSelectDesiredCurrency === base
    ? amountInBase
    : amountInBase * (rates[toSelectDesiredCurrency] ?? 1);

};

export async function updateAmount(
  data: RatesResponse,
  amountFromFirstCurrencyInput: HTMLInputElement,
  amountFromSecondCurrencyInput: HTMLInputElement,
  reverse = false,
  fromCurrency: string,
  toCurrency: string,
  logger: LoggerService
) {
  // Safety check: Make sure data and data.rates actually exist
  if (!data || !data.rates) {
    logger.warn(RATES_LOADING);
    return;
  }

  if (parseFloat(amountFromFirstCurrencyInput.value) < 0) {
    window.alert('Amount must be positive');
    return;
  }


  // Determine values based on whether we are updating from the first or second input
  const amount = reverse
    ? parseFloat(amountFromSecondCurrencyInput.value) || 0
    : parseFloat(amountFromFirstCurrencyInput.value) || 0;

  const fromSelectBaseCurrency = reverse
    ? toCurrency
    : fromCurrency

  const toSelectDesiredCurrency = reverse
    ? fromCurrency
    : toCurrency

  const result = convert({
    amount: amount,
    fromSelectBaseCurrency: fromSelectBaseCurrency,
    toSelectDesiredCurrency: toSelectDesiredCurrency,
    rates: data.rates,
    base: data.base
  });

  if (reverse) {
    amountFromFirstCurrencyInput.value = result.toFixed(2);
  } else {
    amountFromSecondCurrencyInput.value = result.toFixed(2);
  };
};

let isUpdating = false;

export const resetUpdateLock = () => { isUpdating = false; };
export const updateLock = async (fn: any) => {


  if (isUpdating) return;
  isUpdating = true;
  try {
    await fn();
  } finally {
    isUpdating = false;
  }
};