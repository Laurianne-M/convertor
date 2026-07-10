import {
  html
} from "./element.js";

import {
  populateLiveNavbar,
  updateLock,
  updateAmount,
  populateContainer,
  populateTitle,
  populateLangSelector
} from "./features/homepage/homepage.js";

import { setLocale } from "./i18n/i18n.js";

import {
  currencies,
  documentEvents,
  UI_STRINGS
} from './constants.js'

import { ServiceContainerImpl } from "./container/services/ServiceContainerImpl.js";

export const main = async () => {
  const baseCurrencySelect = html.elements.getBaseCurrencySelect();
  const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
  const liveCurrenciesContainer = html.elements.getLiveCurrenciesContainer();
  const subtitleContainer = html.elements.getSubtitleContainer();
  html.elements.populateSelect(baseCurrencySelect, currencies);
  html.elements.populateSelect(desiredCurrencySelect, currencies);
  
  const container = new ServiceContainerImpl;

  const data = await container.exchangeRateService.loadRates();
  const subtitle = UI_STRINGS.subtitle;
  const liveCurrencies = UI_STRINGS.liveCurrencies;
  const title = UI_STRINGS.title;

  populateContainer(liveCurrenciesContainer, liveCurrencies); 
  populateContainer(subtitleContainer, subtitle);
  populateTitle(title);
  populateLiveNavbar( { rates: data.rates, logger: container.logger } );
  populateLangSelector(UI_STRINGS.language, (lang) => {
    setLocale(lang);
    location.reload();
  })

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
    container.logger
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
        container.logger
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
        container.logger
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
        container.logger
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
        container.logger
      ))
    }
  );
}