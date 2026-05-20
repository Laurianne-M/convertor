import { test, expect } from "@playwright/test";
import { loadPage } from "../helpers/helpers";

test.beforeEach(async ({ page }) => {
  await loadPage(page);
});

test('second input changes on changes to first Select', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before_changed_of_first_Select_currency_Test.png');
  await page.selectOption('#baseCurrency', 'CAD');
  await expect(page).toHaveScreenshot('after_changed_of_first_Select_currency_Test.png');
})

test('first input changes on changes to second input + select', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before_changed_of_second_Select_currency_Test.png');
  await page.selectOption('#desiredCurrency', 'CAD');
  await page.waitForTimeout(500);
  await page.fill('#amountFromSecondInput', '100');
  await expect(page).toHaveScreenshot('after_changed_of_second_Select_currency_Test.png');
})