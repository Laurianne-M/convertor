import {
  html
} from "./element.js";

import {
  ExchangeRateServiceImp 
} from "./services/ExchangeRate/ExchangeRateServiceImp.js";

import {
  TimeProviderServiceImpl
} from "./services/TimeProvider/TImeProviderServiceImp.js";

import { StorageServiceImpl } from "./services/Storage/StorageServiceImpl";

import {
  populateLiveNavbar,
  updateLock,
  updateAmount
} from "./logic/logic.js";

import {
  currencies,
  documentEvents
} from './constants.js'

import { LoggerServiceImpl } from "./services/Logger/LoggerServiceImpl.js";

export const main = async () => {
  const baseCurrencySelect = html.elements.getBaseCurrencySelect();
  const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
  html.elements.populateSelect(baseCurrencySelect, currencies);
  html.elements.populateSelect(desiredCurrencySelect, currencies);
    
  const timeProvider = new TimeProviderServiceImpl();
  const storage = new StorageServiceImpl();
  const logger = new LoggerServiceImpl();


  const exchangeRateService = new ExchangeRateServiceImp({
    fetch, 
    timeProvider,
    storage,
    logger
  });


    
  const data = await exchangeRateService.loadRates();

  console.log(data);
  populateLiveNavbar( { rates: data.rates, logger } );

  const amountFromFirstCurrencyInput = html.elements.getFirstInputAmount();
  if (!amountFromFirstCurrencyInput) return;
  const amountFromSecondCurrencyInput = html.elements.getSecondInputAmount();

  amountFromFirstCurrencyInput.value = "1"; 
  desiredCurrencySelect.value = 'EUR';

  updateAmount(
    data,
    amountFromFirstCurrencyInput,
    amountFromSecondCurrencyInput,
    false,
    baseCurrencySelect?.value,
    desiredCurrencySelect?.value,
    logger
  );

  amountFromFirstCurrencyInput.addEventListener(
    documentEvents.input, () => { 
      updateLock(() => updateAmount(
        data,
        amountFromFirstCurrencyInput,
        amountFromSecondCurrencyInput,
        false,
        baseCurrencySelect?.value,
        desiredCurrencySelect?.value,
        logger
      ))
    }
  );

  baseCurrencySelect.addEventListener(
    documentEvents.change, () => {
      updateLock(() => updateAmount(
        data,
        amountFromFirstCurrencyInput,
        amountFromSecondCurrencyInput,
        false,
        baseCurrencySelect?.value,
        desiredCurrencySelect?.value,
        logger
      ))
    }
  );

  desiredCurrencySelect.addEventListener(
    documentEvents.change, () => {
      updateLock(() => updateAmount(
        data,
        amountFromFirstCurrencyInput,
        amountFromSecondCurrencyInput,
        false,
        baseCurrencySelect?.value,
        desiredCurrencySelect?.value,
        logger
      ))
    }
  );

  amountFromSecondCurrencyInput.addEventListener(
    documentEvents.input, () =>  {
      updateLock(() => updateAmount(
        data,
        amountFromFirstCurrencyInput,
        amountFromSecondCurrencyInput,
        true,
        baseCurrencySelect?.value,
        desiredCurrencySelect?.value,
        logger
      ))
    }
  );
}