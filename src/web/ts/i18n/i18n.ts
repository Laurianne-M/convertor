import stringsEn from '../../locales/strings.en.json';

type Strings = Record<string, string>;
const en = stringsEn as Strings;

const strings: Record<string, Record<string, any>> = { en };
const fallbackStrings = en;

function getCurrentLanguage(): string {
  return navigator.language.split('-')[0] || 'en';
}

export function t(key: string): string {
  const language = getCurrentLanguage();
  const translation = strings[language] ?? fallbackStrings;
  const value = translation[key] ?? fallbackStrings[key] ?? key;
  return value;
}