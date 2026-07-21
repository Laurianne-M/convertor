import { AppConstants } from '../constants';
import stringsEn from '../../locales/strings.en.json';
import stringFr from '../../locales/strings.fr.json';
import stringEs from '../../locales/strings.es.json';

type Strings = Record<string, string>;

const strings: Record<string, Record<string, any>> = {
  en: stringsEn as Strings,
  fr: stringFr as Strings,
  es: stringEs as Strings
}
const fallbackStrings = stringsEn;

export function setLocale(lang: string): void {
  localStorage.setItem(AppConstants.LOCALE.langKey, lang);
}

export function getLocale(): string {
  try {
    const storedLanguage = localStorage.getItem(AppConstants.LOCALE.langKey);
    if (storedLanguage) {
      return storedLanguage
    }

    const navigatorLanguage = navigator.language;
    if (!navigatorLanguage) {
      throw new Error('navigator.language is null or undefined.');
    }

    const parts = navigatorLanguage.split('-');
    if (parts.length >= 1) {
      return parts[0]!;
    }

    throw new Error('Malformed language detected on navigator, using default.')

  } catch {
    return AppConstants.LOCALE.default;
  }
}

export function getLocale(): string {
  try {
    return localStorage.getItem('lang') 
      ?? navigator.language?.split('-')[0] 
      ?? 'en';
  } catch {
    return 'en';
  }
}

export function t(key: StringKey): string {
  let lang = AppConstants.LOCALE.default;

  try {
    lang = getLocale();
  } catch (error) {
    console.error('Failed to get locale:', error);
  }
  const translation = strings[lang] ?? fallbackStrings;
  return translation[key] ?? fallbackStrings[key] ?? key;
}

export enum StringKey {
  website_title = "website_title",
  homepage_title = "homepage_title",
  symbols_metals_label_silver = "symbols_metals_label_silver",
  symbols_metals_label_gold = "symbols_metals_label_gold",
  symbols_crypto_label_bitcoin = "symbols_crypto_label_bitcoin",
  symbols_currency_label_usd = "symbols_currency_label_usd",
  symbols_currency_label_eur = "symbols_currency_label_eur",
  symbols_currency_label_gbp = "symbols_currency_label_gbp",
  symbols_currency_label_jpy = "symbols_currency_label_jpy",
  symbols_currency_label_chf = "symbols_currency_label_chf",
  symbols_currency_label_cad = "symbols_currency_label_cad", 
  symbols_currency_label_aud = "symbols_currency_label_aud",
  symbols_currency_label_nzd = "symbols_currency_label_nzd",
  symbols_currency_label_cny = "symbols_currency_label_cny",
  symbols_currency_label_hkd = "symbols_currency_label_hkd",
  symbols_currency_label_sgd = "symbols_currency_label_sgd",
  symbols_currency_label_krw = "symbols_currency_label_krw",
  symbols_currency_label_inr = "symbols_currency_label_inr",
  symbols_currency_label_thb = "symbols_currency_label_thb",
  symbols_currency_label_myr = "symbols_currency_label_myr",
  symbols_currency_label_idr = "symbols_currency_label_idr", 
  symbols_currency_label_php = "symbols_currency_label_php", 
  symbols_currency_label_sek = "symbols_currency_label_sek",
  symbols_currency_label_nok = "symbols_currency_label_nok", 
  symbols_currency_label_dkk = "symbols_currency_label_dkk", 
  symbols_currency_label_pln = "symbols_currency_label_pln", 
  symbols_currency_label_czk = "symbols_currency_label_czk", 
  symbols_currency_label_huf = "symbols_currency_label_huf",
  symbols_currency_label_mxn = "symbols_currency_label_mxn",
  symbols_currency_label_brl = "symbols_currency_label_brl",
  symbols_currency_label_ars = "symbols_currency_label_ars",
  symbols_currency_label_clp = "symbols_currency_label_clp",
  symbols_currency_label_cop = "symbols_currency_label_cop",
  symbols_currency_label_aed = "symbols_currency_label_aed",
  symbols_currency_label_sar = "symbols_currency_label_sar", 
  symbols_currency_label_zar = "symbols_currency_label_zar", 
  symbols_currency_label_ils = "symbols_currency_label_ils",
  symbols_currency_label_try = "symbols_currency_label_try",
  lang_en = 'lang_en',
  lang_fr = 'lang_fr',
  lang_es = 'lang_es',
  window_alert_negative_number = 'window_alert_negative_number'
}