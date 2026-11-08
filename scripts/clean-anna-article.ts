import fs from 'fs';
import path from 'path';
import { ANNA_ARTICLE } from '../src/constants/annaArticle';

const headerIndices = [0, 3, 6, 9, 12, 16, 19, 22, 26, 29, 32, 37, 41];

// Deep clone translations
const cleanedTranslations: Record<string, string[]> = {};

for (const [lang, paragraphs] of Object.entries(ANNA_ARTICLE.translations)) {
  cleanedTranslations[lang] = paragraphs.map((text, idx) => {
    if (headerIndices.includes(idx)) {
      // Remove leading header sentence
      return text.replace(/^[^.!?。！？]+[.!?。！？]\s*/, '').trim();
    }
    return text;
  });
}

const cleanedPassages = ANNA_ARTICLE.passages.map((p, idx) => {
  const isHeader = headerIndices.includes(idx);
  const sourceText = isHeader
    ? p.sourceText.replace(/^[^.!?。！？]+[.!?。！？]\s*/, '').trim()
    : p.sourceText;

  const translations: Record<string, string> = {};
  for (const [lang, val] of Object.entries(p.translations)) {
    translations[lang] = isHeader
      ? val.replace(/^[^.!?。！？]+[.!?。！？]\s*/, '').trim()
      : val;
  }

  return {
    ...p,
    sourceText,
    translations
  };
});

const updatedArticle = {
  ...ANNA_ARTICLE,
  passages: cleanedPassages,
  translations: cleanedTranslations
};

const fileContent = `import { ReadingDocument } from '../types';

export const ANNA_ARTICLE: ReadingDocument = ${JSON.stringify(updatedArticle, null, 2)};
`;

const outputPath = path.resolve(process.cwd(), 'src/constants/annaArticle.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully updated src/constants/annaArticle.ts without embedded section titles!');
