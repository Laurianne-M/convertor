import { describe, expect, it, vi, beforeEach } from "vitest";
import { getMockRates, loadRates } from "../api/api";

describe('loadRates', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('should return the data if data exist and are not outdated', async () => {
        const mockedData = { jsonData: { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } , receivedAt: new Date() };
        localStorage.setItem("data", JSON.stringify(mockedData));

        expect(await loadRates()).toEqual(expect.objectContaining( { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } ));
    } );

    it('it should fetch new data from the API if the data do not exist or are outdaded', async () => {
       
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" })
            } )
        );

        expect(await loadRates()).toEqual(expect.objectContaining( { rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" } ));
    } ); 

    it('it should return the mocked Data if data doesnt exist and the API responds with no rates (reach limit)', async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ error: true, message: "monthly limit reached" })
            } )
        );

        expect(await loadRates()).toEqual(expect.objectContaining( { rates: getMockRates().rates, base: getMockRates().base } ));
    } );

    it('it should return mocked Data in case of fetch failure (network error)', async () => {
        global.fetch = vi.fn (() => Promise.reject(new Error('network failure')))

        expect(await loadRates()).toEqual(expect.objectContaining( { rates: getMockRates().rates, base: getMockRates().base } ));
    } );
} );

