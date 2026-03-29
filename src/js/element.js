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
    getBaseCurrencySelect: () => document.getElementById(id.select.baseCurrency),
    getDesiredCurrencySelect: () => document.getElementById(id.select.desiredCurrency),
    getAmoutFromFirstInput: () => document.getElementById(id.input.firstAmount),
    getAmountFromSecondInput: () => document.getElementById(id.input.secondAmount),
    populateSelect: (select, options) => {
        if (!select) return;

        select.innerHTML = "";

        Object.values(options).forEach(option => {
            const element = document.createElement(id.select.option);
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