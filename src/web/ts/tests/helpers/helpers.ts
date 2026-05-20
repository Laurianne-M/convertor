import type { Page } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL;
const MOCK_RATES_RESPONSE = {
  status: 200,
  contentType: 'application/json',
  body: {
    success: true,
    base: 'EUR',
    rates: {
      USD: 2,
      EUR: 3,
      GBP: 4,
      CAD: 5
    }
  }
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
  await page.selectOption('#baseCurrency', 'EUR');
  await page.selectOption('#desiredCurrency', 'USD');
}
