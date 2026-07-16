import { describe, it, beforeEach, expect } from "vitest";
import { DOMServiceFake } from "./DOMServiceFake";

let dom: DOMServiceFake;

describe('DOMServiceFake', () => {
  beforeEach(() => {
    dom = new DOMServiceFake();
  });

  it('should return a select element for getBaseCurrencySelect', () => {
    expect(dom.getBaseCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  it('should return a select element for getDesiredCurrencySelect', () => {
    expect(dom.getDesiredCurrencySelect()).toBeInstanceOf(HTMLSelectElement)
  })

  it('should return an input element for getFirstInputAmount', () => {
    expect(dom.getFirstInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  it('should return an input element for getSecondInputAmount', () => {
    expect(dom.getSecondInputAmount()).toBeInstanceOf(HTMLInputElement)
  })

  it('should return a div element for getLiveCurrenciesContainer', () => {
    expect(dom.getLiveCurrenciesContainer()).toBeInstanceOf(HTMLDivElement)
  })

  it('should return a div element for getTitleContainer', () => {
    expect(dom.getTitleContainer()).toBeInstanceOf(HTMLDivElement)
  })

  it('should return a div elemenent for', () => {
    expect(dom.getSubtitleContainer()).toBeInstanceOf(HTMLDivElement)
  })

  it('should not crashed when populateSelect is called', () => {
    const select = document.createElement('select');

    expect(() => dom.populateSelect(select, { USD: { code: 'USD', name: 'US Dollar' } })).not.toThrow();
  })

  it('should not crashed when addEventListener is called', () => {
    const input = document.createElement('input');

    expect(() => dom.addEventListener(input, 'input', () => { })).not.toThrow();
  })
})