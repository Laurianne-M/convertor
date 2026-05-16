import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { MOCK_RATES_RESPONSE, API_BASE_URL } from '../../constants';

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

export const loadPage = async (page: Page) => {
  await page.route(`${API_BASE_URL}**`, async route => {
    await route.fulfill({
      status: MOCK_RATES_RESPONSE.status,
      contentType: MOCK_RATES_RESPONSE.contentType,
      body: JSON.stringify(MOCK_RATES_RESPONSE.body),
    });
  });
  
  await page.goto('http://localhost:5174/');
}
