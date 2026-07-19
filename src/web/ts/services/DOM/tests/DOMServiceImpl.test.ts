import { describe, test, beforeEach, expect } from "vitest";
import { DOMServiceImpl } from "../DOMServiceImpl";

const DOM_TEMPLATE = `
      <select id="baseCurrency"></select>
      <select id="desiredCurrency"></select>
      <input id="amountFromFirstInput" />
      <input id="amountFromSecondInput" />
      <div id="liveCurrenciesContainer"></div>
      <div id="titleContainer"></div>
      <div id="subtitleContainer"></div>
    `;

describe('DOMServiceImpl', () => {
  let dom: DOMServiceImpl;

  beforeEach(() => {
    document.body.innerHTML = DOM_TEMPLATE;
    dom = new DOMServiceImpl();
  });

  test('should return the base currency select element', () => {
    expect(dom.getBaseCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  test('should return the desired currency select element', () => {
    expect(dom.getDesiredCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  test('should return the amount from first input element', () => {
    expect(dom.getFirstInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  test('should return the amount from second input element', () => {
    expect(dom.getSecondInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  test('should return the live currencies container element', () => {
    expect(dom.getLiveCurrenciesContainer()).toBeInstanceOf(HTMLElement)
  })

  test('should return the title container element', () => {
    expect(dom.getTitleContainer()).toBeInstanceOf(HTMLElement)
  })

  test('should return the subtitle container element', () => {
    expect(dom.getSubtitleContainer()).toBeInstanceOf(HTMLElement)
  })

  test('should populate select elemenet with 2 currencies', () => {
    const select = dom.getBaseCurrencySelect() as HTMLSelectElement;
    dom.populateSelect(select!, {
      USD: { code: 'USD', name: 'USD Dollar' },
      EUR: { code: 'EUR', name: 'Euro' }
    })

    expect(select.options.length).toBe(2)
    expect((select.options[0] as HTMLOptionElement).value).toBe('USD')
    expect((select.options[1] as HTMLOptionElement).value).toBe('EUR')
  })

  test('should trigger an event listener when called', () => {
    const input = dom.getFirstInputAmount()!;
    let called = false;
    dom.addEventListener(input, 'input', () => { called = true })
    input.dispatchEvent(new Event('input'))

    expect(called).toBe(true);
  })
})