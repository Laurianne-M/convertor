import type { Currency } from "../../features/homepage/homepage.types";

/**
 * Provides a unified interface for interacting with the DOM.
 * Consolidating all DOM manipulation here facilitates a future migration to React.
 */
export interface DOMService {
  /** Returns the base currency select element. */
  getBaseCurrencySelect(): HTMLSelectElement;

  /** Returns the desired currency select element. */
  getDesiredCurrencySelect(): HTMLSelectElement;

  /** Returns the first amount input element. */
  getFirstInputAmount(): HTMLInputElement;

  /** Returns the second amount input element. */
  getSecondInputAmount(): HTMLInputElement;

  /** Returns the live currencies container element. */
  getLiveCurrenciesContainer(): HTMLElement;

  /** Returns the title container element. */
  getTitleContainer(): HTMLElement;

  /** Returns the subtitle container element. */
  getSubtitleContainer(): HTMLElement;

  /** Populates a select element with the given currency options. */
  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void;

  /** Registers an event listener on a dom element. */
  addEventListener(element: HTMLElement, event: string, callback: () => void): void;
}