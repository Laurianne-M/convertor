import { test, expect } from "@playwright/test";
import { setupCurrencies, takeScreenshot, fillAndConvert } from "../helpers";

test.beforeEach(async ( { page } ) => {
    await page.route('https://api.exchangeratesapi.io/v1/latest**', async route => {
        await route.fulfill( {
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify( {
                success: true,
                base: 'EUR',
                rates: {
                    USD: 1.1,
                    EUR: 1.0,
                    GBP: 0.85,
                    CAD: 1.60
                }
            } ),
        } );
    } );
} );



test('user enter an amount in first input and sees the converted value in second input', async ( { page } ) => {

    await setupCurrencies(page);
    const result = await fillAndConvert(
        page,
        '#amountFromFirstInput',
        '100',
        'converted_value_Second_Input_Test',
        '#amountFromSecondInput', 
     );
    expect(parseFloat(result)).toBeCloseTo(parseFloat('110'), 1); 
} ); 

test('user enter an amount in the second input and sees the converted value in first input', async ( { page } ) => {
    await setupCurrencies(page);
    const result = await fillAndConvert(
        page,
        '#amountFromSecondInput',
        '100',
        'converted_value_Second_Input_Test',
        '#amountFromFirstInput', 
     );

    expect(parseFloat(result)).toBeCloseTo(parseFloat('90.90'), 1); 
} )

test('user change the currency in the first select options and sees the new converted value in second input', async ( {page} ) => {
    await setupCurrencies(page);
    await page.waitForTimeout(500);
    await page.fill('#amountFromFirstInput', '100');
    await takeScreenshot(page, 'before_changed_of_first_Select_currency_Test');
    await page.selectOption('#baseCurrency', 'CAD');
    await takeScreenshot(page, 'after_changed_of_first_Select_currency_Test');

    const result = await page.inputValue('#amountFromSecondInput'); 

    expect(parseFloat(result)).toBeCloseTo(parseFloat('68.75'), 1); 

})

test('user change the currency in the second select options + the second input, and sees the new converted value in first input', async ( {page} ) => {
    await setupCurrencies(page);
    await page.waitForTimeout(500);
    await page.fill('#amountFromFirstInput', '100');
    await takeScreenshot(page, 'before_changed_of_second_Select_currency_Test');
    await page.selectOption('#desiredCurrency', 'CAD');
    await page.waitForTimeout(500);
    await page.fill('#amountFromSecondInput', '100');
    await takeScreenshot(page, 'after_changed_of_second_Select_currency_Test');

    const result = await page.inputValue('#amountFromFirstInput'); 

    expect(parseFloat(result)).toBeCloseTo(parseFloat('62.5'), 1); 

})