import type { DOMService } from "./DOMService";

export class DOMServiceFake implements DOMService {
  getBaseCurrencySelect = () => document.createElement('select');
  getDesiredCurrencySelect = () => document.createElement('select');
  getFirstInputAmount = () => document.createElement('input');
  getSecondInputAmount = () => document.createElement('input');
  getLiveCurrenciesContainer = () => document.createElement('div');
  getTitleContainer = () => document.createElement('div');
  getSubtitleContainer = () => document.createElement('div');
  populateSelect = () => {} ;
  addEventListener = () => {};
}