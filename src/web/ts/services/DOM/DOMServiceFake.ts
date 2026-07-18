import type { DOMService } from "./DOMService";
import type { Currency } from "../../features/homepage/homepage.types";

/**
 * Fake implementation of DOMService, used in tests.
 */
export class DOMServiceFake implements DOMService {
  private createSelect = () => document.createElement('select');
  private createInput = () => document.createElement('input');
  private createDiv = () => document.createElement('div');

  getBaseCurrencySelect = () => this.createSelect();
  getDesiredCurrencySelect = () => this.createSelect();
  getFirstInputAmount = () => this.createInput();
  getSecondInputAmount = () => this.createInput();
  getLiveCurrenciesContainer = () => this.createDiv();
  getTitleContainer = () => this.createDiv();
  getSubtitleContainer = () => this.createDiv();
  populateSelect = (select: HTMLElement, options: Record<string, Currency>) => { };
  addEventListener = (element: HTMLElement, event: string, callback: () => void) => { };
}