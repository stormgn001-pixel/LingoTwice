import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_DATA_MAP, SEO_LANGUAGES_LIST, type SeoLanguageCode } from '../src/constants/seoData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

const BASE_URL = 'https://lingotwice.com';
const LOGO_URL = 'https://lingotwice.com/assets/aistudio/file_000000004eec82468ea111a6735b2471_8524203a.png';
const ADSENSE_PUB_ID = 'ca-pub-2319563738462034';
const GA4_ID = 'G-N059XGPE5M';

// Generate all hreflang link tags (17 languages + x-default)
function generateHreflangTags(): string {
  const tags: string[] = [];
  for (const lang of SEO_LANGUAGES_LIST) {
    tags.push(`    <link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}/" />`);
  }
  tags.push(`    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />`);
  return tags.join('\n');
}

// Generate sitemap hreflang links
function generateSitemapHreflangXml(): string {
  const lines: string[] = [];
  for (const lang of SEO_LANGUAGES_LIST) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}/" />`);
  }
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />`);
  return lines.join('\n');
}

// Generate language switcher HTML for crawlers and fallback
function generateCrawlerLangLinks(currentLang: SeoLanguageCode): string {
  const links = SEO_LANGUAGES_LIST.map((lang) => {
    const data = SEO_DATA_MAP[lang];
    const isCurrent = lang === currentLang;
    const style = isCurrent
      ? 'font-weight:700;color:#f59e0b;text-decoration:underline;'
      : 'color:#94a3b8;text-decoration:none;';
    return `<a href="/${lang}/" style="${style}padding:2px 6px;margin:2px;display:inline-block;font-size:13px;" title="${data.name} (${data.nativeName})">${data.nativeName}</a>`;
  });
  return links.join(' • ');
}

// Generate the pre-rendered HTML document for a specific language
function renderLanguageHtml(lang: SeoLanguageCode): string {
  const data = SEO_DATA_MAP[lang];
  const canonicalUrl = `${BASE_URL}/${lang}/`;
  const hreflangs = generateHreflangTags();
  const dirAttr = data.rtl ? ' dir="rtl"' : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'url': `${BASE_URL}/`,
        'name': 'Lingotwice',
        'description': 'Multilingual web platform for foreign language learning via parallel reading and associative knowledge connection.',
        'inLanguage': [...SEO_LANGUAGES_LIST],
        'publisher': {
          '@type': 'Organization',
          'name': 'Lingotwice',
          'url': `${BASE_URL}/`,
          'logo': LOGO_URL
        }
      },
      {
        '@type': 'WebApplication',
        '@id': `${canonicalUrl}#webapp`,
        'url': canonicalUrl,
        'name': 'Lingotwice',
        'headline': data.h1,
        'description': data.description,
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'inLanguage': lang,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Lingotwice',
          'url': `${BASE_URL}/`,
          'logo': LOGO_URL
        }
      }
    ]
  };

  return `<!doctype html>
<html lang="${lang}"${dirAttr}>
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());

      gtag('config', '${GA4_ID}', {
        'send_page_view': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.title}</title>
    <meta name="description" content="${data.description}" />
    <meta name="keywords" content="${data.keywords}" />
    <meta name="author" content="LingoTwice" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Multilingual Hreflang Tags -->
${hreflangs}

    <!-- OpenGraph Social Cards -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lingotwice" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.description}" />
    <meta property="og:image" content="${LOGO_URL}" />
    <meta property="og:image:alt" content="Lingotwice Logo" />
    <meta property="og:locale" content="${data.locale}" />

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.title}" />
    <meta name="twitter:description" content="${data.description}" />
    <meta name="twitter:image" content="${LOGO_URL}" />

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>

    <link rel="icon" type="image/png" href="${LOGO_URL}" />
    <link rel="apple-touch-icon" href="${LOGO_URL}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Google AdSense Verification & Auto Ads -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}"
         crossorigin="anonymous"></script>
    <meta name="theme-color" content="#020617" id="theme-color-meta" />
    <script>
      (function() {
        try {
          localStorage.setItem('lingotwice_adsense_pub_id', '${ADSENSE_PUB_ID}');
          var prefs = JSON.parse(localStorage.getItem('linguatwin_preferences_v1'));
          var theme = (prefs && prefs.theme) || 'dark';
          var metaTheme = document.getElementById('theme-color-meta');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
            if (metaTheme) metaTheme.setAttribute('content', '#020617');
          } else if (theme === 'sepia') {
            document.documentElement.classList.add('theme-sepia');
            document.documentElement.style.colorScheme = 'light';
            if (metaTheme) metaTheme.setAttribute('content', '#f4efe2');
          } else {
            document.documentElement.classList.add('theme-light');
            document.documentElement.style.colorScheme = 'light';
            if (metaTheme) metaTheme.setAttribute('content', '#f8fafc');
          }
        } catch (e) {}
      })();
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900 dark:bg-slate-950 dark:text-slate-100">
    <div id="root">
      <!-- SEO Pre-rendered Content Fallback for Search Crawlers -->
      <header style="max-width:960px;margin:0 auto;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(148,163,184,0.15);">
        <a href="/${lang}/" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;">
          <img src="${LOGO_URL}" alt="Lingotwice" width="36" height="36" style="border-radius:8px;" />
          <span style="font-size:22px;font-weight:700;letter-spacing:-0.02em;">Lingotwice</span>
        </a>
        <nav style="display:flex;gap:16px;font-size:14px;">
          <a href="/${lang}/" style="color:#f59e0b;font-weight:600;text-decoration:none;">${data.name}</a>
          <a href="/about.html" style="color:#94a3b8;text-decoration:none;">About</a>
          <a href="/contact.html" style="color:#94a3b8;text-decoration:none;">Contact</a>
          <a href="/privacy.html" style="color:#94a3b8;text-decoration:none;">Privacy</a>
          <a href="/terms.html" style="color:#94a3b8;text-decoration:none;">Terms</a>
        </nav>
      </header>

      <main style="max-width:900px;margin:32px auto;padding:0 20px;">
        <article>
          <div style="display:inline-block;padding:4px 12px;border-radius:20px;background:rgba(245,158,11,0.12);color:#f59e0b;font-size:13px;font-weight:600;margin-bottom:16px;">
            Lingotwice &bull; ${data.nativeName}
          </div>
          <h1 style="font-size:32px;line-height:1.25;font-weight:800;margin-bottom:14px;color:#0f172a;" class="dark:text-white">
            ${data.h1}
          </h1>
          <p style="font-size:18px;line-height:1.6;color:#64748b;margin-bottom:28px;" class="dark:text-slate-300">
            ${data.subtitle}
          </p>

          <section style="background:rgba(241,245,249,0.7);padding:24px;border-radius:16px;margin-bottom:32px;border:1px solid rgba(148,163,184,0.2);" class="dark:bg-slate-900 dark:border-slate-800">
            <h2 style="font-size:20px;font-weight:700;margin-bottom:16px;color:#0f172a;" class="dark:text-white">
              ${data.methodologyHeading}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
              <div style="background:#ffffff;padding:18px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);" class="dark:bg-slate-800">
                <h3 style="font-size:16px;font-weight:700;color:#f59e0b;margin-bottom:8px;">${data.methodStep1Title}</h3>
                <p style="font-size:14px;line-height:1.6;color:#64748b;margin:0;" class="dark:text-slate-300">${data.methodStep1Desc}</p>
              </div>
              <div style="background:#ffffff;padding:18px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);" class="dark:bg-slate-800">
                <h3 style="font-size:16px;font-weight:700;color:#f59e0b;margin-bottom:8px;">${data.methodStep2Title}</h3>
                <p style="font-size:14px;line-height:1.6;color:#64748b;margin:0;" class="dark:text-slate-300">${data.methodStep2Desc}</p>
              </div>
            </div>
          </section>

          <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-bottom:36px;">
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit1Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit1Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit2Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit2Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit3Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit3Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit4Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit4Desc}</p>
            </div>
          </section>

          <div style="text-align:center;padding:28px;background:rgba(245,158,11,0.06);border-radius:16px;margin-bottom:32px;">
            <p style="font-size:16px;font-weight:600;margin-bottom:16px;">${data.callToAction}</p>
            <a href="/${lang}/" style="display:inline-block;padding:12px 28px;background:#f59e0b;color:#ffffff;font-weight:700;border-radius:10px;text-decoration:none;box-shadow:0 4px 12px rgba(245,158,11,0.25);">
              ${data.ctaButtonText}
            </a>
          </div>

          <!-- Language index for internal SEO equity -->
          <footer style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(148,163,184,0.2);text-align:center;">
            <p style="font-size:13px;color:#94a3b8;margin-bottom:12px;">Available in 17 Languages:</p>
            <div>
              ${generateCrawlerLangLinks(lang)}
            </div>
          </footer>
        </article>
      </main>
    </div>

    <noscript>
      <div style="padding:24px;background:#fef3c7;color:#92400e;text-align:center;font-size:14px;">
        ${data.description}
      </div>
    </noscript>

    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

// Generate the root index.html with all hreflangs and default metadata
function renderRootIndexHtml(): string {
  const data = SEO_DATA_MAP.ru;
  const canonicalUrl = `${BASE_URL}/`;
  const hreflangs = generateHreflangTags();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'url': `${BASE_URL}/`,
        'name': 'Lingotwice',
        'description': data.description,
        'inLanguage': [...SEO_LANGUAGES_LIST],
        'publisher': {
          '@type': 'Organization',
          'name': 'Lingotwice',
          'url': `${BASE_URL}/`,
          'logo': LOGO_URL
        }
      },
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#webapp`,
        'url': `${BASE_URL}/`,
        'name': 'Lingotwice',
        'headline': data.h1,
        'description': data.description,
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript. Requires HTML5.',
        'inLanguage': [...SEO_LANGUAGES_LIST],
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Lingotwice',
          'url': `${BASE_URL}/`,
          'logo': LOGO_URL
        }
      }
    ]
  };

  return `<!doctype html>
<html lang="ru">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());

      gtag('config', '${GA4_ID}', {
        'send_page_view': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.title}</title>
    <meta name="description" content="${data.description}" />
    <meta name="keywords" content="${data.keywords}" />
    <meta name="author" content="LingoTwice" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Multilingual Hreflang Tags (All 17 languages + x-default) -->
${hreflangs}

    <!-- OpenGraph Social Cards -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lingotwice" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.description}" />
    <meta property="og:image" content="${LOGO_URL}" />
    <meta property="og:image:alt" content="Lingotwice Logo" />
    <meta property="og:locale" content="${data.locale}" />

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.title}" />
    <meta name="twitter:description" content="${data.description}" />
    <meta name="twitter:image" content="${LOGO_URL}" />

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>

    <link rel="icon" type="image/png" href="${LOGO_URL}" />
    <link rel="apple-touch-icon" href="${LOGO_URL}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Google AdSense Verification & Auto Ads -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}"
         crossorigin="anonymous"></script>
    <meta name="theme-color" content="#020617" id="theme-color-meta" />
    <script>
      (function() {
        try {
          localStorage.setItem('lingotwice_adsense_pub_id', '${ADSENSE_PUB_ID}');
          var prefs = JSON.parse(localStorage.getItem('linguatwin_preferences_v1'));
          var theme = (prefs && prefs.theme) || 'dark';
          var metaTheme = document.getElementById('theme-color-meta');
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
            if (metaTheme) metaTheme.setAttribute('content', '#020617');
          } else if (theme === 'sepia') {
            document.documentElement.classList.add('theme-sepia');
            document.documentElement.style.colorScheme = 'light';
            if (metaTheme) metaTheme.setAttribute('content', '#f4efe2');
          } else {
            document.documentElement.classList.add('theme-light');
            document.documentElement.style.colorScheme = 'light';
            if (metaTheme) metaTheme.setAttribute('content', '#f8fafc');
          }
        } catch (e) {}
      })();
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900 dark:bg-slate-950 dark:text-slate-100">
    <div id="root">
      <!-- Semantic SEO pre-rendered markup for crawlers -->
      <header style="max-width:960px;margin:0 auto;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(148,163,184,0.15);">
        <a href="/" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;">
          <img src="${LOGO_URL}" alt="Lingotwice" width="36" height="36" style="border-radius:8px;" />
          <span style="font-size:22px;font-weight:700;letter-spacing:-0.02em;">Lingotwice</span>
        </a>
        <nav style="display:flex;gap:16px;font-size:14px;">
          <a href="/ru/" style="color:#f59e0b;font-weight:600;text-decoration:none;">Русский</a>
          <a href="/en/" style="color:#94a3b8;text-decoration:none;">English</a>
          <a href="/about.html" style="color:#94a3b8;text-decoration:none;">О сервисе</a>
          <a href="/contact.html" style="color:#94a3b8;text-decoration:none;">Контакты</a>
          <a href="/privacy.html" style="color:#94a3b8;text-decoration:none;">Конфиденциальность</a>
        </nav>
      </header>

      <main style="max-width:900px;margin:32px auto;padding:0 20px;">
        <article>
          <div style="display:inline-block;padding:4px 12px;border-radius:20px;background:rgba(245,158,11,0.12);color:#f59e0b;font-size:13px;font-weight:600;margin-bottom:16px;">
            Lingotwice &bull; Параллельное чтение
          </div>
          <h1 style="font-size:32px;line-height:1.25;font-weight:800;margin-bottom:14px;color:#0f172a;" class="dark:text-white">
            ${data.h1}
          </h1>
          <p style="font-size:18px;line-height:1.6;color:#64748b;margin-bottom:28px;" class="dark:text-slate-300">
            ${data.subtitle}
          </p>

          <section style="background:rgba(241,245,249,0.7);padding:24px;border-radius:16px;margin-bottom:32px;border:1px solid rgba(148,163,184,0.2);" class="dark:bg-slate-900 dark:border-slate-800">
            <h2 style="font-size:20px;font-weight:700;margin-bottom:16px;color:#0f172a;" class="dark:text-white">
              ${data.methodologyHeading}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
              <div style="background:#ffffff;padding:18px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);" class="dark:bg-slate-800">
                <h3 style="font-size:16px;font-weight:700;color:#f59e0b;margin-bottom:8px;">${data.methodStep1Title}</h3>
                <p style="font-size:14px;line-height:1.6;color:#64748b;margin:0;" class="dark:text-slate-300">${data.methodStep1Desc}</p>
              </div>
              <div style="background:#ffffff;padding:18px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);" class="dark:bg-slate-800">
                <h3 style="font-size:16px;font-weight:700;color:#f59e0b;margin-bottom:8px;">${data.methodStep2Title}</h3>
                <p style="font-size:14px;line-height:1.6;color:#64748b;margin:0;" class="dark:text-slate-300">${data.methodStep2Desc}</p>
              </div>
            </div>
          </section>

          <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-bottom:36px;">
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit1Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit1Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit2Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit2Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit3Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit3Desc}</p>
            </div>
            <div style="padding:16px;border:1px solid rgba(148,163,184,0.2);border-radius:12px;">
              <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">${data.benefit4Title}</h3>
              <p style="font-size:13px;line-height:1.5;color:#64748b;margin:0;" class="dark:text-slate-400">${data.benefit4Desc}</p>
            </div>
          </section>

          <footer style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(148,163,184,0.2);text-align:center;">
            <p style="font-size:13px;color:#94a3b8;margin-bottom:12px;">Доступно на 17 языках:</p>
            <div>
              ${generateCrawlerLangLinks('ru')}
            </div>
          </footer>
        </article>
      </main>
    </div>

    <noscript>
      <div style="padding:24px;background:#fef3c7;color:#92400e;text-align:center;font-size:14px;">
        ${data.description}
      </div>
    </noscript>

    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

// Generate the complete sitemap.xml with all 17 language URLs and hreflangs
function generateSitemapXml(): string {
  const today = new Date().toISOString().slice(0, 10);
  const alternateLinksXml = generateSitemapHreflangXml();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Root default URL -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
${alternateLinksXml}
  </url>
`;

  // Each of the 17 localized language index URLs
  for (const lang of SEO_LANGUAGES_LIST) {
    xml += `  <url>
    <loc>${BASE_URL}/${lang}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
${alternateLinksXml}
  </url>
`;
  }

  // Supporting static pages
  xml += `  <url>
    <loc>${BASE_URL}/about.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/privacy.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/terms.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;
  return xml;
}

// Ensure robots.txt is complete
function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

function postBuildSync(): void {
  console.log('📦 Starting postbuild synchronization for dist/<lang>/index.html assets...');
  const distDir = path.resolve(ROOT_DIR, 'dist');
  const distIndexFile = path.join(distDir, 'index.html');
  if (!fs.existsSync(distIndexFile)) {
    console.warn('⚠️ dist/index.html not found, skipping postbuild sync.');
    return;
  }

  const distIndexHtml = fs.readFileSync(distIndexFile, 'utf-8');

  // Extract production script and style tags injected by Vite
  const scriptMatches = distIndexHtml.match(/<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>/g) || [];
  const linkMatches = distIndexHtml.match(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+">/g) || [];

  const assetTags = [...scriptMatches, ...linkMatches].join('\n    ');

  if (!assetTags) {
    console.warn('⚠️ No production assets matched in dist/index.html.');
    return;
  }

  console.log(`  Found production asset tags:\n    ${assetTags}`);

  for (const lang of SEO_LANGUAGES_LIST) {
    const langFile = path.join(distDir, lang, 'index.html');
    if (fs.existsSync(langFile)) {
      let content = fs.readFileSync(langFile, 'utf-8');

      // Remove uncompiled dev module script
      content = content.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/g, '');

      // Inject production asset tags into <head> before </head> if not already present
      if (!content.includes('/assets/index-')) {
        content = content.replace('</head>', `    ${assetTags}\n  </head>`);
      }

      fs.writeFileSync(langFile, content, 'utf-8');
      console.log(`  ✓ Updated dist/${lang}/index.html with production assets`);
    }
  }
  console.log('✅ Postbuild asset synchronization completed successfully!');
}

async function main() {
  const isPostBuild = process.argv.includes('--postbuild');

  if (isPostBuild) {
    postBuildSync();
    return;
  }

  console.log('🚀 Starting Multilingual SEO Pre-rendering & Generator...');

  // 1. Generate localized index.html for all 17 languages in public/<lang>/index.html
  for (const lang of SEO_LANGUAGES_LIST) {
    const langDir = path.join(PUBLIC_DIR, lang);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }
    const htmlContent = renderLanguageHtml(lang);
    const targetFile = path.join(langDir, 'index.html');
    fs.writeFileSync(targetFile, htmlContent, 'utf-8');
    console.log(`  ✓ Generated localized HTML: public/${lang}/index.html (${lang})`);
  }

  // 2. Generate updated root index.html
  const rootHtml = renderRootIndexHtml();
  fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), rootHtml, 'utf-8');
  console.log('  ✓ Updated root index.html with all 17 hreflang alternates and SEO fallback');

  // 3. Generate updated sitemap.xml
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('  ✓ Generated multilingual public/sitemap.xml with 17 language URLs and xhtml:link alternates');

  // 4. Generate/verify robots.txt
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('  ✓ Verified public/robots.txt pointing to sitemap.xml');

  console.log('✅ Multilingual SEO Pre-rendering generation completed successfully!');
}

main().catch((err) => {
  console.error('❌ Error generating multilingual SEO assets:', err);
  process.exit(1);
});
