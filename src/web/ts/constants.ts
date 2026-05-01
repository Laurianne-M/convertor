type Metal = Record<string, string> 

export const currencies = {
  // Major Global
  USD: { code: "USD", name: "United States Dollar" },
  EUR: { code: "EUR", name: "Euro" },
  GBP: { code: "GBP", name: "British Pound Sterling" },
  JPY: { code: "JPY", name: "Japanese Yen" },
  CHF: { code: "CHF", name: "Swiss Franc" },
  CAD: { code: "CAD", name: "Canadian Dollar" },
  AUD: { code: "AUD", name: "Australian Dollar" },
  NZD: { code: "NZD", name: "New Zealand Dollar" },

  // Asia
  CNY: { code: "CNY", name: "Chinese Yuan" },
  HKD: { code: "HKD", name: "Hong Kong Dollar" },
  SGD: { code: "SGD", name: "Singapore Dollar" },
  KRW: { code: "KRW", name: "South Korean Won" },
  INR: { code: "INR", name: "Indian Rupee" },
  THB: { code: "THB", name: "Thai Baht" },
  MYR: { code: "MYR", name: "Malaysian Ringgit" },
  IDR: { code: "IDR", name: "Indonesian Rupiah" },
  PHP: { code: "PHP", name: "Philippine Peso" },

  // Europe (Non-Euro)
  SEK: { code: "SEK", name: "Swedish Krona" },
  NOK: { code: "NOK", name: "Norwegian Krone" },
  DKK: { code: "DKK", name: "Danish Krone" },
  PLN: { code: "PLN", name: "Polish Zloty" },
  CZK: { code: "CZK", name: "Czech Koruna" },
  HUF: { code: "HUF", name: "Hungarian Forint" },

  // Americas
  MXN: { code: "MXN", name: "Mexican Peso" },
  BRL: { code: "BRL", name: "Brazilian Real" },
  ARS: { code: "ARS", name: "Argentine Peso" },
  CLP: { code: "CLP", name: "Chilean Peso" },
  COP: { code: "COP", name: "Colombian Peso" },

  // Middle East & Africa
  AED: { code: "AED", name: "UAE Dirham" },
  SAR: { code: "SAR", name: "Saudi Riyal" },
  ZAR: { code: "ZAR", name: "South African Rand" },
  ILS: { code: "ILS", name: "Israeli Shekel" },
  TRY: { code: "TRY", name: "Turkish Lira" }
} as const; 

export const metalCode: Metal = {
  gold: "XAU",
  silver: "XAG",
  btc: "BTC"
};

export const documentEvents = {
  input: "input",
  change: "change"
};

export const UI_STRINGS_BANNER = {
  liveCurrencies: [
    {id: 'gold', label: 'Gold'},
    {id: 'silver', label: 'Silver'},
    { id: 'btc', label:'BTC'}
  ]
}

export const RATES_LOADING = "Still waiting for rates"; 
export const DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000; 
export const API_BASE_URL = 'https://api.exchangeratesapi.io/v1/latest';
export const API_KEY = 'ca1103674bdee54b5f5a046393d48639';
export const NAV_BAR_ERROR = "an error occured while charging the navbar";