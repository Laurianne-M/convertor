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
  const container = new ServiceContainerImpl;

  const baseCurrencySelect = container.dom.getBaseCurrencySelect();
  const desiredCurrencySelect = container.dom.getDesiredCurrencySelect();
  const liveCurrenciesContainer = container.dom.getLiveCurrenciesContainer();
  const subtitleContainer = container.dom.getSubtitleContainer();
  container.dom.populateSelect(baseCurrencySelect, AppConstants.currencies);
  container.dom.populateSelect(desiredCurrencySelect, AppConstants.currencies);
  
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

  const amountFromFirstCurrencyInput = container.dom.getFirstInputAmount();
  if (!amountFromFirstCurrencyInput) return;
  const amountFromSecondCurrencyInput = container.dom.getSecondInputAmount();

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

  container.dom.addEventListener(
    container.dom.getFirstInputAmount(),
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

  container.dom.addEventListener(
    container.dom.getBaseCurrencySelect(),
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

  container.dom.addEventListener(
    container.dom.getDesiredCurrencySelect(),
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

  container.dom.addEventListener(
    container.dom.getSecondInputAmount(),
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