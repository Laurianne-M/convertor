import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { getDataFromLocalStorage, areDataOutdated, getMockRates, loadRates } from "./api.js"; 
import { API } from "./api.js";  

describe("getDataFromLocalStorage", () => {
    let api; 

    beforeEach(() => {
        api = new API(); 
        localStorage.clear();
    } );

    it('should get the parsed data from local storage if the data exists', () => {
        
        const mockedData = { jsonData: { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } , receivedAt: new Date() };
        localStorage.setItem("data", JSON.stringify(mockedData));

        const data = getDataFromLocalStorage();

        expect(data).toEqual(expect.objectContaining( { jsonData: { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } } ));

        } );

    it('should return null if there is no data in local storage', () => {
        const mockedData = null; 

        localStorage.setItem("data", JSON.stringify(mockedData));
        
        const data = getDataFromLocalStorage(); 

        expect(data).toBe(null); 
    } );
} );


describe('areDataOutdated', () => {
    
    beforeEach(() => {
        vi.useFakeTimers();
    } );

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should return true if there is no data', () => {
        const receivedAt = null;

        expect(areDataOutdated(receivedAt)).toBe(true); 
    } );

    it('should return true if the timestamp is not a number', () => {
        const receivedAt = 'not a number'; 

        expect(areDataOutdated(receivedAt)).toBe(true); 
    } ); 

    it('should return true if data is older than 24 hours', () => {
        vi.setSystemTime(new Date('2026-03-22'));

        const oldDate = new Date('2026-03-20').toISOString();

        expect(areDataOutdated(oldDate)).toBe(true); 
    } );

    it('should return false if data is not older than 24 hours', () => {
        vi.setSystemTime(new Date('2026-03-22'));

        const today = new Date('2026-03-22').toISOString(); 

        expect(areDataOutdated(today)).toBe(false); 
    } );
} );



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


describe('getMockRates', () => {

    it('should return the mocked data', () => { 
        expect(getMockRates()).toEqual(expect.objectContaining( { rates: getMockRates().rates, base: getMockRates().base } ));
    } );
} );
