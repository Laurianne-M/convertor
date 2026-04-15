import type { Page } from '@playwright/test';

export const setupCurrencies = async (
  page: Page,
  base = 'EUR',
  desired = 'USD'
) => {
  await page.goto('http://localhost:5174/');
  await page.selectOption('#baseCurrency', base);
  await page.selectOption('#desiredCurrency', desired);
}

export const takeScreenshot = async (page: Page, name: String) => {
  await page.screenshot({ path: `./tests_screenshots/${name}.png` });
}

export const fillAndConvert = async (
  page: Page,
  inputId: string,
  amount: string,
  screenshotPrefix: string,
  outputId: string
): Promise<string> => {
  await takeScreenshot(page, `before_${screenshotPrefix}`);
  await page.fill(inputId, amount);
  await takeScreenshot(page, `after_${screenshotPrefix}`);
  return page.inputValue(outputId);
}
