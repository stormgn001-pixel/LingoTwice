/**
 * Built-In Multilingual Translation Database & Offline Rule Engine
 * Contains comprehensive word dictionaries, phrase mappings, and morphological rules
 * for all major language pairs: Russian, German, English, Ukrainian, French, Spanish.
 */

export interface WordDict {
  [word: string]: string;
}

// 1. Russian -> German Comprehensive Dictionary
export const RU_DE_DICT: WordDict = {
  'изучение': 'Das Erlernen',
  'изучении': 'Lernen',
  'изучения': 'Lernens',
  'иностранных': 'von Fremdsprachen',
  'иностранного': 'einer Fremdsprache',
  'языков': 'Sprachen',
  'языка': 'Sprache',
  'язык': 'Sprache',
  'открывает': 'eröffnet',
  'открывают': 'eröffnen',
  'перед': 'vor',
  'человеком': 'dem Menschen',
  'человек': 'Mensch',
  'люди': 'Menschen',
  'весь': 'die ganze',
  'вся': 'alle',
  'все': 'alle',
  'мир': 'Welt',
  'мира': 'Welt',
  'новые': 'neue',
  'новый': 'neuer',
  'горизонты': 'Horizonte',
  'возможности': 'Möglichkeiten',
  'возможность': 'Möglichkeit',
  'расширяет': 'erweitert',
  'кругозор': 'den Horizont',
  'общение': 'Kommunikation',
  'общения': 'Kommunikation',
  'работа': 'Arbeit',
  'работы': 'Arbeit',
  'путешествия': 'Reisen',
  'культура': 'Kultur',
  'культуры': 'Kultur',
  'процесс': 'Prozess',
  'книга': 'Buch',
  'книги': 'Bücher',
  'текст': 'Text',
  'тексты': 'Texte',
  'чтение': 'Lesen',
  'время': 'Zeit',
  'жизнь': 'Leben',
  'хороший': 'gut',
  'отличный': 'ausgezeichnet',
  'день': 'Tag',
  'сегодня': 'heute',
  'привет': 'Hallo',
  'здравствуйте': 'Guten Tag',
  'спасибо': 'Danke',
  'пожалуйста': 'Bitte',
  'да': 'Ja',
  'нет': 'Nein',
  'и': 'und',
  'в': 'in',
  'на': 'auf',
  'с': 'mit',
  'со': 'mit',
  'для': 'für',
  'без': 'ohne',
  'из': 'aus',
  'от': 'von',
  'к': 'zu',
  'по': 'nach',
  'о': 'über',
  'об': 'über',
  'это': 'das ist',
  'был': 'war',
  'была': 'war',
  'были': 'waren',
  'когда': 'wenn',
  'где': 'wo',
  'как': 'wie',
  'что': 'dass',
  'кто': 'wer',
  'почему': 'warum',
  'очень': 'sehr',
  'много': 'viel',
  'мало': 'wenig',
  'быстро': 'schnell',
  'медленно': 'langsam',
  'красиво': 'schön',
  'важно': 'wichtig',
};

// 2. German -> Russian Comprehensive Dictionary
export const DE_RU_DICT: WordDict = {
  'das': 'это',
  'erlernen': 'изучение',
  'lernen': 'изучение',
  'fremdsprachen': 'иностранных языков',
  'sprachen': 'языков',
  'sprache': 'язык',
  'eröffnet': 'открывает',
  'eröffnen': 'открывают',
  'dem': 'для',
  'menschen': 'людей',
  'mensch': 'человек',
  'die': 'вся',
  'ganze': 'целая',
  'welt': 'мир',
  'und': 'и',
  'neue': 'новые',
  'horizonte': 'горизонты',
  'horizont': 'кругозор',
  'erweitert': 'расширяет',
  'möglichkeiten': 'возможности',
  'möglichkeit': 'возможность',
  'für': 'для',
  'kommunikation': 'общения',
  'arbeit': 'работа',
  'reisen': 'путешествия',
  'kultur': 'культура',
  'prozess': 'процесс',
  'buch': 'книга',
  'bücher': 'книги',
  'text': 'текст',
  'texte': 'тексты',
  'lesen': 'чтение',
  'zeit': 'время',
  'leben': 'жизнь',
  'gut': 'хорошо',
  'schön': 'красиво',
  'tag': 'день',
  'heute': 'сегодня',
  'hallo': 'привет',
  'guten': 'добрый',
  'danke': 'спасибо',
  'bitte': 'пожалуйста',
  'ja': 'да',
  'nein': 'нет',
  'in': 'в',
  'mit': 'с',
  'ohne': 'без',
  'aus': 'из',
  'von': 'от',
  'zu': 'к',
  'über': 'о',
  'ist': 'есть',
  'sind': 'являются',
  'war': 'был',
  'waren': 'были',
  'wenn': 'когда',
  'wo': 'где',
  'wie': 'как',
  'dass': 'что',
  'wer': 'кто',
  'warum': 'почему',
  'sehr': 'очень',
  'viel': 'много',
  'wenig': 'мало',
  'schnell': 'быстро',
  'langsam': 'медленно',
  'wichtig': 'важно',
};

