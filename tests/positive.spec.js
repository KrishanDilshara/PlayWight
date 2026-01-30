const { test, expect } = require('@playwright/test');

const positiveScenarios = [
  { 
    id: 'Pos_Fun_0001', 
    name: 'Simple Greeting Question', 
    input: 'oyaata kohomadha?', 
    expected: 'ඔයාට කොහොමද?' 
  },
  { 
    id: 'Pos_Fun_0002', 
    name: 'Simple Statement', 
    input: 'mama gedhara yanavaa.', 
    expected: 'මම ගෙදර යනවා.' 
  },
  { 
    id: 'Pos_Fun_0003', 
    name: 'Simple Need Expression', 
    input: 'mata bath oonee.', 
    expected: 'මට බත් ඕනේ.' 
  },
  
  { 
    id: 'Pos_Fun_0004', 
    name: 'Compound Sentence with But', 
    input: 'mama gedhara yanavaa, haebaeyi vahina nisaa dhaen yannee naehae.', 
    expected: 'මම ගෙදර යනවා, හැබැයි වහින නිසා දැන් යන්නේ නැහැ.' 
  },
  { 
    id: 'Pos_Fun_0005', 
    name: 'Compound Sentence with And', 
    input: 'api kaeema kanna yanavaa saha passee chithrapatayakuth balanavaa.', 
    expected: 'අපි කෑම කන්න යනවා සහ පස්සේ චිත්‍රපටයකුත් බලනවා.' 
  },
  
  { 
    id: 'Pos_Fun_0006', 
    name: 'Simple Question', 
    input: 'oyaata kohomadha?', 
    expected: 'ඔයාට කොහොමද?' 
  },
  { 
    id: 'Pos_Fun_0007', 
    name: 'Planning Question', 
    input: 'oyaa kavadhaa enna hithan innee?', 
    expected: 'ඔයා කවදා එන්න හිතන් ඉන්නේ?' 
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
    input: 'vahaama enna.', 
    expected: 'වහාම එන්න.' 
  },
  { 
    id: 'Pos_Fun_0010', 
    name: 'Direction Command', 
    input: 'issarahata yanna.', 
    expected: 'ඉස්සරහට යන්න.' 
  },
  
  { 
    id: 'Pos_Fun_0011', 
    name: 'Positive Statement', 
    input: 'mama ehema karanavaa.', 
    expected: 'මම එහෙම කරනවා.' 
  },
  { 
    id: 'Pos_Fun_0012', 
    name: 'Negative Statement', 
    input: 'mama ehema karannee naehae.', 
    expected: 'මම එහෙම කරන්නේ නැහැ.' 
  },
  
  { 
    id: 'Pos_Fun_0013', 
    name: 'Formal Greeting', 
    input: 'aayuboovan!', 
    expected: 'ආයුබෝවන්!' 
  },
  { 
    id: 'Pos_Fun_0014', 
    name: 'Morning Greeting', 
    input: 'suBha udhaeesanak!', 
    expected: 'සුභ උදෑසනක්!' 
  },
  
  { 
    id: 'Pos_Fun_0015', 
    name: 'Help Request', 
    input: 'mata udhavvak karanna puLuvandha?', 
    expected: 'මට උදව්වක් කරන්න පුළුවන්ද?' 
  },
  
  { 
    id: 'Pos_Fun_0016', 
    name: 'Past Tense', 
    input: 'mama iiyee gedhara giyaa.', 
    expected: 'මම ඊයේ ගෙදර ගියා.' 
  },
  { 
    id: 'Pos_Fun_0017', 
    name: 'Present Tense', 
    input: 'mama dhaen vaeda karanavaa.', 
    expected: 'මම දැන් වැඩ කරනවා.' 
  },
  { 
    id: 'Pos_Fun_0018', 
    name: 'Future Tense', 
    input: 'mama heta enavaa.', 
    expected: 'මම හෙට එනවා.' 
  },
  
  { 
    id: 'Pos_Fun_0019', 
    name: 'Singular Pronoun', 
    input: 'mama yanna hadhannee.', 
    expected: 'මම යන්න හදන්නේ.' 
  },
  { 
    id: 'Pos_Fun_0020', 
    name: 'Plural Pronoun', 
    input: 'api yamu.', 
    expected: 'අපි යමු.' 
  },
  
  { 
    id: 'Pos_Fun_0021', 
    name: 'With English Brand', 
    input: 'Zoom link eka email karanna', 
    expected: 'Zoom link එක email කරන්න' 
  },
  { 
    id: 'Pos_Fun_0022', 
    name: 'With Date', 
    input: 'dhesaembar 25', 
    expected: 'දෙසැම්බර් 25' 
  },
  
  { 
    id: 'Pos_Fun_0023', 
    name: 'With Currency', 
    input: 'ru.5343', 
    expected: 'රු.5343' 
  },
  
  { 
    id: 'Pos_Fun_0024', 
    name: 'Informal Slang', 
    input: 'ela machan! supiri!!', 
    expected: 'එල මචන්! සුපිරි!!' 
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