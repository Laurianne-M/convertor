import { html } from "./element.js";
import { ExchangeRateServiceImp } from "./services/ExchangeRate/ExchangeRateServiceImp.js";
import { TimeProviderServiceImpl } from "./services/TimeProvider/TImeProviderServiceImp.js";
import { populateLiveNavbar, updateLock, updateAmount } from "./logic/logic.js";
import { currencies, documentEvents } from './constants.js'

export const main = async () => {
    const baseCurrencySelect = html.elements.getBaseCurrencySelect();
    const desiredCurrencySelect = html.elements.getDesiredCurrencySelect();
    html.elements.populateSelect(baseCurrencySelect, currencies);
    html.elements.populateSelect(desiredCurrencySelect, currencies);
    
    const timeProvider = new TimeProviderServiceImpl();

    const exchangeRateService = new ExchangeRateServiceImp({
        fetch, 
        timeProvider,
        storage: localStorage,
    });
    
    const data = await exchangeRateService.loadRates();

    console.log(data);
    populateLiveNavbar(data);

    const amountFromFirstCurrencyInput = html.elements.getAmoutFromFirstInput();
    if (!amountFromFirstCurrencyInput) return;
    const amountFromSecondCurrencyInput = html.elements.getAmountFromSecondInput();

    amountFromFirstCurrencyInput.value = "1"; 
    desiredCurrencySelect.value = 'EUR';

    updateAmount(data, amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false, baseCurrencySelect?.value, desiredCurrencySelect?.value);

    amountFromFirstCurrencyInput.addEventListener(documentEvents.input, () => { updateLock(() => updateAmount(data, amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false, baseCurrencySelect?.value, desiredCurrencySelect?.value)) } );
    baseCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(data, amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false, baseCurrencySelect?.value, desiredCurrencySelect?.value)) } );
    desiredCurrencySelect.addEventListener(documentEvents.change, () => { updateLock(() => updateAmount(data, amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, false, baseCurrencySelect?.value, desiredCurrencySelect?.value)) } );
    amountFromSecondCurrencyInput.addEventListener(documentEvents.input, () =>  { updateLock(() => updateAmount(data, amountFromFirstCurrencyInput, amountFromSecondCurrencyInput, true, baseCurrencySelect?.value, desiredCurrencySelect?.value)) } );

}