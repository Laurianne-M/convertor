import type { DOMService } from "./DOMService";
import type { Currency } from "../../features/homepage/homepage.types";

const id = {
  select : {
    baseCurrency: "baseCurrency",
    desiredCurrency: "desiredCurrency",
    option: "option"
  }, 
  input : {
    firstAmount: "amountFromFirstInput",
    secondAmount: "amountFromSecondInput", 
  }, 
  container : {
    currencies: "liveCurrenciesContainer",
    title: "titleContainer",
    subtitle: "subtitleContainer"
  }
};

export class DOMServiceImpl implements DOMService {
  getBaseCurrencySelect(): HTMLSelectElement{
    return document.getElementById(id.select.baseCurrency) as HTMLSelectElement
  }

  getDesiredCurrencySelect(): HTMLSelectElement {
    return document.getElementById(id.select.desiredCurrency) as HTMLSelectElement
  }

  getFirstInputAmount(): HTMLInputElement {
    return document.getElementById(id.input.firstAmount) as HTMLInputElement
  }

  getSecondInputAmount(): HTMLInputElement {
    return document.getElementById(id.input.secondAmount) as HTMLInputElement
  }

  getLiveCurrenciesContainer(): HTMLElement {
    return document.getElementById(id.container.currencies) as HTMLElement
  }

  getTitleContainer(): HTMLElement {
    return document.getElementById(id.container.title) as HTMLElement
  }

  getSubtitleContainer(): HTMLElement {
    return document.getElementById(id.container.subtitle) as HTMLElement
  }

  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void {
    if (!select) return;
    select.innerHTML = "";
    Object.values(options).forEach(option => {
      const element = document.createElement(id.select.option) as HTMLOptionElement;
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