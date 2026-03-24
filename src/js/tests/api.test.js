import { describe, vi, it, beforeEach, expect } from "vitest";
import { getDataFromLocalStorage } from "../api/api.js"; 

describe("getDataFromLocalStorage", () => {

    beforeEach(() => {
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
