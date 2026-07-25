import { test, expect } from "@playwright/test";
import { loadPage } from "../helpers/helpers";

test.beforeEach(async ({ page }) => {
  await loadPage({ page: page });
});


test('live navbar displays gold, silver and btc prices', async ({ page }) => {
  // check they are visible
  await expect(page.locator('#gold')).toBeVisible();
  await expect(page.locator('#silver')).toBeVisible();
  await expect(page.locator('#btc')).toBeVisible();

  // check they are not empty
  const gold = await page.textContent('#gold');
  const silver = await page.textContent('#silver');
  const btc = await page.textContent('#btc');

  expect(gold).not.toBe('');
  expect(silver).not.toBe('');
  expect(btc).not.toBe('');

  // screenshot to catch layout regressions
  await expect(page).toHaveScreenshot('live-navbar.png');
});

test('second input changes on changes to first Select', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before-changed-of-first-Select-currency-Test.png');
  await page.selectOption('#baseCurrency', 'CAD');
  await expect(page).toHaveScreenshot('after-changed-of-first-Select-currency-Test.png');

  const result = await page.inputValue('#amountFromSecondInput');

  expect(parseFloat(result)).toBeCloseTo(parseFloat('68.75'), 1);
})

test('first input changes on changes to second input + select', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before-changed-of-second-Select-currency-Test.png');
  await page.selectOption('#desiredCurrency', 'CAD');
  await page.waitForTimeout(500);
  await page.fill('#amountFromSecondInput', '100');
  await expect(page).toHaveScreenshot('after-changed-of-second-Select-currency-Test.png');

  const result = await page.inputValue('#amountFromFirstInput');

  expect(parseFloat(result)).toBeCloseTo(parseFloat('62.5'), 1);
})