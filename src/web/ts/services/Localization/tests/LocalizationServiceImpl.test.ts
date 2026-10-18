import { beforeEach, describe, expect, it } from "vitest";
import { LocalizationServiceImpl } from "../LocalizationServiceImpl";
import { StringKey } from "../LocalizationService";

describe("LocalizationServiceImpl", () => {
  let localization: LocalizationServiceImpl;

  beforeEach(() => {
    localStorage.clear();
    localization = new LocalizationServiceImpl();
  });

  it("persists and returns the selected locale", () => {
    localization.setLocale("fr");

    expect(localization.getLocale()).toBe("fr");
  });

  it("uses the browser language when no locale is stored", () => {
    Object.defineProperty(navigator, "language", {
      configurable: true,
      value: "es-MX"
    });

    expect(localization.getLocale()).toBe("es");
  });

  it("translates a key using the selected locale", () => {
    localization.setLocale("fr");

    expect(localization.t(StringKey.lang_en)).toBe("Anglais");
  });

  it("falls back to English for an unsupported locale", () => {
    localization.setLocale("de");

    expect(localization.t(StringKey.lang_en)).toBe("English");
  });
});