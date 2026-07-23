import { t, StringKey } from './i18n/i18n';

type Metal = Record<string, string>

export class AppConstants {
  static get currencies() {
    return {
      // Major Global
      USD: { code: "USD", name: t(StringKey.symbols_currency_label_usd) },
      EUR: { code: "EUR", name: t(StringKey.symbols_currency_label_eur) },
      GBP: { code: "GBP", name: t(StringKey.symbols_currency_label_gbp) },
      JPY: { code: "JPY", name: t(StringKey.symbols_currency_label_jpy) },
      CHF: { code: "CHF", name: t(StringKey.symbols_currency_label_chf) },
      CAD: { code: "CAD", name: t(StringKey.symbols_currency_label_cad) },
      AUD: { code: "AUD", name: t(StringKey.symbols_currency_label_aud) },
      NZD: { code: "NZD", name: t(StringKey.symbols_currency_label_nzd) },

      // Asia
      CNY: { code: "CNY", name: t(StringKey.symbols_currency_label_cny) },
      HKD: { code: "HKD", name: t(StringKey.symbols_currency_label_hkd) },
      SGD: { code: "SGD", name: t(StringKey.symbols_currency_label_sgd) },
      KRW: { code: "KRW", name: t(StringKey.symbols_currency_label_krw) },
      INR: { code: "INR", name: t(StringKey.symbols_currency_label_inr) },
      THB: { code: "THB", name: t(StringKey.symbols_currency_label_thb) },
      MYR: { code: "MYR", name: t(StringKey.symbols_currency_label_myr) },
      IDR: { code: "IDR", name: t(StringKey.symbols_currency_label_idr) },
      PHP: { code: "PHP", name: t(StringKey.symbols_currency_label_php) },

      // Europe (Non-Euro)
      SEK: { code: "SEK", name: t(StringKey.symbols_currency_label_sek) },
      NOK: { code: "NOK", name: t(StringKey.symbols_currency_label_nok) },
      DKK: { code: "DKK", name: t(StringKey.symbols_currency_label_dkk) },
      PLN: { code: "PLN", name: t(StringKey.symbols_currency_label_pln) },
      CZK: { code: "CZK", name: t(StringKey.symbols_currency_label_czk) },
      HUF: { code: "HUF", name: t(StringKey.symbols_currency_label_huf) },

      // Americas
      MXN: { code: "MXN", name: t(StringKey.symbols_currency_label_mxn) },
      BRL: { code: "BRL", name: t(StringKey.symbols_currency_label_brl) },
      ARS: { code: "ARS", name: t(StringKey.symbols_currency_label_ars) },
      CLP: { code: "CLP", name: t(StringKey.symbols_currency_label_clp) },
      COP: { code: "COP", name: t(StringKey.symbols_currency_label_cop) },

      // Middle East & Africa
      AED: { code: "AED", name: t(StringKey.symbols_currency_label_aed) },
      SAR: { code: "SAR", name: t(StringKey.symbols_currency_label_sar) },
      ZAR: { code: "ZAR", name: t(StringKey.symbols_currency_label_zar) },
      ILS: { code: "ILS", name: t(StringKey.symbols_currency_label_ils) },
      TRY: { code: "TRY", name: t(StringKey.symbols_currency_label_try) },
    } as const;
  }

  static readonly metalCode: Metal = {
    gold: "XAU",
    silver: "XAG",
    btc: "BTC"
  };

  static readonly documentEvents = {
    input: "input",
    change: "change"
  };

  static get UI_STRINGS() {
    return {
      liveCurrencies: [
        { id: 'gold', label: t(StringKey.symbols_metals_label_gold) },
        { id: 'silver', label: t(StringKey.symbols_metals_label_silver) },
        { id: 'btc', label: t(StringKey.symbols_crypto_label_bitcoin) },
      ],
      title: t(StringKey.website_title),
      subtitle: [
        { id: 'currencyConvertor', label: t(StringKey.homepage_title) }
      ],
      language: [
        { id: 'en', label: t(StringKey.lang_en), flag: '🇺🇸', active: true },
        { id: 'fr', label: t(StringKey.lang_fr), flag: '🇫🇷', active: false },
        { id: 'es', label: t(StringKey.lang_es), flag: '🇪🇸', active: false }
      ],
      navBarError: "an error occured while charging the navbar"
    }
  };

  static readonly API = {
    baseURL: 'https://api.exchangeratesapi.io/v1/latest',
    apiKey: import.meta.env.VITE_EXCHANGE_RATES_API_KEY
  };

  static readonly LOCALE = {
    langKey: 'lang',
    default: 'en'
  }

  static readonly RATES_LOADING = "Still waiting for rates";
  static readonly DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
}