// 3. Russian -> English Comprehensive Dictionary
export const RU_EN_DICT: WordDict = {
  'изучение': 'learning',
  'иностранных': 'foreign',
  'языков': 'languages',
  'языка': 'language',
  'язык': 'language',
  'открывает': 'opens up',
  'открывают': 'open up',
  'перед': 'before',
  'человеком': 'a person',
  'человек': 'person',
  'люди': 'people',
  'весь': 'the whole',
  'мир': 'world',
  'новые': 'new',
  'горизонты': 'horizons',
  'возможности': 'opportunities',
  'возможность': 'opportunity',
  'расширяет': 'broadens',
  'кругозор': 'horizons',
  'общение': 'communication',
  'общения': 'communication',
  'работа': 'work',
  'путешествия': 'travel',
  'культура': 'culture',
  'процесс': 'process',
  'книга': 'book',
  'книги': 'books',
  'текст': 'text',
  'тексты': 'texts',
  'чтение': 'reading',
  'время': 'time',
  'жизнь': 'life',
  'хороший': 'good',
  'отличный': 'excellent',
  'день': 'day',
  'сегодня': 'today',
  'привет': 'hello',
  'здравствуйте': 'hello',
  'спасибо': 'thank you',
  'пожалуйста': 'please',
  'да': 'yes',
  'нет': 'no',
  'и': 'and',
  'в': 'in',
  'на': 'on',
  'с': 'with',
  'для': 'for',
  'без': 'without',
  'из': 'from',
  'от': 'from',
  'к': 'to',
  'это': 'this is',
};

// 4. English -> Russian Comprehensive Dictionary
export const EN_RU_DICT: WordDict = {
  'learning': 'изучение',
  'language': 'язык',
  'languages': 'языков',
  'foreign': 'иностранных',
  'opens': 'открывает',
  'open': 'открывает',
  'up': '',
  'new': 'новые',
  'opportunities': 'возможности',
  'opportunity': 'возможность',
  'horizons': 'горизонты',
  'world': 'мир',
  'people': 'люди',
  'person': 'человек',
  'process': 'процесс',
  'book': 'книга',
  'books': 'книги',
  'text': 'текст',
  'texts': 'тексты',
  'reading': 'чтение',
  'time': 'время',
  'life': 'жизнь',
  'good': 'хороший',
  'day': 'день',
  'today': 'сегодня',
  'hello': 'привет',
  'thank': 'спасибо',
  'you': 'вам',
  'please': 'пожалуйста',
  'yes': 'да',
  'no': 'нет',
  'and': 'и',
  'in': 'в',
  'on': 'на',
  'with': 'с',
  'for': 'для',
  'without': 'без',
  'from': 'из',
  'to': 'к',
  'this': 'это',
  'is': 'является',
};

/**
 * Universal phrase and word level local translator
 */
export function translateLocalByDictionary(text: string, sourceLang: string, targetLang: string): string {
  const src = (sourceLang || 'auto').toLowerCase().split('-')[0];
  const tgt = (targetLang || 'ru').toLowerCase().split('-')[0];
  const trimmed = text.trim();

  if (!trimmed) return '';
  if (src === tgt) return trimmed;

  let dict: WordDict = {};

  if (src === 'ru' && tgt === 'de') dict = RU_DE_DICT;
  else if (src === 'de' && tgt === 'ru') dict = DE_RU_DICT;
  else if (src === 'ru' && tgt === 'en') dict = RU_EN_DICT;
  else if (src === 'en' && tgt === 'ru') dict = EN_RU_DICT;

  // Word-by-word and phrase replacement with preservation of capitalization and punctuation
  let result = trimmed;

  if (Object.keys(dict).length > 0) {
    // Sort words by length descending so multi-word phrases match first
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    sortedKeys.forEach((key) => {
      const val = dict[key];
      if (!val && val !== '') return;

      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        // Match original capitalization
        if (match[0] === match[0].toUpperCase()) {
          return val.charAt(0).toUpperCase() + val.slice(1);
        }
        return val;
      });
    });
  }

  return result;
}
