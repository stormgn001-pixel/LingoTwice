import React, { useState } from 'react';
import { InterfaceLanguage } from '../types';
import { Mail, Shield, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';

interface InfoPageViewProps {
  page: 'about' | 'contact' | 'privacy' | 'terms';
  onBack: () => void;
  uiLang: InterfaceLanguage;
}

interface PageTranslations {
  returnToReader: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutSubtitle: string;
  missionTitle: string;
  missionText: string;
  methodTitle: string;
  methodText: string;
  featuresTitle: string;
  features: string[];
  philosophyQuote: string;
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  sendBtn: string;
  successTitle: string;
  successDesc: string;
  sendMore: string;
  directContact: string;
  selectTopic: string;
  topicGeneral: string;
  topicSupport: string;
  topicPartnership: string;
  topicPrivacy: string;
  privacyBadge: string;
  privacyTitle: string;
  privacySubtitle: string;
  privacyP1: string;
  privacyP2: string;
  privacyP3: string;
  privacyP4: string;
  termsBadge: string;
  termsTitle: string;
  termsSubtitle: string;
  termsP1: string;
  termsP2: string;
  termsP3: string;
  termsP4: string;
}

const INFO_TRANSLATIONS: Record<InterfaceLanguage, PageTranslations> = {
  en: {
    returnToReader: 'Return to reader',
    aboutBadge: 'E-E-A-T About',
    aboutTitle: 'Lingotwice — Learn Languages Through Connected Knowledge',
    aboutSubtitle: 'A new language becomes clearer when you connect it with what you already know.',
    missionTitle: 'The LingoTwice Concept',
    missionText: 'Lingotwice offers a unique approach to learning foreign languages based on context, associations, and the connection between your native language and the language you are learning.',
    methodTitle: 'Simple and Effective Method',
    methodText: 'The method is simple: first, you read the text in your native language, fully understanding its context and meaning. Then you transition to the same text in the foreign language. Your brain is now already familiar with the information. You do not need to decipher the story line again — you can focus entirely on foreign words, expressions, and grammatical structures. Gradually, new words associate with familiar meanings, and foreign expressions become understandable through established context.',
    featuresTitle: 'Why Does It Work?',
    features: [
      'Familiar Context: Understanding the content helps absorb the foreign text naturally.',
      'Semantic Associations: New words connect to familiar, pre-existing concepts.',
      'Learning in Context: Vocabulary is acquired within meaningful sentences rather than in isolation.',
      'Knowledge Reinforcement: Re-engaging with content solidifies linguistic associations in memory.',
      'Natural Skill Growth: Step by step, you gain deep comprehension of foreign speech and texts.'
    ],
    philosophyQuote: 'A new approach to language learning. From the familiar to the new. From comprehension to fluency.',
    contactBadge: 'Get in Touch',
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are always happy to answer your questions, help with technical support, or discuss partnership.',
    nameLabel: 'Your Name *',
    emailLabel: 'Email for reply *',
    subjectLabel: 'Subject *',
    messageLabel: 'Message *',
    sendBtn: 'Send Message',
    successTitle: 'Message successfully sent!',
    successDesc: 'We have received your inquiry and will reply to your email within 24–48 hours.',
    sendMore: 'Send another message',
    directContact: 'Direct Contact',
    selectTopic: 'Select topic...',
    topicGeneral: 'General questions & feedback',
    topicSupport: 'Technical support / Bug report',
    topicPartnership: 'Partnership & collaboration',
    topicPrivacy: 'Data privacy questions',
    privacyBadge: 'GDPR & AdSense Compliance',
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'Last updated: October 31, 2026',
    privacyP1: 'This Privacy Policy describes how LingoTwice (https://lingotwice.com) collects, uses, and protects user information in accordance with GDPR, CCPA, and Google AdSense guidelines.',
    privacyP2: 'Cookies & Google AdSense: Our site uses cookies (including third-party vendors like Google and DoubleClick DART) to serve ads based on user visits to this and other websites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) and www.aboutads.info.',
    privacyP3: 'Local Data: Most of your reading preferences, vocabulary, and books are stored locally on your device (LocalStorage / IndexedDB). We do not transmit your personal texts to commercial servers.',
    privacyP4: 'GDPR Rights: If you are located in the European Economic Area (EEA), you have rights to access, correct, or delete your personal data. Contact us at support@lingotwice.com.',
    termsBadge: 'Terms of Service',
    termsTitle: 'Terms of Service',
    termsSubtitle: 'Effective date: October 31, 2026',
    termsP1: 'By using LingoTwice (https://lingotwice.com), you agree to comply with these Terms of Service. If you disagree with any provisions, please refrain from using the service.',
    termsP2: 'Intellectual Property: All interface materials, design, logos, and source code are property of the platform. Book texts in the library are in the public domain or used with permission.',
    termsP3: 'Translation Disclaimer: Automatic translations and linguistic breakdowns generated by neural networks are provided "as is". The administration does not guarantee absolute precision of every translation.',
    termsP4: 'Contact: For questions regarding these terms, please contact support@lingotwice.com.'
  },
  ru: {
    returnToReader: 'Вернуться в читалку',
    aboutBadge: 'О проекте E-E-A-T',
    aboutTitle: 'Lingotwice — Учите языки через взаимосвязь знаний',
    aboutSubtitle: 'Новый язык становится понятнее, когда вы связываете его с тем, что уже знаете.',
    missionTitle: 'Новый подход к изучению языков',
    missionText: 'Lingotwice предлагает особый подход к изучению иностранных языков, основанный на контексте, ассоциациях и взаимосвязи между родным и изучаемым языками.',
    methodTitle: 'Простой и эффективный метод',
    methodText: 'Метод прост: сначала вы читаете текст на родном языке, понимая его содержание и смысл. Затем переходите к тому же тексту на иностранном языке. Теперь ваш мозг уже знаком с информацией. Вам не нужно заново разбираться в содержании — вы можете сосредоточиться на иностранных словах, выражениях и грамматических конструкциях. Постепенно новые слова начинают ассоциироваться со знакомыми значениями, а иностранные выражения становятся понятнее благодаря уже сформированному контексту.',
    featuresTitle: 'Почему это работает?',
    features: [
      'Знакомый контекст: понимание содержания помогает воспринимать иностранный текст.',
      'Смысловые ассоциации: новые слова связываются с уже известными понятиями.',
      'Обучение в контексте: лексика усваивается не изолированно, а в составе осмысленных предложений.',
      'Закрепление знаний: повторное знакомство с материалом помогает укреплять языковые ассоциации.',
      'Естественное развитие навыков: постепенно вы начинаете лучше понимать иностранную речь и тексты.'
    ],
    philosophyQuote: 'Новый подход к изучению языков. От знакомого к новому. От понимания к свободному владению языком.',
    contactBadge: 'Связь с нами',
    contactTitle: 'Контакты (Contact Us)',
    contactSubtitle: 'Мы всегда рады ответить на ваши вопросы, помочь с технической поддержкой или обсудить партнерство.',
    nameLabel: 'Ваше имя *',
    emailLabel: 'Email для ответа *',
    subjectLabel: 'Тема обращения *',
    messageLabel: 'Сообщение *',
    sendBtn: 'Отправить сообщение',
    successTitle: 'Сообщение успешно отправлено!',
    successDesc: 'Мы получили ваш запрос и ответим на указанный email в течение 24–48 часов.',
    sendMore: 'Отправить еще сообщение',
    directContact: 'Прямой контакт',
    selectTopic: 'Выберите тему...',
    topicGeneral: 'Общие вопросы и отзывы',
    topicSupport: 'Техническая поддержка / Ошибка',
    topicPartnership: 'Партнерство и сотрудничество',
    topicPrivacy: 'Вопросы по конфиденциальности данных',
    privacyBadge: 'GDPR & AdSense Compliance',
    privacyTitle: 'Политика конфиденциальности (Privacy Policy)',
    privacySubtitle: 'Последнее обновление: 31 октября 2026 г.',
    privacyP1: 'Настоящая Политика конфиденциальности описывает, как LingoTwice (https://lingotwice.com) собирает, использует и защищает информацию пользователей в соответствии с требованиями GDPR, CCPA и правилами рекламной сети Google AdSense.',
    privacyP2: 'Использование файлов Cookie и Google AdSense: Наш сайт использует файлы cookie (включая файлы cookie сторонних поставщиков, таких как Google и DoubleClick DART) для показа релевантной рекламы на основе посещений пользователей данного сайта и других сайтов в интернете. Пользователи могут отказаться от использования файлов cookie для персонализированной рекламы через Настройки рекламы Google (https://adssettings.google.com) и www.aboutads.info.',
    privacyP3: 'Локальные данные: Большая часть ваших данных (настройки чтения, словарь, сохраненные книги и прогресс) хранится локально на вашем устройстве в памяти браузера. Мы не передаем ваши личные тексты на внешние коммерческие сервера.',
    privacyP4: 'Ваши права по GDPR: Если вы находитесь в Европейском экономическом пространстве, вы имеете право на доступ к персональным данным, их исправление или удаление. Обращайтесь на support@lingotwice.com.',
    termsBadge: 'Правила сервиса',
    termsTitle: 'Условия использования (Terms of Service)',
    termsSubtitle: 'Дата вступления в силу: 31 октября 2026 г.',
    termsP1: 'Используя веб-сайт LingoTwice (https://lingotwice.com), вы подтверждаете свое согласие соблюдать настоящие Условия использования.',
    termsP2: 'Интеллектуальная собственность: Все материалы интерфейса, дизайн, логотипы и программный код LingoTwice являются собственностью платформы.',
    termsP3: 'Отказ от ответственности за переводы: Автоматические переводы и лингвистические разборы, генерируемые нейросетями, предоставляются «как есть» (as is).',
    termsP4: 'Контакты: По вопросам условий использования обращайтесь по адресу support@lingotwice.com.'
  },
  uk: {
    returnToReader: 'Повернутися до читалки',
    aboutBadge: 'Про проєкт E-E-A-T',
    aboutTitle: "Lingotwice — Вивчайте мови через взаємозв'язок знань",
    aboutSubtitle: 'Нова мова стає зрозумілішою, коли ви пов’язуєте її з тим, що вже знаєте.',
    missionTitle: 'Новий підхід до вивчення мов',
    missionText: "Lingotwice пропонує особливий підхід до вивчення іноземних мов, заснований на контексті, асоціаціях та взаємозв'язку між рідною та вивчуваною мовами.",
    methodTitle: 'Простий та ефективний метод',
    methodText: 'Метод простий: спочатку ви читаєте текст рідною мовою, розуміючи його зміст і суть. Потім переходите до того ж тексту іноземною мовою. Тепер ваш мозок вже знайомий з інформацією. Вам не потрібно заново розбиратися у змісті — ви можете зосередитися на іноземних словах, виразах і граматичних конструкціях. Поступово нові слова починають асоціюватися зі знайомими значеннями, а іноземні вирази стають зрозумілішими завдяки вже сформованому контексту.',
    featuresTitle: 'Чому це працює?',
    features: [
      'Знайомий контекст: розуміння змісту допомагає сприймати іноземний текст.',
      "Смислові асоціації: нові слова пов'язуються з вже відомими поняттями.",
      'Навчання в контексті: лексика засвоюється не ізольовано, а у складі осмислених речень.',
      'Закріплення знань: повторне знайомство з матеріалом допомагає зміцнювати мовні асоціації.',
      'Природний розвиток навичок: поступово ви починаєте краще розуміти іноземне мовлення та тексти.'
    ],
    philosophyQuote: 'Новий підхід до вивчення мов. Від знайомого до нового. Від розуміння до вільного володіння мовою.',
    contactBadge: 'Зв’язок з нами',
    contactTitle: 'Контакти (Contact Us)',
    contactSubtitle: 'Ми завжди раді відповісти на ваші запитання.',
    nameLabel: 'Ваше ім’я *',
    emailLabel: 'Email для відповіді *',
    subjectLabel: 'Тема звернення *',
    messageLabel: 'Повідомлення *',
    sendBtn: 'Надіслати повідомлення',
    successTitle: 'Повідомлення успішно надіслано!',
    successDesc: 'Ми отримали ваш запит і відповімо протягом 24–48 годин.',
    sendMore: 'Надіслати ще',
    directContact: 'Прямий контакт',
    selectTopic: 'Виберіть тему...',
    topicGeneral: 'Загальні питання',
    topicSupport: 'Технічна підтримка',
    topicPartnership: 'Партнерство',
    topicPrivacy: 'Питання конфіденційності',
    privacyBadge: 'GDPR & AdSense Compliance',
    privacyTitle: 'Політика конфіденційності',
    privacySubtitle: 'Останнє оновлення: 31 жовтня 2026 р.',
    privacyP1: 'Ця Політика конфіденційності описує збір та захист даних користувачів згідно з GDPR, CCPA та Google AdSense.',
    privacyP2: 'Використання файлів Cookie та Google AdSense для показу релевантної реклами та аналітики.',
    privacyP3: 'Локальні дані зберігаються на вашому пристрої.',
    privacyP4: 'Ваші права за GDPR: звертайтесь на support@lingotwice.com.',
    termsBadge: 'Правила сервісу',
    termsTitle: 'Умови використання',
    termsSubtitle: 'Дата набрання чинності: 31 жовтня 2026 р.',
    termsP1: 'Використовуючи LingoTwice, ви погоджуєтеся з цими умовами.',
    termsP2: 'Інтелектуальна власність захищена.',
    termsP3: 'Переклади надаються "як є" (as is).',
    termsP4: 'Контакти: support@lingotwice.com.'
  },
  de: {
    returnToReader: 'Zurück zum Reader',
    aboutBadge: 'E-E-A-T Über uns',
    aboutTitle: 'Lingotwice — Sprachen lernen durch vernetztes Wissen',
    aboutSubtitle: 'Eine neue Sprache wird verständlicher, wenn Sie sie mit dem verbinden, was Sie bereits wissen.',
    missionTitle: 'Das LingoTwice-Konzept',
    missionText: 'Lingotwice bietet einen besonderen Ansatz zum Erlernen von Fremdsprachen, der auf Kontext, Assoziationen und der Verbindung zwischen Muttersprache und Zielsprache basiert.',
    methodTitle: 'Wie funktioniert die Methode?',
    methodText: 'Die Methode ist einfach: Zuerst lesen Sie den Text in Ihrer Muttersprache und verstehen den Inhalt und Sinn. Dann wechseln Sie zum selben Text in der Fremdsprache. Ihr Gehirn ist nun bereits mit den Informationen vertraut. Sie müssen den Inhalt nicht neu entschlüsseln – Sie können sich ganz auf fremde Wörter, Ausdrücke und Grammatikstrukturen konzentrieren. Nach und nach verknüpfen sich neue Wörter mit bekannten Bedeutungen.',
    featuresTitle: 'Warum funktioniert es?',
    features: [
      'Vertrauter Kontext: Das Verständnis des Inhalts erleichtert die Aufnahme des fremden Textes.',
      'Sinnvolle Assoziationen: Neue Wörter werden mit bereits bekannten Begriffen verknüpft.',
      'Lernen im Kontext: Wortschatz wird nicht isoliert, sondern in sinnvollen Sätzen gelernt.',
      'Festigung des Wissens: Die erneute Beschäftigung mit dem Material stärkt sprachliche Assoziationen.',
      'Natürliche Entwicklung: Schritt für Schritt verstehen Sie fremde Sprache und Texte besser.'
    ],
    philosophyQuote: 'Ein neuer Ansatz zum Sprachenlernen. Vom Vertrauten zum Neuen. Vom Verstehen zur fließenden Beherrschung.',
    contactBadge: 'Kontakt',
    contactTitle: 'Kontaktieren Sie uns',
    contactSubtitle: 'Wir freuen uns auf Ihre Fragen und Ihr Feedback.',
    nameLabel: 'Ihr Name *',
    emailLabel: 'Antwort-E-Mail *',
    subjectLabel: 'Betreff *',
    messageLabel: 'Nachricht *',
    sendBtn: 'Nachricht senden',
    successTitle: 'Nachricht erfolgreich gesendet!',
    successDesc: 'Wir werden innerhalb von 24–48 Stunden antworten.',
    sendMore: 'Weitere Nachricht senden',
    directContact: 'Direkter Kontakt',
    selectTopic: 'Thema auswählen...',
    topicGeneral: 'Allgemeine Fragen & Feedback',
    topicSupport: 'Technischer Support',
    topicPartnership: 'Partnerschaft',
    topicPrivacy: 'Datenschutz',
    privacyBadge: 'GDPR & AdSense Compliance',
    privacyTitle: 'Datenschutzerklärung',
    privacySubtitle: 'Stand: 31. Oktober 2026',
    privacyP1: 'Diese Datenschutzerklärung beschreibt die Verarbeitung von Nutzerdaten gemäß GDPR, CCPA und Google AdSense Richtlinien.',
    privacyP2: 'Verwendung von Cookies und Google AdSense zur Personalisierung von Anzeigen.',
    privacyP3: 'Lokale Datenspeicherung auf Ihrem Gerät.',
    privacyP4: 'Ihre GDPR-Rechte: support@lingotwice.com.',
    termsBadge: 'Nutzungsbedingungen',
    termsTitle: 'Nutzungsbedingungen',
    termsSubtitle: 'Gültig ab: 31. Oktober 2026',
    termsP1: 'Durch die Nutzung von LingoTwice stimmen Sie diesen Bedingungen zu.',
    termsP2: 'Geistiges Eigentum.',
    termsP3: 'Übersetzungshaftungsausschluss (ohne Gewähr).',
    termsP4: 'Kontakt: support@lingotwice.com.'
  },
  es: {
    returnToReader: 'Volver al lector',
    aboutBadge: 'Acerca de E-E-A-T',
    aboutTitle: 'Lingotwice — Aprende idiomas a través del conocimiento conectado',
    aboutSubtitle: 'Un nuevo idioma se vuelve más claro cuando lo conectas con lo que ya sabes.',
    missionTitle: 'El concepto LingoTwice',
    missionText: 'Lingotwice ofrece un enfoque único para el aprendizaje de idiomas basado en el contexto, las asociaciones y la conexión entre tu lengua materna y el idioma que aprendes.',
    methodTitle: '¿Cómo funciona el método?',
    methodText: 'El método es sencillo: primero lees el texto en tu lengua materna, comprendiendo su contenido y significado. Luego pasas al mismo texto en el idioma extranjero. Ahora tu cerebro ya conoce la información. No necesitas volver a descifrar la trama: puedes concentrarte en palabras, expresiones y estructuras gramaticales. Poco a poco, las palabras nuevas se asocian con significados conocidos.',
    featuresTitle: '¿Por qué funciona?',
    features: [
      'Contexto familiar: Comprender el contenido ayuda a asimilar el texto extranjero.',
      'Asociaciones semánticas: Las nuevas palabras se conectan con conceptos ya conocidos.',
      'Aprendizaje en contexto: El vocabulario se aprende en oraciones con sentido, no de forma aislada.',
      'Consolidación del conocimiento: Releer el material refuerza las asociaciones lingüísticas.',
      'Desarrollo natural: Progresivamente comprenderás mejor el habla y los textos extranjeros.'
    ],
    philosophyQuote: 'Un nuevo enfoque para el aprendizaje de idiomas. De lo conocido a lo nuevo. De la comprensión a la fluidez.',
    contactBadge: 'Contacto',
    contactTitle: 'Contáctenos',
    contactSubtitle: 'Estamos a su disposición para cualquier consulta.',
    nameLabel: 'Su nombre *',
    emailLabel: 'Correo electrónico *',
    subjectLabel: 'Asunto *',
    messageLabel: 'Mensaje *',
    sendBtn: 'Enviar mensaje',
    successTitle: '¡Mensaje enviado con éxito!',
    successDesc: 'Le responderemos en un plazo de 24 a 48 horas.',
    sendMore: 'Enviar otro mensaje',
    directContact: 'Contacto directo',
    selectTopic: 'Seleccione un tema...',
    topicGeneral: 'Preguntas generales',
    topicSupport: 'Soporte técnico',
    topicPartnership: 'Colaboración',
    topicPrivacy: 'Privacidad de datos',
    privacyBadge: 'Cumplimiento GDPR y AdSense',
    privacyTitle: 'Política de Privacidad',
    privacySubtitle: 'Actualizado: 31 de octubre de 2026',
    privacyP1: 'Esta política describe cómo recopilamos y protegemos la información según GDPR, CCPA y Google AdSense.',
    privacyP2: 'Uso de cookies y anuncios de Google AdSense.',
    privacyP3: 'Almacenamiento de datos locales en el dispositivo.',
    privacyP4: 'Derechos GDPR: support@lingotwice.com.',
    termsBadge: 'Términos de Servicio',
    termsTitle: 'Términos de Servicio',
    termsSubtitle: 'Fecha de vigencia: 31 de octubre de 2026',
    termsP1: 'Al usar LingoTwice, acepta estos términos.',
    termsP2: 'Propiedad intelectual.',
    termsP3: 'Descargo de responsabilidad de traducciones.',
    termsP4: 'Contacto: support@lingotwice.com.'
  },
  fr: {
    returnToReader: 'Retour au lecteur',
    aboutBadge: 'À propos E-E-A-T',
    aboutTitle: 'Lingotwice — Apprenez les langues grâce aux connaissances connectées',
    aboutSubtitle: 'Une nouvelle langue devient plus claire lorsque vous la reliez à ce que vous savez déjà.',
    missionTitle: 'Le concept LingoTwice',
    missionText: 'Lingotwice propose une approche unique de l’apprentissage des langues étrangères basée sur le contexte, les associations et le lien entre votre langue maternelle et la langue étudiée.',
    methodTitle: 'Comment fonctionne la méthode ?',
    methodText: 'La méthode est simple : vous lisez d’abord le texte dans votre langue maternelle en comprenant le sens. Vous passez ensuite au même texte dans la langue étrangère. Votre cerveau est déjà familiarisé avec l’histoire. Vous pouvez vous concentrer sur les mots, expressions et structures grammaticales. Progressivement, les nouveaux mots s’associent à des significations connues.',
    featuresTitle: 'Pourquoi cela fonctionne-t-il ?',
    features: [
      'Contexte familier : La compréhension du contenu facilite l’assimilation du texte étranger.',
      'Associations de sens : Les nouveaux mots se lient à des concepts déjà connus.',
      'Apprentissage en contexte : Le vocabulaire s’acquiert dans des phrases porteuses de sens.',
      'Consolidation des connaissances : La relecture renforce les associations linguistiques.',
      'Développement naturel : Vous comprenez progressivement mieux le langage et les textes étrangers.'
    ],
    philosophyQuote: 'Une nouvelle approche de l’apprentissage des langues. Du connu vers la nouveauté. De la compréhension à la maîtrise.',
    contactBadge: 'Contact',
    contactTitle: 'Contactez-nous',
    contactSubtitle: 'Nous sommes à votre écoute pour toute question.',
    nameLabel: 'Votre nom *',
    emailLabel: 'Email de réponse *',
    subjectLabel: 'Sujet *',
    messageLabel: 'Message *',
    sendBtn: 'Envoyer le message',
    successTitle: 'Message envoyé avec succès !',
    successDesc: 'Nous vous répondrons sous 24 à 48 heures.',
    sendMore: 'Envoyer un autre message',
    directContact: 'Contact direct',
    selectTopic: 'Sélectionnez un sujet...',
    topicGeneral: 'Questions générales',
    topicSupport: 'Support technique',
    topicPartnership: 'Partenariat',
    topicPrivacy: 'Confidentialité',
    privacyBadge: 'Conformité GDPR & AdSense',
    privacyTitle: 'Politique de confidentialité',
    privacySubtitle: 'Dernière mise à jour : 31 octobre 2026',
    privacyP1: 'Cette politique décrit la collecte de données selon le RGPD, CCPA et Google AdSense.',
    privacyP2: 'Utilisation des cookies publicitaires Google AdSense.',
    privacyP3: 'Données stockées localement sur votre appareil.',
    privacyP4: 'Droits RGPD : support@lingotwice.com.',
    termsBadge: 'Conditions d’utilisation',
    termsTitle: 'Conditions d’utilisation',
    termsSubtitle: 'Date d’entrée en vigueur : 31 octobre 2026',
    termsP1: 'En utilisant LingoTwice, vous acceptez ces conditions.',
    termsP2: 'Propriété intellectuelle.',
    termsP3: 'Avis de non-responsabilité sur les traductions.',
    termsP4: 'Contact : support@lingotwice.com.'
  },
  it: {
    returnToReader: 'Torna al lettore',
    aboutBadge: 'Informazioni E-E-A-T',
    aboutTitle: 'Lingotwice — Impara le lingue attraverso la conoscenza connessa',
    aboutSubtitle: 'Una nuova lingua diventa più chiara quando la colleghi a ciò che conosci già.',
    missionTitle: 'Il concetto LingoTwice',
    missionText: 'Lingotwice offre un approccio unico per l’apprendimento delle lingue basato sul contesto, sulle associazioni e sulla connessione tra la tua lingua madre e la lingua che stai imparando.',
    methodTitle: 'Come funziona il metodo?',
    methodText: 'Il metodo è semplice: prima leggi il testo nella tua lingua madre, comprendendone appieno il contenuto. Poi passi allo stesso testo nella lingua straniera. Il tuo cervello ha già familiarità con l’informazione. Puoi concentrarti su vocaboli, espressioni e strutture grammaticali. A poco a poco, i nuovi vocaboli si collegano a significati noti.',
    featuresTitle: 'Perché funziona?',
    features: [
      'Contesto familiare: Comprendere il contenuto aiuta ad assimilare il testo straniero.',
      'Associazioni di significato: I nuovi vocaboli si collegano a concetti già noti.',
      'Apprendimento nel contesto: Il lessico si impara all’interno di frasi di senso compiuto.',
      'Consolidamento delle conoscenze: Rileggere il materiale rafforza le associazioni linguistiche.',
      'Sviluppo naturale: Aumenti progressivamente la comprensione di testi e parlato stranieri.'
    ],
    philosophyQuote: 'Un nuovo approccio all’apprendimento delle lingue. Dal noto al nuovo. Dalla comprensione alla padronanza.',
    contactBadge: 'Contatti',
    contactTitle: 'Contattaci',
    contactSubtitle: 'Siamo felici di rispondere alle tue domande.',
    nameLabel: 'Il tuo nome *',
    emailLabel: 'Email per la risposta *',
    subjectLabel: 'Oggetto *',
    messageLabel: 'Messaggio *',
    sendBtn: 'Invia messaggio',
    successTitle: 'Messaggio inviato con successo!',
    successDesc: 'Risponderemo entro 24-48 ore.',
    sendMore: 'Invia un altro messaggio',
    directContact: 'Contatto diretto',
    selectTopic: 'Seleziona argomento...',
    topicGeneral: 'Domande generali',
    topicSupport: 'Supporto tecnico',
    topicPartnership: 'Partnership',
    topicPrivacy: 'Privacy dei dati',
    privacyBadge: 'Conformità GDPR e AdSense',
    privacyTitle: 'Informativa sulla Privacy',
    privacySubtitle: 'Ultimo aggiornamento: 31 ottobre 2026',
    privacyP1: 'Informativa conforme a GDPR, CCPA e Google AdSense.',
    privacyP2: 'Utilizzo di cookie e annunci personalizzati Google.',
    privacyP3: 'Memorizzazione locale dei dati.',
    privacyP4: 'Diritti GDPR: support@lingotwice.com.',
    termsBadge: 'Termini di Servizio',
    termsTitle: 'Termini di Servizio',
    termsSubtitle: 'Data di entrata in vigore: 31 ottobre 2026',
    termsP1: 'L’uso di LingoTwice implica l’accettazione dei termini.',
    termsP2: 'Proprietà intellettuale.',
    termsP3: 'Esclusione di responsabilità per le traduzioni.',
    termsP4: 'Contatto: support@lingotwice.com.'
  },
  pl: {
    returnToReader: 'Powrót do czytnika',
    aboutBadge: 'O projekcie E-E-A-T',
    aboutTitle: 'Lingotwice — Ucz się języków poprzez powiązaną wiedzę',
    aboutSubtitle: 'Nowy język staje się zrozumiały, gdy łączysz go z tym, co już wiesz.',
    missionTitle: 'Koncepcja LingoTwice',
    missionText: 'Lingotwice oferuje wyjątkowe podejście do nauki języków obcych oparte na kontekście, skojarzeniach i powiązaniu języka ojczystego z językiem docelowym.',
    methodTitle: 'Jak działa ta metoda?',
    methodText: 'Metoda jest prosta: najpierw czytasz tekst w języku ojczystym, rozumiejąc jego treść i sens. Następnie przechodzisz do tego samego tekstu w języku obcym. Twój mózg zna już te informacje. Nie musisz ponownie rozkodowywać treści — możesz skupić się na nowych słowach, zwrotach i strukturach gramatycznych. Stopniowo nowe słowa kojarzą się ze znanymi znaczeniami.',
    featuresTitle: 'Dlaczego to działa?',
    features: [
      'Znany kontekst: Zrozumienie treści pomaga przyswajać obcy tekst.',
      'Skojarzenia znaczeniowe: Nowe słowa łączą się ze znanymi pojęciami.',
      'Nauka w kontekście: Słownictwo przyswajane jest w pełnych, sensownych zdaniach.',
      'Utrwalanie wiedzy: Ponowny kontakt z materiałem wzmacnia skojarzenia językowe.',
      'Naturalny rozwój umiejętności: Stopniowo coraz lepiej rozumiesz mowę i teksty obcojęzyczne.'
    ],
    philosophyQuote: 'Nowe podejście do nauki języków. Od znanego do nowego. Od zrozumienia do biegłości.',
    contactBadge: 'Kontakt',
    contactTitle: 'Skontaktuj się z nami',
    contactSubtitle: 'Chętnie odpowiadamy na pytania użytkowników.',
    nameLabel: 'Twoje imię *',
    emailLabel: 'Email zwrotny *',
    subjectLabel: 'Temat *',
    messageLabel: 'Wiadomość *',
    sendBtn: 'Wyślij wiadomość',
    successTitle: 'Wiadomość wysłana pomyślnie!',
    successDesc: 'Odpowiemy w ciągu 24–48 godzin.',
    sendMore: 'Wyślij kolejną wiadomość',
    directContact: 'Bezpośredni kontakt',
    selectTopic: 'Wybierz temat...',
    topicGeneral: 'Pytania ogólne',
    topicSupport: 'Wsparcie techniczne',
    topicPartnership: 'Współpraca',
    topicPrivacy: 'Prywatność danych',
    privacyBadge: 'Zgodność z GDPR i AdSense',
    privacyTitle: 'Polityka Prywatności',
    privacySubtitle: 'Ostatnia aktualizacja: 31 października 2026',
    privacyP1: 'Zasady ochrony prywatności zgodne z GDPR i Google AdSense.',
    privacyP2: 'Użycie plików cookie do celów reklamowych i analitycznych.',
    privacyP3: 'Lokalne przechowywanie danych.',
    privacyP4: 'Prawa GDPR: support@lingotwice.com.',
    termsBadge: 'Regulamin',
    termsTitle: 'Regulamin Serwisu',
    termsSubtitle: 'Data wejścia w życie: 31 października 2026',
    termsP1: 'Korzystanie z serwisu oznacza akceptację regulaminu.',
    termsP2: 'Własność intelektualna.',
    termsP3: 'Zastrzeżenie dotyczące tłumaczeń.',
    termsP4: 'Kontakt: support@lingotwice.com.'
  },
  tr: {
    returnToReader: 'Okuyucuya Dön',
    aboutBadge: 'E-E-A-T Hakkında',
    aboutTitle: 'Lingotwice — Bağlantılı bilgi ile dil öğrenin',
    aboutSubtitle: 'Yeni bir dil, zaten bildiğiniz şeylerle bağlantı kurduğunuzda anlaşılır hale gelir.',
    missionTitle: 'LingoTwice Yaklaşımı',
    missionText: 'Lingotwice, ana diliniz ile öğrendiğiniz dil arasındaki bağlama, çağrışımlara ve ilişkilere dayalı özel bir yabancı dil öğrenme yaklaşımı sunar.',
    methodTitle: 'Yöntem Nasıl Çalışır?',
    methodText: 'Yöntem basittir: önce metni ana dilinizde okuyup içeriği ve anlamı kavramış olursunuz. Ardından aynı metnin yabancı dildeki versiyonuna geçersiniz. Beyniniz artık hikayeye aşinadır. İçeriği tekrar çözmeye çalışmadan yabancı kelimelere, ifadelere ve dil bilgisine odaklanabilirsiniz.',
    featuresTitle: 'Neden İşe Yarıyor?',
    features: [
      'Tanıdık Bağlam: İçeriği anlamak, yabancı metni özümsemeyi kolaylaştırır.',
      'Anlamsal Çağrışımlar: Yeni kelimeler bilinen kavramlarla bağlanır.',
      'Bağlam İçinde Öğrenme: Kelimeler tek başına değil, anlamlı cümleler içinde öğrenilir.',
      'Bilginin Pekiştirilmesi: Materyalle tekrar karşılaşmak dilsel çağrışımları güçlendirir.',
      'Doğal Beceri Gelişimi: Yabancı konuşma ve metinleri zamanla daha iyi anlamaya başlarsınız.'
    ],
    philosophyQuote: 'Dil öğreniminde yeni bir yaklaşım. Tanıdıktan yeniye. Anlamaktan akıcı hakimiyete.',
    contactBadge: 'İletişim',
    contactTitle: 'Bize Ulaşın',
    contactSubtitle: 'Sorularınızı yanıtlamaktan memnuniyet duyarız.',
    nameLabel: 'Adınız *',
    emailLabel: 'E-posta adresiniz *',
    subjectLabel: 'Konu *',
    messageLabel: 'Mesajınız *',
    sendBtn: 'Mesaj Gönder',
    successTitle: 'Mesaj başarıyla gönderildi!',
    successDesc: '24–48 saat içinde yanıt vereceğiz.',
    sendMore: 'Başka mesaj gönder',
    directContact: 'Doğrudan İletişim',
    selectTopic: 'Konu seçin...',
    topicGeneral: 'Genel sorular',
    topicSupport: 'Teknik destek',
    topicPartnership: 'Ortaklık',
    topicPrivacy: 'Gizlilik',
    privacyBadge: 'GDPR ve AdSense Uyumluluğu',
    privacyTitle: 'Gizlilik Politikası',
    privacySubtitle: 'Son güncelleme: 31 Ekim 2026',
    privacyP1: 'GDPR, CCPA ve Google AdSense kurallarına uygunluk bildirimi.',
    privacyP2: 'Çerezlerin ve Google AdSense reklamlarının kullanımı.',
    privacyP3: 'Yerel cihaz depolaması.',
    privacyP4: 'GDPR Hakları: support@lingotwice.com.',
    termsBadge: 'Kullanım Koşulları',
    termsTitle: 'Kullanım Koşulları',
    termsSubtitle: 'Yürürlük tarihi: 31 Ekim 2026',
    termsP1: 'LingoTwice kullanarak bu koşulları kabul etmiş olursunuz.',
    termsP2: 'Fikri mülkiyet.',
    termsP3: 'Çeviri sorumluluk reddi.',
    termsP4: 'İletişim: support@lingotwice.com.'
  },
  zh: {
    returnToReader: '返回阅读器',
    aboutBadge: '关于我们',
    aboutTitle: 'Lingotwice — 通过知识关联学习语言',
    aboutSubtitle: '当你将新语言与已知知识建立关联时，语言学习将变得更加清晰直观。',
    missionTitle: 'LingoTwice 核心理念',
    missionText: 'Lingotwice 种独特的外语学习理念，基于上下文、思维联想以及母语与目标语言之间的深层联系。',
    methodTitle: '方法如何运作？',
    methodText: '学习方法非常简单：首先阅读母语文本，完全理解文章的情节与核心含义；随后切换至相同内容的段落外语版本。此时你的大脑已熟悉相关信息，无需再次费力理解情节，可专注于吸收外语词汇、短语和语法结构。随着阅读深入，新词汇将自然与已知概念产生联系。',
    featuresTitle: '为什么这种方法行之有效？',
    features: [
      '熟悉语境：理解文章内容有助于无障碍吸收外语文本。',
      '语义联想：新词汇与已知的概念自然建立深层连接。',
      '情境化学习：在完整的句子表达中掌握词汇，而非孤立记忆。',
      '巩固知识：重复接触材料有助于强化语言记忆与联想。',
      '自然提升：循序渐进地提升对外语听力与阅读的理解能力。'
    ],
    philosophyQuote: '全新的语言学习方法。从已知走向新知。从深刻理解走向流利掌握。',
    contactBadge: '联系我们',
    contactTitle: '联系与支持',
    contactSubtitle: '我们随时乐意解答您的疑问。',
    nameLabel: '您的姓名 *',
    emailLabel: '电子邮箱 *',
    subjectLabel: '主题 *',
    messageLabel: '留言内容 *',
    sendBtn: '发送消息',
    successTitle: '消息发送成功！',
    successDesc: '我们将在 24–48 小时内回复您。',
    sendMore: '发送新消息',
    directContact: '直接联系',
    selectTopic: '选择主题...',
    topicGeneral: '一般咨询与反馈',
    topicSupport: '技术支持与报错',
    topicPartnership: '商务合作',
    topicPrivacy: '隐私与数据',
    privacyBadge: 'GDPR 与 AdSense 合规',
    privacyTitle: '隐私政策',
    privacySubtitle: '最后更新：2026年10月31日',
    privacyP1: '本隐私政策说明我们如何根据 GDPR、CCPA 和 Google AdSense 收集和保护用户信息。',
    privacyP2: 'Cookie 与广告：本站使用 Cookie 及 Google AdSense 提供个性化广告。',
    privacyP3: '本地存储：您的阅读数据安全保存在本地。',
    privacyP4: 'GDPR 权利：请联系 support@lingotwice.com。',
    termsBadge: '服务条款',
    termsTitle: '服务条款',
    termsSubtitle: '生效日期：2026年10月31日',
    termsP1: '使用 LingoTwice 即代表您同意本服务条款。',
    termsP2: '知识产权归属平台所有。',
    termsP3: '自动翻译免责声明。',
    termsP4: '联系邮箱：support@lingotwice.com。'
  },
  ja: {
    returnToReader: 'リーダーに戻る',
    aboutBadge: 'LingoTwice について',
    aboutTitle: 'Lingotwice — 知識の繋がりを通じて言語を学ぶ',
    aboutSubtitle: 'すでにある知識と結びつけることで、新しい言語はよりわかりやすくなります。',
    missionTitle: 'LingoTwice のコンセプト',
    missionText: 'Lingotwiceは、母国語と学習言語の文脈、連想、知識の繋がりを活かした独自の外国語学習アプローチを提供します。',
    methodTitle: 'メソッドの仕組み',
    methodText: '方法は非常にシンプルです。まず母国語でテキストを読み、内容と意味を正確に理解します。次に同じ内容の外国語テキストに進みます。脳はすでにストーリーを把握しているため、内容を解読し直す必要がなく、外国語の単語、表現、文法構造に集中できます。徐々に新しい単語が知っている意味と結びつきます。',
    featuresTitle: 'なぜ効果があるのか？',
    features: [
      '慣れ親しんだ文脈: 内容の理解が外国語テキストの吸収を助けます。',
      '意味の連想: 新しい単語が知っている概念と結びつきます。',
      '文脈での学習: 単語を孤立して覚えるのではなく、意味のある文章の中で習得します。',
      '知識の定着: 素材に繰り返し触れることで、言語の繋がりが強化されます。',
      '自然なスキル向上: 外国語の会話や文章に対する理解が着実に深まります。'
    ],
    philosophyQuote: '言語学習への新しいアプローチ。知っていることから新しいことへ。理解から流暢な習得へ。',
    contactBadge: 'お問い合わせ',
    contactTitle: 'お問い合わせ',
    contactSubtitle: 'ご質問やサポートが必要な場合はお気軽にご連絡ください。',
    nameLabel: 'お名前 *',
    emailLabel: 'メールアドレス *',
    subjectLabel: '件名 *',
    messageLabel: 'メッセージ *',
    sendBtn: '送信する',
    successTitle: 'メッセージが送信されました！',
    successDesc: '24〜48時間以内にご返信いたします。',
    sendMore: 'もう一度送信する',
    directContact: '直接の連絡先',
    selectTopic: 'トピックを選択...',
    topicGeneral: '一般的な質問とフィードバック',
    topicSupport: '技術サポート / バグ報告',
    topicPartnership: 'パートナーシップ',
    topicPrivacy: 'プライバシーに関する質問',
    privacyBadge: 'GDPR & AdSense 準拠',
    privacyTitle: 'プライバシーポリシー',
    privacySubtitle: '最終更新日：2026年10月31日',
    privacyP1: '本ポリシーは、GDPRおよびGoogle AdSenseに準拠したデータ処理について説明します。',
    privacyP2: 'CookieおよびGoogle AdSense広告の使用について。',
    privacyP3: 'ローカルストレージによるデータ保護。',
    privacyP4: 'GDPRに関するお問い合わせ：support@lingotwice.com',
    termsBadge: '利用規約',
    termsTitle: '利用規約',
    termsSubtitle: '発効日：2026年10月31日',
    termsP1: 'ご利用により本規約に同意したものとみなされます。',
    termsP2: '知的財産権の保護。',
    termsP3: '自動翻訳の免責事項。',
    termsP4: '連絡先：support@lingotwice.com'
  },
  ko: {
    returnToReader: '독서 화면으로',
    aboutBadge: '소개',
    aboutTitle: 'Lingotwice — 지식의 연관성을 통한 언어 학습',
    aboutSubtitle: '이미 알고 있는 지식과 연결할 때 새로운 언어가 훨씬 명확해집니다.',
    missionTitle: 'LingoTwice 컨셉',
    missionText: 'Lingotwice는 모국어와 학습 언어 간의 맥락, 연상, 지식의 연관성에 기반한 특별한 외국어 학습법을 제공합니다.',
    methodTitle: '학습법 작동 원리',
    methodText: '방법은 간단합니다. 먼저 모국어로 텍스트를 읽어 내용과 의미를 완벽히 이해합니다. 그런 다음 동일한 내용의 외국어 텍스트로 이동합니다. 뇌는 이미 스토리에 익숙해져 있으므로 내용을 다시 해석하느라 애쓸 필요 없이, 외국어 단어, 표현, 문법 구조에 온전히 집중할 수 있습니다.',
    featuresTitle: '왜 효과적일까요?',
    features: [
      '익숙한 맥락: 내용을 이해하면 외국어 텍스트를 훨씬 쉽게 습득할 수 있습니다.',
      '의미적 연상: 새로운 단어가 이미 알고 있는 개념과 자연스럽게 연결됩니다.',
      '맥락 중심 학습: 단어를 암기식이 아닌, 의미 있는 문장 속에서 배웁니다.',
      '지식 강화: 학습 자료를 반복 접하며 언어적 연관성이 더 강화됩니다.',
      '자연스러운 실력 향상: 외국어 말하기와 글을 차근차근 더 깊이 이해하게 됩니다.'
    ],
    philosophyQuote: '언어 학습을 위한 새로운 접근법. 익숙함에서 새로운 세계로. 이해에서 유창한 구사까지.',
    contactBadge: '문의하기',
    contactTitle: '고객지원 및 연락처',
    contactSubtitle: '궁금한 점이 있으시면 언제든지 문의해 주세요.',
    nameLabel: '이름 *',
    emailLabel: '회신용 이메일 *',
    subjectLabel: '제목 *',
    messageLabel: '메시지 *',
    sendBtn: '메시지 보내기',
    successTitle: '메시지가 성공적으로 전송되었습니다!',
    successDesc: '24~48시간 이내에 답변해 드리겠습니다.',
    sendMore: '추가 메시지 보내기',
    directContact: '직접 연락처',
    selectTopic: '주제 선택...',
    topicGeneral: '일반 문의 및 피드백',
    topicSupport: '기술 지원 / 버그 신고',
    topicPartnership: '제휴 문의',
    topicPrivacy: '개인정보 보호 문의',
    privacyBadge: 'GDPR 및 AdSense 준수',
    privacyTitle: '개인정보처리방침',
    privacySubtitle: '최종 수정일: 2026년 10월 31일',
    privacyP1: '본 방침은 GDPR 및 Google AdSense 지침에 따른 사용자 정보 수집 및 보호를 설명합니다.',
    privacyP2: '쿠키 및 Google AdSense 광고 사용.',
    privacyP3: '로컬 저장소(LocalStorage)를 통한 데이터 보안.',
    privacyP4: 'GDPR 권리 행사: support@lingotwice.com',
    termsBadge: '이용약관',
    termsTitle: '이용약관',
    termsSubtitle: '시행일: 2026년 10월 31일',
    termsP1: 'LingoTwice를 이용함으로써 본 약관에 동의하게 됩니다.',
    termsP2: '지적 재산권 보호.',
    termsP3: '자동 번역 면책 조항.',
    termsP4: '문의: support@lingotwice.com'
  },
  pt: {
    returnToReader: 'Voltar ao leitor',
    aboutBadge: 'Sobre E-E-A-T',
    aboutTitle: 'Lingotwice — Aprenda idiomas através do conhecimento conectado',
    aboutSubtitle: 'Um novo idioma torna-se mais claro quando você o conecta ao que já sabe.',
    missionTitle: 'O Conceito LingoTwice',
    missionText: 'O Lingotwice oferece uma abordagem única para o aprendizado de idiomas baseada no contexto, em associações e na conexão entre sua língua materna e a língua estudada.',
    methodTitle: 'Como funciona o método?',
    methodText: 'O método é simples: primeiro você lê o texto na sua língua materna, compreendendo o conteúdo e o significado. Em seguida, passa para o mesmo texto no idioma estrangeiro. Seu cérebro já está familiarizado com a história. Você pode se concentrar totalmente em palavras, expressões e estruturas gramaticais.',
    featuresTitle: 'Por que funciona?',
    features: [
      'Contexto familiar: Compreender o conteúdo facilita a assimilação do texto estrangeiro.',
      'Associações semânticas: Novas palavras conectam-se a conceitos já conhecidos.',
      'Aprendizado em contexto: O vocabulário é absorvido em frases com sentido.',
      'Consolidação do conhecimento: Reeler o material fortalece as associações linguísticas.',
      'Desenvolvimento natural: Melhore progressivamente a compreensão da fala e de textos.'
    ],
    philosophyQuote: 'Uma nova abordagem para aprender idiomas. Do conhecido ao novo. Da compreensão à fluência.',
    contactBadge: 'Contato',
    contactTitle: 'Fale Conosco',
    contactSubtitle: 'Estamos prontos para ajudar com suas dúvidas.',
    nameLabel: 'Seu nome *',
    emailLabel: 'E-mail para resposta *',
    subjectLabel: 'Assunto *',
    messageLabel: 'Mensagem *',
    sendBtn: 'Enviar mensagem',
    successTitle: 'Mensagem enviada com sucesso!',
    successDesc: 'Responderemos em até 24–48 horas.',
    sendMore: 'Enviar outra mensagem',
    directContact: 'Contato direto',
    selectTopic: 'Selecione o tópico...',
    topicGeneral: 'Dúvidas gerais',
    topicSupport: 'Suporte técnico',
    topicPartnership: 'Parcerias',
    topicPrivacy: 'Privacidade de dados',
    privacyBadge: 'Conformidade GDPR e AdSense',
    privacyTitle: 'Política de Privacidade',
    privacySubtitle: 'Última atualização: 31 de outubro de 2026',
    privacyP1: 'Política em conformidade com GDPR, CCPA e Google AdSense.',
    privacyP2: 'Uso de cookies e anúncios personalizados.',
    privacyP3: 'Armazenamento de dados locais no navegador.',
    privacyP4: 'Direitos GDPR: support@lingotwice.com.',
    termsBadge: 'Termos de Serviço',
    termsTitle: 'Termos de Serviço',
    termsSubtitle: 'Data de vigência: 31 de outubro de 2026',
    termsP1: 'O uso do LingoTwice implica na aceitação destes termos.',
    termsP2: 'Propriedade intelectual.',
    termsP3: 'Isenção de responsabilidade sobre traduções.',
    termsP4: 'Contato: support@lingotwice.com.'
  },
  ar: {
    returnToReader: 'العودة للقارئ',
    aboutBadge: 'عن المنصة',
    aboutTitle: 'Lingotwice — تعلم اللغات من خلال المعرفة المترابطة',
    aboutSubtitle: 'تصبح اللغة الجديدة أكثر وضوحاً عندما تربطها بما تعرفه بالفعل.',
    missionTitle: 'مفهوم LingoTwice',
    missionText: 'يقدم Lingotwice نهجاً فريداً لتعلم اللغات الأجنبية يعتمد على السياق، والروابط الذهنية، والصلة بين لغتك الأم واللغة التي تتعلمها.',
    methodTitle: 'كيف تعمل الطريقة؟',
    methodText: 'الطريقة بسيطة: تبدأ بقراءة النص بلغتك الأم لفهم المحتوى والمعنى بشكل كامل. ثم تنتقل إلى النص نفسه باللغة الأجنبية. يكون عقلك حينها معتاداً على المعلومات، فتستطيع التركيز على الكلمات والتعبيرات والقواعد الأجنبية.',
    featuresTitle: 'لماذا تنجح هذه الطريقة؟',
    features: [
      'سياق مألوف: يساعد فهم المحتوى على استيعاب النص الأجنبي بسهولة.',
      'روابط معنوية: ترتبط الكلمات الجديدة بمفاهيم معروفة لديك بالفعل.',
      'التعلم في السياق: يتم اكتساب المفردات داخل جمل مفيدة وليس في عزلة.',
      'ترسيخ المعرفة: التفاعل المتكرر مع المحتوى يقوي الروابط اللغوية.',
      'تطور طبيعي للمهارات: تزداد قدرتك على فهم الحديث والنصوص الأجنبية خطوة بخطوة.'
    ],
    philosophyQuote: 'نهج جديد لتعلم اللغات. من المألوف إلى الجديد. من الفهم إلى الإتقان والسلاسة.',
    contactBadge: 'اتصل بنا',
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'نحن هنا للإجابة على استفساراتكم.',
    nameLabel: 'اسمك *',
    emailLabel: 'البريد الإلكتروني للرد *',
    subjectLabel: 'الموضوع *',
    messageLabel: 'الرسالة *',
    sendBtn: 'إرسال الرسالة',
    successTitle: 'تم إرسال الرسالة بنجاح!',
    successDesc: 'سنرد عليك خلال 24-48 ساعة.',
    sendMore: 'إرسال رسالة أخرى',
    directContact: 'اتصال مباشر',
    selectTopic: 'اختر الموضوع...',
    topicGeneral: 'أسئلة عامة',
    topicSupport: 'الدعم الفني',
    topicPartnership: 'شراكات',
    topicPrivacy: 'الخصوصية',
    privacyBadge: 'سياسة الخصوصية GDPR',
    privacyTitle: 'سياسة الخصوصية',
    privacySubtitle: 'آخر تحديث: 31 أكتوبر 2026',
    privacyP1: 'تصف سياسة الخصوصية كيفية جمع وحماية بيانات المستخدمين.',
    privacyP2: 'استخدام ملفات تعريف الارتباط (Cookies) وإعلانات Google AdSense.',
    privacyP3: 'تخزين البيانات محلياً على جهازك.',
    privacyP4: 'للتواصل: support@lingotwice.com.',
    termsBadge: 'شروط الخدمة',
    termsTitle: 'شروط الخدمة',
    termsSubtitle: 'تاريخ السريان: 31 أكتوبر 2026',
    termsP1: 'باستخدام LingoTwice، فإنك توافق على هذه الشروط.',
    termsP2: 'الملكية الفكرية.',
    termsP3: 'إخلاء المسؤولية عن الترجمات.',
    termsP4: 'للتواصل: support@lingotwice.com.'
  },
  nl: {
    returnToReader: 'Terug naar lezer',
    aboutBadge: 'Over ons E-E-A-T',
    aboutTitle: 'Lingotwice — Talen leren door verbonden kennis',
    aboutSubtitle: 'Een nieuwe taal wordt duidelijker wanneer je deze verbindt met wat je al weet.',
    missionTitle: 'Het LingoTwice Concept',
    missionText: 'Lingotwice biedt een unieke aanpak voor het leren van vreemde talen op basis van context, associaties en de verbinding tussen je moedertaal en de taal die je leert.',
    methodTitle: 'Hoe werkt de methode?',
    methodText: 'De methode is eenvoudig: eerst lees je de tekst in je moedertaal en begrijp je de inhoud en betekenis volledig. Vervolgens stap je over naar dezelfde tekst in de vreemde taal. Je brein is nu al bekend met de informatie. Je kunt je volledig concentreren op nieuwe woorden, uitdrukkingen en grammatica.',
    featuresTitle: 'Waarom werkt het?',
    features: [
      'Vertrouwde context: Het begrijpen van de inhoud helpt de vreemde tekst op te nemen.',
      'Betekenisvolle associaties: Nieuwe woorden worden gekoppeld aan bekende begrippen.',
      'Leren in context: Woordenschat wordt geleerd in betekenisvolle zinnen.',
      'Versterking van kennis: Herhaalde betrokkenheid versterkt taalkundige associaties.',
      'Natuurlijke vaardigheidsopbouw: Je begrijpt gesproken taal en teksten stap voor stap beter.'
    ],
    philosophyQuote: 'Een nieuwe aanpak voor het leren van talen. Van het bekende naar het nieuwe. Van begrip naar vloeiende beheersing.',
    contactBadge: 'Contact',
    contactTitle: 'Neem contact op',
    contactSubtitle: 'We beantwoorden graag al uw vragen.',
    nameLabel: 'Uw naam *',
    emailLabel: 'E-mailadres *',
    subjectLabel: 'Onderwerp *',
    messageLabel: 'Bericht *',
    sendBtn: 'Bericht verzenden',
    successTitle: 'Bericht succesvol verzonden!',
    successDesc: 'We reageren binnen 24–48 uur.',
    sendMore: 'Nog een bericht sturen',
    directContact: 'Direct contact',
    selectTopic: 'Selecteer onderwerp...',
    topicGeneral: 'Algemene vragen',
    topicSupport: 'Technische ondersteuning',
    topicPartnership: 'Partnerschap',
    topicPrivacy: 'Privacy',
    privacyBadge: 'GDPR & AdSense Naleving',
    privacyTitle: 'Privacybeleid',
    privacySubtitle: 'Laatst bijgewerkt: 31 oktober 2026',
    privacyP1: 'Dit beleid beschrijft de gegevensverwerking conform GDPR en Google AdSense.',
    privacyP2: 'Gebruik van cookies en advertenties.',
    privacyP3: 'Lokale gegevensopslag op uw apparaat.',
    privacyP4: 'GDPR-rechten: support@lingotwice.com.',
    termsBadge: 'Gebruiksvoorwaarden',
    termsTitle: 'Gebruiksvoorwaarden',
    termsSubtitle: 'Ingangsdatum: 31 oktober 2026',
    termsP1: 'Door LingoTwice te gebruiken akkoord met deze voorwaarden.',
    termsP2: 'Intellectueel eigendom.',
    termsP3: 'Vrijwaring voor vertalingen.',
    termsP4: 'Contact: support@lingotwice.com.'
  },
  sv: {
    returnToReader: 'Tillbaka till läsaren',
    aboutBadge: 'Om E-E-A-T',
    aboutTitle: 'Lingotwice — Lär dig språk genom sammankopplad kunskap',
    aboutSubtitle: 'Ett nytt språk blir tydligare när du kopplar det till det du redan kan.',
    missionTitle: 'LingoTwice-konceptet',
    missionText: 'Lingotwice erbjuder ett unikt sätt att lära sig främmande språk baserat på kontext, associationer och kopplingen mellan ditt modersmål och språket du lär dig.',
    methodTitle: 'Hur fungerar metoden?',
    methodText: 'Metoden är enkel: först läser du texten på ditt modersmål och förstår innehållet och innebörd. Sedan går du över till samma text på det främmande språket. Din hjärna är nu redan bekant med informationen. Du kan fokusera helt på nya ord, uttryck och gramatikstrukturer.',
    featuresTitle: 'Varför fungerar det?',
    features: [
      'Bekant kontext: Att förstå innehållet underlättar upptaget av den utländska texten.',
      'Meningsfulla associationer: Nya ord kopplas till redan kända begrepp.',
      'Inlärning i kontext: Ordförråd inläras i meningsfulla meningar.',
      'Förstärkning av kunskap: Återkommande kontakt stärker de språkliga kopplingarna.',
      'Naturlig färdighetsutveckling: Du förstår talat språk och utländska texter allt bättre.'
    ],
    philosophyQuote: 'Ett nytt tillvägagångssätt för språkinlärning. Från det kända till det nya. Från förståelse till flytande språkbeärskning.',
    contactBadge: 'Kontakt',
    contactTitle: 'Kontakta oss',
    contactSubtitle: 'Vi svarar gärna på dina frågor.',
    nameLabel: 'Ditt namn *',
    emailLabel: 'E-post för svar *',
    subjectLabel: 'Ämne *',
    messageLabel: 'Meddelande *',
    sendBtn: 'Skicka meddelande',
    successTitle: 'Meddelandet skickat!',
    successDesc: 'Vi svarar inom 24–48 timmar.',
    sendMore: 'Skicka ett till meddelande',
    directContact: 'Direktkontakt',
    selectTopic: 'Välj ämne...',
    topicGeneral: 'Allmänna frågor',
    topicSupport: 'Teknisk support',
    topicPartnership: 'Samarbete',
    topicPrivacy: 'Integritet',
    privacyBadge: 'GDPR & AdSense',
    privacyTitle: 'Integritetspolicy',
    privacySubtitle: 'Senast uppdaterad: 31 oktober 2026',
    privacyP1: 'Denna policy beskriver hur vi hanterar data enligt GDPR och Google AdSense.',
    privacyP2: 'Användning av cookies och Google AdSense-annonser.',
    privacyP3: 'Lokal datalagring på din enhet.',
    privacyP4: 'GDPR-rättigheter: support@lingotwice.com.',
    termsBadge: 'Användarvillkor',
    termsTitle: 'Användarvillkor',
    termsSubtitle: 'Gäller från: 31 oktober 2026',
    termsP1: 'Genom att använda LingoTwice godkänner du villkoren.',
    termsP2: 'Intellektuell egendom.',
    termsP3: 'Ansvarsfriskrivning för översättningar.',
    termsP4: 'Kontakt: support@lingotwice.com.'
  },
  he: {
    returnToReader: 'חזרה לקריאה',
    aboutBadge: 'אודות',
    aboutTitle: 'Lingotwice — למד שפות דרך ידע מקושר',
    aboutSubtitle: 'שפה חדשה הופכת לברורה יותר כאשר אתה מקשר אותה למה שאתה כבר יודע.',
    missionTitle: 'קונספט LingoTwice',
    missionText: 'Lingotwice מציעה גישה ייחודית ללימוד שפות זרות המבוססת על הקשר, אסוציאציות והקשר בין שפת האם שלך לשפה הנלמדת.',
    methodTitle: 'איך השיטה עובדת?',
    methodText: 'השיטה פשוטה: תחילה אתה קורא את הטקסט בשפת האם שלך ומבין את התוכן והמשמעות לחלוטין. לאחר מכן אתה עובר לאותו טקסט בשפה הזרות. המוח שלך כבר מכיר את המידע. אינך צריך לפענח את התוכן מחדש — אתה יכול להתרכז במילים, בביטויים במבנים הדקדוקיים החדשים.',
    featuresTitle: 'למה זה עובד?',
    features: [
      'הקשר מוכר: הבנת התוכן מסייעת לקלוט את הטקסט בשפה הזרות.',
      'אסוציאציות משמעותיות: מילים חדשות מתקשרות למושגים מוכרים.',
      'למידה בהקשר: אוצר המילים נרכש בתוך משפטים בעלי משמעות.',
      'חיזוק הידע: מפגש חוזר עם החומר מחזק את הקשרים הלשוניים.',
      'פיתוח מיומנות טבעי: בהדרגה תבין טוב יותר שפה דבורה וטקסטים זרים.'
    ],
    philosophyQuote: 'גישה חדשה ללימוד שפות. מהמוכר אל החדש. מהבנה ועד שליטה שוטפת.',
    contactBadge: 'צור קשר',
    contactTitle: 'צור קשר',
    contactSubtitle: 'נשמח לענות על כל שאלה.',
    nameLabel: 'השמך *',
    emailLabel: 'אימייל לתשובה *',
    subjectLabel: 'נושא *',
    messageLabel: 'הודעה *',
    sendBtn: 'שלח הודעה',
    successTitle: 'ההודעה נשלחה בהצלחה!',
    successDesc: 'נענה לפנייתך תוך 24–48 שעות.',
    sendMore: 'שלח הודעה נוספת',
    directContact: 'קשר ישיר',
    selectTopic: 'בחר נושא...',
    topicGeneral: 'שאלות כלליות',
    topicSupport: 'תמיכה טכנית',
    topicPartnership: 'שותפות',
    topicPrivacy: 'שאלות פרטיות',
    privacyBadge: 'עמידה ב-GDPR ו-AdSense',
    privacyTitle: 'מדיניות פרטיות',
    privacySubtitle: 'עדכון אחרון: 31 באוקטובר 2026',
    privacyP1: 'מדיניות פרטיות זו מתארת את איסוף והגנת נתוני המשתמש בהתאם ל-GDPR ולכללי Google AdSense.',
    privacyP2: 'שימוש בעוגיות (Cookies) ובמודעות Google AdSense.',
    privacyP3: 'שמירת נתונים מקומית בדפדפן.',
    privacyP4: 'זכויות GDPR: support@lingotwice.com.',
    termsBadge: 'תנאי שימוש',
    termsTitle: 'תנאי שימוש',
    termsSubtitle: 'תאריך תוקף: 31 באוקטובר 2026',
    termsP1: 'השימוש ב-LingoTwice מהווה הסכמה לתנאי שימוש אלו.',
    termsP2: 'קניין רוחני.',
    termsP3: 'הצהרת אחריות לגבי תרגומים אוטומטיים.',
    termsP4: 'צור קשר: support@lingotwice.com.'
  }
};

export const InfoPageView: React.FC<InfoPageViewProps> = ({ page, onBack, uiLang }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const t = INFO_TRANSLATIONS[uiLang] || INFO_TRANSLATIONS['en'];

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-8 md:px-12 reader-scrollbar">
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors cursor-pointer bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.returnToReader}</span>
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {page === 'about' && (
            <div className="space-y-6 text-slate-800 dark:text-slate-200">
              <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-md">
                  {t.aboutBadge}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                  {t.aboutTitle}
                </h1>
                <p className="text-base font-medium text-amber-700 dark:text-amber-400 mt-2">
                  {t.aboutSubtitle}
                </p>
              </div>

              <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">{t.missionTitle}</h2>
                  <p className="text-slate-700 dark:text-slate-300">{t.missionText}</p>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">{t.methodTitle}</h2>
                  <p className="text-slate-700 dark:text-slate-300">{t.methodText}</p>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.featuresTitle}</h2>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    {t.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 flex h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-4 border border-amber-200 dark:border-amber-900/60 text-center font-medium text-amber-900 dark:text-amber-200">
                  <p className="text-base font-semibold">{t.philosophyQuote}</p>
                </div>

                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{t.directContact}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-amber-600" />
                    <span>Email: <strong>support@lingotwice.com</strong></span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'contact' && (
            <div className="space-y-6 text-slate-800 dark:text-slate-200">
              <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-md">
                  {t.contactBadge}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                  {t.contactTitle}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t.contactSubtitle}
                </p>
              </div>

              {formSubmitted ? (
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-center text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                  <CheckCircle className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
                  <h3 className="font-bold text-base">{t.successTitle}</h3>
                  <p className="text-xs mt-1">{t.successDesc}</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 cursor-pointer"
                  >
                    {t.sendMore}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.nameLabel}</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-lg border border-slate-300 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.subjectLabel}</label>
                    <select
                      required
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-500"
                    >
                      <option value="">{t.selectTopic}</option>
                      <option value="general">{t.topicGeneral}</option>
                      <option value="support">{t.topicSupport}</option>
                      <option value="partnership">{t.topicPartnership}</option>
                      <option value="privacy">{t.topicPrivacy}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.messageLabel}</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-lg border border-slate-300 p-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-amber-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="rounded-lg bg-amber-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
                  >
                    {t.sendBtn}
                  </button>
                </form>
              )}

              <div className="border-t border-slate-100 pt-6 dark:border-slate-800 space-y-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.directContact}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <span>Email: <strong>support@lingotwice.com</strong></span>
                </p>
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div className="space-y-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-md">
                  {t.privacyBadge}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                  {t.privacyTitle}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.privacySubtitle}</p>
              </div>

              <p>{t.privacyP1}</p>
              <p>{t.privacyP2}</p>
              <p>{t.privacyP3}</p>
              <p>{t.privacyP4}</p>
            </div>
          )}

          {page === 'terms' && (
            <div className="space-y-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-md">
                  {t.termsBadge}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                  {t.termsTitle}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.termsSubtitle}</p>
              </div>

              <p>{t.termsP1}</p>
              <p>{t.termsP2}</p>
              <p>{t.termsP3}</p>
              <p>{t.termsP4}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
