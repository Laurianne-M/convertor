import { describe, test, beforeEach, expect } from "vitest";
import { DOMServiceFake } from "../DOMServiceFake";



describe('DOMServiceFake', () => {
  let dom: DOMServiceFake;

  beforeEach(() => {
    dom = new DOMServiceFake();
  });

  test('should return a select element for getBaseCurrencySelect', () => {
    expect(dom.getBaseCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  test('should return a select element for getDesiredCurrencySelect', () => {
    expect(dom.getDesiredCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  test('should return an input element for getFirstInputAmount', () => {
    expect(dom.getFirstInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  test('should return an input element for getSecondInputAmount', () => {
    expect(dom.getSecondInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  test('should return a div element for getLiveCurrenciesContainer', () => {
    expect(dom.getLiveCurrenciesContainer()).toBeInstanceOf(HTMLDivElement)
  })

  test('should return a div element for getTitleContainer', () => {
    expect(dom.getTitleContainer()).toBeInstanceOf(HTMLDivElement)
  })

  test('should return a div elemenent for', () => {
    expect(dom.getSubtitleContainer()).toBeInstanceOf(HTMLDivElement)
  })

  test('should not crashed when populateSelect is called', () => {
    const select = document.createElement('select');

    expect(() => dom.populateSelect(select, { USD: { code: 'USD', name: 'US Dollar' } })).not.toThrow();
  })

  test('should not crashed when addEventListener is called', () => {
    const input = document.createElement('input');

    expect(() => dom.addEventListener(input, 'input', () => { })).not.toThrow();
  })
})