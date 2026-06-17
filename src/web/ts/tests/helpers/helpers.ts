import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const setupCurrencies = async (
  page: Page,
  base = 'EUR',
  desired = 'USD'
) => {
  await page.selectOption('#baseCurrency', base);
  await page.selectOption('#desiredCurrency', desired);
}

export const takeScreenshot = async (page: Page, name: String) => {
  await expect(page).toHaveScreenshot(`${name}.png`);
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

export const loadPage = async ({ page }: { page: Page })  => {
  await page.route('https://api.exchangeratesapi.io/v1/latest**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        base: 'EUR',
        rates: {
          USD: 1.1,
          EUR: 1.0,
          GBP: 0.85,
          CAD: 1.60
        }
      }),
    });
  });
  await page.goto('http://localhost:5174/');
}