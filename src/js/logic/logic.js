import { loadRates } from '../api/api.js';
import { currencies, metalCode, documentEvents, RATES_LOADING } from '../constants.js'
import { html } from '../element.js';


function populateLiveNavbar({ rates, _ }) {

    const usdRate = rates[currencies.USD.code];

    Object.keys(metalCode).forEach(id => {

        const select = document.getElementById(id);
        if (!select) return;

        const symbol = metalCode[id];
        const metalRate = rates[symbol];

        if (metalRate !== undefined && metalRate !== 0) {

            const price = usdRate / metalRate;

            const formattedPrice = price.toLocaleString(undefined, {
                maximumFractionDigits: 2
            });

            const metalName = select.textContent.split(":")[0]
            select.textContent = `${metalName}: $${formattedPrice}`;

        } else {
            window.alert("an error occured while charging the navbar");
            console.error("an error occured while charging the navbar");
        }
    });
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

export async function updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, reverse = false) {
    const data = await loadRates(); // Get the object containing rates and base

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

    const result = convert({
        amount: amount,
        fromSelectBaseCurrency: fromSelectBaseCurrency,
        toSelectDesiredCurrency: toSelectDesiredCurrency,
        rates: data.rates,
        base: data.base
    });

    if (reverse) {
        amountFromFirstCurrencyInput.value = result.toFixed(2);
    } else {
        amountFromSecondCurrencyInput.value = result.toFixed(2);
    }
};
        
let isUpdating = false;

export const resetUpdateLock = () => { isUpdating = false; };
export const updateLock = async (fn) => {
     

    if (isUpdating) return;
    isUpdating = true;
    try {
        await fn();
    } catch {
        throw new Error('An issue occured');
      } finally {
            isUpdating = false;
        }   
}

export const main = async () => {
    
    const baseCurrencySelect = html.elements.getBaseCurrencySelect();
    const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
    html.elements.populateSelect(baseCurrencySelect, currencies);
    html.elements.populateSelect(desiredCurrencySelect, currencies);

    const data = await loadRates();


    populateLiveNavbar(data);

    const amountFromFirstCurrencyInput = html.elements.getAmoutFromFirstInput();
    const amountFromSecondCurrencyInput = html.elements.getAmountFromSecondInput();

    amountFromFirstCurrencyInput.addEventListener(documentEvents.input, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    baseCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    desiredCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    amountFromSecondCurrencyInput.addEventListener(documentEvents.input, () =>  { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, true)) } );

}