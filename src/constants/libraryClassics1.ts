import { ReadingDocument } from '../types';

export const CLASSICS_PART1: ReadingDocument[] = [
  // 1. МАЛЕНЬКИЙ ПРИНЦ
  {
    id: 'doc-little-prince',
    title: 'Маленький принц (Полное собрание ключевых глав)',
    titleTranslations: {
      ru: 'Маленький принц (Полное собрание ключевых глав)',
      uk: 'Маленький принц (Повне зібрання ключових розділів)',
      en: 'The Little Prince (Complete Collection of Key Chapters)',
      de: 'Der kleine Prinz (Vollständige Sammlung der Schlüsselkapitel)',
      es: 'El Principito (Colección completa de capítulos clave)',
      fr: 'Le Petit Prince (Collection complète des chapitres clés)',
      it: 'Il Piccolo Principe (Collezione completa dei capitoli chiave)',
      pl: 'Mały Książę (Pełny zbiór kluczowych rozdziałów)',
      tr: 'Küçük Prens (Ana Bölümlerin Tam Koleksiyonu)',
      zh: '小王子（核心章节完整精选）',
    },
    author: 'Антуан де Сент-Экзюпери',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_literature_1792926490325.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 15,
    lastReadAt: Date.now() - 3600000,
    readingProgress: 45,
    wordCount: 1147,
    isSample: true,
    passages: [
      {
        id: 'p-lp-1',
        order: 1,
        sourceText: "Lorsque j'avais six ans j'ai vu, une fois, une magnifique image, dans un livre sur la Forêt Vierge qui s'appelait « Histoires Vécues ». Ça représentait un serpent boa qui avalait un fauve. On disait dans le livre : « Les serpents boas avalent leur proie tout entière, sans la mâcher. Ensuite ils ne peuvent plus bouger et ils dorment pendant les six mois de leur digestion. »",
        targetText: "Когда мне было шесть лет, в книге под названием «Правдивые истории», где рассказывалось о девственных лесах, я увидел однажды замечательную картинку. На ней был изображен удав, проглатывающий хищного зверя. В книге говорилось: «Удавы заглатывают свою добычу целиком, не жуя. После этого они не могут повернуться и спят полгода подряд, пока не переварят пищу»."
      },
      {
        id: 'p-lp-2',
        order: 2,
        sourceText: "J'ai alors beaucoup réfléchi sur les aventures de la jungle et, à mon tour, j'ai réussi, avec un crayon de couleur, à tracer mon premier dessin. Mon dessin numéro 1. Il était comme ça : j'ai montré mon chef-d'œuvre aux grandes personnes et je leur ai demandé si mon dessin leur faisait peur.",
        targetText: "Я много раздумывал о полной приключений жизни джунглей и нарисовал цветным карандашом свой первый рисунок. Мой рисунок № 1. На нем было изображено следующее: я показал мое произведение взрослым и спросил, не страшно ли им смотреть на этот рисунок."
      },
      {
        id: 'p-lp-3',
        order: 3,
        sourceText: "Elles m'ont répondu : « Pourquoi un chapeau ferait-il peur ? » Mon dessin ne représentait pas un chapeau. Il représentait un serpent boa qui digérait un éléphant. J'ai alors dessiné l'intérieur du serpent boa, afin que les grandes personnes puissent comprendre. Elles ont toujours besoin d'explications.",
        targetText: "Они ответили: «Почему шляпа должна наводить страх?» Но мой рисунок изображал вовсе не шляпу. Это был удав, переваривавший слона. Тогда я нарисовал удава изнутри, чтобы взрослым было понятно. Им ведь всегда всё нужно объяснять."
      },
      {
        id: 'p-lp-4',
        order: 4,
        sourceText: "Les grandes personnes m'ont conseillé de laisser de côté les dessins de serpents boas ouverts ou fermés, et de m'intéresser plutôt à la géographie, à l'histoire, au calcul et à la grammaire. C'est ainsi que j'ai abandonné, à l'âge de six ans, une magnifique carrière de peintre.",
        targetText: "Взрослые посоветовали мне отложить в сторону рисунки удавов — как снаружи, так и изнутри — и побольше интересоваться географией, историей, арифметикой и грамматикой. Так в возрасте шести лет я отказался от блестящей карьеры художника."
      },
      {
        id: 'p-lp-5',
        order: 5,
        sourceText: "J'avais été découragé par l'insuccès de mon dessin numéro 1 et de mon dessin numéro 2. Les grandes personnes ne comprennent jamais rien toutes seules, et c'est fatigant, pour les enfants, de toujours et toujours leur donner des explications.",
        targetText: "Я был разочарован неудачей моего рисунка № 1 и рисунка № 2. Взрослые никогда ничего не понимают сами, а для детей это настоящая мука — без конца им всё разжевывать и объяснять."
      },
      {
        id: 'p-lp-6',
        order: 6,
        sourceText: "J'ai donc dû choisir un autre métier et j'ai appris à piloter des avions. J'ai volé un peu partout dans le monde. Et la géographie, c'est exact, m'a beaucoup servi. Je suais reconnaître, du premier coup d'œil, la Chine de l'Arizona. C'est très utile, si l'on est égaré pendant la nuit.",
        targetText: "И мне пришлось выбрать другую профессию: я выучился на летчика. Я летал по всему свету. И география, это правда, очень мне пригодилась. Я мог с первого взгляда отличить Китай от Аризоны. Это чрезвычайно полезно, если сбился с пути в ночной темноте."
      },
      {
        id: 'p-lp-7',
        order: 7,
        sourceText: "J'ai ainsi eu, au cours de ma vie, des tas de contacts avec des tas de gens sérieux. J'ai beaucoup vécu chez les grandes personnes. Je les ai vues de très près. Ça n'a pas trop amélioré mon opinion.",
        targetText: "Так за свою жизнь я встречался с множеством всяких серьезных людей. Я долго жил среди взрослых. Я видела их совсем близко. И это не слишком улучшило мое мнение о них."
      },
      {
        id: 'p-lp-8',
        order: 8,
        sourceText: "Quand j'en rencontrais une qui me paraissait un peu lucide, je faisais l'expérience sur elle de mon dessin numéro 1 que j'ai toujours conservé. Je voulais savoir si elle était vraiment compréhensive. Mais toujours elle me répondait : « C'est un chapeau. »",
        targetText: "Когда я встречал взрослого, который казался мне чуть поразумнее остальных, я устраивал ему проверку с помощью моего рисунка № 1, который всегда носил с собой. Я хотел знать, действительно ли он понимает суть. Но каждый из них отвечать мне: «Это шляпа»."
      },
      {
        id: 'p-lp-9',
        order: 9,
        sourceText: "Alors je ne lui parlais ni de serpents boas, ni de forêts vierges, ni d'étoiles. Je me mettais à sa portée. Je lui parlais de bridge, de golf, de politique et de cravates. Et la grande personne était bien contente de connaître un homme aussi raisonnable.",
        targetText: "Тогда я больше не заговаривал с ним ни об удавах, ни о девственных лесах, ни о звездах. Я опускался до его уровня. Я говорил с ним о бридже, гольфе, политике и галстуках. И взрослый оставался очень доволен тем, что познакомился с таким благоразумным человеком."
      },
      {
        id: 'p-lp-10',
        order: 10,
        sourceText: "J'ai ainsi vécu seul, sans personne avec qui parler véritablement, jusqu'à une panne dans le désert du Sahara, il y a six ans. Quelque chose s'était cassé dans mon moteur. Et comme je n'avais avec moi ni mécanicien, ni passagers, je me préparai à réussir, tout seul, une réparation difficile.",
        targetText: "Так я жил в одиночестве, и не с кем мне было поговорить по душам, пока шесть лет назад не произошла авария в пустыне Сахара. Что-то сломалось в моем моторе. И поскольку со мной не было ни механика, ни пассажиров, я приготовился один, своими силами, сделать трудный ремонт."
      },
      {
        id: 'p-lp-11',
        order: 11,
        sourceText: "C'était pour moi une question de vie ou de mort. J'avais à peine de l'eau à boire pour huit jours. Le premier soir je me suis donc endormi sur le sable à mille milles de toute terre habitée. J'étais bien plus isolé qu'un naufragé sur un râteau au milieu de l'océan.",
        targetText: "Для меня это был вопрос жизни и смерти. Питьевой воды у меня едва хватало на восемь дней. В первый вечер я уснул на песке в тысяче миль от любой обитаемой земли. Я был гораздо более одинок, чем потерпевший крушение на плоту посреди океана."
      },
      {
        id: 'p-lp-12',
        order: 12,
        sourceText: "Alors vous imaginez ma surprise, au lever du jour, quand une drôle de petite voix m'a réveillé. Elle disait : — S'il vous plaît... dessine-moi un mouton ! — Hein ! — Dessine-moi un mouton...",
        targetText: "Представьте же мое удивление, когда на рассвете меня разбудил странный тоненький голосок. Он произнес: — Пожалуйста... нарисуй мне барашка! — Что?! — Нарисуй мне барашка..."
      },
      {
        id: 'p-lp-13',
        order: 13,
        sourceText: "J'ai sauté sur mes pieds comme si j'avais été frappé par la foudre. J'ai bien frotté mes yeux. J'ai bien regardé. Et j'ai vu un petit personnage tout à fait extraordinaire qui me considérait gravement. C'est alors qu'apparut le renard.",
        targetText: "Я подскочил на ноги, словно надо мной грянул гром. Протер глаза. Внимательно осмотрелся. И увидел необыкновенного маленького человечка, который серьезно разглядывал меня."
      },
      {
        id: 'p-lp-14',
        order: 14,
        sourceText: "— Bonjour, dit le renard. — Bonjour, répondit poliment le petit prince, qui se retourna mais ne vit rien. — Je suis là, dit la voix, sous le pommier. — Qui es-tu ? dit le petit prince. Tu es bien joli... — Je suis un renard, dit le renard.",
        targetText: "— Здравствуй, — сказал Лис. — Здравствуй, — вежливо ответил Маленький принц и оглянулся, но никого не увидел. — Я здесь, — раздался голос, — под яблоней. — Кто ты? — спросил Маленький принц. — Ты такой хорошенький... — Я Лис, — сказал Лис."
      },
      {
        id: 'p-lp-15',
        order: 15,
        sourceText: "— Viens jouer avec moi, lui proposa le petit prince. Je suis tellement triste... — Je ne puis pas jouer avec toi, dit le renard. Je ne suis pas apprivoisé. — Ah ! pardon, fit le petit prince. Mais, après réflexion, il ajouta : — Qu'est-ce que signifie « apprivoiser » ?",
        targetText: "— Поиграй со мной, — попросил Маленький принц. — Мне так грустно... — Не могу я с тобой играть, — ответил Лис. — Я не приручен. — Ах, извини, — молвил Маленький принц. Но, подумав, спросил: — А что значит «приручить»?"
      },
      {
        id: 'p-lp-16',
        order: 16,
        sourceText: "— C'est une chose trop oubliée, dit le renard. Ça signifie « créer des liens... ». — Créer des liens ? — Bien sûr, dit le renard. Tu n'es encore pour moi qu'un petit garçon tout semblable à cent mille petits garçons. Et je n'ai pas besoin de toi. Et tu n'as pas besoin de moi non plus.",
        targetText: "— Это давно забытое понятие, — объяснил Лис. — Оно означает «создавать узы...». — Создавать узы? — Вот именно, — сказал Лис. — Ты для меня пока всего лишь маленький мальчик, точно такой же, как сто тысяч других мальчиков. И ты мне не нужен. И я тебе тоже не нужен."
      },
      {
        id: 'p-lp-17',
        order: 17,
        sourceText: "— Mais si tu m'apprivoises, nous aurons besoin l'un de l'autre. Tu seras pour moi unique au monde. Je serai pour toi unique au monde. Je commence à comprendre, dit le petit prince. Il y a une fleur... je crois qu'elle m'a apprivoisé.",
        targetText: "— Но если ты меня приручишь, мы станем нужны друг другу. Ты будешь для меня единственный на целом свете. И я буду для тебя один на целом свете. — Я начинаю понимать, — сказал Маленький принц. — Есть одна роза... кажется, она меня приручила."
      },
      {
        id: 'p-lp-18',
        order: 18,
        sourceText: "— On ne connaît que les choses que l'on apprivoise, dit le renard. Les hommes n'ont plus le temps de rien connaître. Ils achètent des choses toutes faites chez les marchands. Mais comme il n'existe point de marchands d'amis, les hommes n'ont plus d'amis. Si tu veux un ami, apprivoise-moi !",
        targetText: "— Узнать можно только те вещи, которые приручишь, — сказал Лис. — У людей уже не хватает времени ничего узнавать. Они покупают готовые вещи в магазинах. Но поскольку нет таких торговцев, что продавали бы друзей, у людей больше нет друзей. Если хочешь, чтобы у тебя был друг, приручи меня!"
      },
      {
        id: 'p-lp-19',
        order: 19,
        sourceText: "— Que faut-il faire ? dit le petit prince. — Il faut être très patient, répondit le renard. Tu t'assoiras d'abord un peu loin de moi, comme ça, dans l'herbe. Je te regarderai du coin de l'œil et tu ne diras rien. Le langage est source de malentendus. Mais, chaque jour, tu pourras t'asseoir un peu plus près...",
        targetText: "— А что для этого надо делать? — спросил Маленький принц. — Надо запастись терпением, — ответил Лис. — Сначала сядь вон там, поодаль от меня, на траву. Я буду искоса поглядывать на тебя, а ты молчи. Слова только мешают понимать друг друга. Но с каждым днем ты сможешь садиться немного ближе..."
      },
      {
        id: 'p-lp-20',
        order: 20,
        sourceText: "Ainsi le petit prince apprivoisa le renard. Et quand l'heure du départ fut proche : — Ah ! dit le renard... Je pleurerai. — C'est ta faute, dit le petit prince, je ne te souhaitais point de mal, mais tu as voulu que je t'apprivoise... — Bien sûr, dit le renard. — Alors tu n'y gagnes rien ! — J'y gagne, dit le renard, à cause de la couleur du blé.",
        targetText: "Так Маленький принц приручил Лиса. И вот пробил час расставания: — Аx! — молвил Лис. — Я буду плакать. — Ты сам виноват, — сказал Маленький принц. — Я ведь не желал тебе зла, ты сам захотел, чтобы я тебя приручил... — Да, конечно, — подтвердил Лис. — Значит, тебе от этого никакой пользы! — Нет, есть польза, — возразил Лис. — Мне остается золотой цвет пшеницы."
      },
      {
        id: 'p-lp-21',
        order: 21,
        sourceText: "Puis il revint vers le renard : — Adieu, dit-il... — Adieu, dit le renard. Voici mon secret. Il est très simple : on ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
        targetText: "И он вернулся к Лису: — Прощай... — сказал он. — Прощай, — ответил Лис. — Вот мой секрет, он очень прост: зорко одно лишь сердце. Самого главного глазами не увидишь."
      },
      {
        id: 'p-lp-22',
        order: 22,
        sourceText: "— L'essentiel est invisible pour les yeux, répéta le petit prince, afin de se souvenir. — C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante. — C'est le temps que j'ai perdu pour ma rose... fit le petit prince, afin de se souvenir.",
        targetText: "— Самого главного глазами не увидишь, — повторил Маленький принц, чтобы лучше запомнить. — Твоя роза так дорога тебе потому, что ты отдавал ей все свои дни. — Моя роза так дорога мне... — повторил Маленький принц, чтобы лучше запомнить."
      },
      {
        id: 'p-lp-23',
        order: 23,
        sourceText: "— Les hommes ont oublié cette vérité, dit le renard. Mais tu ne dois pas l'oublier. Tu deviens responsable pour toujours de ce que tu as apprivoisé. Tu es responsable de ta rose...",
        targetText: "— Люди забыли эту истину, — сказал Лис. — Но ты не забывай: ты навсегда в ответе за всех, кого приручил. Ты в ответе за твою розу..."
      },
      {
        id: 'p-lp-24',
        order: 24,
        sourceText: "— Je suis responsable de ma rose... répéta le petit prince, afin de se souvenir. Et sur sa planète, les étoiles brillaient doucement dans la nuit immense, illuminant le souvenir éternel du renard et de la rose.",
        targetText: "— Я в ответе за мою розу... — повторил Маленький принц, чтобы лучше запомнить. А на его планете тихо сияли звезды в бескрайней ночной тишине, озаряя вечную память о Лисе и Розе."
      }
    ]
  },

  // 2. ФРАНЦ КАФКА - ПРЕВРАЩЕНИЕ
  {
    id: 'doc-kafka-metamorphosis',
    title: 'Превращение (Пробуждение Грегора Замзы и семейная драма)',
    titleTranslations: {
      ru: 'Превращение (Пробуждение Грегора Замзы и семейная драма)',
      uk: 'Перевтілення (Пробудження Ґреґора Замзи та сімейна драма)',
      en: "The Metamorphosis (Gregor Samsa's Awakening and Family Drama)",
      de: 'Die Verwandlung (Gregor Samsas Erwachen und Familiendrama)',
      es: 'La Metamorfosis (El despertar de Gregor Samsa y el drama familiar)',
      fr: 'La Métamorphose (Le réveil de Gregor Samsa et le drame familial)',
      it: 'La Metamorfosi (Il risveglio di Gregor Samsa e il dramma familiare)',
      pl: 'Przemiana (Przebudzenie Gregora Samsy i dramat rodzinny)',
      tr: "Dönüşüm (Gregor Samsa'nın Uyanışı ve Aile Dramı)",
      zh: '变形记（格里高尔·萨姆沙的觉醒与家庭剧）',
    },
    author: 'Франц Кафка',
    sourceLang: 'de',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_kafka_1792929018156.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 14,
    lastReadAt: Date.now() - 5400000,
    readingProgress: 35,
    wordCount: 785,
    isSample: true,
    passages: [
      {
        id: 'p-km-1',
        order: 1,
        sourceText: "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
        targetText: "Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое."
      },
      {
        id: 'p-km-2',
        order: 2,
        sourceText: "Er lag auf seinem panzerartig harten Rücken und sah, wenn er den Kopf ein wenig hob, seinen gewölbten, braunen, von bogenförmigen Versteifungen geteilten Bauch, auf dessen Höhe sich die Bettdecke, zum gänzlichen Niedergleiten bereit, kaum noch erhalten konnte.",
        targetText: "Лежа на твердой, похожей на панцирь спине, он видел, стоило ему немного поднять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на вершине которого еле держалось готовое вот-вот окончательно сползти одеяло."
      },
      {
        id: 'p-km-3',
        order: 3,
        sourceText: "Seine vielen, im Vergleich zu seinem sonstigen Umfang kläglich dünnen Beine flimmerten ihm hilflos vor den Augen. »Was ist mit mir geschehen?«, dachte er. Es war kein Traum.",
        targetText: "Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» — подумал он. Это не было сном."
      },
      {
        id: 'p-km-4',
        order: 4,
        sourceText: "Sein Zimmer, ein richtiges, nur etwas zu kleines Menschenzimmer, lag ruhig zwischen den vier wohlbekannten Wänden. Über dem Tisch hängte ein Bild, das er vor kurzem aus einer illustrierten Zeitschrift ausgeschnitten und in einen hübschen, vergoldeten Rahmen gebracht hatte.",
        targetText: "Его комната, настоящая, разве что слишком маленькая, но обычная человеческая комната, мирно покоилась в своих четырех хорошо знакомых стенах. Над столом висела картинка, которую он недавно вырезал из иллюстрированного журнала и вставил в красивую позолоченную рамку."
      },
      {
        id: 'p-km-5',
        order: 5,
        sourceText: "Es stellte eine Dame dar, die mit einem Pelzhut und einer Pelzboa versehen war, aufrecht dasaß und einen schweren Pelzmuff, in dem ihr ganzer Unterarm verschwunden war, dem Beschauer entgegenhob.",
        targetText: "На картинке была изображена дама в меховой шляпе и боа, она сидела прямо и вытягивала к зрителю тяжелую меховую муфту, в которой полностью скрывалась ее рука."
      },
      {
        id: 'p-km-6',
        order: 6,
        sourceText: "Gregors Blick richtete sich dann zum Fenster, und das trübe Wetter — man hörte Regentropfen auf das Fensterblech aufschlagen — machte ihn ganz melancholisch. »Wie wäre es, wenn ich noch ein wenig weiterschliefe und alle Verrücktheiten vergäße?«, dachte er.",
        targetText: "Взгляд Грегора устремился к окну, и пасмурная погода — слышно было, как капли дождя барабанят по жести подоконника, — навеяла на него глубокую меланхолию. «А не поспать ли мне еще немного и не забыть ли всю эту чепуху?» — подумал он."
      },
      {
        id: 'p-km-7',
        order: 7,
        sourceText: "Aber das war gänzlich unurchführbar, denn er war gewohnt, auf der rechten Seite zu schlafen, konnte sich aber in seinem gegenwärtigen Zustand nicht in diese Lage bringen. Mit welcher Kraft er sich auch auf die rechte Seite warf, immer wieder schaukelte er in die Rückenlage zurück.",
        targetText: "Но это было совершенно невыполнимо, ибо он привык спать на правом боку, а в своем нынешнем состоянии не мог принять этого положения. С какой бы силой он ни поворачивался на правый бок, он всякий раз качался и снова валился на спину."
      },
      {
        id: 'p-km-8',
        order: 8,
        sourceText: "Er versuchte es wohl hundertmal, schloss die Augen, um die zappelnden Beine nicht sehen zu müssen, und ließ erst dann ab, als er in der Seite einen noch nie gefühlten, leichten, dumpfen Schmerz zu spüren begann.",
        targetText: "Он проделал это добрую сотню раз, зажмурившись, чтобы не видеть своих барахтающихся ножек, и прекратил эти попытки только тогда, когда почувствовал в боку какую-то неиспытанную дотоле легкую и тупую боль."
      },
      {
        id: 'p-km-9',
        order: 9,
        sourceText: "»Ach Gott«, dachte er, »was für einen anstrengenden Beruf habe ich gewählt! Tagaus, tagein auf der Reise. Die geschäftlichen Aufregungen sind viel größer als im eigentlichen Geschäft zu Hause, und außerdem ist mir noch diese Plage des Reisens auferlegt...«",
        targetText: "«О господи, — подумал он, — какую я выбрал утомительную профессию! Изо дня в день в разъездах. Деловые волнения куда сильнее, чем на месте, в торговом доме, да к тому же еще эта проклятая кутерьма с поездками...»"
      },
      {
        id: 'p-km-10',
        order: 10,
        sourceText: "»Die Sorgen um die Zuganschlüsse, das unregelmäßige, schlechte Essen, ein immer wechselnder, nie andauernder, nie herzlich werdender menschlicher Verkehr. Der Teufel soll das alles holen!« Er fühlte ein leichtes Jucken oben auf dem Bauch.",
        targetText: "«Беспокойство из-за пересадок на поезда, нерегулярная, плохая еда, всегда меняющиеся, никогда не становящиеся близкими человеческие отношения. Черт бы побрал всё это!» Он почувствовал легкий зуд вверху живота."
      },
      {
        id: 'p-km-11',
        order: 11,
        sourceText: "Er schob sich langsam auf dem Rücken näher zum Bettpfosten, um den Kopf besser heben zu können; fand die ausgetrocknete Stelle, die von lauter kleinen weißen Pünktchen besetzt war, deren Natur er nicht zu beurteilen verstand; und wollte mit einem Bein die Stelle betasten, zog es aber gleich zurück, denn bei der Berührung umwehte ihn ein Kälteschauer.",
        targetText: "Он медленно подвинулся на спине ближе к спинке кровати, чтобы удобнее было поднять голову; нашел зудевшее место, усеянное белыми точками, значения которых он не мог понять, и хотел было ощупать это место одной из ножек, но тут же отдернул ее, ибо при прикосновении его обдало ледяным трепетом."
      },
      {
        id: 'p-km-12',
        order: 12,
        sourceText: "Er glitt wieder in seine frühere Lage zurück. »Dieses frühe Aufstehen«, dachte er, »macht einen ganz blödsinnig. Der Mensch muss seinen Schlaf haben. Andere Ausläufer leben wie die Haremweiber. Wenn ich zum Beispiel im Laufe des Vormittags ins Gasthaus zurückgehe, um die erlangten Aufträge einzuschreiben, sitzen diese Herren erst beim Frühstück.«",
        targetText: "Он снова сполз в прежнее положение. «От этого раннего вставания, — подумал он, — можно совсем глупеть. Человеку надо высыпаться. Другие комивояжеры живут, как гаремные жены. Когда я, например, среди утра возвращаюсь в гостиницу, чтобы переписать полученные заказы, эти господа только сидят за завтраком.»"
      },
      {
        id: 'p-km-13',
        order: 13,
        sourceText: "»Wenn ich das bei meinem Chef versuchen wollte, ich würde auf der Stelle hinausfliegen. Wer weiß, ob das nicht sehr gut für mich wäre. Wenn ich mich nicht wegen meiner Eltern zurückhielte, ich hätte längst gekündigt...«",
        targetText: "«Попробуй я поступить так у своего шефа, меня б тотчас выставили на улицу. Кто знает, может быть, это было бы и к лучшему для меня. Если бы я не сдерживал себя ради родителей, я бы давно высказал ему всё...»"
      },
      {
        id: 'p-km-14',
        order: 14,
        sourceText: "»Ich wäre vor den Chef getreten und hätte ihm meine Meinung von Grund des Herzens gesagt. Vom Pult hätte er fallen müssen! Es ist auch eine sonderbare Art, sich auf das Pult zu setzen und von der Höhe herab mit dem Angestellten zu sprechen...«",
        targetText: "«Я подошел бы к шефу и выложил ему всё от чистого сердца. Он бы так и свалился со своей кафедры! У него ведь какая странная привычка — восседать на конторке и говорить с работником свысока...»"
      },
      {
        id: 'p-km-15',
        order: 15,
        sourceText: "»Nun, die Hoffnung ist noch nicht ganz aufgegeben; habe ich einmal das Geld zusammen, um die Schuld der Eltern an ihn abzuzahlen — es dürfte noch fünf bis sechs Jahre dauern —, dann mache ich die Sache unbedingt. Dann wird der große Schnitt gemacht.«",
        targetText: "«Ну да надежда еще не потеряна; как только я накоплю деньги, чтобы выплатить долг родителей — на это уйдет еще лет пять-шесть, — я затею это дело обязательно. И тогда наступит решительный поворот.»"
      },
      {
        id: 'p-km-16',
        order: 16,
        sourceText: "»Vorerst aber muss ich einmal aufstehen, denn mein Zug geht um fünf.« Und er sah zur Pendeluhr hinüber, die auf dem Kasten tickte. »Du lieber Gott!«, dachte er. Es war halb sieben Uhr, und die Zeiger gingen ruhig vorwärts, es war sogar halb vorbei, es ging schon gegen drei Viertel.",
        targetText: "«А пока что надо вставать, мой поезд отходит в пять.» И он взглянул на будильник, тикавший на комоде. «Боже правый!» — подумал он. Было полшестого, и стрелки спокойно двигались вперед, было даже больше полшестого, дело подходило уже к без четверти семь."
      },
      {
        id: 'p-km-17',
        order: 17,
        sourceText: "Sollte der Wecker nicht geläutet haben? Man sah vom Bett aus, dass er auf vier Uhr richtig eingestellt war; gewiss hatte er auch geläutet. Ja, aber war es möglich, dieses möbeler schütternde Läuten ruhig zu verschlafen?",
        targetText: "Неужели будильник не звонил? С кровати было видно, что он был правильно поставлен на четыре часа; он, несомненно, звонил. Но возможно ли было спокойно проспать этот сотрясающий мебель трезвон?"
      },
      {
        id: 'p-km-18',
        order: 18,
        sourceText: "Nun, ruhig hatte er ja nicht geschlafen, aber desto fester offenbar. Was sollte er aber jetzt tun? Der nächste Zug ging um sieben Uhr; um den einzuholen, hätte er sich ungeheuer beeilen müssen, und die Musterkollektion war noch nicht eingepackt.",
        targetText: "Ну, спал-то он не спокойно, но зато, видимо, очень крепко. Что же ему делать теперь? Следующий поезд отходит в семь часов; чтобы успеть на него, он должен был бы страшно спешить, а коллекция образцов еще не упакована."
      },
      {
        id: 'p-km-19',
        order: 19,
        sourceText: "Und er selbst fühlte sich gar nicht besonders frisch und beweglich. Und selbst wenn er den Zug einholte, ein Donnerwetter des Chefs war nicht zu vermeiden, denn der Geschäftsdiener hatte beim Fünfuhrzug gewartet und die Meldung von seiner Versäumnis längst erstattet.",
        targetText: "Да и сам он чувствовал себя далеко не свежим и не бодрым. А если бы он даже и успел на поезд, нахлобучки у шефа было не миновать, ибо артельный рассыльный ждал у пятичасового поезда и давно доложил об его опоздании."
      },
      {
        id: 'p-km-20',
        order: 20,
        sourceText: "Er war eine Kreatur des Chefs, ohne Rückgrat und Verstand. Wie, wenn er sich krank meldete? Das wäre aber äußerst peinlich und verdächtig, denn Gregor war während seiner fünfjährigen Dienstzeit noch nicht ein einziges Mal krank gewesen.",
        targetText: "Рассыльный был человеком шефа, существом без достоинства и ума. Что, если сказаться больным? Но это было бы крайне неприятно и подозрительно, так как за все пять лет своей службы Грегор ни разу еще не болел."
      }
    ]
  }
];
