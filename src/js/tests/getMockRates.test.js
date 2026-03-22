import { describe, it, expect } from "vitest"; 
import { getMockRates } from "../api/api";

describe('getMockRates', () => {

    it('should return the mocked data', () => { 
        expect(getMockRates()).toEqual(expect.objectContaining( { rates: getMockRates().rates, base: getMockRates().base } ));
} );
} );
    