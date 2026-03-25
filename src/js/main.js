import { html } from "./element.js";
import { loadRates } from './api/api.js';
import { populateLiveNavbar, updateLock, updateAmount } from "./logic/logic.js";
import { currencies, documentEvents } from './constants.js'


export const main = async () => {
    
    const baseCurrencySelect = html.elements.getBaseCurrencySelect();
    const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
    html.elements.populateSelect(baseCurrencySelect, currencies);
    html.elements.populateSelect(desiredCurrencySelect, currencies);

    const data = await loadRates();

    console.log(data);
    populateLiveNavbar(data);

    const amountFromFirstCurrencyInput = html.elements.getAmoutFromFirstInput();
    const amountFromSecondCurrencyInput = html.elements.getAmountFromSecondInput();

    amountFromFirstCurrencyInput.addEventListener(documentEvents.input, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    baseCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    desiredCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false)) } );
    amountFromSecondCurrencyInput.addEventListener(documentEvents.input, () =>  { updateLock(() => updateAmount(amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, true)) } );

}