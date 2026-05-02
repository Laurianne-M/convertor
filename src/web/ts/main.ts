import {
  html
} from "./element.js";

import {
  ExchangeRateServiceImp 
} from "./services/ExchangeRate/ExchangeRateServiceImp.js";

import {
  TimeProviderServiceImpl
} from "./services/TimeProvider/TImeProviderServiceImp.js";

import { StorageServiceImpl } from "./services/Storage/StorageServiceImpl.js";

import {
  populateLiveNavbar,
  updateLock,
  updateAmount,
  populateContainer,
  populateTitle
} from "./logic/logic.js";

import {
  currencies,
  documentEvents,
  UI_STRINGS
} from './constants.js'

import { LoggerServiceImpl } from "./services/Logger/LoggerServiceImpl.js";

export const main = async () => {
  const baseCurrencySelect = html.elements.getBaseCurrencySelect();
  const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
  const liveCurrenciesContainer = html.elements.getLiveCurrenciesContainer();
  const subtitleContainer = html.elements.getSubtitleContainer();
  html.elements.populateSelect(baseCurrencySelect, currencies);
  html.elements.populateSelect(desiredCurrencySelect, currencies);
    
  const timeProvider = new TimeProviderServiceImpl();
  const logger = new LoggerServiceImpl();
  const storage = new StorageServiceImpl(logger);

  const exchangeRateService = new ExchangeRateServiceImp({
    fetch, 
    timeProvider,
    storage,
    logger
  });


    
  const data = await exchangeRateService.loadRates();
  console.log(data);
  const subtitle = UI_STRINGS.subtitle;
  const liveCurrencies = UI_STRINGS.liveCurrencies;
  const title = UI_STRINGS.title;

  populateContainer(liveCurrenciesContainer, liveCurrencies); 
  populateContainer(subtitleContainer, subtitle);
  populateTitle(title);
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