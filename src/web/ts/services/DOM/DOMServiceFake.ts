import type { DOMService } from "./DOMService";
import type { Currency } from "../../features/homepage/homepage.types";

export class DOMServiceFake implements DOMService {
  getBaseCurrencySelect = () => document.createElement('select');
  getDesiredCurrencySelect = () => document.createElement('select');
  getFirstInputAmount = () => document.createElement('input');
  getSecondInputAmount = () => document.createElement('input');
  getLiveCurrenciesContainer = () => document.createElement('div');
  getTitleContainer = () => document.createElement('div');
  getSubtitleContainer = () => document.createElement('div');
  populateSelect = (select: HTMLElement, options: Record<string, Currency>) => { };
  addEventListener = (element: HTMLElement, event: string, callback: () => void) => { };
}