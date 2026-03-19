import { describe, it, expect, beforeEach, vi } from "vitest";
import { updateAmount } from "../logic/logic.js";
import { getMockRates, loadRates } from "../api/api.js";

vi.mock("../api/api.js");
vi.mock('../element.js', () => ( {
  elements: {
    getBaseCurrencySelect: vi.fn().mockReturnValue( { value: 'EUR' } ),
    getDesiredCurrencySelect: vi.fn().mockReturnValue( { value: 'USD' } ),
    getAmoutFromFirstInput: vi.fn(),
    getAmountFromSecondInput: vi.fn(),
    populateSelect: vi.fn(),
  },
  html: {
    id: {},
    elements: {
      getBaseCurrencySelect: vi.fn().mockReturnValue( { value: 'EUR' } ),
      getDesiredCurrencySelect: vi.fn().mockReturnValue( { value: 'USD' } ),
      getAmoutFromFirstInput: vi.fn(),
      getAmountFromSecondInput: vi.fn(),
      populateSelect: vi.fn(),
    }
  }
} ));

describe('UpdateAmount', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // reset mocks between each test
    } ); 

    it('should update the second input with converted amount (not reverse)', async () => {
        loadRates.mockResolvedValue( { rates: { EUR: 1, USD: 1.1 } , base: 'EUR'} );

        const firstInput = { value: 100 };
        const secondInput = { value: '' };

        await updateAmount(firstInput, secondInput, false);
        
        expect(secondInput.value).toBe('110.00');
    } );

    it('should update the first input with converted amount (reverse)', async () => {
        loadRates.mockResolvedValue( {rates: { EUR: 1, USD: 1.1 }, base: 'EUR' } );

        const firstInput = { value: '' };
        const secondInput = { value: 110 }; 

        await updateAmount(firstInput, secondInput, true);

        expect(firstInput.value).toBe('100.00');
    } );

    it('should do nothing if loadRates failed', async () => {
        loadRates.mockResolvedValue(null); 

        const firstInput = { value: '' };
        const secondInput = { value: 100 };

        await updateAmount(firstInput, secondInput, true);

        expect(firstInput.value).toBe('');
    } );
} );