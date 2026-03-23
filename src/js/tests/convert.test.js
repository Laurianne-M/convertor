import { describe, it, expect, beforeEach, vi } from "vitest";
import { convert } from "../logic/logic.js";


describe('convert', () => {

    it('should return amount if the 2 currencies are the same', () => {
        
        const operation = {
            amount: 569,
            fromSelectBaseCurrency: 'USD',
            toSelectDesiredCurrency: 'USD'
        };
        const result = convert(operation);

        expect(result).toBe(operation.amount);
    } );

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
        };

        const result = convert(operation);

        expect(result).toBe(0); 
    } );

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
    } );

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

    } );

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

        
    } );    
} );