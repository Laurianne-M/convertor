import { currencies, metalCode, documentEvents, RATES_LOADING } from '../constants.js'
import { html } from '../element.js';
import type { ConvertOperation, RatesResponse } from '../types';


export function populateLiveNavbar({ rates }: { rates: Record<string, number> } ) {

    const usdRate = rates[currencies.USD.code];
    if (!usdRate) throw new Error('USD rate is missing or zero');

    Object.keys(metalCode).forEach(id => {

        const select = document.getElementById(id);
        if (!select) return;

        const symbol = metalCode[id];
        if (!symbol) return;
        const metalRate = rates[symbol] ?? 0;

        if (metalRate !== undefined && metalRate !== 0) {

            const price = usdRate / metalRate;

            const formattedPrice = price.toLocaleString(undefined, {
                maximumFractionDigits: 2
            } );

            const metalName = select.textContent?.split(":")[0]
            select.textContent = `${metalName}: $${formattedPrice}`;

        } else {
            window.alert("an error occured while charging the navbar");
            console.error("an error occured while charging the navbar");
        };
    } );
};


export const convert = (operation: ConvertOperation) => {
    const { amount, fromSelectBaseCurrency, toSelectDesiredCurrency, rates, base } = operation;
    
    if (fromSelectBaseCurrency === toSelectDesiredCurrency) return amount;

    
    // convert to base first
    if (fromSelectBaseCurrency !== base) {
        if (!rates[fromSelectBaseCurrency] || rates[fromSelectBaseCurrency] === 0) {
            return 0; 
        }
    }

    const amountInBase = fromSelectBaseCurrency === base
    ? amount
    : amount / (rates[fromSelectBaseCurrency] ?? 1);
    
    // convert base → target
    if (toSelectDesiredCurrency !== base && !rates[toSelectDesiredCurrency]) {
        return 0;
    }
    
    return toSelectDesiredCurrency === base
    ? amountInBase
    : amountInBase * (rates[toSelectDesiredCurrency] ?? 1);
    
};

export async function updateAmount(
    data: RatesResponse,
    amountFromFirstCurrencyInput: HTMLInputElement, 
    amountFromSecondCurrencyInput: HTMLInputElement, 
    reverse = false
) {
    // Safety check: Make sure data and data.rates actually exist
    if (!data || !data.rates) {
        console.warn(RATES_LOADING);
        return;
    }

     if (parseFloat(amountFromFirstCurrencyInput.value) < 0) {
        window.alert('Amount must be positive');
        return;
    }


    // Determine values based on whether we are updating from the first or second input
    const amount = reverse 
        ? parseFloat(amountFromSecondCurrencyInput.value) || 0 
        : parseFloat(amountFromFirstCurrencyInput.value) || 0;

    const fromSelectBaseCurrency = reverse 
        ? html.elements.getDesiredCurrencySelect()?.value 
        : html.elements.getBaseCurrencySelect()?.value;

    const toSelectDesiredCurrency = reverse 
        ? html.elements.getBaseCurrencySelect()?.value 
        : html.elements.getDesiredCurrencySelect()?.value;

    const result = convert( {
        amount: amount,
        fromSelectBaseCurrency: fromSelectBaseCurrency,
        toSelectDesiredCurrency: toSelectDesiredCurrency,
        rates: data.rates,
        base: data.base
    } );

    if (reverse) {
        amountFromFirstCurrencyInput.value = result.toFixed(2);
    } else {
        amountFromSecondCurrencyInput.value = result.toFixed(2);
    };
};
        
let isUpdating = false;

export const resetUpdateLock = () => { isUpdating = false; };
export const updateLock = async (fn: any) => {
     

    if (isUpdating) return;
    isUpdating = true;
    try {
        await fn();
    } finally {
            isUpdating = false;
        }   
};