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
    aboutTitle: 'About LingoTwice',
    aboutSubtitle: 'Bilingual parallel reading browser and contextual language learning platform.',
    missionTitle: 'Our Mission',
    missionText: 'LingoTwice (https://lingotwice.com) is designed to help language learners break the language barrier through natural immersion in original texts. We eliminate the tedious need to constantly switch to an external dictionary by uniting original text and translation in a single synchronized workspace.',
    methodTitle: 'Parallel Reading Method (Schliemann Method)',
    methodText: 'Our service is built on the compression input concept and polyglot Heinrich Schliemann’s historical method. By reading material side-by-side or comparing paragraphs in real-time, you instantly grasp context, plot, and sentence structure, enabling your brain to effortlessly absorb new grammar and vocabulary in context.',
    featuresTitle: 'Key Features',
    features: [
      'Synchronous Scrolling: Original and translation move together without losing focus.',
      'Contextual AI Dictionary: Instant breakdown of any word on click (translation, grammar, gender, verb forms, examples).',
      'Spaced Repetition (SRS): Smart retention based on the SM-2 algorithm.',
      'Public Domain & Custom Imports: Reading classic literature and importing your own materials.'
    ],
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
    aboutTitle: 'О платформе LingoTwice',
    aboutSubtitle: 'Билингвальный браузер параллельного чтения и контекстного изучения иностранных языков.',
    missionTitle: 'Наша миссия',
    missionText: 'LingoTwice (https://lingotwice.com) создан для того, чтобы помочь изучающим иностранные языки преодолеть языковой барьер с помощью естественного погружения в оригинальные тексты. Мы устраняем утомляющую необходимость постоянно переключаться на внешний словарь, объединяя оригинал и перевод в едином синхронизированном рабочем пространстве.',
    methodTitle: 'Метод параллельного чтения (Метод Шлимана)',
    methodText: 'В основе нашего сервиса лежит концепция компрессионного ввода и исторический метод полиглота Генриха Шлимана. Читая материал сначала на знакомом языке (или сопоставляя абзацы в режиме реального времени), вы мгновенно понимаете контекст, сюжет и структуру предложений, что позволяет мозгу без усилий усваивать новые грамматические конструкции и лексику в естественном контексте.',
    featuresTitle: 'Ключевые возможности',
    features: [
      'Синхронная прокрутка: Оригинал и перевод движутся вместе, исключая потерю фокуса.',
      'Контекстный ИИ-словарь: Мгновенный разбор любого слова по клику (перевод, грамматика, род, формы глагола, примеры).',
      'Интервальное повторение (SRS): Интеллектуальное закрепление выученных слов на основе алгоритма SM-2.',
      'Поддержка общественных достояний и импорта: Чтение классических произведений и загрузка личных материалов.'
    ],
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
    aboutTitle: 'Про платформу LingoTwice',
    aboutSubtitle: 'Білінгвальний браузер паралельного читання та контекстного вивчення іноземних мов.',
    missionTitle: 'Наша місія',
    missionText: 'LingoTwice створено для того, щоб допомогти учням долати мовний бар’єр завдяки природному зануренню в оригінальні тексти у синхронізованому середовищі.',
    methodTitle: 'Метод паралельного читання (Метод Шлімана)',
    methodText: 'В основі сервісу лежить історичний метод поліглота Генриха Шлімана та компресійний ввід, що дозволяє миттєво розуміти контекст.',
    featuresTitle: 'Ключові можливості',
    features: [
      'Синхронна прокрутка тексту.',
      'Контекстний ШІ-словник.',
      'Інтервальне повторення (SM-2).',
      'Підтримка імпорту власних матеріалів.'
    ],
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
    aboutTitle: 'Über LingoTwice',
    aboutSubtitle: 'Bilingualer Lese-Browser für das kontextbezogene Sprachenlernen.',
    missionTitle: 'Unsere Mission',
    missionText: 'LingoTwice hilft Sprachlernern, Sprachbarrieren durch natürliche Immersion in Originaltexte mit synchronisiertem Parallel-Layout zu überwinden.',
    methodTitle: 'Die Schliemann-Methode des parallelen Lesens',
    methodText: 'Sofortiges Verstehen durch synchrone Gegenüberstellung von Original und Übersetzung.',
    featuresTitle: 'Hauptmerkmale',
    features: [
      'Synchrones Scrollen von Original und Übersetzung.',
      'Kontextbezogenes KI-Wörterbuch.',
      'Spaced Repetition (SM-2 Algorithmus).',
      'Unterstützung für klassische Bibliothek & eigene Importe.'
    ],
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
    aboutTitle: 'Acerca de LingoTwice',
    aboutSubtitle: 'Navegador de lectura bilingüe paralelo y aprendizaje contextual.',
    missionTitle: 'Nuestra Misión',
    missionText: 'LingoTwice ayuda a los estudiantes a superar la barrera del idioma mediante la inmersión natural en textos originales.',
    methodTitle: 'Método de Lectura Paralela (Método Schliemann)',
    methodText: 'Comprensión instantánea gracias a la comparación en tiempo real.',
    featuresTitle: 'Características Principales',
    features: [
      'Desplazamiento sincrónico.',
      'Diccionario contextual con IA.',
      'Repetición espaciada (SM-2).',
      'Biblioteca clásica e importación propia.'
    ],
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
    aboutTitle: 'À propos de LingoTwice',
    aboutSubtitle: 'Navigateur de lecture bilingue et apprentissage des langues.',
    missionTitle: 'Notre Mission',
    missionText: 'LingoTwice aide les apprenants à franchir la barrière de la langue grâce à l’immersion naturelle.',
    methodTitle: 'Méthode de lecture parallèle (Méthode Schliemann)',
    methodText: 'Compréhension instantanée grâce au double affichage synchronisé.',
    featuresTitle: 'Fonctionnalités clés',
    features: [
      'Défilement synchrone.',
      'Dictionnaire IA contextuel.',
      'Répétition espacée (SM-2).',
      'Bibliothèque classique et importation.'
    ],
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
    aboutTitle: 'Informazioni su LingoTwice',
    aboutSubtitle: 'Browser di lettura bilingue parallela e apprendimento linguistico.',
    missionTitle: 'La Nostra Missione',
    missionText: 'LingoTwice aiuta gli studenti a superare la barriera linguistica attraverso la lettura parallela.',
    methodTitle: 'Metodo di Lettura Parallela (Metodo Schliemann)',
    methodText: 'Comprensione immediata del testo in contesto.',
    featuresTitle: 'Caratteristiche Principali',
    features: [
      'Scorrimento sincrono.',
      'Dizionario contestuale IA.',
      'Ripetizione spaziata (SM-2).',
      'Libreria classica e importazione file.'
    ],
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
    aboutTitle: 'O platformie LingoTwice',
    aboutSubtitle: 'Przeglądarka do czytania równoległego i nauki języków.',
    missionTitle: 'Nasza Misja',
    missionText: 'LingoTwice pomaga pokonać barierę językową dzięki naturalnej immersji w teksty.',
    methodTitle: 'Metoda czytania równoległego (Metoda Schliemanna)',
    methodText: 'Natychmiastowe zrozumienie kontekstu i słownictwa.',
    featuresTitle: 'Kluczowe funkcje',
    features: [
      'Synchroniczne przewijanie.',
      'Kontekstowy słownik AI.',
      'Powtarzanie w odstępach (SM-2).',
      'Biblioteka klasyczna i własne importy.'
    ],
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
    aboutTitle: 'LingoTwice Hakkında',
    aboutSubtitle: 'İki dilli paralel okuma tarayıcısı ve bağlamsal dil öğrenme platformu.',
    missionTitle: 'Misyonumuz',
    missionText: 'LingoTwice, dil öğrenenlerin orijinal metinlerle engelleri aşmasını sağlar.',
    methodTitle: 'Paralel Okuma Metodu (Schliemann Metodu)',
    methodText: 'Senkronize metinler ile anında bağlam kavrama.',
    featuresTitle: 'Temel Özellikler',
    features: [
      'Senkronize kaydırma.',
      'Bağlamsal Yapay Zeka Sözlüğü.',
      'Aralıklı Tekrar (SM-2).',
      'Klasik kütüphane ve özel metin yükleme.'
    ],
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
    aboutTitle: '关于 LingoTwice',
    aboutSubtitle: '双语并行阅读浏览器与语境语言学习平台。',
    missionTitle: '我们的使命',
    missionText: 'LingoTwice 旨在通过自然浸入原创文本帮助语言学习者突破语言障碍。',
    methodTitle: '平行阅读法（施liemann方法）',
    methodText: '通过同步对照原文与翻译，瞬间掌握上下文和结构。',
    featuresTitle: '核心功能',
    features: [
      '同步滚动：原文与译文联动。',
      'AI 语境词典：点击即解。',
      '间隔重复（SM-2）：长效记忆。',
      '经典文库与自定义导入。'
    ],
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
    aboutTitle: 'LingoTwice プラットフォームについて',
    aboutSubtitle: 'バイリンガル並行読書ブラウザと文脈型言語学習プラットフォーム。',
    missionTitle: '私たちの使命',
    missionText: 'LingoTwice は、オリジナルテキストへの自然な没入を通じて語学学習者をサポートします。',
    methodTitle: '並行読書法（シュリーマン法）',
    methodText: '原文と翻訳を同期させて文脈を瞬時に理解します。',
    featuresTitle: '主な機能',
    features: [
      '同期スクロール',
      '文脈AI辞書',
      '間隔反復（SM-2）',
      '名作ライブラリとカスタムインポート'
    ],
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
    aboutTitle: 'LingoTwice 소개',
    aboutSubtitle: '이중 언어 병렬 독서 브라우저 및 문맥 언어 학습 플랫폼.',
    missionTitle: '우리의 미션',
    missionText: 'LingoTwice는 원문과의 자연스러운 몰입을 통해 언어 장벽을 극복하도록 돕습니다.',
    methodTitle: '병렬 독서법 (슐리만 메서드)',
    methodText: '원문과 번역을 동시에 보며 문맥을 직관적으로 이해합니다.',
    featuresTitle: '핵심 기능',
    features: [
      '동기화 스크롤',
      '문맥 AI 사전',
      '간격 반복 학습 (SM-2)',
      '클래식 도서관 및 사용자 파일 가져오기'
    ],
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
    aboutTitle: 'Sobre o LingoTwice',
    aboutSubtitle: 'Navegador de leitura bilíngue paralela e aprendizagem de idiomas.',
    missionTitle: 'Nossa Missão',
    missionText: 'O LingoTwice ajuda os alunos a superar a barreira do idioma através da imersão natural em textos.',
    methodTitle: 'Método de Leitura Paralela',
    methodText: 'Compreensão instantânea através da comparação em tempo real.',
    featuresTitle: 'Recursos Principais',
    features: [
      'Rolagem síncrona.',
      'Dicionário contextual com IA.',
      'Repetição espaçada (SM-2).',
      'Biblioteca clássica e importação.'
    ],
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
    aboutTitle: 'عن LingoTwice',
    aboutSubtitle: 'متصفح القراءة ثنائية اللغة الموازية.',
    missionTitle: 'مهمتنا',
    missionText: 'يساعد LingoTwice متعلمي  اللغات على كسر حاجز اللغة من خلال الانغماس الطبيعي.',
    methodTitle: 'طريقة القراءة الموازية',
    methodText: 'فهم الفوري للسياق والنصوص.',
    featuresTitle: 'الميزات الرئيسية',
    features: [
      'التمرير المتزامن.',
      'قاموس الذكاء الاصطناعي.',
      'التكرار المتباعد (SM-2).',
      'مكتبة الكلاسيكيات.'
    ],
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
    aboutTitle: 'Over LingoTwice',
    aboutSubtitle: 'Tweetalige parallelle leesbrowser en taalplatform.',
    missionTitle: 'Onze Missie',
    missionText: 'LingoTwice helpt taaleriaars de taalbarrière te doorbreken door natuurlijke onderdompeling.',
    methodTitle: 'Parallelle Leesmethode',
    methodText: 'Direct begrip door synchrone weergave van origineel en vertaling.',
    featuresTitle: 'Belangrijkste Kenmerken',
    features: [
      'Synchroon scrollen.',
      'Contextueel AI-woordenboek.',
      'Gespreide herhaling (SM-2).',
      'Klassieke bibliotheek & eigen import.'
    ],
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
    termsBadge: '的服务条款',
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
    aboutTitle: 'Om LingoTwice',
    aboutSubtitle: 'Tvåspråkig parallell läswebbläsare.',
    missionTitle: 'Vår Vår Mission',
    missionText: 'LingoTwice hjälper språkstuderande att övervinna språkbarriären.',
    methodTitle: 'Parallell läsmetod',
    methodText: 'Omedelbar förståelse genom synkroniserad text.',
    featuresTitle: 'Nyckelfunktioner',
    features: [
      'Synkroniserad scrollning.',
      'Kontextuell AI-ordbok.',
      'Spaced repetition (SM-2).',
      'Klassiska bibliotek & egna importer.'
    ],
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
    returnToReader: 'חזרה לקرأה',
    aboutBadge: 'אודות',
    aboutTitle: 'אודות LingoTwice',
    aboutSubtitle: 'דפדפן קריאה דו-לשוני מקביל.',
    missionTitle: 'המשימה שלנו',
    missionText: 'LingoTwice עוזר ללומדי שפות לשבור את מחסום השפה באמצעות טבילה טבעית.',
    methodTitle: 'שיטת קריאה מקבילה',
    methodText: 'הבנה מיידית של ההקשר.',
    featuresTitle: 'תכונות עיקריות',
    features: [
      'גלריה וגלילה מסונכרנת.',
      'מילון AI הקשרי.',
      'חזרה מרווחת (SM-2).',
      'ספרייה קלאסית ויבוא אישי.'
    ],
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
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t.aboutSubtitle}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.missionTitle}</h2>
                <p>{t.missionText}</p>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.methodTitle}</h2>
                <p>{t.methodText}</p>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.featuresTitle}</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                  {t.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Контакты и поддержка</h2>
                <p>
                  Email:{' '}
                  <a href="mailto:support@lingotwice.com" className="text-amber-600 underline font-medium">
                    support@lingotwice.com
                  </a>
                </p>
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
