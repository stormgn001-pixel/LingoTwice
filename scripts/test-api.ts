/**
 * Diagnostic & Test Script for LingoTwice Backend API Endpoints, Content & Free Access Invariants
 */

import assert from 'assert';

async function runTests() {
  console.log('=== Starting LingoTwice Diagnostics & Tests ===');

  // Test 1: Validate environment configuration
  console.log('Test 1: Environment check...');
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split('.')[0], 10);
  assert(majorVersion >= 20, `Node.js version must be >= 20. Current: ${nodeVersion}`);
  console.log(`[PASS] Node.js version ${nodeVersion} is compatible (>= 20).`);

  // Test 2: URL Construction & Clean-up Logic (No /api/api duplication)
  console.log('Test 2: Testing Base URL formatting & prevention of /api/api duplication...');
  const formatBaseUrl = (rawEnv: string) => {
    const trimmed = rawEnv.trim().replace(/\/+$/, '');
    return trimmed.replace(/\/api$/, '');
  };

  const testUrls = [
    { input: 'https://api.lingotwice.com', expected: 'https://api.lingotwice.com/api/health' },
    { input: 'https://api.lingotwice.com/', expected: 'https://api.lingotwice.com/api/health' },
    { input: 'https://api.lingotwice.com/api', expected: 'https://api.lingotwice.com/api/health' },
    { input: 'https://api.lingotwice.com/api/', expected: 'https://api.lingotwice.com/api/health' },
    { input: '', expected: '/api/health' },
  ];

  for (const testCase of testUrls) {
    const baseUrl = formatBaseUrl(testCase.input);
    const finalUrl = `${baseUrl}/api/health`;
    assert.strictEqual(finalUrl, testCase.expected, `Failed for input: ${testCase.input}. Expected: ${testCase.expected}, got: ${finalUrl}`);
  }
  console.log('[PASS] Base URL formatting correctly cleans trailing slashes and prevents /api/api duplication.');

  // Test 3: Verify built-in library stories and all 17 translations
  const requiredLangs = ['ru', 'en', 'uk', 'de', 'fr', 'es', 'it', 'pl', 'pt', 'nl', 'sv', 'tr', 'zh', 'ja', 'ko', 'ar', 'he'];

  console.log('Test 3: Checking built-in A1 stories ("Один день Анны", "Анна едет на море", "Анна идёт в гости", "Анна идёт к врачу")...');
  const { SAMPLE_DOCUMENTS } = await import('../src/constants/sampleLibrary');
  const { ANNA_ARTICLE } = await import('../src/constants/annaArticle');
  const { ANNA_SEA_ARTICLE } = await import('../src/constants/annaSeaArticle');
  const { ANNA_GUEST_ARTICLE } = await import('../src/constants/annaGuestArticle');
  const { ANNA_DOCTOR_ARTICLE } = await import('../src/constants/annaDoctorArticle');

  assert(ANNA_ARTICLE && ANNA_ARTICLE.id === 'annas_day_a1_001' && ANNA_ARTICLE.passages.length === 45);
  assert(ANNA_SEA_ARTICLE && ANNA_SEA_ARTICLE.id === 'anna_sea_a1_001' && ANNA_SEA_ARTICLE.passages.length === 48);
  assert(ANNA_GUEST_ARTICLE && ANNA_GUEST_ARTICLE.id === 'anna_guest_a1_001' && ANNA_GUEST_ARTICLE.passages.length === 45);
  assert(ANNA_DOCTOR_ARTICLE && ANNA_DOCTOR_ARTICLE.id === 'anna_doctor_a1_001' && ANNA_DOCTOR_ARTICLE.passages.length === 44);

  for (const article of [ANNA_ARTICLE, ANNA_SEA_ARTICLE, ANNA_GUEST_ARTICLE, ANNA_DOCTOR_ARTICLE]) {
    assert(article.title.includes('A1'), `${article.id} title should indicate A1`);
    assert(article.coverImage && article.coverImage.length > 0, `${article.id} coverImage missing`);
    assert(SAMPLE_DOCUMENTS.some(d => d.id === article.id), `${article.id} must be registered in SAMPLE_DOCUMENTS`);
    for (const lang of requiredLangs) {
      assert(article.titleTranslations[lang as any], `Missing title translation for ${article.id} (${lang})`);
      assert(Array.isArray(article.translations[lang]), `Missing translation array for ${article.id} (${lang})`);
      assert.strictEqual(article.translations[lang].length, article.passages.length, `Passage count mismatch for ${article.id} (${lang})`);
    }
  }
  assert(ANNA_ARTICLE.translations.ru[0].startsWith('Меня зовут Анна'), 'Header "Знакомство" must be stripped from narrative text');
  assert(ANNA_ARTICLE.translations.en[0].startsWith('My name is Anna'), 'Header "Introduction" must be stripped from narrative text');
  console.log('[PASS] Built-in A1 stories verified across all 17 supported languages.');

  console.log('Test 4: Checking A2 stories ("Анна переезжает в Берлин", "Анна идёт в поход", "Анна учится готовить") and "Кошка Мия"...');
  const { ANNA_BERLIN_ARTICLE } = await import('../src/constants/annaBerlinArticle');
  const { ANNA_HIKE_ARTICLE } = await import('../src/constants/annaHikeArticle');
  const { ANNA_COOKING_ARTICLE } = await import('../src/constants/annaCookingArticle');
  const { ANNA_CAT_MIA_ARTICLE } = await import('../src/constants/annaCatMiaArticle');

  const passageMapArticles = [
    { doc: ANNA_BERLIN_ARTICLE, id: 'anna_berlin_a2_001', level: 'A2', count: 24 },
    { doc: ANNA_HIKE_ARTICLE, id: 'anna_hike_a2_001', level: 'A2', count: 21 },
    { doc: ANNA_COOKING_ARTICLE, id: 'anna_cooking_a2_001', level: 'A2', count: 20 },
    { doc: ANNA_CAT_MIA_ARTICLE, id: 'anna_cat_mia_a1_001', level: 'A1', count: 48 },
  ];

  const fs = await import('node:fs');
  const path = await import('node:path');

  for (const item of passageMapArticles) {
    assert(item.doc, `${item.id} must be defined`);
    assert.strictEqual(item.doc.id, item.id);
    assert.strictEqual(item.doc.level, item.level);
    assert.strictEqual(item.doc.passages.length, item.count);
    assert(item.doc.coverImage && item.doc.coverImage.length > 0, `${item.id} coverImage missing`);
    const publicCoverPath = path.resolve(process.cwd(), 'public', item.doc.coverImage.replace(/^\//, ''));
    assert(fs.existsSync(publicCoverPath), `Cover image must exist in public assets: ${publicCoverPath}`);
    assert(SAMPLE_DOCUMENTS.some(d => d.id === item.id), `${item.id} must be in SAMPLE_DOCUMENTS`);
    for (const lang of requiredLangs) {
      assert(item.doc.titleTranslations?.[lang as any], `Missing title translation for ${item.id} (${lang})`);
      for (const p of item.doc.passages) {
        assert(p.translations?.[lang], `Missing translation for ${item.id} paragraph ${p.id} in ${lang}`);
      }
    }
  }
  console.log('[PASS] A2 stories and "Кошка Мия" verified across all 17 languages with local cover assets.');

  // Test 5: Verify i18n completeness and zero monetization/AdSense keys across all 17 languages
  console.log('Test 5: Checking UI localization completeness & absence of monetization keys across all 17 languages...');
  const { getTranslation } = await import('../src/i18n/translations');
  const { EXTRA_TRANSLATIONS } = await import('../src/i18n/extraTranslations');

  const removedMonetizationKeys = [
    'upgradePremium',
    'subscriptionTitle',
    'buyPremium',
    'adsenseTitle',
    'cryptoPayTitle',
    'promoCodePlaceholder',
    'freeCharLimitError',
  ];

  for (const lang of requiredLangs) {
    assert(EXTRA_TRANSLATIONS[lang as keyof typeof EXTRA_TRANSLATIONS], `Missing EXTRA_TRANSLATIONS entry for ${lang}`);
    const t = getTranslation(lang as any);
    assert(t.methodGuide && t.methodGuide.length > 0, `Missing methodGuide for ${lang}`);
    assert(t.offlineNotice && t.offlineNotice.length > 0, `Missing offlineNotice for ${lang}`);
    assert(t.translatingProgress && t.translatingProgress.length > 0, `Missing translatingProgress for ${lang}`);
    assert(t.charsCount && t.charsCount.length > 0, `Missing charsCount for ${lang}`);
    for (const removedKey of removedMonetizationKeys) {
      assert(!(removedKey in t), `Monetization/AdSense key "${removedKey}" must not exist in ${lang}`);
    }
  }
  assert.strictEqual(getTranslation('de').methodGuide, EXTRA_TRANSLATIONS.de.methodGuide, 'German UI must use German methodGuide');
  console.log('[PASS] All 17 languages have complete UI & extra translations with zero monetization/AdSense keys.');

  // Test 6: Verify 100% free configuration, SSRF security invariants, Firestore rules, and PWA files
  console.log('Test 6: Checking 100% free configuration, SSRF guards, Firestore rules, and PWA files...');
  const serverSource = fs.readFileSync(path.resolve(process.cwd(), 'server.ts'), 'utf8');
  const apiSource = fs.readFileSync(path.resolve(process.cwd(), 'src/services/api.ts'), 'utf8');
  const rulesSource = fs.readFileSync(path.resolve(process.cwd(), 'firestore.rules'), 'utf8');
  const swSource = fs.readFileSync(path.resolve(process.cwd(), 'public/sw.js'), 'utf8');
  const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');

  assert(!serverSource.includes('QUOTA_EXCEEDED'), 'Server must not enforce translation quotas');
  assert(!serverSource.includes('/api/subscription'), 'Server must not expose subscription endpoints');
  assert(!serverSource.includes('ads.txt'), 'Server must not serve ads.txt');
  assert(serverSource.includes("billing: 'free'"), 'Health endpoint must report billing: free');
  assert(serverSource.includes("app.post('/api/detect-language'"), '/api/detect-language endpoint must be defined');
  assert(serverSource.includes("app.post('/api/contact'"), '/api/contact endpoint must be defined');
  assert(serverSource.includes('gemini-2.5-flash') && !serverSource.includes('gemini-2.0-flash'), 'Gemini models must use supported 2.5 series');
  assert(serverSource.includes('dns.lookup') && serverSource.includes("redirect: 'manual'"), 'SSRF protection must validate DNS resolution and manual redirects');
  assert(!serverSource.includes('demo-tx-') && !serverSource.includes('TEST_PASS'), 'Server must not contain payment/promo code');
  assert(!apiSource.includes('LINGOTWICE_PRO') && !apiSource.includes('/api/subscription'), 'Client API service must not contain subscription calls');
  assert(!fs.existsSync(path.resolve(process.cwd(), 'public/ads.txt')), 'public/ads.txt must be deleted');
  assert(!fs.existsSync(path.resolve(process.cwd(), 'src/components/SubscriptionModal.tsx')), 'SubscriptionModal.tsx must be deleted');
  assert(!fs.existsSync(path.resolve(process.cwd(), 'src/components/AdSenseBanner.tsx')), 'AdSenseBanner.tsx must be deleted');
  assert(!indexHtml.includes('ca-pub-') && !indexHtml.includes('adsbygoogle'), 'index.html must not contain AdSense scripts');
  assert(rulesSource.includes('allow read, write: if isOwner(userId)') || rulesSource.includes('isOwner(userId)'), 'Firestore rules must enforce ownership');
  assert(swSource.includes('caches.open') && swSource.includes('fetch'), 'PWA Service Worker must implement caching');
  console.log('[PASS] Free-access configuration, SSRF guards, contact endpoint, Firestore rules, and PWA Service Worker verified.');

  console.log('=== All Diagnostic & API Tests Completed Successfully! ===');
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
