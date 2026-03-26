import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { loadRates, areDataOutdated } from "../api/api"; 

describe("localStorageCashingFlow", () => { 

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks()
        localStorage.clear();
    } );

    afterEach(() => {
        vi.useRealTimers();
    } ); 

    it("should cached data from localStorage without fetching again", async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve( { rates: { CAD: 1.4, USD: 1.5 }, base: "EUR", receivedAt: new Date() } ) 
            } )
        );

        await loadRates(); 

        await loadRates(); 

        expect(fetch).toHaveBeenCalledTimes(1); 

    } );

    it("should fetch and caching new data if they are outdated", async () => {
            
            vi.setSystemTime(new Date('2026-03-24'));
            
            const mockedData = { jsonData: { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } , receivedAt: new Date('2026-03-20') };
            localStorage.setItem("data", JSON.stringify(mockedData));

            await loadRates(); 

            expect(fetch).toHaveBeenCalledTimes(1); 

        } ); 
} );