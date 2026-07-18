import type { DOMService } from "./DOMService";
import type { Currency } from "../../features/homepage/homepage.types";

const HTML_ELEMENT_IDS = {
  select: {
    baseCurrency: "baseCurrency",
    desiredCurrency: "desiredCurrency",
    option: "option"
  },
  input: {
    firstAmount: "amountFromFirstInput",
    secondAmount: "amountFromSecondInput",
  },
  container: {
    currencies: "liveCurrenciesContainer",
    title: "titleContainer",
    subtitle: "subtitleContainer"
  }
};

/**
 * Real implementation of DOMService that interacts with the browser
 */
export class DOMServiceImpl implements DOMService {
  getBaseCurrencySelect(): HTMLSelectElement {
    return document.getElementById(HTML_ELEMENT_IDS.select.baseCurrency) as HTMLSelectElement
  }

  getDesiredCurrencySelect(): HTMLSelectElement {
    return document.getElementById(HTML_ELEMENT_IDS.select.desiredCurrency) as HTMLSelectElement
  }

  getFirstInputAmount(): HTMLInputElement {
    return document.getElementById(HTML_ELEMENT_IDS.input.firstAmount) as HTMLInputElement
  }

  getSecondInputAmount(): HTMLInputElement {
    return document.getElementById(HTML_ELEMENT_IDS.input.secondAmount) as HTMLInputElement
  }

  getLiveCurrenciesContainer(): HTMLElement {
    return document.getElementById(HTML_ELEMENT_IDS.container.currencies) as HTMLElement
  }

  getTitleContainer(): HTMLElement {
    return document.getElementById(HTML_ELEMENT_IDS.container.title) as HTMLElement
  }

  getSubtitleContainer(): HTMLElement {
    return document.getElementById(HTML_ELEMENT_IDS.container.subtitle) as HTMLElement
  }

  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void {
    if (!select) return;
    select.innerHTML = "";
    Object.values(options).forEach(option => {
      const element = document.createElement(HTML_ELEMENT_IDS.select.option) as HTMLOptionElement;
      if (!element) return;
      element.value = option.code;
      element.textContent = option.name;
      select.appendChild(element);
    });
  }

  addEventListener(element: HTMLElement, event: string, callback: () => void): void {
    element.addEventListener(event, callback)
  }
}