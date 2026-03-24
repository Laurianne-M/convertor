import { test, expect } from "@playwright/test";

test('user enter an amount and sees the converted value', async ( { page } ) => {

    await page.goto('/'); 
    //await page.screenshot({ path: 'before.png' });
    await page.fill('#amountFromFirstInput', '100');
    await page.waitForTimeout(10000); 
    //await page.screenshot({ path: 'after.png' });

    const result = await page.inputValue('#amountFromSecondInput');
    console.log('result:', result);
    expect(parseFloat(result)).toBeGreaterThan(0); 
} ); 