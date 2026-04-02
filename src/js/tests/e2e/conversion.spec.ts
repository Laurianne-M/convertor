import { test, expect } from "@playwright/test";

test('user enter an amount and sees the converted value', async ( { page } ) => {

    await page.goto('/'); 
    await page.selectOption('#baseCurrency', 'EUR');
    await page.selectOption('#desiredCurrency', 'USD');
    await page.waitForTimeout(500);
    //await page.screenshot({ path: 'before.png' });
    await page.fill('#amountFromFirstInput', '100');
    await page.waitForTimeout(1000); 
    //await page.screenshot({ path: 'after.png' });
    
    const result = await page.inputValue('#amountFromSecondInput');
    console.log('result:', result);
    expect(parseFloat(result)).toBeGreaterThan(parseFloat('0')); 
} ); 