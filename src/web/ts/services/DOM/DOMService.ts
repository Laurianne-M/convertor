import type { Currency } from "../../features/homepage/homepage.types";

/**
 * Provides a unified interface for interacting with the DOM.
 * Consolidating all DOM manipulation here facilitates a future migration to React.
 */

//TODO - Resolve https://github.com/Laurianne-M/convertor/issues/95
export interface DOMService {
  /**
   * Returns the base currency select element.
   * @returns {HTMLSelectElement} The base currency select element.
   */
  getBaseCurrencySelect(): HTMLSelectElement;

  /**
   * Returns the desired currency select element.
   * @returns {HTMLSelectElement} The desired currency select element.
   */
  getDesiredCurrencySelect(): HTMLSelectElement;

  /**
   * Returns the first amount input element.
   * @returns {HTMLInputElement} The first amount input element.
   */
  getFirstInputAmount(): HTMLInputElement;

  /**
   * Returns the second amount input element.
   * @returns {HTMLInputElement} The second amount input element.
   */
  getSecondInputAmount(): HTMLInputElement;

  /**
   * Returns the live currencies container element.
   * @returns {HTMLElement} The live currencies container element.
   */
  getLiveCurrenciesContainer(): HTMLElement;

  /**
   * Returns the title container element.
   * @returns {HTMLElement} The title container element.
   */
  getTitleContainer(): HTMLElement;

  /**
   * Returns the subtitle container element.
   * @returns {HTMLElement} The subtitle container element.
   */
  getSubtitleContainer(): HTMLElement;

  /**
   * Populates a select element with the given currency options.
   * @param {HTMLSelectElement} select - The select element to populate.
   * @param {Record<string, Currency>} options - The currency options to populate the select with.
   * @returns {void}
   */
  populateSelect(select: HTMLSelectElement, options: Record<string, Currency>): void;

  /**
   * Registers an event listener on a dom element.
   * @param {HTMLElement} element - The element to attach the event listener to.
   * @param {string} event - The event type to listen for.
   * @param {() => void} callback - The callback to invoke when the event fires.
   * @returns {void}
   */
  addEventListener(element: HTMLElement, event: string, callback: () => void): void;
}