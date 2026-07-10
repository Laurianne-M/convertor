import { AppConstants} from '../../constants.js'
import type { LoggerService } from '../../services/Logger/LoggerService.js';
import type { ConvertOperation, RatesResponse } from './homepage.types.js';
import { StringKey, t } from '../../i18n/i18n.js';

export function populateContainer(container: any, uiString: any): void {
  uiString.forEach(({ id, label }: {id: string; label: string}) => {
    const a = document.createElement('a');
    a.id = id;
    a.textContent = label;
    container.appendChild(a);
  });
}

export function populateTitle(title: string): void {
  document.title = title; 
}

export function populateLangSelector(
  languages: {
    id: string,
    label: string,
    flag: string,
    active: boolean
  }[],
  onLangChange: (lang: string) => void
): void {
  const select = document.getElementById('langSelect') as HTMLSelectElement;

  languages.forEach(({ id, label, flag, active} ) => {
    const option = document.createElement('option'); 
    option.value = id;
    option.textContent = `${flag} ${label}`;
    option.selected = active;
    select.appendChild(option);
  });

  select.onclick = () => onLangChange(select.value);
}

export function populateLiveNavbar({ rates, logger }: { rates: Record<string, number>, logger: LoggerService }) {
  const usdRate = rates[AppConstants.currencies.USD.code];
  if (!usdRate) throw new Error('USD rate is missing or zero');

  Object.keys(AppConstants.metalCode).forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    const symbol = AppConstants.metalCode[id];
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
      logger.warn(AppConstants.NAV_BAR_ERROR);
      window.alert(AppConstants.NAV_BAR_ERROR);
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
    logger.warn(AppConstants.RATES_LOADING);
    return;
  }

  const firstInputValue = parseFloat(amountFromFirstCurrencyInput.value)
  const secondInputValue = parseFloat(amountFromSecondCurrencyInput.value)

  if (firstInputValue < 0) {
    window.alert(t(StringKey.window_alert_negative_number));
    return;
  }

  // Determine values based on whether we are updating from the first or second input
  const amount = (reverse ? secondInputValue : firstInputValue) || 0;
  const fromSelectBaseCurrency = reverse ? toCurrency : fromCurrency
  const toSelectDesiredCurrency = reverse ? fromCurrency : toCurrency

  const result = convert({
    amount: amount,
    fromSelectBaseCurrency: fromSelectBaseCurrency,
    toSelectDesiredCurrency: toSelectDesiredCurrency,
    rates: data.rates,
    base: data.base
  });

  const inputToUpdate = reverse
    ? amountFromFirstCurrencyInput
    : amountFromSecondCurrencyInput

  inputToUpdate.value = result.toFixed(2)
};

let isUpdating = false;

export const resetUpdateLock = () => isUpdating = false;

export const updateLock = async (action: () => Promise<unknown>) => {
  if (isUpdating) return;
  
  isUpdating = true;

  try {
    await action();
  } finally {
    isUpdating = false;
  }
};