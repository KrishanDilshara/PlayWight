const { test, expect } = require('@playwright/test');

test('Pos_UI_0001: Input field and output area functionality', async ({ page }) => {
  // 1. Website එකට යන්න
  await page.goto('https://www.swifttranslator.com/');
  
  // 2. UI elements තිබෙනවාද බලන්න
  const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
  const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();
  
  // 3. Input field තිබෙනවාද, type කරන්න පුළුවන්ද?
  await expect(inputArea).toBeVisible();
  await expect(inputArea).toBeEditable();
  console.log('Input field is visible and editable: ✓');
  
  // 4. Output area තිබෙනවාද?
  await expect(outputDiv).toBeVisible();
  console.log('Output area is visible: ✓');
  
  // 5. Type a complete sentence and check output
  console.log('Typing complete sentence...');
  const testInput = 'oyaata kohomadha?';
  await inputArea.fill(testInput);
  
  // Wait for conversion (some systems need time or Enter key)
  await page.waitForTimeout(2000);
  
  // 6. Check if output appears
  const outputText = await outputDiv.textContent();
  console.log(`Input: "${testInput}"`);
  console.log(`Output: "${outputText}"`);
  
  // 7. Output හිස් නොවන බව හෝ Sinhala characters අඩංගු බව check කරන්න
  if (outputText.trim() === '') {
    // Maybe need to press Enter or trigger conversion
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    const outputAfterEnter = await outputDiv.textContent();
    console.log(`Output after Enter: "${outputAfterEnter}"`);
    
    // Check again
    expect(outputAfterEnter.trim().length).toBeGreaterThan(0);
  } else {
    // Output already exists
    expect(outputText.trim().length).toBeGreaterThan(0);
  }
  
  // 8. Clear functionality test
  console.log('Testing clear functionality...');
  
  // Clear input
  await inputArea.clear();
  await page.waitForTimeout(1000);
  
  // Type something else to verify input is cleared
  await inputArea.fill('m');
  await page.waitForTimeout(500);
  
  const currentInput = await inputArea.inputValue();
  console.log(`Current input after clear and typing "m": "${currentInput}"`);
  
  // Should be just "m" (not previous text)
  expect(currentInput).toBe('m');
  
  // 9. Take screenshot
  await page.screenshot({ path: 'screenshots/Pos_UI_0001.png' });
  
  console.log('UI test completed: ✓');
});