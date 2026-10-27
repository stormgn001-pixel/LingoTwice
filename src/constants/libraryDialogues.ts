import { ReadingDocument } from '../types';

export const DIALOGUE_DOCUMENTS: ReadingDocument[] = [
  // 18. ПАРИЖСКАЯ БЕСЕДА
  {
    id: 'doc-paris-bookstore',
    title: 'Парижская беседа в старинной книжной лавке у Сены',
    titleTranslations: {
      ru: 'Парижская беседа в старинной книжной лавке у Сены',
      uk: 'Паризька бесіда у старовинній книжковій крамниці біля Сени',
      en: 'Parisian Conversation in an Antique Bookstore by the Seine',
      de: 'Pariser Gespräch in einer antiken Buchhandlung an der Seine',
      es: 'Conversación parisina en una antigua librería junto al Sena',
      fr: 'Conversation parisienne dans une librairie ancienne près de la Seine',
      it: 'Conversazione parigina in un\'antica libreria vicino alla Senna',
      pl: 'Paryska rozmowa w zabytkowej księgarni nad Sekwaną',
      tr: 'Sen Nehrindeki Antika Kitabevinde Paris Sohbeti',
      zh: '塞纳河畔古董书店的巴黎对话',
    },
    author: 'Беседы библиофилов',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_paris_bookstore_1792929019575.jpg',
    category: 'dialogue',
    createdAt: Date.now() - 86400000 * 1,
    lastReadAt: Date.now() - 400000,
    readingProgress: 55,
    wordCount: 448,
    isSample: true,
    passages: [
      {
        id: 'p-pb-1',
        order: 1,
        sourceText: "— Bonjour, Monsieur ! Pardonnez-moi de vous déranger dans votre lecture. Je cherche une édition originale des Fleurs du Mal de Baudelaire, ou du moins une belle impression du XIXe siècle.",
        targetText: "— Добрый день, месье! Простите за беспокойство среди вашего чтения. Я ищу прижизненное издание «Цветов зла» Бодлера или хотя бы добротный оттиск девятнадцатого века."
      },
      {
        id: 'p-pb-2',
        order: 2,
        sourceText: "— Ah, Baudelaire ! Entrez donc, mon cher ami. L’odeur du vieux papier et de la reliure en cuir est ici notre plus fidèle compagne. Regardez sur cette étagère en chêne, juste au-dessous de la lanterne ambrée.",
        targetText: "— О, Бодлер! Проходите же, мой дорогой друг. Запах старой бумаги и кожаных переплётов — наши самые верные спутники. Взгляните на эту дубовую полку, прямо под янтарным фонарём."
      },
      {
        id: 'p-pb-3',
        order: 3,
        sourceText: "— Quel magnifique exemplaire ! Les gravures sont d’une finesse absolute. Combien demandez-vous pour ce trésor ?",
        targetText: "— Какой великолепный экземпляр! Гравюры выполнены с абсолютным изяществом. Сколько вы просите за это сокровище?"
      },
      {
        id: 'p-pb-4',
        order: 4,
        sourceText: "— Pour un véritable passionné de poésie qui sait apprécier la patine du temps, nous trouverons toujours un terrain d’entente. Asseyez-vous, je vais nous préparer un café chaud.",
        targetText: "— Для истинного ценителя поэзии, умеющего чувствовать благородную патину времени, мы всегда найдём согласие. Присаживайтесь, я сварю нам свежий горячий кофе."
      },
      {
        id: 'p-pb-5',
        order: 5,
        sourceText: "— Merci mille fois. Vous savez, la Seine brille sous la lumière d'automne. Paris en octobre a un charme indicible qu'on ne retrouve nulle part ailleurs.",
        targetText: "— Тысяча благодарностей. Знаете, Сена так красиво блестит под осенним светом. Париж в октябре обладает непередаваемым очарованием, которого не встретишь больше нигде."
      },
      {
        id: 'p-pb-6',
        order: 6,
        sourceText: "— C'est exact. Les bouquinistes le long des quais racontent l'histoire de notre cité depuis des siècles. Chaque livre d'occasion a une âme, des voyages et des secrets.",
        targetText: "— Это так. Букинисты вдоль набережных рассказывают историю нашего города на протяжении веков. У каждой подержанной книги есть душа, свои путешествия и тайны."
      },
      {
        id: 'p-pb-7',
        order: 7,
        sourceText: "— Avez-vous aussi des manuscrits inédits ou des lettres d'écrivains du Quartier Latin ?",
        targetText: "— Есть ли у вас также неопубликованные рукописи или письма писателей Латинского квартала?"
      },
      {
        id: 'p-pb-8',
        order: 8,
        sourceText: "— Parfois le hasard nous offre de telles merveilles. La semaine dernière, j'ai dénichée une correspondance entre un jeune poète symboliste et son éditeur de la Rive Gauche.",
        targetText: "— Иногда случай дарует нам такие чудеса. На прошлой неделе я нашел переписку между молодым поэтом-символистом и его издателем с Левого берега."
      },
      {
        id: 'p-pb-9',
        order: 9,
        sourceText: "— Quelle découverte fascinante ! La littérature française a cette capacité unique d'éveiller la mélancolie et la beauté suprême.",
        targetText: "— Какое увлекательное открытие! Французская литература обладает уникальной способностью пробуждать меланхолию и высшую красоту."
      },
      {
        id: 'p-pb-10',
        order: 10,
        sourceText: "— Prenez ce livre entre vos mains. Touchez le grain du papier pur chiffon. Rien au monde ne peut remplacer le plaisir tactile d'une reliure ancienne.",
        targetText: "— Возьмите эту книгу в руки. Почувствуйте текстуру тряпичной бумаги. Ничто в мире не может заменить тактильное удовольствие от старинного переплета."
      },
      {
        id: 'p-pb-11',
        order: 11,
        sourceText: "— Je suis entièrement de votre avis. Les écrans modernes diffusent de la lumière, mais les livres anciens diffusent de la pensée.",
        targetText: "— Я совершенно с вами согласен. Современные экраны излучают свет, но старые книги излучают мысль."
      },
      {
        id: 'p-pb-12',
        order: 12,
        sourceText: "— Formidablement dit ! Permettez-moi de vous offrir ce petit volume de Verlaine en souvenir de notre rencontre.",
        targetText: "— Замечательно сказано! Позвольте подарить вам этот маленький томик Верлена в память о нашей встрече."
      },
      {
        id: 'p-pb-13',
        order: 13,
        sourceText: "— C'est trop généreux, Monsieur le libraire. Je repasserai souvent vous rendre visite lorsque le crépuscule tombera sur les tours de Notre-Dame.",
        targetText: "— Это слишком щедро с вашей стороны, господин книготорговец. Я буду часто заходить к вам в гости, когда сумерки будут опускаться на башни Нотр-Дам."
      },
      {
        id: 'p-pb-14',
        order: 14,
        sourceText: "— La porte vous sera toujours ouverte. La vraie communauté des lecteurs franchit les frontières et les époques sans effort.",
        targetText: "— Дверь всегда будет открыта для вас. Истинное сообщество читателей без усилий преодолевает границы и эпохи."
      },
      {
        id: 'p-pb-15',
        order: 15,
        sourceText: "— Regardez les feuilles dorées qui tombent doucement sur le trottoir. L'automne à Saint-Germain est une poésie vivante.",
        targetText: "— Посмотрите на золотые листья, тихо падающие на тротуар. Осень в Сен-Жермен — это живая поэзия."
      },
      {
        id: 'p-pb-16',
        order: 16,
        sourceText: "— Oui, et la pluie fine qui commence à tomber donnera une raison de plus de rester au chaud parmi ces millier de compagnons de papier.",
        targetText: "— Да, и начинающийся мелкий дождь даст еще один повод остаться в тепле среди этих тысяч бумажных спутников."
      },
      {
        id: 'p-pb-17',
        order: 17,
        sourceText: "— Avez-vous lu la nouvelle traduction des classiques en langues orientales ?",
        targetText: "— Читали ли вы новый перевод классиков на восточные языки?"
      },
      {
        id: 'p-pb-18',
        order: 18,
        sourceText: "— Absolument. Le dialogue entre les cultures est la seule voix qui sauve la civilisation du désert de l'ignorance.",
        targetText: "— Безусловно. Диалог культур — единственный голос, спасающий цивилизацию от пустыни невежества."
      },
      {
        id: 'p-pb-19',
        order: 19,
        sourceText: "— Merci encore pour ce moment précieux. Au revoir et à très bientôt, cher ami des livres !",
        targetText: "— Еще раз спасибо за этот драгоценный момент. До свидания и до скорой встречи, дорогой друг книг!"
      },
      {
        id: 'p-pb-20',
        order: 20,
        sourceText: "— Au revoir ! Que la lumière des grands textes illumine votre chemin à travers la ville des lumières.",
        targetText: "— До свидания! Пусть свет великих текстов озаряет ваш путь по Городу Света."
      }
    ]
  },

  // 19. ВЕНСКИЕ КОФЕЙНЫЕ БЕСЕДЫ
  {
    id: 'doc-cafe-dialogues',
    title: 'Венские кофейные беседы (Утренний диалог)',
    titleTranslations: {
      ru: 'Венские кофейные беседы (Утренний диалог)',
      uk: 'Віденські кавові бесіди (Ранковий діалог)',
      en: 'Viennese Coffeehouse Dialogues (Morning Conversation)',
      de: 'Wiener Kaffeehausgespräche (Morgendlicher Dialog)',
      es: 'Diálogos en un café vienés (Conversación matutina)',
      fr: 'Dialogues au café viennois (Conversation du matin)',
      it: 'Dialoghi nel caffè viennese (Conversazione mattutina)',
      pl: 'Wiedeńskie rozmowy kawiarniane (Poranny dialog)',
      tr: 'Viyana Kahvehanesi Sohbetleri (Sabah Diyaloğu)',
      zh: '维也纳咖啡馆对话（晨间对话）',
    },
    author: 'Хроники путешественника',
    sourceLang: 'de',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_dialogues_1792926491648.jpg',
    category: 'dialogue',
    createdAt: Date.now() - 86400000 * 2,
    lastReadAt: Date.now() - 1800000,
    readingProgress: 60,
    wordCount: 315,
    isSample: true,
    passages: [
      {
        id: 'p-cd-1',
        order: 1,
        sourceText: "Guten Morgen! Einen wunderschönen Tag wünsche ich Ihnen. Ist dieser Platz am Fenster noch frei, oder erwarten Sie noch jemanden?",
        targetText: "Доброе утро! Желаю вам прекрасного дня. Это место у окна свободно, или вы кого-то ждёте?"
      },
      {
        id: 'p-cd-2',
        order: 2,
        sourceText: "Nein, bitte nehmen Sie doch Platz. Der Platz ist frei. Die Morgensonne hier ist herrlich, besonders mit einer frischen Melange und einer Tageszeitung.",
        targetText: "Нет, присаживайтесь, пожалуйста. Место свободно. Утреннее солнце здесь великолепно, особенно с чашкой свежего кофе меланж и утренней газетой."
      },
      {
        id: 'p-cd-3',
        order: 3,
        sourceText: "Herr Ober! Bringen Sie mir bitte auch eine Wiener Melange und ein Stück Apfelstrudel mit etwas Schlagsahne, wenn es möglich ist.",
        targetText: "Официант! Принесите мне тоже, пожалуйста, венский меланж и кусочек яблочного штруделя со взбитыми сливками, если можно."
      },
      {
        id: 'p-cd-4',
        order: 4,
        sourceText: "Sehr gerne, mein Herr. Der Strudel kommt gerade frisch aus dem Ofen. Er duftet wunderbar nach Zimt und Rosinen.",
        targetText: "С превеликим удовольствием, сударь. Штрудель как раз только что из печи. Он чудесно пахнет корицей и изюмом."
      },
      {
        id: 'p-cd-5',
        order: 5,
        sourceText: "Das Wiener Kaffeehaus ist wirklich kein gewöhnlicher Ort, sondern ein erweitertes Wohnzimmer, in dem die Zeit langsamer zu fließen scheint.",
        targetText: "Венская кофейня — это действительно необычное место, а скорее продолжение гостиной, где время течёт заметно медленнее."
      },
      {
        id: 'p-cd-6',
        order: 6,
        sourceText: "Stefan Zweig schrieb einmal, dass das Kaffeehaus eine Institution besonderer Art ist, die mit keiner anderen in der Welt verglichen werden kann.",
        targetText: "Стефан Цвейг однажды написал, что кофейня — это институция особого рода, которую нельзя сравнить ни с какой другой в мире."
      },
      {
        id: 'p-cd-7',
        order: 7,
        sourceText: "Hier trafen sich Künstler, Schriftsteller, Philosophen und Politiker, um stundenlang bei einer einzigen Tasse Kaffee zu diskutieren.",
        targetText: "Здесь встречались художники, писатели, философы и политики, чтобы часами дискутировать за единственной чашкой кофе."
      },
      {
        id: 'p-cd-8',
        order: 8,
        sourceText: "Schauen Sie sich die Marmortische und die eleganten Thonet-Stühle an. Sie haben die Geschichte des zwanzigsten Jahrhunderts miterlebt.",
        targetText: "Посмотрите на эти мраморные столики и элегантные венские стулья. Они были свидетелями истории двадцатого века."
      },
      {
        id: 'p-cd-9',
        order: 9,
        sourceText: "Können Sie mir auch eine Sachertorte oder eine Linzer Torte empfehlen?",
        targetText: "Можете ли вы посоветовать мне также торт «Захер» или линцский пирог?"
      },
      {
        id: 'p-cd-10',
        order: 10,
        sourceText: "Die Sachertorte mit der dunklen Schokoladenglasur und der Marillenmarmelade ist ein absoluter Klassiker, den man probiert haben muss.",
        targetText: "Торт «Захер» с темной шоколадной глазурью и абрикосовым конфитюром — это абсолютная классика, которую необходимо попробовать."
      },
      {
        id: 'p-cd-11',
        order: 11,
        sourceText: "Wunderbar. Das werde ich morgen Nachmittag versuchen, wenn die Geigenmusik im Salon erklingt.",
        targetText: "Замечательно. Я попробую его завтра днем, когда в салоне зазвучит скрипичная музыка."
      },
      {
        id: 'p-cd-12',
        order: 12,
        sourceText: "Wien hat eine ganz besondere Atmosphäre im Herbst. Die Ringstraße erstrahlt im goldenen Laub der alten Platanen.",
        targetText: "Вене присуща совершенно особая атмосфера осенью. Рингштрассе сияет в золотой листве старых платанов."
      },
      {
        id: 'p-cd-13',
        order: 13,
        sourceText: "Und am Abend kann man die Staatsoper besuchen oder einem Mozart-Konzert im Musikverein lauschen.",
        targetText: "А вечером можно посетить Венскую государственную оперу или послушать концерт Моцарта в Музикферайне."
      },
      {
        id: 'p-cd-14',
        order: 14,
        sourceText: "Die Musikkultur hier ist unvergleichlich. Jeder Stein in dieser Stadt scheint von Melodien durchdrungen zu sein.",
        targetText: "Музыкальная культура здесь несравненна. Каждый камень в этом городе словно пропитан мелодиями."
      },
      {
        id: 'p-cd-15',
        order: 15,
        sourceText: "Haben Sie schon die Hofburg und den Stephansdom besichtigt?",
        targetText: "Вы уже осмотрели Хофбург и собор Святого Стефана?"
      },
      {
        id: 'p-cd-16',
        order: 16,
        sourceText: "Ja, gestern Nachmittag. Die gotische Architektur des Stephansdoms hat mich tief beeindruckt.",
        targetText: "Да, вчера днем. Готическая архитектура собора Святого Стефана произвела на меня глубокое впечатление."
      },
      {
        id: 'p-cd-17',
        order: 17,
        sourceText: "Ein Spaziergang durch den Schlosspark von Schönbrunn ist ebenfalls ein unvergessliches Erlebnis.",
        targetText: "Прогулка по дворцовому парку Шёнбрунн — это также незабываемое впечатление."
      },
      {
        id: 'p-cd-18',
        order: 18,
        sourceText: "Ich danke Ihnen herzlich für das angenehme Gespräch und die wunderbaren Tipps!",
        targetText: "Искренне благодарю вас за приятную беседу и замечательные советы!"
      },
      {
        id: 'p-cd-19',
        order: 19,
        sourceText: "Es war mir ein Vergnügen. Genießen Sie Ihren Aufenthalt in unserer schönen Kaiserstadt Wien!",
        targetText: "Это было мое удовольствие. Наслаждайтесь вашим пребыванием в нашем прекрасном императорском городе Вене!"
      },
      {
        id: 'p-cd-20',
        order: 20,
        sourceText: "Auf Wiedersehen und einen wunderschönen Tag noch!",
        targetText: "До свидания и прекрасного вам дня!"
      }
    ]
  },

  // 20. ДИАЛОГ В РИМЕ
  {
    id: 'doc-rome-dialogue',
    title: 'Диалог в Риме: Архитектура, свет и вечность',
    titleTranslations: {
      ru: 'Диалог в Риме: Архитектура, свет и вечность',
      uk: 'Діалог у Римі: Архітектура, світло та вічність',
      en: 'Dialogue in Rome: Architecture, Light, and Eternity',
      de: 'Dialog in Rom: Architektur, Licht und Ewigkeit',
      es: 'Diálogo en Roma: Arquitectura, luz y eternidad',
      fr: 'Dialogue à Rome : Architecture, lumière et éternité',
      it: 'Dialogo a Roma: Architettura, luce ed eternità',
      pl: 'Dialog w Rzymie: Architektura, światło i wieczność',
      tr: 'Roma\'da Diyalog: Mimari, Işık ve Sonsuzluk',
      zh: '罗马对话：建筑、光线与永恒',
    },
    author: 'Итальянские зарисовки',
    sourceLang: 'it',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_dialogues_1792926491648.jpg',
    category: 'dialogue',
    createdAt: Date.now() - 86400000 * 5,
    lastReadAt: Date.now() - 8000000,
    readingProgress: 40,
    wordCount: 402,
    isSample: true,
    passages: [
      {
        id: 'p-rd-1',
        order: 1,
        sourceText: "— Guarda come la luce del tramonto accarezza le colonne del Pantheon. Roma a quest'ora sembra sospesa tra la storia antica e il presente.",
        targetText: "— Посмотри, как закатный свет ласкает колонны Пантеона. Рим в этот час словно застыл между древней историей и настоящим моментом."
      },
      {
        id: 'p-rd-2',
        order: 2,
        sourceText: "— È vero. La cupola con il suo oculo aperto verso il cielo è una lezione di armonia architettonica che nessun edificio moderno è mai riuscito a eguagliare.",
        targetText: "— Это правда. Купол с его окулюсом, открытым навстречу небесам, — это урок архитектурной гармонии, превзойти который не удалось ни одному современному зданию."
      },
      {
        id: 'p-rd-3',
        order: 3,
        sourceText: "— Prendiamo un gelato artigianale vicino a Piazza Navona e continuiamo a camminare tra i vicoli di ciottoli prima che faccia buio.",
        targetText: "— Давай возьмём домашнее ремесленное джелато возле площади Навона и продолжим прогулку по мощёным улочкам, пока не стемнело."
      },
      {
        id: 'p-rd-4',
        order: 4,
        sourceText: "— La Fontana dei Quattro Fiumi del Bernini è un capolavoro assoluto del barocco romano. Il movimento dell'acqua crea una musica continua.",
        targetText: "— Фонтан Четырех рек Бернини — абсолютный шедевр римского барокко. Движение воды создает непрерывную музыку."
      },
      {
        id: 'p-rd-5',
        order: 5,
        sourceText: "— Hai lanciato la moneta nella Fontana di Trevi per assicurarti il ritorno nella Città Eterna?",
        targetText: "— Ты бросил монетку в фонтан Треви, чтобы гарантировать свое возвращение в Вечный Город?"
      },
      {
        id: 'p-rd-6',
        order: 6,
        sourceText: "— Certamente! È una tradizione alla quale nessun viaggiatore può resistere. Il suono delle acque di Trevi risuona in tutta la piazza.",
        targetText: "— Конечно! Это традиция, перед которой не может устоять ни один путешественник. Звук вод Треви разносится по всей площади."
      },
      {
        id: 'p-rd-7',
        order: 7,
        sourceText: "— Il Colosseo di notte, illuminato dai riflettori, infonde un senso di reverenza per la grandezza dell'Impero Romano.",
        targetText: "— Колизей ночью, освещенный прожекторами, внушает чувство благоговения перед величием Римской империи."
      },
      {
        id: 'p-rd-8',
        order: 8,
        sourceText: "— Pensare che duemila anni fa qui si radunavano cinquantamila spettatori fa riflettere sulla continuità della nostra civiltà.",
        targetText: "— Мысль о том, что две тысячи лет назад здесь собирались пятьдесят тысяч зрителей, заставляет задуматься о непрерывности нашей цивилизации."
      },
      {
        id: 'p-rd-9',
        order: 9,
        sourceText: "— E cosa dici del Foro Romano? Camminare sulla Via Sacra è come sfogliare un libro di storia a cielo aperto.",
        targetText: "— А что скажешь о Римском форуме? Шагать по Священной дороге — словно листать книгу истории под открытым небом."
      },
      {
        id: 'p-rd-10',
        order: 10,
        sourceText: "— Ogni pietra racconta le orazioni di Cicerone, i trionfi di Cesare e la nascita del diritto civile occidentale.",
        targetText: "— Каждый камень рассказывает о речах Цицерона, триумфах Цезаря и рождении западного гражданского права."
      },
      {
        id: 'p-rd-11',
        order: 11,
        sourceText: "— Stasera dobbiamo assolutamente cenare in una trattoria tipica a Trastevere. La cucina romana è semplice, sincera e deliziosa.",
        targetText: "— Сегодня вечером мы обязательно должны поужинать в типичной траттории в Трастевере. Римская кухня проста, искренняя и восхитительна."
      },
      {
        id: 'p-rd-12',
        order: 12,
        sourceText: "— Una vera pasta alla carbonara o un piatto di cacio e pepe con un bicchiere di vino dei Castelli Romani è il massimo della felicità.",
        targetText: "— Настоящая паста карбонара или блюдо качо-э-пепе с бокалом вина из Кастелли Романи — это высшее счастье."
      },
      {
        id: 'p-rd-13',
        order: 13,
        sourceText: "— Domani mattina visiteremo i Musei Vaticani e la Cappella Sistina per ammirare gli affreschi di Michelangelo.",
        targetText: "— Завтра утром мы посетим музеи Ватикана и Сикстинскую капеллу, чтобы полюбоваться фресками Микеланджело."
      },
      {
        id: 'p-rd-14',
        order: 14,
        sourceText: "— La Creazione di Adamo è un'opera d'arte che definisce l'umanesimo rinascimentale. Il tocco delle dita esprime il soffio divino della vita.",
        targetText: "— «Сотворение Адама» — произведение искусства, определяющее ренессансный гуманизм. Прикосновение пальцев выражает божественное дыхание жизни."
      },
      {
        id: 'p-rd-15',
        order: 15,
        sourceText: "— Saliremo anche sulla cupola della Basilica di San Pietro per contemplare il panorama a trecentosessanta gradi su tutta la città.",
        targetText: "— Мы также поднимемся на купол собора Святого Петра, чтобы созерцать круговую панораму всего города."
      },
      {
        id: 'p-rd-16',
        order: 16,
        sourceText: "— La vista da lassù, con i pini marittimi e i tetti di terracotta, è un'emozione che rimane scolpita nel cuore per sempre.",
        targetText: "— Вид оттуда, с пиниями и питерными черепичными крышами, — это эмоция, которая остается высеченной в сердце навсегда."
      },
      {
        id: 'p-rd-17',
        order: 17,
        sourceText: "— Roma non è soltanto una città, è uno stato d'animo, una poesia scritta nella pietra e nel marmo.",
        targetText: "— Рим — это не просто город, это состояние души, поэзия, написанная в камне и мраморе."
      },
      {
        id: 'p-rd-18',
        order: 18,
        sourceText: "— Chi ha visto Roma una volta, non potrà mai più dimenticarla.",
        targetText: "— Кто хоть раз увидел Рим, тот никогда больше не сможет его забыть."
      },
      {
        id: 'p-rd-19',
        order: 19,
        sourceText: "— Brindiamo allora alla Città Eterna e all'arte di saper vivere con bellezza e passione!",
        targetText: "— Поднимем же бокалы за Вечный Город и за искусство жить с красотой и страстью!"
      },
      {
        id: 'p-rd-20',
        order: 20,
        sourceText: "— Salute, amica mia ! Che il nostro viaggio a Roma continui a regalarci meraviglie ad ogni passo.",
        targetText: "— За здоровье, друг мой! Пусть наше путешествие по Риму продолжает дарить нам чудеса на каждом шагу."
      }
    ]
  }
];
