import type { LocalizationService } from './services/Localization/LocalizationService';
import { StringKey } from './services/Localization/LocalizationService';

type Metal = Record<string, string>
type Currency = { code: string; name: string };

export class AppConstants {
  static readonly currencyCodes = {
    USD: "USD", EUR: "EUR", GBP: "GBP", JPY: "JPY", CHF: "CHF", CAD: "CAD", AUD: "AUD", NZD: "NZD",
    CNY: "CNY", HKD: "HKD", SGD: "SGD", KRW: "KRW", INR: "INR", THB: "THB", MYR: "MYR", IDR: "IDR", PHP: "PHP",
    SEK: "SEK", NOK: "NOK", DKK: "DKK", PLN: "PLN", CZK: "CZK", HUF: "HUF",
    MXN: "MXN", BRL: "BRL", ARS: "ARS", CLP: "CLP", COP: "COP",
    AED: "AED", SAR: "SAR", ZAR: "ZAR", ILS: "ILS", TRY: "TRY"
  } as const;

  static getCurrencies(localization: LocalizationService): Record<keyof typeof AppConstants.currencyCodes, Currency> {
    return {
      USD: { code: "USD", name: localization.t(StringKey.symbols_currency_label_usd) },
      EUR: { code: "EUR", name: localization.t(StringKey.symbols_currency_label_eur) },
      GBP: { code: "GBP", name: localization.t(StringKey.symbols_currency_label_gbp) },
      JPY: { code: "JPY", name: localization.t(StringKey.symbols_currency_label_jpy) },
      CHF: { code: "CHF", name: localization.t(StringKey.symbols_currency_label_chf) },
      CAD: { code: "CAD", name: localization.t(StringKey.symbols_currency_label_cad) },
      AUD: { code: "AUD", name: localization.t(StringKey.symbols_currency_label_aud) },
      NZD: { code: "NZD", name: localization.t(StringKey.symbols_currency_label_nzd) },
      CNY: { code: "CNY", name: localization.t(StringKey.symbols_currency_label_cny) },
      HKD: { code: "HKD", name: localization.t(StringKey.symbols_currency_label_hkd) },
      SGD: { code: "SGD", name: localization.t(StringKey.symbols_currency_label_sgd) },
      KRW: { code: "KRW", name: localization.t(StringKey.symbols_currency_label_krw) },
      INR: { code: "INR", name: localization.t(StringKey.symbols_currency_label_inr) },
      THB: { code: "THB", name: localization.t(StringKey.symbols_currency_label_thb) },
      MYR: { code: "MYR", name: localization.t(StringKey.symbols_currency_label_myr) },
      IDR: { code: "IDR", name: localization.t(StringKey.symbols_currency_label_idr) },
      PHP: { code: "PHP", name: localization.t(StringKey.symbols_currency_label_php) },
      SEK: { code: "SEK", name: localization.t(StringKey.symbols_currency_label_sek) },
      NOK: { code: "NOK", name: localization.t(StringKey.symbols_currency_label_nok) },
      DKK: { code: "DKK", name: localization.t(StringKey.symbols_currency_label_dkk) },
      PLN: { code: "PLN", name: localization.t(StringKey.symbols_currency_label_pln) },
      CZK: { code: "CZK", name: localization.t(StringKey.symbols_currency_label_czk) },
      HUF: { code: "HUF", name: localization.t(StringKey.symbols_currency_label_huf) },
      MXN: { code: "MXN", name: localization.t(StringKey.symbols_currency_label_mxn) },
      BRL: { code: "BRL", name: localization.t(StringKey.symbols_currency_label_brl) },
      ARS: { code: "ARS", name: localization.t(StringKey.symbols_currency_label_ars) },
      CLP: { code: "CLP", name: localization.t(StringKey.symbols_currency_label_clp) },
      COP: { code: "COP", name: localization.t(StringKey.symbols_currency_label_cop) },
      AED: { code: "AED", name: localization.t(StringKey.symbols_currency_label_aed) },
      SAR: { code: "SAR", name: localization.t(StringKey.symbols_currency_label_sar) },
      ZAR: { code: "ZAR", name: localization.t(StringKey.symbols_currency_label_zar) },
      ILS: { code: "ILS", name: localization.t(StringKey.symbols_currency_label_ils) },
      TRY: { code: "TRY", name: localization.t(StringKey.symbols_currency_label_try) }
    };
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

  static getUIStrings(localization: LocalizationService) {
    return {
      liveCurrencies: [
        { id: 'gold', label: localization.t(StringKey.symbols_metals_label_gold) },
        { id: 'silver', label: localization.t(StringKey.symbols_metals_label_silver) },
        { id: 'btc', label: localization.t(StringKey.symbols_crypto_label_bitcoin) },
      ],
      title: localization.t(StringKey.website_title),
      subtitle: [
        { id: 'currencyConvertor', label: localization.t(StringKey.homepage_title) }
      ],
      language: [
        { id: 'en', label: localization.t(StringKey.lang_en), flag: '🇺🇸', active: true },
        { id: 'fr', label: localization.t(StringKey.lang_fr), flag: '🇫🇷', active: false },
        { id: 'es', label: localization.t(StringKey.lang_es), flag: '🇪🇸', active: false }
      ],
      navBarError: "an error occured while charging the navbar"
    }
  };

  static readonly NAVBAR_ERROR = "an error occured while charging the navbar";

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

