import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

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
  await page.selectOption('#baseCurrency', 'EUR');
  await page.selectOption('#desiredCurrency', 'USD');
}