import { describe, it, beforeEach, expect } from "vitest";
import { DOMServiceImpl } from "./DOMServiceImpl";

let dom: DOMServiceImpl;

describe('DOMServiceImpl', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="baseCurrency"></select>
      <select id="desiredCurrency"></select>
      <input id="amountFromFirstInput" />
      <input id="amountFromSecondInput" />
      <div id="liveCurrenciesContainer"></div>
      <div id="titleContainer"></div>
      <div id="subtitleContainer"></div>
    `;
    dom = new DOMServiceImpl();
  });

  it('should return the base currency select element', () => {
    expect(dom.getBaseCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  it('should return the desired currency select element', () => {
    expect(dom.getDesiredCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  it('should return the amount from first input element', () => {
    expect(dom.getFirstInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  it('should return the amount from second input element', () => {
    expect(dom.getSecondInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  it('should return the live currencies container element', () => {
    expect(dom.getLiveCurrenciesContainer()).toBeInstanceOf(HTMLElement)
  })

  it('should return the title container element', () => {
    expect(dom.getTitleContainer()).toBeInstanceOf(HTMLElement)
  })

  it('should return the subtitle container element', () => {
    expect(dom.getSubtitleContainer()).toBeInstanceOf(HTMLElement)
  })

  it('should populate select elemenet with 2 currencies', () => {
    const select = dom.getBaseCurrencySelect() as HTMLSelectElement;
    dom.populateSelect(select!, {
      USD: { code: 'USD', name: 'USD Dollar' },
      EUR: { code: 'EUR', name: 'Euro' }
    })

    expect(select.options.length).toBe(2)
    expect((select.options[0] as HTMLOptionElement).value).toBe('USD')
    expect((select.options[1] as HTMLOptionElement).value).toBe('EUR')
  })

  it('should trigger an event listener when called', () => {
    const input = dom.getFirstInputAmount();
    let called = false;
    dom.addEventListener(input, 'input', () => { called = true })
    input.dispatchEvent(new Event('input'))

    expect(called).toBe(true);
  })
})