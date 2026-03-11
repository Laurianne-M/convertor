const currencies = [
   // Major Global
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "NZD", name: "New Zealand Dollar" },

    // Asia
    { code: "CNY", name: "Chinese Yuan" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "KRW", name: "South Korean Won" },
    { code: "INR", name: "Indian Rupee" },
    { code: "THB", name: "Thai Baht" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "PHP", name: "Philippine Peso" },

    // Europe (Non-Euro)
    { code: "SEK", name: "Swedish Krona" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "DKK", name: "Danish Krone" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "HUF", name: "Hungarian Forint" },

    // Americas
    { code: "MXN", name: "Mexican Peso" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "COP", name: "Colombian Peso" },

    // Middle East & Africa
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "ZAR", name: "South African Rand" },
    { code: "ILS", name: "Israeli Shekel" },
    { code: "TRY", name: "Turkish Lira" }
];

/*const jsonData = {
    "success": true,
    "timestamp": 1771844164,
    "base": "EUR",
    "date": "2026-02-23",
    "rates": {
        "USD": 1.179816,
        "CAD": 1.613221
    }
}*/

function populateDropdown(SelectId) {
    const select = document.getElementById(SelectId);
    if (!select) return;

    select.innerHTML = "";

    currencies.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency.code;
        option.textContent = currency.name;
        select.appendChild(option);
    });
};

populateDropdown("baseCurrency");
populateDropdown("desiredCurrency");

let rates = {};
let base = "EUR";

function populateLiveNavbar() {
    const mapping = {
    gold: "XAU",
    silver: "XAG",
    btc: "BTC"
    };

    const usdRate = rates["USD"];

    Object.keys(mapping).forEach(id => {

        const select = document.getElementById(id);
        if (!select) return;

        const symbol = mapping[id];
        const metalRate = rates[symbol];

        if (metalRate !== undefined) {

            const price = usdRate / metalRate;

            const formattedPrice = price.toLocaleString(undefined, {
                maximumFractionDigits: 2
            });

            select.textContent = `${select.textContent.split(":")[0]}: $${formattedPrice}`;

        }

    });
};

async function loadRates() {
    try {
        const res = await fetch("https://api.exchangeratesapi.io/v1/latest?access_key=ca1103674bdee54b5f5a046393d48639");
        const data = await res.json();
        rates = data.rates;
        base = data.base;
    } catch (error) {
        console.error(error);
    }
    

    populateLiveNavbar();
};

loadRates();

function convert(amount, from, to) {
    if (from === to) return amount;

    // convert to base first
    const amountInBase = from === base
    ? amount
    : amount / rates[from];

    // convert base → target

    return to === base
    ? amountInBase
    : amountInBase * rates[to];

};

const fromCurrency = document.getElementById("baseCurrency");
const toCurrency = document.getElementById("desiredCurrency");
const amount1 = document.getElementById("amount1");
const amount2 = document.getElementById("amount2");

function updateFromFirst() {
    const result = convert(
        parseFloat(amount1.value) || 0,
        fromCurrency.value,
        toCurrency.value
    );

    amount2.value = result.toFixed(2);

    console.log("function triggered");
};

function updateFromSecond() {
    const result = convert(
        parseFloat(amount2.value) || 0,
        toCurrency.value,
        fromCurrency.value
    );

    amount1.value = result.toFixed(2);
};

amount1.addEventListener("input", updateFromFirst);
fromCurrency.addEventListener("change", updateFromFirst);
toCurrency.addEventListener("change", updateFromFirst);
amount2.addEventListener("input", updateFromSecond);





