const { test, expect } = require('@playwright/test');

const positiveScenarios = [
  { 
    id: 'Pos_Fun_0001', 
    name: 'Simple Greeting Question', 
    input: 'oyaa office ekata yanne koomadha?', 
    expected: 'ඔයා office එකට යන්නෙ කෝමද?' 
  },
  { 
    id: 'Pos_Fun_0002', 
    name: 'Simple Statement', 
    input: 'mama bank ekata yanavaa.', 
    expected: 'මම bank එකට යනවා.' 
  },
  { 
    id: 'Pos_Fun_0003', 
    name: 'Simple Need Expression', 
    input: 'mata tea ekak oona.', 
    expected: 'මට tea එකක් ඕන.' 
  },
  
  { 
    id: 'Pos_Fun_0004', 
    name: 'Compound Sentence', 
    input: 'mama gedhara yanavaa, haebaeyi project eka nisaa dhaen yannee naehae.', 
    expected: 'මම ගෙදර යනවා, හැබැයි project එක නිසා දැන් යන්නේ නැහැ.' 
  },
  { 
    id: 'Pos_Fun_0005', 
    name: 'Compound Sentence', 
    input: 'api kaeema kanna yanavaa saha passee cinema ekuth balanavaa.', 
    expected: 'අපි කෑම කන්න යනවා සහ පස්සේ cinema එකුත් බලනවා.' 
  },
  
  { 
    id: 'Pos_Fun_0006', 
    name: 'Simple Question', 
    input: 'mata help karanna puLuvandha?', 
    expected: 'මට help කරන්න පුළුවන්ද?' 
  },
  { 
    id: 'Pos_Fun_0007', 
    name: 'Planning Question', 
    input: 'oyaa weekend vala kohedha yanne?', 
    expected: 'ඔයා weekend වල කොහෙද යන්නෙ?' 
  },
  { 
    id: 'Pos_Fun_0008', 
    name: 'Functionality Question', 
    input: 'meeka hariyata vaeda karanavaadha?', 
    expected: 'මේක හරියට වැඩ කරනවාද?' 
  },
  
  { 
    id: 'Pos_Fun_0009', 
    name: 'Urgent Command', 
    input: 'vahaama call karanna.', 
    expected: 'වහාම call කරන්න.' 
  },
  { 
    id: 'Pos_Fun_0010', 
    name: 'Direction Command', 
    input: 'bank ekata yanna.', 
    expected: 'bank එකට යන්න.' 
  },
  
  { 
    id: 'Pos_Fun_0011', 
    name: 'Positive Statement', 
    input: 'mata rasata uyanna puluvan.', 
    expected: 'මට රසට උයන්න පුලුවන්.' 
  },
  { 
    id: 'Pos_Fun_0012', 
    name: 'Negative Statement', 
    input: 'mata uyanna baee', 
    expected: 'මට උයන්න බෑ' 
  },
  
  { 
    id: 'Pos_Fun_0013', 
    name: 'Formal Greeting', 
    input: 'suba raathriyak!', 
    expected: 'සුබ රාත්‍රියක්!' 
  },
  { 
    id: 'Pos_Fun_0014', 
    name: 'Morning Greeting', 
    input: 'suba udhaeesanak!', 
    expected: 'සුබ උදෑසනක්!' 
  },
  
  { 
    id: 'Pos_Fun_0015', 
    name: 'Help Request', 
    input: 'mata udhav karanna puLuvandha?', 
    expected: 'මට උදව් කරන්න පුළුවන්ද?' 
  },
  
  { 
    id: 'Pos_Fun_0016', 
    name: 'Past Tense', 
    input: 'mama iiyee market ekata giyaa.', 
    expected: 'මම ඊයේ market එකට ගියා.' 
  },
  { 
    id: 'Pos_Fun_0017', 
    name: 'Present Tense', 
    input: 'mama dhaen computer eka hadhanavaa.', 
    expected: 'මම දැන් computer එක හදනවා.' 
  },
  { 
    id: 'Pos_Fun_0018', 
    name: 'Future Tense', 
    input: 'mama heta university yanavaa.', 
    expected: 'මම හෙට university යනවා.' 
  },
  
  { 
    id: 'Pos_Fun_0019', 
    name: 'Singular Pronoun', 
    input: 'mama class ekak patan ganna yanne.', 
    expected: 'මම class එකක් පටන් ගන්න යන්නෙ.' 
  },
  { 
    id: 'Pos_Fun_0020', 
    name: 'Plural Pronoun', 
    input: 'api movie ekak balanna yamu.', 
    expected: 'අපි movie එකක් බලන්න යමු.' 
  },
  
  { 
    id: 'Pos_Fun_0021', 
    name: 'With English Brand', 
    input: 'mata WhatsApp message ekak evanna', 
    expected: 'මට WhatsApp message එකක් එවන්න' 
  },
  { 
    id: 'Pos_Fun_0022', 
    name: 'With Date', 
    input: 'february 15', 
    expected: 'february 15' 
  },
  
  { 
    id: 'Pos_Fun_0023', 
    name: 'With Currency', 
    input: 'ru.2500', 
    expected: 'රු.2500' 
  },
  
  { 
    id: 'Pos_Fun_0024', 
    name: 'Informal Slang', 
    input: 'hari boss! hari!', 
    expected: 'හරි boss! හරි!' 
  }
];

for (const scenario of positiveScenarios) {
  test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    
    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.pressSequentially(scenario.input, { delay: 30 });
    
    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();
    await expect(outputDiv).not.toBeEmpty({ timeout: 10000 });
    
    const actualOutput = await outputDiv.innerText();
    console.log(`TC ID: ${scenario.id} | Actual: ${actualOutput}`);
    
    await page.screenshot({ path: `screenshots/${scenario.id}.png` });
    
    expect(actualOutput.trim()).toBe(scenario.expected);
  });
}