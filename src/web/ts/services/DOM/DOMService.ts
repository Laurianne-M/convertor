/**
 * Provides a unified interface for interacting with the DOM.
 * Consolidating all DOM manipulation here facilitates a future migration to React.
 */

import type { Currency } from "../../features/homepage/homepage.types";

export interface DOMService {
  getBaseCurrencySelect(): HTMLSelectElement;

  getDesiredCurrencySelect(): HTMLSelectElement;

  getFirstInputAmount(): HTMLInputElement;

  getSecondInputAmount(): HTMLInputElement;

  getLiveCurrenciesContainer(): HTMLInputElement;

  getTitleContainer(): HTMLInputElement;

  getSubtitleContainer(): HTMLInputElement;

  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void;

  addEventListener(element: HTMLElement, event: string, callback: () => void): void;
}