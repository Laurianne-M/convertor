import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { API } from "./api.js";  

const fakeTimeProvider = {
    currentDate: () => new Date('2026-03-24')
};

const fakeFetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" } )
    })
);

const limitFetch = vi.fn(() =>
    Promise.resolve({
         json: () => Promise.resolve({ error: true, message: "monthly limit reached" })
    })
);

const errorFetch = vi.fn() (() => Promise.reject(new Error('network failure'))); 

describe('api', () => {
    let api; 

    beforeEach(() => {
        api = new API( { fetch : fakeFetch, timeProvider: fakeTimeProvider } ); 
        localStorage.clear();
        vi.clearAllMocks();
    });   
    
    it('should return true if the timestamp is not a number', () => {
        const receivedAt = 'not a number'; 

        expect(api.areDataOutdated(receivedAt)).toBe(true); 
    }); 

    it("should cached data from localStorage without fetching again", async () => {
        await api.loadRates(); 

        await api.loadRates(); 

        expect(fakeFetch).toHaveBeenCalledTimes(1); 
    });

    it("should fetch and caching new data if they are outdated", async () => {  
        
        const mockedData = { jsonData: { rates: { CAD:1.4, USD: 1.5 }, base: "EUR" } , receivedAt: new Date('2026-03-20') };
        localStorage.setItem("data", JSON.stringify(mockedData));

        await api.loadRates(); 

        expect(fakeFetch).toHaveBeenCalledTimes(1); 
    }); 

    it('should return the data if data exist and are not outdated', async () => {

        const mockedData = { jsonData: { rates: { CAD:1.9, USD: 1.6 }, base: "EUR" } , receivedAt: new Date('2026-03-24') };
        localStorage.setItem("data", JSON.stringify(mockedData));

        expect(await api.loadRates()).toEqual(expect.objectContaining( { rates: { CAD:1.9, USD: 1.6 }, base: "EUR" } ));
    } );

    it('it should fetch new data from the API if the data do not exist or are outdaded', async () => {
        expect(await api.loadRates()).toEqual(expect.objectContaining( { rates: { CAD: 1.4, USD: 1.5 }, base: "EUR" } ));
    } ); 

    it('it should return the mocked Data if data doesnt exist and the API responds with no rates (reach limit)', async () => {

        api = new API( { fetch : limitFetch } ) 

        expect(await api.loadRates()).toEqual(expect.objectContaining( { rates: api.getMockRates().rates, base: api.getMockRates().base } ));
    } );

    it('it should return mocked Data in case of fetch failure (network error)', async () => {
       api = new API( { fetch: errorFetch } );

        expect(await api.loadRates()).toEqual(expect.objectContaining( { rates: api.getMockRates().rates, base: api.getMockRates().base } ));
    } );

    it('should return the mocked data', () => { 
            expect(api.getMockRates()).toEqual(expect.objectContaining( { rates: api.getMockRates().rates, base: api.getMockRates().base } ));
    });
});