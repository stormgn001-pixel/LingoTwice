import { ReadingDocument } from '../types';

export const CLASSICS_PART2: ReadingDocument[] = [
  // 3. ПОРТРЕТ ДОРИАНА ГРЕЯ
  {
    id: 'doc-dorian-gray',
    title: 'Портрет Дориана Грея (В мастерской Бэзила и философическая беседа)',
    titleTranslations: {
      ru: 'Портрет Дориана Грея (В мастерской Бэзила и философическая беседа)',
      uk: 'Портрет Доріана Ґрея (У майстерні Безіла та філософська бесіда)',
      en: 'The Picture of Dorian Gray (In Basil\'s Studio and Philosophical Discourse)',
      de: 'Das Bildnis des Dorian Gray (In Basils Atelier und philosophischer Diskurs)',
      es: 'El retrato de Dorian Gray (En el taller de Basil y discurso filosófico)',
      fr: 'Le Portrait de Dorian Gray (Dans l\'atelier de Basil et discours philosophique)',
      it: 'Il ritratto di Dorian Gray (Nello studio di Basil e discorso philosophico)',
      pl: 'Portret Doriana Graya (W pracowni Basila i dyskurs filozoficzny)',
      tr: 'Dorian Gray\'in Portresi (Basil\'in Atölyesinde ve Felsefi Tartışma)',
      zh: '道林·格雷的画像（在巴兹尔的工作室与哲学探讨）',
    },
    author: 'Оскар Уайльд',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_literature_1792926490325.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 12,
    lastReadAt: Date.now() - 9200000,
    readingProgress: 25,
    wordCount: 802,
    isSample: true,
    passages: [
      {
        id: 'p-dg-1',
        order: 1,
        sourceText: "The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.",
        targetText: "Мастерская была полна густого аромата роз, а когда в саду поднимался легкий летний ветерок, через открытую дверь доносилось тяжелое благоухание сирени или нежное дыхание цветущего розовым боярышника."
      },
      {
        id: 'p-dg-2',
        order: 2,
        sourceText: "From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his wont, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum.",
        targetText: "Из угла дивана, укрытого персидскими чепраками, на котором он лежал, выкуривая по своему обыкновению одну за другой бесчисленные папиросы, лорд Генри Уоттон мог лишь смутно видеть золотистые, медового оттенка гроздья цветущего ракитника."
      },
      {
        id: 'p-dg-3',
        order: 3,
        sourceText: "In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance off, was sitting the artist himself, Basil Hallward.",
        targetText: "Посреди комнаты, на мольберте, стоял портрет необыкновенно красивого юноши во весь рост, а перед ним, чуть поодаль, сидел сам художник, Бэзил Холлуорд."
      },
      {
        id: 'p-dg-4',
        order: 4,
        sourceText: "As the painter looked at the gracious and comely form he had so skilfully mirrored in his art, a smile of pleasure passed across his face, and seemed about to linger there. But he suddenly started up, and closing his eyes, placed his fingers upon the lids.",
        targetText: "Глядя на изящную, прекрасную фигуру, которую он с таким мастерством запечатлел на полотне, художник улыбнулся от удовольствия; улыбка эта, казалось, готова была остаться на его губах. Но вдруг он вздрогнул и, закрыв глаза, прижал пальцы к векам."
      },
      {
        id: 'p-dg-5',
        order: 5,
        sourceText: "»It is your best work, Basil, the best thing you have ever done,« said Lord Henry languidly. »You must certainly send it next year to the Grosvenor. The Academy is too large and too vulgar. Whenever I have gone there, there have been either so many people that I have not been able to see the pictures, which was dreadful, or so many pictures that I have not been able to see the people, which was worse.«",
        targetText: "— Это твоя лучшая работа, Бэзил, лучшее из всего, что ты когда-либо создал, — лениво промолвил лорд Генри. — В будущем году ты непременно должен послать ее в галерею Гровенор. Академия слишком велика и слишком вульгарна. Всякий раз, как я туда прихожу, там либо столько народу, что картин не разглядеть, что ужасно, либо столько картин, что людей не видать, что еще хуже."
      },
      {
        id: 'p-dg-6',
        order: 6,
        sourceText: "»I know you will laugh at me,« Basil replied, »but I really can’t exhibit it. I have put too much of myself into it.« Lord Henry stretched his long legs out on the divan and laughed. »Too much of yourself in it! Upon my word, Basil, I didn’t know you were so vain; and I really can’t see any resemblance between you, with your rugged strong face and your coal-black hair, and this young Adonis.«",
        targetText: "— Знаю, ты будешь смеяться надо мной, — ответил Бэзил, — но я правда не могу ее выставить. Я вложил в нее слишком много самого себя. Лорд Генри вытянул свои длинные ноги на диване и рассмеялся: — Слишком много себя! Честное слово, Бэзил, я и не подозревал, что ты настолько тщеславен; к тому же я не вижу ни малейшего сходства между тобой с твоим суровым лицом и смоляными волосами и этим юным Адонисом."
      },
      {
        id: 'p-dg-7',
        order: 7,
        sourceText: "»You don’t understand me, Harry,« answered the artist. »Of course I know that I am not like him. Indeed, I should be sorry to look like him. Don’t shrug your shoulders. I am telling you the truth. There is a fatality about all physical and intellectual distinction, the sort of fatality that seems to dog through history the faltering steps of kings.«",
        targetText: "— Ты не понимаешь меня, Гарри, — ответил художник. — Разумеется, я знаю, что непохож на него. Более того, мне было бы жаль походить на него. Не дергай плечами. Я говорю тебе правду. Всякое физическое или интеллектуальное превосходство таит в себе фатальность — ту самую фатальность, что на протяжении истории сопутствует неверным шагам королей."
      },
      {
        id: 'p-dg-8',
        order: 8,
        sourceText: "»It is better not to be different from one’s fellows. The ugly and the stupid have the best of it in this world. They can sit at their ease and gape at the play. If they know nothing of victory, they are at least spared the knowledge of defeat. They live as we all should live—untroubled, indifferent, and without disquiet.«",
        targetText: "— Лучше не выделяться среди себе подобных. Уродливые и глупые устроились в этом мире лучше всех. Они могут спокойно сидеть и зевать на спектакль. Если им неизвестна радость побед, то они избавлены и от горечи поражений. Они живут так, как следовало бы жить всем нам — без тревог, безмятежно и без душевного смятения."
      },
      {
        id: 'p-dg-9',
        order: 9,
        sourceText: "»They neither bring ruin upon others, nor ever receive it from alien hands. Your rank and wealth, Harry; my brains, such as they are—my art, whatever it may be worth; Dorian Gray’s good looks—we shall all suffer for what the gods have given us, suffer terribly.«",
        targetText: "— Они не несут гибели другим и сами не гибнут от чужих рук. Твоя знатность и богатство, Гарри; мой ум, каков бы он ни был, и мое искусство; красота Дориана Грея — все мы пострадаем за то, чем наградили нас боги, пострадаем жестоко."
      },
      {
        id: 'p-dg-10',
        order: 10,
        sourceText: "»Dorian Gray? Is that his name?« asked Lord Henry, walking across the studio towards Basil Hallward. »Yes, that is his name. I didn’t intend to tell it to you.« »But why not?« »Oh, I can’t explain. When I like people immensely, I never tell their names to any one. It is like surrendering a part of them. I have grown to love secrecy.«",
        targetText: "— Дориан Грей? Так его зовут? — спросил лорд Генри, шагая через мастерскую к Бэзилу Холлуорду. — Да, это его имя. Я не собирался называть его тебе. — Но почему? — О, я не могу объяснить. Когда мне кто-то бесконечно дорог, я никогда никому не называю его имени. Это всё равно что отдать часть его самого. Я полюбил секреты."
      },
      {
        id: 'p-dg-11',
        order: 11,
        sourceText: "»It seems to be the one thing that can make modern life mysterious or marvellous to us. The commonest thing is delightful if one only hides it. When I leave town now I never tell my people where I am going. If I did, I would lose all my pleasure.«",
        targetText: "— Кажется, это единственное, что еще может сделать современную жизнь таинственной или чудесной для нас. Самая обыкновенная вещь становится пленительной, стоит лишь скрыть ее. Когда я уезжаю из города, я никому не говорю, куда направляюсь. Если бы я сказал, я потерял бы всё удовольствие."
      },
      {
        id: 'p-dg-12',
        order: 12,
        sourceText: "»It is a silly habit, I dare say, but somehow it seems to bring a great deal of romance into one’s life. I suppose you think me terribly foolish?« »Not at all,« answered Lord Henry, »not at all, my dear Basil. You seem to forget that I am married, and the one charm of marriage is that it makes a life of deception absolutely necessary for both parties.«",
        targetText: "— Это глупая привычка, признаю, но каким-то образом она приносит много романтики в жизнь. Полагаю, ты считаешь меня ужасным глупцом? — Вовсе нет, — ответил лорд Генри, — вовсе нет, мой дорогой Бэзил. Ты, кажется, забываешь, что я женат, а единственная прелесть брака состоит в том, что он делает жизнь, полную хитростей, совершенно необходимой для обеих сторон."
      },
      {
        id: 'p-dg-13',
        order: 13,
        sourceText: "»I never know where my wife is, and my wife never knows what I am doing. When we meet—we do meet occasionally, when we dine out together, or go down to the Duke’s—we tell each other the most absurd stories with the most serious faces.«",
        targetText: "— Я никогда не знаю, где моя жена, а моя жена никогда не знает, чем я занят. Когда мы встречаемся — а мы иногда встречаемся, за обедом в ресторане или в поместье у герцога, — мы рассказываем друг другу самые нелепые истории с самыми серьезными лицами."
      },
      {
        id: 'p-dg-14',
        order: 14,
        sourceText: "»My wife is very clever at it—much cleverer than I am. She never gets confused over her dates, and I always do. But when she does find me out, she makes no row. I sometimes wish she would; but she merely laughs at me.«",
        targetText: "— Моя жена в этом очень искусна — куда искуснее меня. Она никогда не путается в датах, а я путаюсь всегда. Но даже когда она улучает меня во лжи, она не устраивает сцен. Иногда мне хочется, чтобы устроила, но она лишь смеется надо мной."
      },
      {
        id: 'p-dg-15',
        order: 15,
        sourceText: "»I believe that you are a very good husband, Harry, but that you are thoroughly ashamed of your own virtues. You are an extraordinary fellow. You never say a moral thing, and you never do a wrong thing. Your cynicism is simply a pose.«",
        targetText: "— Я верю, что ты очень хороший муж, Гарри, но ты стыдишься собственных добродетелей. Ты удивительный человек. Ты никогда не говоришь ничего нравственного и никогда не делаешь ничего дурного. Твой цинизм — это просто поза."
      }
    ]
  },

  // 4. ШЕРЛОК ХОЛМС - СКАНДАЛ В БОГЕМИИ
  {
    id: 'doc-sherlock-holmes',
    title: 'Скандал в Богемии (Начало великого расследования и Ирен Адлер)',
    titleTranslations: {
      ru: 'Скандал в Богемии (Начало великого расследования и Ирен Адлер)',
      uk: 'Скандал у Богемії (Початок великого розслідування та Ірен Адлер)',
      en: 'A Scandal in Bohemia (Beginning of Great Investigation & Irene Adler)',
      de: 'Ein Skandal in Böhmen (Beginn der großen Ermittlung & Irene Adler)',
      es: 'Escándalo en Bohemia (El comienzo de la gran investigación e Irene Adler)',
      fr: 'Un scandale en Bohême (Le début de la grande enquête et Irene Adler)',
      it: 'Uno scandalo in Boemia (L\'inizio della grande indagine e Irene Adler)',
      pl: 'Skandal w Bohemii (Początek wielkiego śledztwa i Irene Adler)',
      tr: 'Bohemya\'da Skandal (Büyük Soruşturmanın Başlangıcı ve Irene Adler)',
      zh: '波希米亚丑闻（大案调查的开始与艾琳·艾德勒）',
    },
    author: 'Артур Конан Дойл',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/reading_desk_atmosphere_1792926490580.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 10,
    lastReadAt: Date.now() - 14400000,
    readingProgress: 10,
    wordCount: 662,
    isSample: true,
    passages: [
      {
        id: 'p-sh-1',
        order: 1,
        sourceText: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.",
        targetText: "Для Шерлока Холмса она всегда остаётся «Этой Женщиной». Я редко слышал, чтобы он называл её иначе. В его глазах она затмевает всех представительниц своего пола."
      },
      {
        id: 'p-sh-2',
        order: 2,
        sourceText: "It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind.",
        targetText: "Не то чтобы он испытывал к Ирен Адлер чувство, похожее на любовь. Любые эмоции, и эта в особенности, были чужды его холодному, точному и восхитительно уравновешенному уму."
      },
      {
        id: 'p-sh-3',
        order: 3,
        sourceText: "He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer.",
        targetText: "Он был, пожалуй, самой совершенной мыслящей и наблюдающей машиной в мире; но в роли влюблённого он оказался бы в совершенно нелепом положении. О нежных чувствах он всегда говорил не иначе как с иронией и насмешкой."
      },
      {
        id: 'p-sh-4',
        order: 4,
        sourceText: "They were admirable things for the observer—excellent for drawing the veil from men’s motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results.",
        targetText: "Чувства были прекрасным предметом для наблюдателя — превосходным средством снимать покров с человеческих мотивов и поступков. Но допустить подобные эмоции в собственный утонченный разум означало внести сбивающий фактор, который мог поставить под сомнение все его выводы."
      },
      {
        id: 'p-sh-5',
        order: 5,
        sourceText: "Grit in a sensitive instrument, or a crack in one of his own high-power lenses, would not be more disturbing than a strong emotion in a nature such as his. And yet there was but one woman to him, and that woman was the late Irene Adler, of dubious and questionable memory.",
        targetText: "Песчинка в чувствительном приборе или трещина в сильной линзе создали бы не больше помех, чем сильная страсть в такой натуре, как его. И все же для него существовала лишь одна женщина, и этой женщиной была покойная Ирен Адлер, оставившая по себе смутную и двойственную память."
      },
      {
        id: 'p-sh-6',
        order: 6,
        sourceText: "I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention.",
        targetText: "В последнее время я редко виделся с Холмсом. Моя женитьба отдалила нас друг от друга. Мое собственное полное счастье и домашние заботы, возникающие у человека, впервые сделавшегося хозяином собственного дома, целиком поглощали всё мое внимание."
      },
      {
        id: 'p-sh-7',
        order: 7,
        sourceText: "Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature.",
        targetText: "Холмс же, всей своей цыганской душой ненавидевший любые формы светского общества, оставался в нашей квартире на Бейкер-стрит, зарывшись в свои старые книги и неделями чередуя кокаин с честолюбием, дремоту наркотика с бешаной энергией своей пылкой натуры."
      },
      {
        id: 'p-sh-8',
        order: 8,
        sourceText: "He was still, as ever, deeply attracted by the study of crime, and occupied his immense faculties and extraordinary powers of observation in following out those clues, and clearing up those mysteries which had been abandoned as hopeless by the official police.",
        targetText: "Его по-прежнему глубоко привлекало исследование преступлений, и он отдавал свои огромные способности и необычайную наблюдательность разгадыванию тех тайн, которые официальная полиция признала безнадежными."
      },
      {
        id: 'p-sh-9',
        order: 9,
        sourceText: "From time to time I heard some vague account of his doings: of his summons to Odessa in the case of the Trepoff murder, of his clearing up of the singular tragedy of the Atkinson brothers at Trincomalee, and finally of the mission which he had accomplished so delicately and successfully for the reigning family of Holland.",
        targetText: "Время от времени до меня доходили смутные известия о его делах: о его вызове в Одессу по делу об убийстве Трепова, о распутывании им странной трагедии братьев Аткинсон в Тринкомали и, наконец, о поручении, которое он так изящно и успешно выполнил для королевского дома Голландии."
      },
      {
        id: 'p-sh-10',
        order: 10,
        sourceText: "Beyond these signs of his activity, however, which I merely shared with all the readers of the daily press, I knew little of my former friend and companion. One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient, for I had now returned to civil practice.",
        targetText: "Однако помимо этих знаков его активности, о которых я лишь узнавал вместе со всеми читателями ежедневных газет, я мало что знал о своем прежнем друге и соратнике. Однажды вечером — это было двадцатого марта 1888 года — я возвращался от пациента, ибо снова вернулся к частной врачебной практике."
      },
      {
        id: 'p-sh-11',
        order: 11,
        sourceText: "My way led me through Baker Street. As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers.",
        targetText: "Мой путь лежал через Бейкер-стрит. Проходя мимо хорошо знакомой двери, которая в моем сознании всегда будет ассоциироваться с моим сватовством и мрачными событиями «Этюда в багровых тонах», я почувствовал страстное желание снова увидеть Холмса и узнать, чем занят его замечательный ум."
      },
      {
        id: 'p-sh-12',
        order: 12,
        sourceText: "His rooms were brilliantly lit, and, even as I looked up, I saw his tall, spare figure pass twice in a dark silhouette against the blind. He was pacing the room swiftly, eagerly, with his head sunk upon his chest and his hands clasped behind him.",
        targetText: "Его окна были ярко освещены, и, подняв глаза, я увидел, как его высокая, тощая фигура дважды прошла темным силуэтом на фоне шторы. Он стремительно, с пылом шагал по комнате, опустив голову на грудь и сцепив руки за спиной."
      },
      {
        id: 'p-sh-13',
        order: 13,
        sourceText: "To me, who knew his every mood and habit, his attitude and manner told their own story. He was at work again. He had risen out of his drug-created dreams and was hot upon the scent of some new problem. I rang the bell and was shown up to the chamber which had formerly been in part my own.",
        targetText: "Мне, знавшему все его настроения и привычки, его осанка и движения поведали о многом. Он снова был за работой! Он вырвался из своих дурманящих грез и шел по горячему следу новой загадки. Я позвонил в звонок, и меня провели в комнату, которая прежде отчасти принадлежала и мне."
      },
      {
        id: 'p-sh-14',
        order: 14,
        sourceText: "His manner was not effusive. It seldom was; but he was glad, I think, to see me. With hardly a word spoken, but with a kindly eye, he waved me to an armchair, threw across his case of cigars, and indicated a spirit case and a gasogene in the corner.",
        targetText: "Он не выражал свои чувства бурно — это вообще было ему не свойственно; но, думаю, он был рад меня видеть. Почти не обмолвившись словом, но с теплой искрой в глазах, он указал мне на кресло, подвинул портсигар с сигарами и кивнул на графин с коньяком и сифон с газировкой в углу."
      }
    ]
  },

  // 5. МАРК АВРЕЛИЙ - НАЕДИНЕ С СОБОЙ
  {
    id: 'doc-marcus-aurelius-meditations',
    title: 'Наедине с собой. Размышления (Книги II и III: Разум, долг и внутренний покой)',
    titleTranslations: {
      ru: 'Наедине с собой. Размышления (Книги II и III: Разум, долг и внутренний покой)',
      uk: 'Наодинці з собою. Роздуми (Книги II і III: Розум, обов\'язок і внутрішній спокій)',
      en: 'Meditations (Books II & III: Reason, Duty, and Inner Peace)',
      de: 'Selbstbetrachtungen (Bücher II & III: Vernunft, Pflicht und innere Ruhe)',
      es: 'Meditaciones (Libros II y III: Razón, deber y paz interior)',
      fr: 'Pensées pour moi-même (Livres II & III : Raison, devoir et paix intérieure)',
      it: 'Pensieri (Libri II e III: Ragione, dovere e pace interiore)',
      pl: 'Rozmyślania (Księgi II i III: Rozum, obowiązek i wewnętrzny spokój)',
      tr: 'Düşünceler (II & III. Kitaplar: Akıl, Ödev ve İç Huzur)',
      zh: '沉思录（第二与第三卷：理性、责任与内心平静）',
    },
    author: 'Марк Аврелий Антонин',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_literature_1792926490325.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 1,
    lastReadAt: Date.now() - 1000000,
    readingProgress: 12,
    wordCount: 403,
    isSample: true,
    passages: [
      {
        id: 'p-ma-1',
        order: 1,
        sourceText: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil.",
        targetText: "Просыпаясь утром, скажи себе: люди, с которыми я столкнусь сегодня, будут назойливы, неблагодарны, высокомерны, лживы, завистливы и угрюмы. Они таковы потому, что не умеют отличать добро от зла."
      },
      {
        id: 'p-ma-2',
        order: 2,
        sourceText: "But I have seen the beauty of good, and the ugliness of evil, and I have recognized that the wrongdoer has a nature related to my own — not of the same blood or birth, but the same mind, and possessing a share of the divine.",
        targetText: "Но я усмотрел красоту добра и уродство зла и понял, что поступающий неправедно близок мне по природе — не по крови или рождению, но обладая разумным началом и частицей божественного."
      },
      {
        id: 'p-ma-3',
        order: 3,
        sourceText: "And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were born to work together like feet, hands, and the eyes, like the rows of the upper and lower teeth.",
        targetText: "И потому никто из них не может причинить мне вреда и вовлечь меня в уродство. Я не могу гневаться на ближнего своего или ненавидеть его. Мы сотворены для совместной работы, как ноги, руки, глаза, как ряды верхних и нижних зубов."
      },
      {
        id: 'p-ma-4',
        order: 4,
        sourceText: "Whatever this is that I am, it is a little flesh and breath, and the ruling part. Ignore the rest. As for your flesh, view it as if you were already dying: it is merely blood and bones and a network of nerves, veins and arteries.",
        targetText: "Что бы я из себя ни представлял — это лишь немного плоти, дыхание и руководящее начало. Пренебреги остальным. Относись к плоти так, словно ты уже умираешь: это всего лишь кровь, кости и сплетение нервов и сосудов."
      },
      {
        id: 'p-ma-5',
        order: 5,
        sourceText: "Consider your mind: Remember how long you have put off these things, and how often you have received an opportunity from the gods and failed to use it. You must now at last perceive what kind of universe you are a part of.",
        targetText: "Поразмысли о своем разуме: помни, как долго ты откладывал эти вещи и сколь часто получал от богов возможность, но не воспользовался ею. Ты должен наконец осознать, частью какой Вселенной ты являешься."
      },
      {
        id: 'p-ma-6',
        order: 6,
        sourceText: "There is a limit to the time assigned to you, and if you do not use it to free your mind, it will be gone and never return. Every moment focus your mind attentively, like a Roman and a human, on performing the task at hand with precise dignity.",
        targetText: "Существует предел отведенному тебе времени, и если ты не употребишь его для освобождения разума, оно уйдет и никогда не вернется. Каждое мгновение сосредоточивай свой ум с вниманием, достойным римлянина и человека, на исполнении текущего дела с точностью и достоинством."
      },
      {
        id: 'p-ma-7',
        order: 7,
        sourceText: "Do not waste the remainder of your life in thoughts about others, when you do not refer your thoughts to some object of common utility. For you lose the opportunity of doing something else when you ask: What is so-and-so doing, and why, and what is he saying?",
        targetText: "Не трать остаток жизни в мыслях о других, если только это не направлено на общую пользу. Ибо ты теряешь возможность сделать нечто стоящее, пытаясь разгадать: что делает такой-то, и почему, и что он говорит?"
      },
      {
        id: 'p-ma-8',
        order: 8,
        sourceText: "Observe what your nature requires, so far as you are governed by nature only; then do it and accept it, if your nature, so far as you are an animal, shall not be made worse by it. Then you must observe what your nature requires, so far as you are a rational being.",
        targetText: "Наблюдай за тем, чего требует твоя природа, поскольку ты управляем лишь природой; затем исполняй это и принимай, если только твоя животная природа от этого не ухудшится. А затем соблюдай то, чего требует твоя природа как разумного существа."
      },
      {
        id: 'p-ma-9',
        order: 9,
        sourceText: "And the condition of a rational being is superadded to the condition of a social being. Use these rules then, and trouble yourself about nothing else. That which is guided by nature can never suffer harm.",
        targetText: "Причем свойство разумного существа неизменно сочетается со свойством существа общественного. Пользуйся этими правилами и ни о чем более не беспокойся. То, что направляемо природой, никогда не потерпит вреда."
      }
    ]
  },

  // 6. СЕНЕКА - НРАВСТВЕННЫЕ ПИСЬМА К ЛУЦИЛИЮ
  {
    id: 'doc-seneca-letters',
    title: 'Нравственные письма к Луцилию (Письма I, III, VII: Время, Дружба, Толпа)',
    titleTranslations: {
      ru: 'Нравственные письма к Луцилию (Письма I, III, VII: Время, Дружба, Толпа)',
      uk: 'Моральні листи до Луцілія (Листи I, III, VII: Час, Дружба, Натовп)',
      en: 'Moral Letters to Lucilius (Letters I, III, VII: Time, Friendship, Crowd)',
      de: 'Briefe an Lucilius (Briefe I, III, VII: Zeit, Freundschaft, Menge)',
      es: 'Cartas a Lucilio (Cartas I, III, VII: Tiempo, Amistad, Multitud)',
      fr: 'Lettres à Lucilius (Lettres I, III, VII : Temps, Amitié, Foule)',
      it: 'Lettere a Lucilio (Lettere I, III, VII: Tempo, Amicizia, Folla)',
      pl: 'Listy moralne do Lucyliusza (Listy I, III, VII: Czas, Przyjaźń, Tłum)',
      tr: 'Lucilius\'a Mektuplar (Mektup I, III, VII: Zaman, Dostluk, Kalabalık)',
      zh: '道德书简（第一、三、七封信：时间、友谊与人群）',
    },
    author: 'Луций Анней Сенека',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/reading_desk_atmosphere_1792926490580.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 2,
    lastReadAt: Date.now() - 2000000,
    readingProgress: 20,
    wordCount: 329,
    isSample: true,
    passages: [
      {
        id: 'p-sen-1',
        order: 1,
        sourceText: "Greetings from Seneca to Lucilius! Continue to act thus, my dear Lucilius: set yourself free for your own sake. Gather and save your time, which till lately has been forced from you, or stolen of you, or has slipped away.",
        targetText: "Сенека приветствует Луцилия! Поступай так, мой дорогой Луцилий: отвоюй себя для самого себя. Береги и копи время, которое прежде у тебя отнимали, крали или которое утекало само собой."
      },
      {
        id: 'p-sen-2',
        order: 2,
        sourceText: "Convince yourself that what I write is true: certain hours are snatched from us, some are gently stolen, and some slide away unnoticed. Yet the most disgraceful loss is that which occurs through carelessness.",
        targetText: "Убедись сам в правде моих слов: часть времени у нас отбирают силой, часть умыкают схитрив, а часть уплывает незаметно. Но постыднее всего потеря, происходящая от нашей собственной беспечности."
      },
      {
        id: 'p-sen-3',
        order: 3,
        sourceText: "What man can you show me who places a real value on time, who estimates the worth of a day, who understands that he is dying daily? For we are mistaken when we look forward to death; the major part of death has already passed.",
        targetText: "Назовешь ли ты мне человека, который ценит время, знает цену дню и понимает, что умирает ежедневно? Ведь мы ошибаемся, глядя на смерть как на будущее: большая часть смерти уже позади."
      },
      {
        id: 'p-sen-4',
        order: 4,
        sourceText: "Whatever years lie behind us belong to death. Therefore, my Lucilius, do what you write me you are doing: hold every hour in your grasp. Lay hold of to-day’s task, and you will not need to depend so much upon to-morrow's.",
        targetText: "Все годы, оставшиеся за нами, принадлежат смерти. Поэтому, мой Луцилий, делай то, о чем пишешь: удерживай каждый час. Возьмись за сегодняшнее дело, и тебе не придется так сильно зависеть от завтрашнего."
      },
      {
        id: 'p-sen-5',
        order: 5,
        sourceText: "On Friendship: You write that you have entrusted your letters to a friend, but later advise me not to share everything with him because you yourself are not accustomed to do so. In the same breath you call him friend and deny him trust.",
        targetText: "О дружбе: Ты пишешь, что доверил письма другу, но затем советуешь мне не делиться с ним всем, ибо сам не привык так делать. В одном выражении ты называешь его другом и отказываешь ему в доверии."
      },
      {
        id: 'p-sen-6',
        order: 6,
        sourceText: "When friendship is settled, trust must be absolute. Deliberate long before adopting a friend, but when you have decided, welcome him with heart and soul. Speak with him as boldly as with yourself.",
        targetText: "Когда дружба заключена, доверие должно быть полным. Долго размышляй, прежде чем обрести друга, но когда решение принято, ответь ему всем сердцем и душой. Говори с ним так же смело, как с самим собой."
      },
      {
        id: 'p-sen-7',
        order: 7,
        sourceText: "On Crowds: Do you ask what you should avoid above all else? A crowd! You cannot yet safely entrust yourself to it. I shall confess my own weakness: I never bring home the same character that I took out with me.",
        targetText: "О толпе: Спрашиваешь, чего тебе следует избегать пуще всего? Толпы! Ты еще не можешь безопасно доверить себя ей. Признаюсь в собственной слабости: я никогда не возвращаюсь домой с тем же характером, с каким вышел из него."
      },
      {
        id: 'p-sen-8',
        order: 8,
        sourceText: "Something of that which I have settled is disturbed; some of the evils that I have routed return. As with a sick man who has been so long weakened that he cannot be brought out without a relapse, so it happens to us whose minds are recovering from a long illness.",
        targetText: "Кое-что из того, что я упорядочил, снова нарушается; некоторые из зол, которые я прогнал, возвращаются. Как больной, ослабленный долгой недугом, не может выйти без риска рецидива, так происходит и с нами, чей ум лишь выздоравливает от долгой болезни."
      }
    ]
  }
];
