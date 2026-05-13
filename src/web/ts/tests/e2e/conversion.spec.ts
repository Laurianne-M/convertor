import { test, expect } from "@playwright/test";
import { setupCurrencies, takeScreenshot, fillAndConvert, loadPage } from "../helpers/helpers";

test.beforeEach(async ({ page }) => {
  await loadPage(page);
});



test('second input changes on changes to first', async ({ page }) => {

  await setupCurrencies(page);
  const result = await fillAndConvert(
    page,
    '#amountFromFirstInput',
    '100',
    'converted_value_Second_Input_Test',
    '#amountFromSecondInput',
  );
  expect(parseFloat(result)).toBeCloseTo(parseFloat('110'), 1);
});

test('first input changes on changes to second', async ({ page }) => {
  await setupCurrencies(page);
  const result = await fillAndConvert(
    page,
    '#amountFromSecondInput',
    '100',
    'converted_value_Second_Input_Test',
    '#amountFromFirstInput',
  );

  expect(parseFloat(result)).toBeCloseTo(parseFloat('90.90'), 1);
})

test('second input changes on changes to first Select', async ({ page }) => {
  await setupCurrencies(page);
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before_changed_of_first_Select_currency_Test.png');
  await page.selectOption('#baseCurrency', 'CAD');
  await expect(page).toHaveScreenshot('after_changed_of_first_Select_currency_Test.png');

  const result = await page.inputValue('#amountFromSecondInput');

  expect(parseFloat(result)).toBeCloseTo(parseFloat('68.75'), 1);

})

test('first input changes on changes to second input + select', async ({ page }) => {
  await setupCurrencies(page);
  await page.waitForTimeout(500);
  await page.fill('#amountFromFirstInput', '100');
  await expect(page).toHaveScreenshot('before_changed_of_second_Select_currency_Test.png');
  await page.selectOption('#desiredCurrency', 'CAD');
  await page.waitForTimeout(500);
  await page.fill('#amountFromSecondInput', '100');
  await expect(page).toHaveScreenshot('after_changed_of_second_Select_currency_Test.png');

  const result = await page.inputValue('#amountFromFirstInput');

  expect(parseFloat(result)).toBeCloseTo(parseFloat('62.5'), 1);

})