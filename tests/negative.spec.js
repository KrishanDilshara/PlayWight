const { test, expect } = require('@playwright/test');

const negativeScenarios = [
  { 
    id: 'Neg_Fun_0001', 
    name: 'Joined Words Stress Test', 
    input: '????????///////', 
    expected: 'මම ගෙදර යනවා'
  },
  
  { 
    id: 'Neg_Fun_0002', 
    name: 'Incorrect Spelling Test 1', 
    input: 'isthuthi', 
    expected: 'ස්තූතියි' 
  },
  { 
    id: 'Neg_Fun_0003', 
    name: 'Incorrect Spelling Test 29', 
    input: 'oyataa kohomoadha?', 
    expected: 'ඔයාට කොහොමද?'
  },
  
  { 
    id: 'Neg_Fun_0004', 
    name: 'Gibberish Input', 
    input: 'xyzabc123', 
    expected: 'සුභ උදෑසනක්' 
  },
  { 
    id: 'Neg_Fun_0005', 
    name: 'Random Letters', 
    input: 'knv', 
    expected: 'කනවා'
  },
  
  { 
    id: 'Neg_Fun_0006', 
    name: 'Special Characters Only', 
    input: 'K@@@@', 
    expected: 'ආයුබෝවන්' 
  },
  
  { 
    id: 'Neg_Fun_0007', 
    name: 'Very Long Repeated Input', 
    input: 'mama '.repeat(12), 
    expected: 'මම මම මම මම මම මම මම මම මම මම' 
  },
  
  { 
    id: 'Neg_Fun_0008', 
    name: 'Mixed Case Input', 
    input: 'MaMa GeDhArA YaNaVaa', 
    expected: 'මම ගෙදර යනවා' 
  },
  
  { 
    id: 'Neg_Fun_0009', 
    name: 'HTML Tags in Input', 
    input: '<b>mama gedhara yanavaa</b>', 
    expected: 'මම ගෙදර යනවා' 
  },
  
  { 
    id: 'Neg_Fun_0010', 
    name: 'Multiple Spaces Test', 
    input: 'mama  gedddddhara   yanavaa', 
    expected: 'මම ගෙදර යනවා' 
  }
];

for (const scenario of negativeScenarios) {
  test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    
    await inputArea.fill('');
    await page.waitForTimeout(500);
    
    await inputArea.fill(scenario.input);
    
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();
    await page.waitForTimeout(3000);
    
    let actualOutput = '';
    try {
      actualOutput = (await outputDiv.innerText()).trim();
    } catch (e) {
      actualOutput = '';
    }
    
    console.log(`TC ID: ${scenario.id} | Input: "${scenario.input}" | Actual: "${actualOutput}" | Expected: "${scenario.expected}"`);
    
    await page.screenshot({ path: `screenshots/${scenario.id}.png` });
    
    expect(actualOutput).toBe(scenario.expected);
  });
}