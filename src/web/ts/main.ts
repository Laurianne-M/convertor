import {
  populateLiveNavbar,
  updateLock,
  updateAmount,
  populateContainer,
  populateTitle,
  populateLangSelector
} from "./features/homepage/homepage.js";

import {
  AppConstants,
} from './constants.js'

import { ServiceContainerImpl } from "./services/ServiceContainer/ServiceContainerImpl.js";
import type { ServiceContainer } from "./services/ServiceContainer/ServiceContainer.js";

export const setupHomepage = async (
  container: ServiceContainer,
  baseCurrencySelect: HTMLSelectElement,
  desiredCurrencySelect: HTMLSelectElement,
  liveCurrenciesContainer: HTMLElement,
  subtitleContainer: HTMLElement,
  amountFromFirstCurrencyInput: HTMLInputElement,
  amountFromSecondCurrencyInput: HTMLInputElement
) => {
  container.dom.populateSelect(baseCurrencySelect, AppConstants.getCurrencies(container.localization));
  container.dom.populateSelect(desiredCurrencySelect, AppConstants.getCurrencies(container.localization));
  
  const data = await container.exchangeRateService.loadRates();
  const uiStrings = AppConstants.getUIStrings(container.localization);
  const subtitle = uiStrings.subtitle;
  const liveCurrencies = uiStrings.liveCurrencies;
  const title = uiStrings.title;

  populateContainer(liveCurrenciesContainer, liveCurrencies); 
  populateContainer(subtitleContainer, subtitle);
  populateTitle(title);
  populateLiveNavbar({ rates: data.rates, logger: container.logger });
  populateLangSelector(uiStrings.language, (lang) => {
    container.localization.setLocale(lang);
    location.reload();
  }, container.localization)

  amountFromFirstCurrencyInput.value = "1";
  desiredCurrencySelect.value = 'EUR';
  
  updateAmount(
    data,
    amountFromFirstCurrencyInput,
    amountFromSecondCurrencyInput,
    false,
    baseCurrencySelect?.value,
    desiredCurrencySelect?.value,
    container.logger,
    container.localization
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
        container.logger,
        container.localization
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
        container.logger,
        container.localization
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
        container.logger,
        container.localization
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
        container.logger,
        container.localization
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