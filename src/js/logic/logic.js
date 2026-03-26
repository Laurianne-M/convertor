import { currencies, metalCode, documentEvents, RATES_LOADING } from '../constants.js'
import { html } from '../element.js';


export function populateLiveNavbar({ rates, _ }) {

    const usdRate = rates[currencies.USD.code];
    if (!usdRate) throw new Error('USD rate is missing or zero');

    Object.keys(metalCode).forEach(id => {

        const select = document.getElementById(id);
        if (!select) return;

        const symbol = metalCode[id];
        const metalRate = rates[symbol];

        if (metalRate !== undefined && metalRate !== 0) {

            const price = usdRate / metalRate;

            const formattedPrice = price.toLocaleString(undefined, {
                maximumFractionDigits: 2
            } );

            const metalName = select.textContent.split(":")[0]
            select.textContent = `${metalName}: $${formattedPrice}`;

        } else {
            window.alert("an error occured while charging the navbar");
            console.error("an error occured while charging the navbar");
        };
    } );
};


export const convert = (operation) => {
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
    : amount / rates[fromSelectBaseCurrency];
    
    // convert base → target
    if (toSelectDesiredCurrency !== base && !rates[toSelectDesiredCurrency]) {
        return 0;
    }
    
    return toSelectDesiredCurrency === base
    ? amountInBase
    : amountInBase * rates[toSelectDesiredCurrency];
    
};

export async function updateAmount(
    api,
    amountFromFirstCurrencyInput, 
    amountFromSecondCurrencyInput, 
    reverse = false
) {
    const data = await api.loadRates(); // Get the object containing rates and base

    // Safety check: Make sure data and data.rates actually exist
    if (!data || !data.rates) {
        console.warn(RATES_LOADING);
        return;
    }

     if (amountFromFirstCurrencyInput.value < 0) {
        window.alert('Amount must be positive');
        return;
    }


    // Determine values based on whether we are updating from the first or second input
    const amount = reverse 
        ? parseFloat(amountFromSecondCurrencyInput.value) || 0 
        : parseFloat(amountFromFirstCurrencyInput.value) || 0;

    const fromSelectBaseCurrency = reverse 
        ? html.elements.getDesiredCurrencySelect().value 
        : html.elements.getBaseCurrencySelect().value;

    const toSelectDesiredCurrency = reverse 
        ? html.elements.getBaseCurrencySelect().value 
        : html.elements.getDesiredCurrencySelect().value;

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
export const updateLock = async (fn) => {
     

    if (isUpdating) return;
    isUpdating = true;
    try {
        await fn();
    } finally {
            isUpdating = false;
        }   
};