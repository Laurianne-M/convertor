import type { LocalizationService } from "./LocalizationService";
import type { StringKey } from "./LocalizationService";

export class LocalizationServiceFake implements LocalizationService {
  private locale = "en";

  setLocale(lang: string): void {
    this.locale = lang;
  }

  getLocale(): string {
    return this.locale;
  }

  t(key: StringKey): string {
    return key;
  }
}