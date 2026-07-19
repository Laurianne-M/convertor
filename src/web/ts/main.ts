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
import type { ServiceContainer } from "./container/services/ServiceContainer.js";

export const setupHomepage = async (
  container: ServiceContainer,
  baseCurrencySelect: HTMLSelectElement,
  desiredCurrencySelect: HTMLSelectElement,
  liveCurrenciesContainer: HTMLElement,
  subtitleContainer: HTMLElement,
  amountFromFirstCurrencyInput: HTMLInputElement,
  amountFromSecondCurrencyInput: HTMLInputElement
) => {
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
    amountFromFirstCurrencyInput,
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
    baseCurrencySelect,
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
    desiredCurrencySelect,
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
    amountFromSecondCurrencyInput,
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

export const main = async () => {
  const container = new ServiceContainerImpl;
  const baseCurrencySelect = container.dom.getBaseCurrencySelect();
  const desiredCurrencySelect = container.dom.getDesiredCurrencySelect();
  const liveCurrenciesContainer = container.dom.getLiveCurrenciesContainer();
  const subtitleContainer = container.dom.getSubtitleContainer();
  const amountFromFirstCurrencyInput = container.dom.getFirstInputAmount();
  const amountFromSecondCurrencyInput = container.dom.getSecondInputAmount();

  if (
    baseCurrencySelect &&
    desiredCurrencySelect &&
    liveCurrenciesContainer &&
    subtitleContainer &&
    amountFromFirstCurrencyInput &&
    amountFromSecondCurrencyInput
  ) {
      setupHomepage(
        container,
        baseCurrencySelect,
        desiredCurrencySelect,
        liveCurrenciesContainer,
        subtitleContainer,
        amountFromFirstCurrencyInput,
        amountFromSecondCurrencyInput
      )
  }
}