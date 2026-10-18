import { AppConstants } from "../../constants";
import stringsEn from "../../../locales/strings.en.json";
import stringsFr from "../../../locales/strings.fr.json";
import stringsEs from "../../../locales/strings.es.json";
import type { LocalizationService } from "./LocalizationService";
import { StringKey } from "./LocalizationService";

type Strings = Record<string, string>;

const strings: Record<string, Strings> = {
  en: stringsEn as Strings,
  fr: stringsFr as Strings,
  es: stringsEs as Strings
};

export class LocalizationServiceImpl implements LocalizationService {
  setLocale(lang: string): void {
    localStorage.setItem(AppConstants.LOCALE.langKey, lang);
  }

  getLocale(): string {
    try {
      const storedLanguage = localStorage.getItem(AppConstants.LOCALE.langKey);
      if (storedLanguage) return storedLanguage;

      const navigatorLanguage = navigator.language;
      if (!navigatorLanguage) return AppConstants.LOCALE.default;

      return navigatorLanguage.split('-')[0] ?? AppConstants.LOCALE.default;
    } catch {
      return AppConstants.LOCALE.default;
    }
  }

  t(key: StringKey): string {
    const languageStrings = strings[this.getLocale()] ?? strings.en;
    return languageStrings[key] ?? strings.en[key] ?? key;
  }
}