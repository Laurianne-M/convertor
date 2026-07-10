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
  AppConstants,
} from './constants.js'

import { ServiceContainerImpl } from "./container/services/ServiceContainerImpl.js";

export const main = async () => {
  const baseCurrencySelect = html.elements.getBaseCurrencySelect();
  const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
  const liveCurrenciesContainer = html.elements.getLiveCurrenciesContainer();
  const subtitleContainer = html.elements.getSubtitleContainer();
  html.elements.populateSelect(baseCurrencySelect, AppConstants.currencies);
  html.elements.populateSelect(desiredCurrencySelect, AppConstants.currencies);
  
  const container = new ServiceContainerImpl;

  const data = await container.exchangeRateService.loadRates();
  const subtitle = AppConstants.UI_STRINGS.subtitle;
  const liveCurrencies = AppConstants.UI_STRINGS.liveCurrencies;
  const title = AppConstants.UI_STRINGS.title;

  populateContainer(liveCurrenciesContainer, liveCurrencies); 
  populateContainer(subtitleContainer, subtitle);
  populateTitle(title);
  populateLiveNavbar( { rates: data.rates, logger: container.logger } );
  populateLangSelector(AppConstants.UI_STRINGS.language, (lang) => {
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
    AppConstants.documentEvents.input, () => { 
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
    AppConstants.documentEvents.change, () => {
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
    AppConstants.documentEvents.change, () => {
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
    AppConstants.documentEvents.input, () =>  {
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