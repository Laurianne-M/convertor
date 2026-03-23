import { describe, it, expect, vi, beforeEach } from "vitest";
import { populateLiveNavbar } from "../logic/logic";

describe("populateLiveNavbar", () => {

    beforeEach( () => {
        vi.clearAllMocks();
    } )
    it('should exit the function if the id of the metal currency we are looking for doesnt exist ', () => {

         document.body.innerHTML = '';

         expect(populateLiveNavbar( { rates: { USD: 1.09, BTC: 0.000015, XAU: 0.00047, XAG: 0.038, CAD: 1.01 } } )).toBeUndefined();
    } );

    it('should exit the function if USD rate is equal to 0 or undefined', () => {

        expect(() => populateLiveNavbar( {rates: { USD: 0 } } )).toThrow('USD rate is missing or zero');
    } );

    it('should return a window error if the metal rates is equal to 0', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {} );
        document.body.innerHTML = '<span id="btc"></span>';

        populateLiveNavbar( { rates: { BTC: 0, USD: 1.09 } } );
        
        expect(alertSpy).toHaveBeenCalled(1);
        expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
    } );

    it('it should return a window error if the metal rate is undefined or doesnt exist', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {} ); 
        document.body.innerHTML = '<span id="btc"></span>'; 

        populateLiveNavbar( { rates: { USD: 1.09 } } );

        expect(alertSpy).toHaveBeenCalled(1);
        expect(alertSpy).toBeCalledWith('an error occured while charging the navbar');
    } ); 
    

    it('should return the price of each asset/metal in USD if metal id exist and are not 0 or undefined', () => {
        
        document.body.innerHTML = '<span id="btc">BTC:</span>'; 

        populateLiveNavbar( { rates: { USD: 1.09, BTC: 0.000015, XAU: 0.00047, XAG: 0.038 } } );

        const btcElement = document.getElementById('btc')
            
        expect(btcElement.textContent).toBe('BTC: $72,666.67');
    } );
} );