const { test, expect } = require('@playwright/test');

test('Pos_UI_0001: Input field and output area functionality', async ({ page }) => {
  try {
    console.log('Navigating to website...');
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
    
    console.log('Looking for input field...');
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await expect(inputArea).toBeVisible({ timeout: 10000 });
    await expect(inputArea).toBeEditable();
    console.log('✓ Input field found and editable');
    
    console.log('Looking for output area...');
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();
    await expect(outputDiv).toBeVisible({ timeout: 10000 });
    console.log('✓ Output area found');
    
    console.log('Testing text input...');
    const testInput = 'oyaata kohomadha?';
    await inputArea.fill(testInput);
    await page.waitForTimeout(3000);
    
    const outputText = await outputDiv.textContent();
    console.log(`Input: "${testInput}"`);
    console.log(`Output: "${outputText}"`);
    
    if (!outputText || outputText.trim() === '') {
      console.log('No output detected, pressing Enter...');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
      
      const outputAfterEnter = await outputDiv.textContent();
      console.log(`Output after Enter: "${outputAfterEnter}"`);
      
      expect(outputAfterEnter && outputAfterEnter.trim().length).toBeGreaterThan(0);
    } else {
      expect(outputText.trim().length).toBeGreaterThan(0);
    }
    
    console.log('Testing clear functionality...');
    await inputArea.clear();
    await page.waitForTimeout(1000);
    
    await inputArea.fill('m');
    await page.waitForTimeout(500);
    
    const currentInput = await inputArea.inputValue();
    console.log(`Current input: "${currentInput}"`);
    expect(currentInput).toBe('m');
    
    await page.screenshot({ path: 'screenshots/Pos_UI_0001.png' });
    console.log('✓ UI test completed successfully');
    
  } catch (error) {
    console.error('Test failed with error:', error.message);
    console.error('Error stack:', error.stack);
    
    await page.screenshot({ path: 'screenshots/Pos_UI_0001_ERROR.png' });
    
    throw error;
  }
});