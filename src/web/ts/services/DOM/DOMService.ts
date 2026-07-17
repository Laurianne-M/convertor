import type { HTMLSelectElement } from "happy-dom";
import type { Currency } from "../../features/homepage/homepage.types";

/**
 * Provides a unified interface for interacting with the DOM.
 * Consolidating all DOM manipulation here facilitates a future migration to React.
 */
export interface DOMService {

  getBaseCurrencySelect(): HTMLSelectElement;

  getDesiredCurrencySelect(): HTMLSelectElement;

  getFirstInputAmount(): HTMLInputElement;

  getSecondInputAmount(): HTMLInputElement;


  getLiveCurrenciesContainer(): HTMLElement;

  
  getTitleContainer(): HTMLElement;

 
  getSubtitleContainer(): HTMLElement;

  /** Populates a select element with the given currency options. */
  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void;

  /** Registers an event listener on a dom element. */
  addEventListener(element: HTMLElement, event: string, callback: () => void): void;
}