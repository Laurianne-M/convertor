import type { Currency } from "./types";

const id = {
   select : {
        baseCurrency: "baseCurrency",
        desiredCurrency: "desiredCurrency",
        option: "option"
    }, 
    input : {
        firstAmount: "amountFromFirstInput",
        secondAmount: "amountFromSecondInput", 
    }
};

export const elements = {
    getBaseCurrencySelect: () => document.getElementById(id.select.baseCurrency) as HTMLInputElement,
    getDesiredCurrencySelect: () => document.getElementById(id.select.desiredCurrency) as HTMLInputElement,
    getAmoutFromFirstInput: () => document.getElementById(id.input.firstAmount) as HTMLInputElement,
    getAmountFromSecondInput: () => document.getElementById(id.input.secondAmount) as HTMLInputElement,
    populateSelect: (select: HTMLSelectElement, options: Record<string, Currency>) => {
        if (!select) return;
        select.innerHTML = "";
        Object.values(options).forEach(option => {
            const element = document.createElement(id.select.option) as HTMLOptionElement;
            if (!element) return;
            element.value = option.code;
            element.textContent = option.name;
            select.appendChild(element);
        });
    }
};

export const html = {
    id,
    elements
};