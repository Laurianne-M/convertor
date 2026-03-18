import { describe, it, expect, beforeEach, vi } from "vitest";
import { convert, updateAmount } from "./logic.js";
import { getMockRates, loadRates } from "../api/api.js";
import { html } from "../element.js";

vi.mock("../api/api.js");
vi.mock('../element.js', () => ({
  elements: {
    getBaseCurrencySelect: vi.fn().mockReturnValue({ value: 'EUR' }),
    getDesiredCurrencySelect: vi.fn().mockReturnValue({ value: 'USD' }),
    getAmoutFromFirstInput: vi.fn(),
    getAmountFromSecondInput: vi.fn(),
    populateSelect: vi.fn(),
  },
  html: {
    id: {},
    elements: {
      getBaseCurrencySelect: vi.fn().mockReturnValue({ value: 'EUR' }),
      getDesiredCurrencySelect: vi.fn().mockReturnValue({ value: 'USD' }),
      getAmoutFromFirstInput: vi.fn(),
      getAmountFromSecondInput: vi.fn(),
      populateSelect: vi.fn(),
    }
  }
}));

describe('convert', () => {
    it('should return amount if the 2 currencies are the same', () => {
        
        const operation = {
            amount: 569,
            fromSelectBaseCurrency: 'USD',
            toSelectDesiredCurrency: 'USD'
        }
        const result = convert(operation);

        expect(result).toBe(operation.amount);
    });

    it('should return 0 if the rate is equal to 0  ', () => {
        const operation = {
            amount: 569,
            fromSelectBaseCurrency: 'USD', 
            toSelectDesiredCurrency: 'EUR', 
            rates: {
            'EUR': 1.1,
            'USD': 0
            },
            base: 'EUR'
        } 

        const result = convert(operation);

        expect(result).toBe(0); 
    });

    it('should return amountInBase if toSelectDesiredCurrency is equal to the base', () => {
        const operation = {
            amount: 500,
            fromSelectBaseCurrency: 'CAD', 
            toSelectDesiredCurrency:'EUR', 
            rates : {
            'EUR': 1.5,
            'CAD': 2
        },
            base: 'EUR' 
        };

        const amountInBase = operation.amount / operation.rates.CAD

        const result = convert(operation);

        expect(result).toBe(amountInBase);
    });

    it('should multiply the amount by the rates if toSelectDesiredCurrency is different from the base', () => {
        const operation = {
            amount: 500,
            fromSelectBaseCurrency: 'EUR', 
            toSelectDesiredCurrency:'USD', 
            rates : {
            'USD': 1.5
        },
            base: 'EUR' 
        };

        const result = convert(operation);

        expect(result).toBe(750); 

    });

    it('should divide the amount by the rate if that rate is diferent from the Select Base Currency', () => {
        const operation = { 
            
            amount: 100,
            fromSelectBaseCurrency: 'USD', 
            toSelectDesiredCurrency:'EUR', 
            rates : {
            'EUR': 2,
            'USD': 2,
        },
            base: 'EUR' 
        };

        const result = convert(operation);

        expect(result).toBe(50); 

        
    });

    
});

describe('LoadRates', () => {
    it('should download mockup data if API request is available', async () => {
        const data = await loadRates();

        const mockData = getMockRates(); 

        expect(data).toStrictEqual(mockData);
    });
})

describe('UpdateAmount', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // reset mocks between each test
    }); 

    it('should update the second input with converted amount (not reverse)', async () => {
        loadRates.mockResolvedValue({rates: {EUR: 1, USD: 1.1}, base: 'EUR'});

        const firstInput = {value: 100};
        const secondInput = {value: ''};

        await updateAmount(firstInput, secondInput, false);
        
        expect(secondInput.value).toBe('110.00');
    });

    it('should update the first input with converted amount (reverse)', async () => {
        loadRates.mockResolvedValue({rates: {EUR: 1, USD: 1.1}, base: 'EUR'});

        const firstInput = {value: ''};
        const secondInput = {value: 110}; 

        await updateAmount(firstInput, secondInput, true);

        expect(firstInput.value).toBe('100.00');
    });

    it('should do nothing if loadRates failed', async () => {
        loadRates.mockResolvedValue(null); 

        const firstInput = {value: ''};
        const secondInput = {value: 100};

        await updateAmount(firstInput, secondInput, true);

        expect(firstInput.value).toBe('');
    })
})