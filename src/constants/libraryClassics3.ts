import { ReadingDocument } from '../types';

export const CLASSICS_PART3: ReadingDocument[] = [
  // 7. СТЕНДАЛЬ - КРАСНОЕ И ЧЁРНОЕ
  {
    id: 'doc-stendhal-red-black',
    title: 'Красное и чёрное (Психология амбиций и парижское общество)',
    titleTranslations: {
      ru: 'Красное и чёрное (Психология амбиций и парижское общество)',
      uk: 'Червоне і чорне (Психологія амбіцій та паризьке суспільство)',
      en: 'The Red and the Black (Psychology of Ambition & Parisian Society)',
      de: 'Rot und Schwarz (Psychologie des Ehrgeizes & Pariser Gesellschaft)',
      es: 'Rojo y negro (Psicología de la ambición y la sociedad parisina)',
      fr: 'Le Rouge et le Noir (Psychologie de l\'ambition et société parisienne)',
      it: 'Il rosso e il nero (Psicologia dell\'ambizione e società parigina)',
      pl: 'Czerwone i czarne (Psychologia ambicji i paryskie towarzystwo)',
      tr: 'Kırmızı ve Siyah (Hırs Psikolojisi ve Paris Toplumu)',
      zh: '红与黑（野心心理学与巴黎社会）',
    },
    author: 'Стендаль',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_paris_bookstore_1792929019575.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 3,
    lastReadAt: Date.now() - 1500000,
    readingProgress: 18,
    wordCount: 684,
    isSample: true,
    passages: [
      {
        id: 'p-st-1',
        order: 1,
        sourceText: "La petite ville de Verrières peut passer pour l’une des plus jolies de la Franche-Comté. Ses maisons blanches avec leurs toits de tuiles rouges s’étendent sur la pente d’une colline, dont des touffes de vigoureux châtaigniers marquent les moindres sinuosités.",
        targetText: "Небольшой городок Верьер может считаться одним из самых живописных во Франш-Конте. Его белые дома с красными черепичными крышами раскинулись по склону холма, на котором пышные купы могучих каштанов отмечают малейшие изгибы рельефа."
      },
      {
        id: 'p-st-2',
        order: 2,
        sourceText: "Le Doubs coule à quelques centaines de pieds au-dessous de ses fortifications, bâties jadis par les Espagnols, et maintenant ruinées. Verrières est abritée du côté du nord par une haute montagne, c’est une des branches du Jura.",
        targetText: "Река Ду протекает в нескольких сотнях футов ниже его укреплений, возведенных когда-то испанцами и ныне превратившихся в развалины. С севера Верьер защищен высокой горой, одним из отрогов Юры."
      },
      {
        id: 'p-st-3',
        order: 3,
        sourceText: "Julien Sorel était un jeune homme de dix-neuf ans, faible en apparence, avec des traits irréguliers mais délicats et un nez aquilin. Ses grands yeux noirs, qui dans les moments de calme annonçaient de la réflexion et de l’ombre, s’animaient de la flamme la plus ardente dès qu’il était ému.",
        targetText: "Жюльен Сорель был девятнадцатилетним юношей, хрупким на вид, с неправильными, но тонким чертами лица и орлиным носом. Его большие черные глаза, в минуты спокойствия выражавшие задумчивость и тишину, загорались самым пламенным огнем, стоило ему волноваться."
      },
      {
        id: 'p-st-4',
        order: 4,
        sourceText: "Des cheveux châtain foncé, poussant très bas, lui faisaient un petit front, et dans les moments de colère, lui donnaient un air méchant. Parmi les nombreuses nuances de son caractère, cette figure offrait une expression d’une naïveté extrême et d’une résolution inflexible.",
        targetText: "Темно-каштановые волосы, низко росшие над лбом, делали его лоб маленьким, а в минуты гнева придавали ему зловещий вид. Среди многочисленных оттенков его характера это лицо выражало крайнюю наивность и непреклонную решимость."
      },
      {
        id: 'p-st-5',
        order: 5,
        sourceText: "Depuis son enfance, Julien avait des moments d’une exaltation extraordinaire. Il lisait en cachette le Mémorial de Sainte-Hélène et rêvait de conquêtes intellectuelles dans un monde dominé par l'argent et les titres.",
        targetText: "С самого детства у Жюльена бывают минуты необычайного воодушевления. Он тайком читал «Воспоминания о Святой Елене» и мечтал об интеллектуальных победах в мире, где господствуют деньги и титулы."
      },
      {
        id: 'p-st-6',
        order: 6,
        sourceText: "— Mon crime est grand, pensait-il, mais j'ai voulu m'élever par la force de mon esprit et le travail sans relâche. La société ne pardonne pas à l'homme de basse naissance qui ose penser par lui-même et refuser le mépris des grands.",
        targetText: "— Моя вина велика, — думал он, — но я хотел подняться благодаря силе своего ума и неустанному труду. Общество не прощает человеку низкого происхождения, дерзнувшему мыслить самостоятельно и отвергать презрение знатных людей."
      },
      {
        id: 'p-st-7',
        order: 7,
        sourceText: "Mme de Rênal le regardait avec un étonnement mêlé de tendresse. Ce jeune précepteur, si fier, si timide, si passionné, apportait dans sa maison paisible une poésie tragique qu'elle n'avait jamais soupçonnée.",
        targetText: "Г-жа де Реналь смотрела на него с удивлением, смешанным с нежностью. Этот молодой гувернер, такой гордый, робкий и страстный, принес в ее спокойный дом трагическую поэзию, о которой она прежде и не подозревала."
      },
      {
        id: 'p-st-8',
        order: 8,
        sourceText: "— À Paris, se disait Julien, les hommes d'esprit ne sont pas jugés sur leur naissance. Là-bas, l'énergie et la volonté peuvent tout surmonter. C'est là que se jouera mon destin.",
        targetText: "— В Париже, — говорил себе Жюльен, — умных людей судят не по происхождению. Там энергия и воля способны преодолеть всё. Именно там решится моя судьба."
      },
      {
        id: 'p-st-9',
        order: 9,
        sourceText: "L'ambition de Julien n'était pas celle d'un vulgaire intriguant. Il voulait prouver à lui-même qu'il était supérieur aux hommes riches qui le traitaient avec hauteur. Son arme était la connaissance parfaite de la Bible en latin.",
        targetText: "Амбиции Жюльена не были амбициями пошлого интригана. Он хотел доказать самому себе, что он превосходит богачей, обращавшихся с ним свысока. Его оружием было безупречное знание Библии на латыни."
      },
      {
        id: 'p-st-10',
        order: 10,
        sourceText: "Il savait par cœur tout le Nouveau Testament en latin, et cette mémoire prodigieuse lui valait le respect effrayé des ecclésiastiques et l'admiration des salons provinciaux.",
        targetText: "Он знал наизусть весь Новый Завет на латыни, и эта феноменальная память снискала ему боязливое уважение священнослужителей и восхищение провинциальных салонов."
      },
      {
        id: 'p-st-11',
        order: 11,
        sourceText: "— La politique, disait M. de Rênal, est la seule science utile aux honnêtes gens. Mais Julien méprisait en secret la médiocrité politique de son protecteur et de sa classe.",
        targetText: "— Политика, — говорил г-н де Реналь, — единственная наука, полезная честным людям. Но Жюльен втайне презирал политическую посредственность своего покровителя и его сословия."
      },
      {
        id: 'p-st-12',
        order: 12,
        sourceText: "Dans le jardin de Vergy, sous les tilleuls centenaires, Julien et Mme de Rênal marchaient en silence. Les nuits d'été étaient douces, éclairées par une lune d'argent qui argentait les sommets du Jura.",
        targetText: "В саду Вержи, под столетними липами, Жюльен и г-жа де Реналь шли молча. Летние ночи были теплыми, освещенными серебряной луной, серебрившей вершины Юры."
      },
      {
        id: 'p-st-13',
        order: 13,
        sourceText: "Sa rencontre avec Mathilde de La Mole à Paris ouvrit un nouveau chapitre de son existence. Mathilde était altière, romanesque, dédaigneuse du monde fade qui l'entourait, cherchant un héroïsme du XVIe siècle.",
        targetText: "Встреча с Матильдой де Ла-Моль в Париже открыла новую главу его жизни. Матильда была горда, романтична, презирала пресный мир вокруг нее и искала героизм шестнадцатого века."
      },
      {
        id: 'p-st-14',
        order: 14,
        sourceText: "— Ce jeune homme n'est pas né à genoux, pensa Mathilde en observant Julien au milieu des ducs et des marquis. Il a le regard de Bonaparte avant le pont d'Arcole.",
        targetText: "— Этот молодой человек не родился стоя на коленях, — подумала Матильда, наблюдая за Жюльеном среди герцогов и маркизов. — У него взгляд Бонапарта перед Аркольским мостом."
      },
      {
        id: 'p-st-15',
        order: 15,
        sourceText: "Le conflit intérieur de Julien oscillait sans cesse entre le devoir d'orgueil qu'il s'imposait et la tendresse naturelle de son cœur. Chaque victoire sociale lui coûtait un effort surhumain de comédie.",
        targetText: "Внутренний конфликт Жюльена непрестанно колебался между долгом гордости, который он себе навязал, и естественной нежностью своего сердца. Каждая социальная победа стоила ему сверхчеловеческих усилий актерской игры."
      },
      {
        id: 'p-st-16',
        order: 16,
        sourceText: "— Un roman est un miroir qui se promène sur une grande route, écrivait Stendhal. Tantôt il reflète à vos yeux l'azur des cieux, tantôt la fange des bourbiers de la route.",
        targetText: "— Роман — это зеркало, с которым идешь по большой дороге, — писал Стендаль. — То оно отражает вам лазурь небес, то грязь луж на дороге."
      },
      {
        id: 'p-st-17',
        order: 17,
        sourceText: "Dans son cachot de Besançon, Julien trouva enfin la paix qu'il avait cherchée en vain dans le monde. Libéré de l'ambition, il comprit que le véritable bonheur était la tendresse pure qu'il avait connue à Verrières.",
        targetText: "В своей тюремной камере в Безансоне Жюльен наконец обрел мир, который тщетно искал в свете. Освободившись от амбиций, он понял, что истинное счастье заключалось в чистой нежности, которую он узнал в Верьере."
      },
      {
        id: 'p-st-18',
        order: 18,
        sourceText: "— J'ai aimé la vérité, se disait-il la veille de son jugement. J'ai cherché la grandeur sans m'incliner devant les idoles de mon temps. Mon âme reste libre et sans tache devant l'éternité.",
        targetText: "— Я любил правду, — говорил он себе накануне суда. — Я искал величие, не склоняясь перед идолами моего времени. Моя душа остается свободной и чистой перед лицом вечности."
      },
      {
        id: 'p-st-19',
        order: 19,
        sourceText: "Mme de Rênal vint le visiter dans sa prison. Leurs larmes se confondirent dans une étreinte où s'effacèrent toutes les fautes, tous les malentendus et toute la cruauté du monde.",
        targetText: "Г-жа де Реналь пришла навестить его в тюрьме. Их слезы смешались в объятии, в котором изгладились все вины, все недоразумения и вся жестокость мира."
      },
      {
        id: 'p-st-20',
        order: 20,
        sourceText: "La fin tragique de Julien Sorel demeure l'une des pages les plus saisissantes de la littérature française, symbole immortel de la jeunesse révoltée contre l'hypocrisie de son époque.",
        targetText: "Трагический финал Жюльена Сореля остается одной из самых потрясающих страниц французской литературы, бессмертным символом юности, восставшей против лицемерия своей эпохи."
      }
    ]
  },

  // 8. ВИКТОР ГЮГО - ОТВЕРЖЕННЫЕ
  {
    id: 'doc-victor-hugo-miserables',
    title: 'Отверженные (Епископ Мириэль и спасение души Жана Вальжана)',
    titleTranslations: {
      ru: 'Отверженные (Епископ Мириэль и спасение души Жана Вальжана)',
      uk: 'Злиденні (Єпископ Міріель і порятунок душі Жана Вальжана)',
      en: 'Les Misérables (Bishop Myriel and the Redemption of Jean Valjean)',
      de: 'Die Elenden (Bischof Myriel und die Rettung von Jean Valjean)',
      es: 'Los miserables (El obispo Myriel y la redención de Jean Valjean)',
      fr: 'Les Misérables (L\'évêque Myriel et la rédemption de Jean Valjean)',
      it: 'I miserabili (Il vescovo Myriel e la redenzione di Jean Valjean)',
      pl: 'Nędznicy (Biskup Myriel i odkupienie Jeana Valjeana)',
      tr: 'Sefiller (Piskopos Myriel ve Jean Valjean\'ın Kurtuluşu)',
      zh: '悲惨世界（米里哀主教与尚万强的救赎）',
    },
    author: 'Виктор Гюго',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_literature_1792926490325.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 4,
    lastReadAt: Date.now() - 3000000,
    readingProgress: 22,
    wordCount: 686,
    isSample: true,
    passages: [
      {
        id: 'p-vh-1',
        order: 1,
        sourceText: "En 1815, M. Charles-François-Bienvenu Myriel était évêque de Digne. C’était un vieillard d’environ soixante-quinze ans ; il occupait le siège de Digne depuis 1806. Quoique ce détail ne touche en rien au fond même de ce que nous avons à raconter, il n'est peut-être pas inutile d'indiquer ici les bruits qui couraient sur son compte.",
        targetText: "В 1815 году монсеньор Шарль-Франсуа-Бьенвеню Мириэль был епископом Диньским. Это был старец лет семидесяти пяти; он занимал диньскую кафедру с 1806 года. Хотя эта подробность нисколько не касается сути того, что мы намерены рассказать, пожалуй, не бесполезно упомянуть здесь о слухах, ходивших на его счет."
      },
      {
        id: 'p-vh-2',
        order: 2,
        sourceText: "Cet homme simple donnait presque tout son revenu aux pauvres. Sa maison était ouverte à tous les malheureux. Il disait souvent : « La porte de celui qui prie ne doit jamais être fermée à celui qui souffre. »",
        targetText: "Этот простой человек отдавал почти весь свой доход беднякам. Его дом был открыт для всех несчастных. Он часто говорил: «Дверь молящегося никогда не должна закрываться перед страдающим»."
      },
      {
        id: 'p-vh-3',
        order: 3,
        sourceText: "Jean Valjean, libéré du bagne après dix-neuf ans de travaux forcés, frappa à la porte de l'évêché. Il était rejeté par toutes les auberges en raison de son passeport jaune, marque d'infamie imprimée par la loi sur les anciens condamnés.",
        targetText: "Жан Вальжан, освобожденный с каторги после девятнадцати лет принудительных работ, постучал в дверь епископства. Все гостиницы отвергали его из-за желтого паспорта, клейма позора, налагаемого законом на бывших каторжников."
      },
      {
        id: 'p-vh-4',
        order: 4,
        sourceText: "L'évêque le fit asseoir à sa table et lui dit : « Vous n'avez pas besoin de me dire qui vous êtes. Ceci n'est pas ma maison, c'est la maison de Jésus-Christ. Vous souffrez, vous avez faim ; soyez le bienvenu. »",
        targetText: "Епископ усадил его за свой стол и сказал: «Вам не нужно говорить мне, кто вы. Это не мой дом, это дом Иисуса Христа. Вы страдаете, вы голодны — добро пожаловать»."
      },
      {
        id: 'p-vh-5',
        order: 5,
        sourceText: "Pendant la nuit, Jean Valjean, hanté par la misère et l'amertume de ses dix-neuf années d'enfer, s'empara du service de couverts en argent de l'évêque et s'enfuit dans l'obscurité.",
        targetText: "Ночью Жан Вальжан, преследуемый призраками нищеты и горечью девятнадцати лет ада, заграбил серебряный прибор епископа и скрылся в темноте."
      },
      {
        id: 'p-vh-6',
        order: 6,
        sourceText: "Le lendemain matin, les gendarmes le ramenèrent enchaîné devant l'évêque. À leur grand étonnement, l'évêque s'avança vers Jean Valjean et lui dit : « Ah ! vous voilà ! Je suis bien aise de vous voir. Mais je vous avais donné aussi les chandeliers, qui sont en argent comme le reste ! »",
        targetText: "На следующее утро жандармы привели его в цепях к епископу. К их величайшему изумлению, епископ шагнул к Жану Вальжану и сказал: «А, вот и вы! Я очень рад вас видеть. Но ведь я подарил вам и подсвечники, они тоже серебряные, как и всё остальное!»"
      },
      {
        id: 'p-vh-7',
        order: 7,
        sourceText: "— N’oubliez jamais, dit l'évêque en lui donnant les chandeliers d'argent devant les gendarmes médusés, que vous m’avez promis d’employer cet argent à devenir un honnête homme. Jean Valjean, mon frère, vous n'appartenez plus au mal, mais au bien. C'est votre âme que je vous achète.",
        targetText: "— Никогда не забудьте, — сказал епископ, отдавая ему серебряные подсвечники перед ошеломленными жандармами, — что вы обещали мне использовать эти деньги, чтобы стать честным человеком. Жан Вальжан, брат мой, вы больше не принадлежите злу, но добру. Я покупаю у вас вашу душу."
      },
      {
        id: 'p-vh-8',
        order: 8,
        sourceText: "Jean Valjean resta pétrifié. Les paroles du vieillard s'enfoncèrent dans son cœur comme une lumière céleste. À partir de ce jour, le bagnard s'éteignit et l'homme nouveau naquit.",
        targetText: "Жан Вальжан стоял как окаменевший. Слова старца запали в его сердце, словно небесный свет. С этого дня каторжник умер и родился новый человек."
      },
      {
        id: 'p-vh-9',
        order: 9,
        sourceText: "Sous le nom de M. Madeleine, Jean Valjean transforma la petite ville de Montreuil-sur-Mer. Il y développa l'industrie, créa des usines, secourut les indigents et devint maire malgré lui, révéré de tous.",
        targetText: "Под именем г-на Мадлена Жан Вальжан преобразил маленький городок Монтрей-сюр-Мер. Он развил там промышленность, создал фабрики, помогал нищим и против воли стал мэром, почитаемым всеми."
      },
      {
        id: 'p-vh-10',
        order: 10,
        sourceText: "Pourtant, l’inspecteur Javert, incarnation de la loi aveugle et sans pitié, le guettait sans relâche. Javert ne croyait pas au repentir; pour lui, un bagnard restait un bagnard à jamais.",
        targetText: "Однако инспектор Жавер, воплощение слепого и беспощадного закона, неустанно следил за ним. Жавер не верил в раскаяние; для него каторжник навсегда оставался каторжником."
      },
      {
        id: 'p-vh-11',
        order: 11,
        sourceText: "Lorsque le pauvre Champmathieu fut accusé à sa place d'être Jean Valjean, M. Madeleine traversa une nuit d'agonie morale atroce dans son cabinet, luttant entre le salut personnel et la justice divine.",
        targetText: "Когда бедняк Шамматье был обвинен вместо него в том, что он Жан Вальжан, г-н Мадлен пережил в своем кабинете ночь ужасной нравственной агонии, борясь между личным спасением и божественной справедливостью."
      },
      {
        id: 'p-vh-12',
        order: 12,
        sourceText: "Il se rendit au tribunal d'Arras et déclara devant la cour médusée : « Messieurs les jurés, faites élargir cet homme. Je suis Jean Valjean. » C'était le triomphe suprême du devoir sur l'égoïsme.",
        targetText: "Он явился в суд Арраса и заявил перед ошеломленной коллегией: «Господа присяжные, освободите этого человека. Я — Жан Вальжан». Это был высший триумф долга над эгоизмом."
      },
      {
        id: 'p-vh-13',
        order: 13,
        sourceText: "Avant d'être de nouveau arrêté, il recueillit la petite Cosette, la fille de la malheureuse Fantine, l'arrachant aux griffes des odieux Thénardier dans leur sombre auberge de Montfermeil.",
        targetText: "Прежде чем его снова арестовали, он забрал маленькую Козетту, дочь несчастной Фантины, вырвав ее из когтей отвратительных Тенардье в их мрачном трактире в Монфермейе."
      },
      {
        id: 'p-vh-14',
        order: 14,
        sourceText: "L'amour paternelle qu'il voua à Cosette devint le centre de sa vie. Pour elle, il se cacha dans les couvents, brava les égouts de Paris et affronta toutes les tempêtes.",
        targetText: "Отцовская любовь, которую он питал к Козетте, стала центром его жизни. Ради нее он скрывался в монастырях, преодолевал парижскую клоаку и противостоял любым бурям."
      },
      {
        id: 'p-vh-15',
        order: 15,
        sourceText: "Sur les barricades de 1832, Jean Valjean sauva la vie de Marius, l'amoureux de Cosette, et épargna la vie de son persécuteur Javert, lui prouvant la grandeur de la miséricorde.",
        targetText: "На баррикадах 1832 года Жан Вальжан спас жизнь Мариусу, возлюбленному Козетты, и пощадил жизнь своего преследователя Жавера, доказав ему величие милосердия."
      },
      {
        id: 'p-vh-16',
        order: 16,
        sourceText: "Incapable de concilier la rigidité du code civil avec la grandeur morale du bagnard, Javert se jeta dans la Seine du haut du pont Notre-Dame.",
        targetText: "Не в силах примирить жесткость гражданского кодекса с moral'ным величием каторжника, Жавер бросился в Сену с моста Нотр-Дам."
      },
      {
        id: 'p-vh-17',
        order: 17,
        sourceText: "— Aimer ou avoir aimé, cela suffit, écrit Victor Hugo. Ne demandez rien ensuite. On n'a pas d'autre perle à trouver dans les plis sombres de la vie.",
        targetText: "— Любить или любимым быть — этого достаточно, — писал Виктор Гюго. — Не просите ничего больше. В темных складках жизни нельзя найти иной драгоценной жемчужины."
      },
      {
        id: 'p-vh-18',
        order: 18,
        sourceText: "À l'agonie, Jean Valjean contemplait les deux chandeliers d'argent posés sur la table, témoins silencieux de sa conversion et de toute sa vie de dévouement.",
        targetText: "Умирая, Жан Вальжан созерцал два серебряных подсвечника, стоявших на столе, — молчаливых свидетелей его обращения и всей его жизни, исполненной самоотверженности."
      },
      {
        id: 'p-vh-19',
        order: 19,
        sourceText: "— Mes enfants, dit-il à Cosette et Marius, aimez-vous bien toujours. Il n'y a presque autre chose dans la vie que cela : s'aimer.",
        targetText: "— Дети мои, — сказал он Козетте и Мариусу, — любите друг друга всегда. В жизни почти нет ничего другого, кроме этого: любить друг друга."
      },
      {
        id: 'p-vh-20',
        order: 20,
        sourceText: "Il dort. Quoique le sort fût pour lui bien étrange, il vivait. Il mourut quand il n'eut plus son ange ; la chose se fit simplement d'elle-même, comme la nuit vient quand le jour s'en va.",
        targetText: "Он спит. Хотя судьба его была странной, он жил. Он умер, когда не стало его ангела; всё произошло так же просто, как наступает ночь, когда уходит день."
      }
    ]
  },

  // 9. ГЁТЕ - ФАУСТ
  {
    id: 'doc-goethe-faust',
    title: 'Фауст и Вертер (Познание, стремление и природа духа)',
    titleTranslations: {
      ru: 'Фауст и Вертер (Познание, стремление и природа духа)',
      uk: 'Фауст і Вертер (Пізнання, прагнення та природа духу)',
      en: 'Faust and Werther (Knowledge, Striving, and Spirit)',
      de: 'Faust und Werther (Erkenntnis, Streben und Natur des Geistes)',
      es: 'Fausto y Werther (Conocimiento, afán y naturaleza del espíritu)',
      fr: 'Faust et Werther (Connaissance, aspiration et nature de l\'esprit)',
      it: 'Faust e Werther (Conoscenza, aspirazione e natura dello spirito)',
      pl: 'Faust i Werther (Poznanie, dążenie i natura ducha)',
      tr: 'Faust ve Werther (Bilgi, Çaba ve Ruhun Doğası)',
      zh: '浮士德与维特（认知、追求与精神本质）',
    },
    author: 'Иоганн Вольфганг фон Гёте',
    sourceLang: 'de',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_kafka_1792929018156.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 5,
    lastReadAt: Date.now() - 4000000,
    readingProgress: 30,
    wordCount: 496,
    isSample: true,
    passages: [
      {
        id: 'p-go-1',
        order: 1,
        sourceText: "Habe nun ach! Philosophie, Juristerei und Medizin, und leider auch Theologie durchaus studiert, mit heißem Bemühn. Da steh ich nun, ich armer Tor! Und bin so klug als wie zuvor.",
        targetText: "Изучил я, увы, и философию, и юриспруденцию, и медицину, и, к сожалению, богословие — изучил с горячим усердием. И вот я стою, бедный дурак, и знаю не больше, чем знал прежде."
      },
      {
        id: 'p-go-2',
        order: 2,
        sourceText: "Heiße Magister, heiße Doktor gar und ziehe schon an die zehen Jahr herauf, herab und quer und krumm meine Schüler an der Nase herum — und sehe, dass wir nichts wissen können! Das will mir schier das Herz verbrennen.",
        targetText: "Звавшись магистром, звавшись даже доктором, я вот уже почти десять лет вожу за нос своих учеников — и вижу, что мы ничего не можем знать! Это готово сжечь мне сердце."
      },
      {
        id: 'p-go-3',
        order: 3,
        sourceText: "Zwei Seelen wohnen, ach! in meiner Brust, die eine will sich von der andern trennen; Die eine hält, in derber Liebeslust, sich an die Welt mit klammernden Organen; Die andre hebt gewaltsam sich vom Dunst zu den Gefilden hoher Ahnen.",
        targetText: "Две души живут, увы, в моей груди, и одна хочет отделиться от другой; одна в страстном порыве любви цепляется за мир всеми своими органами, другая же мощно поднимается из тумана к обителям высоких предков."
      },
      {
        id: 'p-go-4',
        order: 4,
        sourceText: "Wer immer strebend sich bemüht, den können wir erlösen. Und hat sein Teil die Liebe gar von oben teilgenommen, begegnet ihm die selige Schar mit herzlichem Willkommen.",
        targetText: "Кто неустанно стремится вперед, того мы можем спасти. И если в его судьбе приняла участие любовь свыше, его встречает сонм блаженных с сердечным приветом."
      },
      {
        id: 'p-go-5',
        order: 5,
        sourceText: "Die Natur ist das einzige Buch, das auf allen Blättern großen Inhalt bietet. Man muss nur verstehen, darin zu lesen mit offenem Herzen und klarem Verstand.",
        targetText: "Природа — единственная книга, каждая страница которой исполнена глубокого содержания. Нужно лишь уметь читать ее с открытым сердцем и ясным умом."
      },
      {
        id: 'p-go-6',
        order: 6,
        sourceText: "Aus Leiden erst entsteht die wahre Größe des Geistes. Wer nie sein Brot mit Tränen aß, wer nie die kummervollen Nächte auf seinem Bette weinend saß, der kennt euch nicht, ihr himmlischen Mächte!",
        targetText: "Только из страданий рождается истинное величие духа. Кто никогда не ел своего хлеба с слезами, кто никогда не сидел плача на своем ложе в исполненные тоски ночи, тот не знает вас, небесные силы!"
      },
      {
        id: 'p-go-7',
        order: 7,
        sourceText: "Im Anfang war die Tat! So steht es geschrieben, und mein Geist drängt mich, diesen Satz als Fundament alles Daseins zu begreifen.",
        targetText: "В начале было Деяние! Так написано, и мой дух побуждает меня осознать эту фразу как фундамент всего существования."
      },
      {
        id: 'p-go-8',
        order: 8,
        sourceText: "Mephistopheles stellt sich vor: »Ich bin der Geist, der stets verneint! Und das mit Recht; denn alles, was entsteht, ist wert, dass es zugrunde geht.«",
        targetText: "Мефистофель представляется: «Я дух, который всегда отрицает! И правоту имея; ибо всё, что возникает, достойно того, чтобы гигнуть»."
      },
      {
        id: 'p-go-9',
        order: 9,
        sourceText: "— Werd ich zum Augenblicke sagen: Verweile doch! du bist so schön! Dann magst du mich in Fesseln schlagen, dann will ich gern zugrunde gehn!",
        targetText: "— Если я скажу мгновению: Постой! Ты так прекрасно! Тогда закой меня в оковы, тогда я рад буду погибнуть!"
      },
      {
        id: 'p-go-10',
        order: 10,
        sourceText: "Das Schöne ist eine Manifestation geheimer Naturgesetze, die uns ohne diese Erscheinung ewig verborgen geblieben wären.",
        targetText: "Прекрасное — это проявление тайных законов природы, которые без этого явления навсегда остались бы скрытыми от нас."
      },
      {
        id: 'p-go-11',
        order: 11,
        sourceText: "Gretchen im Garten fragt Faust nach seiner Religion: »Wie hast du's mit der Religion? Du bist ein herzlich guter Mann, allein ich glaub', du hältst nicht viel davon.«",
        targetText: "Гретхен в саду спрашивает Фауста о его религии: «Как у тебя с религией? Ты добрый человек, но мне кажется, ты не придаешь ей большого значения»."
      },
      {
        id: 'p-go-12',
        order: 12,
        sourceText: "Faust antwortet: »Wer darf ihn nennen? Und wer bekennen: Ich glaub ihn? Wer empfinden, und sich unterwinden zu sagen: ich glaub ihn nicht?«",
        targetText: "Фауст отвечает: «Кто смеет назвать Его? И кто признать: Я верю в Него? Кто может чувствовать и осмелиться сказать: я не верю в Него?»"
      },
      {
        id: 'p-go-13',
        order: 13,
        sourceText: "In den Leiden des jungen Werther beschreibt Goethe die unendliche Sehnsucht des Menschen nach vollkommener Verschmelzung mit der Natur und der Liebe.",
        targetText: "В «Страданиях юного Вертера» Гёте описывает бесконечную тоску человека по совершенному слиянию с природой и любовью."
      },
      {
        id: 'p-go-14',
        order: 14,
        sourceText: "»Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, so liege ich im hohen Grase am fallenden Bache.«",
        targetText: "«Когда милая долина дымится вокруг меня и высокое солнце покоится на поверхности непроницаемой тьмы моего леса, я лежу в высокой траве у журчащего ручья»."
      },
      {
        id: 'p-go-15',
        order: 15,
        sourceText: "»Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße.«",
        targetText: "«Удивительная ясная радость овладела всей моей душой, подобно сладким весенним утрам, которыми я наслаждаюсь от всего сердца»."
      },
      {
        id: 'p-go-16',
        order: 16,
        sourceText: "Die Tragödie des Wissens verwandelt sich in Faust in das Streben nach schöpferischer Tat zum Wohle der Menschheit.",
        targetText: "Трагедия познания превращается в «Фаусте» в стремление к созидательному труду на благо человечества."
      },
      {
        id: 'p-go-17',
        order: 17,
        sourceText: "»Solch ein Gewimmel möcht ich sehn, auf freiem Grund mit freiem Volke stehn! Zum Augenblicke dürft ich sagen: Verweile doch, du bist so schön!«",
        targetText: "«Народ свободный на земле свободной увидеть я б хотел в такой момент! Тогда б мог молвить я: Постой, мгновенье! Прекрасно ты, продлись же в вечность!»"
      },
      {
        id: 'p-go-18',
        order: 18,
        sourceText: "Das Ewig-Weibliche zieht uns hinan. Die Erlösung Fausts symbolisiert die unendliche Gnade der Liebe über das bloße Verstandesdenken.",
        targetText: "Вечная женственность влечет нас возвышенно вверх. Спасение Фауста символизирует бесконечную милость любви над голым рассудком."
      },
      {
        id: 'p-go-19',
        order: 19,
        sourceText: "Alles Vergängliche ist nur ein Gleichnis; das Unzulängliche, hier wird's Ereignis; das Unbeschreibliche, hier ist's getan.",
        targetText: "Всё преходящее — лишь иносказание; недостижимое здесь становится событием; неописуемое здесь совершается."
      },
      {
        id: 'p-go-20',
        order: 20,
        sourceText: "Goethes Meisterwerk bleibt das ewige Monument des menschlichen Geistes in seinem unsterblichen Drang nach Licht und Erkenntnis.",
        targetText: "Шедевр Гёте остается вечным памятником человеческого духа в его бессмертном порыве к свету и познанию."
      }
    ]
  },

  // 10. ШОПЕНГАУЭР - АФОРИЗМЫ ЖИТЕЙСКОЙ МУДРОСТИ
  {
    id: 'doc-schopenhauer-wisdom',
    title: 'Афоризмы житейской мудрости (О достоинстве личности и внутреннем богатстве)',
    titleTranslations: {
      ru: 'Афоризмы житейской мудрости (О достоинстве личности и внутреннем богатстве)',
      uk: 'Афоризми житейської мудрості (Про гідність особистості та внутрішнє багатство)',
      en: 'Aphorisms on the Wisdom of Life (Personality and Inner Wealth)',
      de: 'Aphorismen zur Lebensweisheit (Persönlichkeit und innerer Reichtum)',
      es: 'Aforismos sobre la sabiduría de la vida (Personalidad y riqueza interior)',
      fr: 'Aphorismes sur la sagesse dans la vie (Personnalité et richesse intérieure)',
      it: 'Aforismi sulla saggezza del vivere (Personalità e ricchezza interiore)',
      pl: 'Aformaty mądrości życia (O godności osobistej i bogactwie wewnętrznym)',
      tr: 'Yaşam Bilgeliği Üzerine Aforizmalar (Kişilik ve İç Zenginlik)',
      zh: '人生的智慧（个性与内心财富）',
    },
    author: 'Артур Шопенгауэр',
    sourceLang: 'de',
    targetLang: 'ru',
    coverImage: '/src/assets/images/reading_desk_atmosphere_1792926490580.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 6,
    lastReadAt: Date.now() - 2200000,
    readingProgress: 28,
    wordCount: 429,
    isSample: true,
    passages: [
      {
        id: 'p-sch-1',
        order: 1,
        sourceText: "Was jemand für sich selbst ist, was ihn in die Einsamkeit begleitet und was keiner ihm geben oder stehlen kann, ist offenbar für ihn wesentlicher als alles, was er besitzt oder was er in den Augen anderer ist.",
        targetText: "То, чем человек является для самого себя, что сопутствует ему в уединении и что никто не может ему дать или отнять, очевидно, существеннее для него, чем все, чем он обладает или чем он является в глазах других."
      },
      {
        id: 'p-sch-2',
        order: 2,
        sourceText: "Ein geistreicher Mensch hat in der gänzlichen Einsamkeit an seinen eigenen Gedanken und Phantasien vorzügliche Unterhaltung, während von einem Stumpfsinnigen die beständige Abwechslung von Gesellschaften das Verharren der Langeweile nicht abzuwehren vermag.",
        targetText: "Остроумный человек в абсолютном уединении находит прекрасное развлечение в собственных мыслях и фантазиях, тогда как тупоумного не может избавить от скуки даже постоянная смена обществ и развлечений."
      },
      {
        id: 'p-sch-3',
        order: 3,
        sourceText: "Das höchste Gut ist die Persönlichkeit. Das Schicksal kann sich ändern, aber die eigene Natur bleibt. Daher ist der innere Reichtum der einzige wahre Reichtum auf dieser Welt.",
        targetText: "Высшее благо — это человеческая личность. Судьба может измениться, но собственная природа остается неизменной. Поэтому внутреннее богатство — единственное истинное богатство в этом мире."
      },
      {
        id: 'p-sch-4',
        order: 4,
        sourceText: "Man soll seine Wünsche mäßigen, seine Begierden zügeln und seinen Zorn beherrschen, stets eingedenk, dass der Einzelne nur einen sehr kleinen Teil des Ganzen ausmacht.",
        targetText: "Следует умерить свои желания, обуздать страсти и укротить гнев, всегда помня о том, что отдельный человек составляет лишь крошечную часть целого."
      },
      {
        id: 'p-sch-5',
        order: 5,
        sourceText: "Die Quelle unseres Glücks liegt in unserem Inneren, nicht in den äußeren Dingen. Wer frohen Mutes ist, hat allen Grund, froh zu sein: eben diesen, dass er es ist.",
        targetText: "Источник нашего счастья лежит внутри нас, а не во внешних вещах. Кто весел, у того есть все основания радоваться: именно то, что он весел."
      },
      {
        id: 'p-sch-6',
        order: 6,
        sourceText: "Gesundheit wiegt alle äußeren Güter so sehr auf, dass wahrlich ein gesunder Bettler glücklicher ist als ein kranker König.",
        targetText: "Здоровье настолько превосходит все внешние блага, что поистине здоровый нищий счастливее больного короля."
      },
      {
        id: 'p-sch-7',
        order: 7,
        sourceText: "Unsere wahren Feinde wohnen in unserer eigenen Brust: es sind die maßlosen Begierden, der Neid, die Eitelkeit und der Stolz.",
        targetText: "Наши истинные враги живут в нашей собственной груди: это безмерные желания, зависть, тщеславие и гордость."
      },
      {
        id: 'p-sch-8',
        order: 8,
        sourceText: "Der Humor ist die einzige demokratische Tugend des Geistes; er erlaubt es dem Menschen, über die Widersprüche des Daseins erhaben zu lächeln.",
        targetText: "Юмор — единственная демократическая добродетель духа; он позволяет человеку с улыбкой возвыситься над противоречиями бытия."
      },
      {
        id: 'p-sch-9',
        order: 9,
        sourceText: "Höflichkeit ist eine tacit einwilligende Übereinkunft, die gegenseitige elende Moralität und Intellektualität ignoriert und nicht vor Augen zu führen.",
        targetText: "Вежливость — это молчаливое соглашение игнорировать и не выставлять напоказ взаимную скудость морали и интеллекта."
      },
      {
        id: 'p-sch-10',
        order: 10,
        sourceText: "Wer nicht die Einsamkeit liebt, der liebt auch nicht die Freiheit; denn nur wenn man allein ist, ist man frei.",
        targetText: "Кто не любит уединения — тот не любит и свободы; ибо лишь тогда, когда человек одинок, он свободен."
      },
      {
        id: 'p-sch-11',
        order: 11,
        sourceText: "Die Torheit sucht das Vergnügen und wird enttäuscht; der Weise sucht die Schmerzlosigkeit und findet den Frieden.",
        targetText: "Глупость ищет наслаждений и испытывает разочарование; мудрец же ищет беспечальности и обретает покой."
      },
      {
        id: 'p-sch-12',
        order: 12,
        sourceText: "Das Schicksal mischt die Karten, aber wir spielen das Spiel. Unsere Haltung entscheidet über den Ausgang mehr als das Glück.",
        targetText: "Судьба сдает карты, но игру ведем мы сами. Наша установка решает исход дела больше, чем слепая удача."
      },
      {
        id: 'p-sch-13',
        order: 13,
        sourceText: "Lesen heißt mit einem fremden Kopfe statt des eigenen denken. Nichts ist der eigenen Denkfähigkeit schädlicher als das übermäßige Lesen.",
        targetText: "Читать — значит думать чужой головой вместо своей собственной. Ничто не вредит собственной способности мыслить так, как чрезмерное чтение без размышления."
      },
      {
        id: 'p-sch-14',
        order: 14,
        sourceText: "Das Gedächtnis verblasst, aber das Urteil bleibt. Man soll Wissen verarbeiten, wie der Magen die Nahrung verarbeitet.",
        targetText: "Память угасает, но суждение остается. Знание нужно перерабатывать так же, как желудок перерабатывает пищу."
      },
      {
        id: 'p-sch-15',
        order: 15,
        sourceText: "Neid ist der verhängnisvollste Feind des menschlichen Glücks. Wer das Glück anderer nicht ertragen kann, zerstört sein eigenes.",
        targetText: "Зависть — самый губительный враг человеческого счастья. Кто не может выносить чужого счастья, разрушает свое собственное."
      },
      {
        id: 'p-sch-16',
        order: 16,
        sourceText: "Die Zeit ist das kostbarste Gut; sie ist der Stoff, aus dem das Leben gewebt ist. Wer Zeit vergeudet, vergeudet sein Dasein.",
        targetText: "Время — самое ценное благо; это материал, из которого соткана жизнь. Кто расточает время, расточает свое существование."
      },
      {
        id: 'p-sch-17',
        order: 17,
        sourceText: "Die Vernunft ist dem Menschen gegeben, damit er das Notwendige vom Überflüssigen unterscheide.",
        targetText: "Разум дан человеку для того, чтобы он отличал необходимое от лишнего."
      },
      {
        id: 'p-sch-18',
        order: 18,
        sourceText: "Wahres Selbstbewusstsein entspringt dem Bewusstsein eigener Fähigkeiten, nicht dem Beifall der Menge.",
        targetText: "Истинное самосознание проистекает из осознания собственных способностей, а не из аплодисментов толпы."
      },
      {
        id: 'p-sch-19',
        order: 19,
        sourceText: "Man muss das Leben betrachten wie eine lange Reise, auf der die Landschaft ständig wechselt, aber der Reisende derselbe bleibt.",
        targetText: "На жизнь следует смотреть как на долгое путешествие, в котором пейзаж постоянно меняется, но сам путешественник остается прежним."
      },
      {
        id: 'p-sch-20',
        order: 20,
        sourceText: "Der Geist ist die Krone des Menschen; in seiner Pflege liegt die höchste Pflicht und die erhabenste Freude.",
        targetText: "Дух — это венец человека; в заботе о нем заключается высший долг и самая возвышенная радость."
      }
    ]
  },

  // 11. ЖЮЛЬ ВЕРН - 20000 ЛЬЕ ПОД ВОДОЙ
  {
    id: 'doc-jules-verne-nemo',
    title: 'Двадцать тысяч лье под водой (Капитан Немо и тайны океана)',
    titleTranslations: {
      ru: 'Двадцать тысяч лье под водой (Капитан Немо и тайны океана)',
      uk: 'Двадцять тисяч ліг під водою (Капітан Немо та таємниці океану)',
      en: 'Twenty Thousand Leagues Under the Sea (Captain Nemo & Ocean Mysteries)',
      de: '20.000 Meilen unter dem Meer (Kapitän Nemo und die Geheimnisse des Ozeans)',
      es: 'Veinte mil leguas de viaje submarino (El Capitán Nemo y los secretos del océano)',
      fr: 'Vingt Mille Lieues sous les mers (Le Capitaine Nemo et les mystères de l\'océan)',
      it: 'Ventimila leghe sotto i mari (Il Capitano Nemo e i misteri dell\'oceano)',
      pl: 'Dwadzieścia tysięcy mil podmorskiej żeglugi (Kapitan Nemo i tajemnice oceanu)',
      tr: 'Denizler Altında 20.000 Fersah (Kaptan Nemo ve Okyanus Gizemleri)',
      zh: '海底两万里（尼摩队长与海洋之谜）',
    },
    author: 'Жюль Верн',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_technology_1792926491315.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 7,
    lastReadAt: Date.now() - 1100000,
    readingProgress: 40,
    wordCount: 518,
    isSample: true,
    passages: [
      {
        id: 'p-jv-1',
        order: 1,
        sourceText: "L’année 1866 fut marquée par un événement bizarre, un phénomène inexpliqué et inexplicable que personne n’a certainement oublié. Des bruits couraient sur un objet énorme et rapide aperçu en mer.",
        targetText: "1866 год ознаменовался загадочным происшествием, необъяснимым феноменом, который наверняка никто не забыл. Ходили слухи об огромном и стремительном объекте, замеченном в море."
      },
      {
        id: 'p-jv-2',
        order: 2,
        sourceText: "— La mer est le vaste réservoir de la nature, disait le capitaine Nemo. C’est par la mer que la terre a, pour ainsi dire, commencé, et qui sait si elle ne finira pas par elle !",
        targetText: "— Море — это грандиозный резервуар природы, — говорил капитан Немо. — С моря Земля, так сказать, началась, и кто знает, не морем ли она закончится!"
      },
      {
        id: 'p-jv-3',
        order: 3,
        sourceText: "— Là est le calme suprême. La mer n’appartient pas aux despotes. À sa surface, ils peuvent encore exercer des droits iniques, mais à trente pieds sous son niveau, leur pouvoir cesse !",
        targetText: "— Там царит высший покой. Море не принадлежит деспотам. На его поверхности они еще могут чинить произвол, но на глубине тридцати футов их власть прекращается!"
      },
      {
        id: 'p-jv-4',
        order: 4,
        sourceText: "— Le Nautilus fonctionne entièrement à l'électricité, cette force puissante, obéissante, rapide, facile, qui se prête à tous les usages et qui règne en maîtresse à bord de mon navire.",
        targetText: "— «Наутилус» полностью работает на электричестве — этой могучей, послушной, быстрой и укрощенной силе, которая подходит для любых целей и господствует на моем корабле."
      },
      {
        id: 'p-jv-5',
        order: 5,
        sourceText: "— Regardez cet océan ! Ne dirait-on pas qu'il est doué d'une vie véritable ? Il a ses colères et ses douceurs. Il respire, il vit, et je l'aime comme un être animé.",
        targetText: "— Взгляните на этот океан! Не кажется ли вам, что он наделен подлинной жизнью? У него бывают свои гневы и своя ласка. Он дышит, он живет, и я люблю его как живое существо."
      },
      {
        id: 'p-jv-6',
        order: 6,
        sourceText: "La bibliothèque du Nautilus contenait plus de douze mille volumes reliés avec soin, embrassant toutes les sciences, l'histoire et les arts de l'humanité.",
        targetText: "Библиотека «Наутилуса» содержала более двенадцати тысяч аккуратно переплетенных томов, охватывавших все науки, историю и искусства человечества."
      },
      {
        id: 'p-jv-7',
        order: 7,
        sourceText: "— Je ne suis pas ce qu'on appelle un homme civilisé, professeur Aronnax, dit Nemo. J'ai rompu avec la société entière pour des raisons que moi seul ai le droit d'apprécier.",
        targetText: "— Я не то, что называют цивилизованным человеком, профессор Аронакс, — сказал Немо. — Я порвал со всем обществом по причинам, судить о которых имею право только я один."
      },
      {
        id: 'p-jv-8',
        order: 8,
        sourceText: "À travers les grandes glaces du salon, les profondeurs abyssales s'illuminaient sous les rayons des projecteurs électriques, révélant des forêts de corail et des créatures fantastiques.",
        targetText: "Сквозь огромные стекла салона бездонные глубины освещались лучами электрических прожекторов, открывая коралловые леса и фантастических существ."
      },
      {
        id: 'p-jv-9',
        order: 9,
        sourceText: "L'excursion sous-marine dans les forêts de l'île Crespo offrit un spectacle féerique où la lumière solaire, filtrée par les eaux, composait une palette de couleurs inouïe.",
        targetText: "Подводная экскурсия в лесах острова Креспо представляла собой феерическое зрелище, где солнечный свет, профильтрованный водой, создавал невиданную палитру красок."
      },
      {
        id: 'p-jv-10',
        order: 10,
        sourceText: "— Tout ce que la nature produit de plus beau se trouve sous les eaux, affirmait le capitaine en contemplant les perles géantes de la baie de Manaar.",
        targetText: "— Все самое прекрасное, что создает природа, находится под водой, — утверждал капитан, созерцая гигантские жемчужины Манаарского залива."
      },
      {
        id: 'p-jv-11',
        order: 11,
        sourceText: "Le passage sous-marin du canal de Suez, creusé par la nature bien avant les hommes, permit au Nautilus de passer de la mer Rouge à la Méditerranée en quelques heures.",
        targetText: "Подводный проход Суэцкого канала, промытый природой задолго до людей, позволил «Наутилусу» перейти из Красного моря в Средиземное за считанные часы."
      },
      {
        id: 'p-jv-12',
        order: 12,
        sourceText: "En franchissant le pôle Sud, le capitaine Nemo planta son pavillon noir frappé d’un N d’or sur la banquise, revendiquant ce continent glacé au nom de la liberté.",
        targetText: "Достигнув Южного полюса, капитан Немо водрузил свой черный флаг с золотой буквой N на льдину, заявляя права на этот ледяной континент во имя свободы."
      },
      {
        id: 'p-jv-13',
        order: 13,
        sourceText: "Le combat tragique contre les poulpes géants démontra l'héroïsme de l'équipage, luttant à la hache contre des tentacules monstrueux pour sauver l'un des leurs.",
        targetText: "Трагический бой с гигантскими кальмарами показал героизм экипажа, сражавшегося топорами против монструозных щупалец, чтобы спасти одного из своих."
      },
      {
        id: 'p-jv-14',
        order: 14,
        sourceText: "— Mon dieu ! murmura Nemo en pleurant après l'attaque du navire de guerre. Assez ! assez !",
        targetText: "— Боже мой! — прошептал Немо, плача после атаки военного корабля. — Довольно! Довольно!"
      },
      {
        id: 'p-jv-15',
        order: 15,
        sourceText: "L'orgue du salon exhalait parfois des mélodies mélancoliques et passionnées, reflet du cœur tourmenté de cet homme d'exception.",
        targetText: "Орган в салоне время от времени источал меланхоличные и страстные мелодии, отражая измученное сердце этого исключительного человека."
      },
      {
        id: 'p-jv-16',
        order: 16,
        sourceText: "L'Atlantide engloutie apparut sous leurs yeux au fond de l'océan Atlantique, éclairée par l'éruption d'un volcan sous-marin.",
        targetText: "Затонувшая Атлантида предстала перед их глазами на дне Атлантического океана, освещенная извержением подводного вулкана."
      },
      {
        id: 'p-jv-17',
        order: 17,
        sourceText: "— La science et la poésie ne se contredisent pas, elles s'unissent pour révéler le merveilleux, écrivait le professeur Aronnax dans son journal.",
        targetText: "— Наука и поэзия не противоречат друг другу, они объединяются, чтобы раскрыть чудесное, — писал профессор Аронакс в своем дневнике."
      },
      {
        id: 'p-jv-18',
        order: 18,
        sourceText: "Le Maelstrom, le terrible gouffre des côtes de Norvège, engloutit-il le Nautilus ? Nul ne le sait, mais la mémoire du capitaine Nemo demeure immortelle.",
        targetText: "Поглотил ли «Наутилус» Мальстрем — ужасная водоворотная пучина у берегов Норвегии? Никто не знает, но память о капитане Немо остается бессмертной."
      },
      {
        id: 'p-jv-19',
        order: 19,
        sourceText: "— Si le capitaine Nemo habite encore l'océan, qu'il puisse effacer de son cœur tout sentiment de vengeance !",
        targetText: "— Если капитан Немо все еще обитает в океане, пусть он сможет изгладить из своего сердца всякое чувство мести!"
      },
      {
        id: 'p-jv-20',
        order: 20,
        sourceText: "L'œuvre de Jules Verne demeure le chef-d'œuvre fondateur de la science-fiction, célébrant l'esprit d'exploration и безграничные возможности человеческого разума.",
        targetText: "Труд Жюля Верна остается основополагающим шедевром научной фантастики, воспевающим дух исследовательства и безграничные возможности человеческого разума."
      }
    ]
  },

  // 12. ТОРО - УОЛДЕН
  {
    id: 'doc-thoreau-walden',
    title: 'Уолден, или Жизнь в лесах (Осознанность, простота и связь с природой)',
    titleTranslations: {
      ru: 'Уолден, или Жизнь в лесах (Осознанность, простота и связь с природой)',
      uk: 'Уолден, або Життя в лісах (Усвідомленість, простота та зв\'язок з природою)',
      en: 'Walden (Mindfulness, Simplicity, and Harmony with Nature)',
      de: 'Walden (Achtsamkeit, Einfachheit und Verbindung zur Natur)',
      es: 'Walden (Atención plena, simplicidad y armonía con la naturaleza)',
      fr: 'Walden ou la Vie dans les bois (Pleine conscience, simplicité et nature)',
      it: 'Walden ovvero Vita nei boschi (Consapevolezza, semplicità e natura)',
      pl: 'Walden, czyli życie w lasach (Uważność, prostota i więź z naturą)',
      tr: 'Walden (Farkındalık, Sadelik ve Doğa İle Uyum)',
      zh: '瓦尔登湖（正念、简单与自然的和谐）',
    },
    author: 'Генри Дэвид Торо',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_darwin_1792929020043.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 8,
    lastReadAt: Date.now() - 1700000,
    readingProgress: 33,
    wordCount: 560,
    isSample: true,
    passages: [
      {
        id: 'p-th-1',
        order: 1,
        sourceText: "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.",
        targetText: "Я ушел в леса потому, что хотел жить сознательно, иметь дело лишь с важнейшими фактами жизни и посмотреть, не могу ли я научиться тому, чему она должна научить, чтобы не обнаружить перед смертью, что я не жил."
      },
      {
        id: 'p-th-2',
        order: 2,
        sourceText: "I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life.",
        targetText: "Я не хотел жить подделкой под жизнь — жизнь слишком драгоценна; я не хотел и смирения, пока в нем не возникнет крайней нужды. Я хотел жить глубоко и высосать из жизни весь ее мозг."
      },
      {
        id: 'p-th-3',
        order: 3,
        sourceText: "Simplicity, simplicity, simplicity! I say, let your affairs be as two or three, and not a hundred or a thousand; instead of a million count half a dozen, and keep your accounts on your thumb-nail.",
        targetText: "Упрощайте, упрощайте, упрощайте! Я говорю: пусть у вас будет два или три дела, а не сотня или тысяча; вместо миллиона считайте полдюжины и ведите свои счета на ногте большого пальца."
      },
      {
        id: 'p-th-4',
        order: 4,
        sourceText: "Time is but the stream I go a-fishing in. I drink at it; but while I drink I see the sandy bottom and detect how shallow it is. Its thin current slides away, but eternity remains.",
        targetText: "Время — всего лишь ручей, в котором я ужу рыбу. Я пью из него, но пока пью, вижу песчаное дно и замечаю, каков он мелководный. Его тонкая струя уплывает, но вечность остается."
      },
      {
        id: 'p-th-5',
        order: 5,
        sourceText: "Heaven is under our feet as well as over our heads. Morning is when I am awake and there is a dawn in me. Moral reform is the effort to throw off sleep.",
        targetText: "Небо находится у нас под ногами в той же мере, что и над головой. Утро — это когда я пробуждаюсь и во мне восходит рассвет. Нравственная реформа — это попытка сбросить с себя сон."
      },
      {
        id: 'p-th-6',
        order: 6,
        sourceText: "Most of the luxuries, and many of the so-called comforts of life, are not only not indispensable, but positive hindrances to the elevation of mankind.",
        targetText: "Большинство предметов роскоши и многие так называемые удобства жизни не только не необходимы, но и напрямую препятствуют духовному возвышению человечества."
      },
      {
        id: 'p-th-7',
        order: 7,
        sourceText: "I had three chairs in my house; one for solitude, two for friendship, three for society. When visitors came in larger numbers, there was only the hill outside.",
        targetText: "У меня в доме было три стула: один для уединения, два для дружбы, три для общества. Когда приходило больше гостей, им оставался лишь холм снаружи."
      },
      {
        id: 'p-th-8',
        order: 8,
        sourceText: "To be in company, even with the best, is soon wearisome and dissipating. I love to be alone. I never found the companion that was so companionable as solitude.",
        targetText: "Находиться в обществе, даже в самом лучшем, вскоре становится утомительным. Я люблю бывать один. Я никогда не встречал спутника более общительного, чем одиночество."
      },
      {
        id: 'p-th-9',
        order: 9,
        sourceText: "Every morning was a cheerful invitation to make my life of equal simplicity, and I may say innocence, with Nature herself.",
        targetText: "Каждое утро было радостным приглашением сделать мою жизнь столь же простой и, смею сказать, невинной, как сама Природа."
      },
      {
        id: 'p-th-10',
        order: 10,
        sourceText: "The mass of men lead lives of quiet desperation. What is called resignation is confirmed desperation.",
        targetText: "Большинство людей ведут жизнь в тихом отчаянии. То, что называют смирением, есть лишь укоренившееся отчаяние."
      },
      {
        id: 'p-th-11',
        order: 11,
        sourceText: "A lake is the landscape's most beautiful and expressive feature. It is earth's eye; looking into which the beholder measures the depth of his own nature.",
        targetText: "Озеро — прекраснейшая и самая выразительная черта пейзажа. Это глаз земли, глядя в который созерцатель измеряет глубину собственной природы."
      },
      {
        id: 'p-th-12',
        order: 12,
        sourceText: "If a man does not keep pace with his companions, perhaps it is because he hears a different drummer. Let him step to the music which he hears, however measured or far away.",
        targetText: "Если человек идет не в ногу со своими спутниками, возможно, это оттого, что он слышит другого барабанщика. Пусть он шагает под ту музыку, которую слышит, сколь бы ритмичной или далекой она ни была."
      },
      {
        id: 'p-th-13',
        order: 13,
        sourceText: "Rather than love, than money, than fame, give me truth. I sat at a table where were rich food and wine in abundance, but sincerity and truth were not; and I went away hungry.",
        targetText: "Чем любовь, чем деньги, чем слава, дайте мне правду. Я сидел за столом, где было изобилие изысканной еды и вина, но не было искренности и правды; и я ушел голодным."
      },
      {
        id: 'p-th-14',
        order: 14,
        sourceText: "I learned this, at least, by my experiment: that if one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
        targetText: "Из своего опыта я усвоил по крайней мере следующее: если человек уверенно движется в направлении своей мечты и стремится жить той жизнью, которую вообразил, он встретит успех, неожиданный в обычные часы."
      },
      {
        id: 'p-th-15',
        order: 15,
        sourceText: "Do not trouble yourself much to get new things, whether clothes or friends. Turn the old; return to them. Things do not change; we change.",
        targetText: "Не беспокойтесь о том, чтобы приобретать новые вещи, будь то одежда или друзья. Перешивайте старое; возвращайтесь к ним. Вещи не меняются; меняемся мы."
      },
      {
        id: 'p-th-16',
        order: 16,
        sourceText: "Sell your clothes and keep your thoughts. God will see that you do not want society.",
        targetText: "Продайте свою одежду и сохраните свои мысли. Бог позаботится о том, чтобы вы не нуждались в обществе."
      },
      {
        id: 'p-th-17',
        order: 17,
        sourceText: "The sun is but a morning star. There is more day to dawn. The light which puts out our eyes is darkness to us.",
        targetText: "Солнце — всего лишь утренняя звезда. Наступает новый день. Свет, ослепляющий наши глаза, для нас есть тьма."
      },
      {
        id: 'p-th-18',
        order: 18,
        sourceText: "We must learn to reawaken and keep ourselves awake, not by mechanical aids, but by an infinite expectation of the dawn.",
        targetText: "Мы должны научиться пробуждаться и поддерживать свое бодрствование не механическими средствами, а бесконечным ожиданием рассвета."
      },
      {
        id: 'p-th-19',
        order: 19,
        sourceText: "Humility like darkness reveals the heavenly lights. The shadows of poverty and meanness gather around us to make the stars visible.",
        targetText: "Смирение, подобно темноте, открывает небесные светила. Тени бедности и скромности сгущаются вокруг нас, чтобы сделались видимыми звезды."
      },
      {
        id: 'p-th-20',
        order: 20,
        sourceText: "Thoreau's Walden stands as a timeless testament to spiritual self-reliance, environmental stewardship, and deep contemplation.",
        targetText: "«Уолден» Торо остается вневременным свидетельством духовной самостоятельности, бережного отношения к природе и глубокого созерцания."
      }
    ]
  },

  // 13. МОНТЕНЬ - ОПЫТЫ
  {
    id: 'doc-montaigne-essays',
    title: 'Опыты (О беседе, воспитании ума и самопознании)',
    titleTranslations: {
      ru: 'Опыты (О беседе, воспитании ума и самопознании)',
      uk: 'Проби (Про бесіду, виховання розуму та самопізнання)',
      en: 'Essays (On Conversation, Cultivation of Mind, and Self-Knowledge)',
      de: 'Essais (Über das Gespräch, Geistesbildung und Selbsterkenntnis)',
      es: 'Ensayos (Sobre la conversación, la educación de la mente y el autoconocimiento)',
      fr: 'Essais (De la conversation, de l\'éducation de l\'esprit et de la connaissance de soi)',
      it: 'Saggi (Della conversazione, dell\'educazione della mente e della conoscenza di sé)',
      pl: 'Próby (O rozmowie, kształceniu umysłu i samopoznaniu)',
      tr: 'Denemeler (Sohbet, Zihin Eğitimi ve Kendini Tanıma)',
      zh: '随笔集（论交谈、心灵修养与自我认知）',
    },
    author: 'Мишель де Монтень',
    sourceLang: 'fr',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_paris_bookstore_1792929019575.jpg',
    category: 'literature',
    createdAt: Date.now() - 86400000 * 9,
    lastReadAt: Date.now() - 2500000,
    readingProgress: 26,
    wordCount: 495,
    isSample: true,
    passages: [
      {
        id: 'p-mo-1',
        order: 1,
        sourceText: "Le plus fructueux et naturel exercice de notre esprit, c'est à mon gré la conférence. J'en trouve l'usage plus doux que de nulle autre action de notre vie.",
        targetText: "Самое плодотворное и естественное упражнение для нашего ума, на мой взгляд, — это беседа. Я нахожу ее применение более приятным, чем любое другое занятие в нашей жизни."
      },
      {
        id: 'p-mo-2',
        order: 2,
        sourceText: "L'étude des livres est un mouvement languissant et faible qui n'échauffe point, au lieu que la conversation apprend et exerce en même temps.",
        targetText: "Изучение книг — это медлительное и слабое движение, которое не согревает кровь, тогда как живая беседа одновременно обучает и упражняет ум."
      },
      {
        id: 'p-mo-3',
        order: 3,
        sourceText: "Savoir par cœur n'est pas savoir : c'est tenir ce qu'on a donné en garde à sa mémoire. Ce qu'on sait droitement, on en dispose, sans regarder au patron, sans tourner les yeux vers son livre.",
        targetText: "Знать наизусть — еще не значит знать: это лишь удерживать то, что было вверено памяти. Тем, что знаешь по-настоящему, распоряжаешься свободно, не оглядываясь на образец и не глядя в книгу."
      },
      {
        id: 'p-mo-4',
        order: 4,
        sourceText: "La plus grande chose du monde, c'est de savoir être à soi. Il faut réserver une arrière-boutique toute notre, toute franche, en laquelle nous établissions notre vraie liberté.",
        targetText: "Величайшая вещь в мире — это уметь принадлежать самому себе. Нужно сохранить за собой тайный потайной уголок, полностью свободный, где мы утверждаем нашу истинную свободу."
      },
      {
        id: 'p-mo-5',
        order: 5,
        sourceText: "Mon métier et mon art, c'est vivre. C'est là mon étude, mon ouvrage et ma doctrine. Je veux qu'on m'y voie sans artifice et sans étude.",
        targetText: "Мое ремесло и мое искусство — это жить. В этом мое учение, мой труд и моя наука. Я хочу, чтобы меня видели здесь без притворства и натянутости."
      },
      {
        id: 'p-mo-6',
        order: 6,
        sourceText: "Que sais-je ? Cette devise résume toute ma philosophie : l'humilité de la raison devant l'infinie complexité de la nature et de l'âme humaine.",
        targetText: "Что я знаю? Девиз этот подытоживает всю мою философию: смирение разума перед бесконечной сложностью природы и человеческой души."
      },
      {
        id: 'p-mo-7',
        order: 7,
        sourceText: "La vraie liberté est d'avoir pouvoir sur soi-même en toutes choses. Qui apprend à mourir, apprend à ne plus être esclave.",
        targetText: "Истинная свобода заключается в том, чтобы властвовать над собой во всем. Кто научился умирать, тот научился не быть рабом."
      },
      {
        id: 'p-mo-8',
        order: 8,
        sourceText: "Les amitiés véritables sont rares et précieuses. Quand on me demande pourquoi j'aimais La Boétie, je sens que cela ne se peut exprimer qu'en répondant : « Parce que c'était lui, parce que c'était moi. »",
        targetText: "Настоящая дружба редка и драгоценна. Когда меня спрашивают, почему я любил Ла Боэси, я чувствую, что выразить это можно, лишь ответив: «Потому что это был он, потому что это был я»."
      },
      {
        id: 'p-mo-9',
        order: 9,
        sourceText: "Il faut voyager pour froisser et limer notre cervelle contre celle d'autrui. Le monde est un miroir où nous devons nous regarder pour nous connaître bien.",
        targetText: "Нужно путешествовать, чтобы шлифовать и оттачивать наш ум о умы других людей. Мир — это зеркало, в которое мы должны смотреться, чтобы познать себя."
      },
      {
        id: 'p-mo-10',
        order: 10,
        sourceText: "La santé est une précieuse chose, et la seule à la vérité qui mérite qu'on y emploie non seulement le temps, la peine, mais encore la vie même.",
        targetText: "Здоровье — драгоценность, и впрямь единственная вещь, ради которой стоит потратить не только время и труд, но и саму жизнь."
      },
      {
        id: 'p-mo-11',
        order: 11,
        sourceText: "Rien n'est si beau et légitime que de faire bien l'homme et dûment; ni science si difficile que de savoir bien et naturellement vivre cette vie.",
        targetText: "Ничто не столь прекрасно и законно, как достойно и правильно исполнять роль человека; и нет науки труднее, чем уметь правильно и естественно проживать эту жизнь."
      },
      {
        id: 'p-mo-12',
        order: 12,
        sourceText: "Nous ne sommes jamais chez nous, nous sommes toujours au-delà. La crainte, le désir, l'espérance nous élancent vers l'avenir.",
        targetText: "Мы никогда не находимся дома, мы всегда где-то за его пределами. Страх, желание, надежда устремляют нас в будущее."
      },
      {
        id: 'p-mo-13',
        order: 13,
        sourceText: "Chaque homme porte en soi la forme entière de l'humaine condition. En me peignant moi-même, je peins l'humanité tout entière.",
        targetText: "Каждый человек носит в себе целостную форму человеческого состояния. Изображая себя самого, я изображаю все человечество."
      },
      {
        id: 'p-mo-14',
        order: 14,
        sourceText: "L'obstination et l'ardeur d'opinion est la plus sûre preuve de bêtise. Y a-t-il rien de si certain, résolu, dédaigneux, grave, sérieux que l'âne ?",
        targetText: "Упрямство и пылкость в суждениях — самое верное доказательство глупости. Есть ли кто-либо столь же уверенный, решительный, пренебрежительный и серьезный, как осёл?"
      },
      {
        id: 'p-mo-15',
        order: 15,
        sourceText: "Il faut prêter soi aux autres et ne se donner qu'à soi-même. Garder la sérénité de son âme au milieu du tumulte est l'art suprême.",
        targetText: "Одалживать себя надо другим, а отдавать — только самому себе. Сохранять безмятежность души среди шума и суеты — это высшее искусство."
      },
      {
        id: 'p-mo-16',
        order: 16,
        sourceText: "Les livres sont le meilleur muniment que j'aie trouvé à cet humain voyage, et je plains extrêmement les hommes d'esprit qui en manquent.",
        targetText: "Книги — лучшее снаряжение, какое я нашел для этого человеческого путешествия, и я искренне сочувствую разумным людям, лишенным его."
      },
      {
        id: 'p-mo-17',
        order: 17,
        sourceText: "L'âme qui n'a point de but établi, elle se perd; car comme on dit, c'est n'être nulle part que d'être partout.",
        targetText: "Душа, не имеющая перед собой определенной цели, теряется; ибо, как говорят, быть везде — значит не быть нигде."
      },
      {
        id: 'p-mo-18',
        order: 18,
        sourceText: "Sur le plus haut trône du monde, nous ne sommes jamais assis que sur notre cul. N'oublions jamais notre humble nature terrestre.",
        targetText: "Даже на самом высоком престоле в мире мы сидим на собственной заднице. Не будем никогда забывать нашу скромную земную природу."
      },
      {
        id: 'p-mo-19',
        order: 19,
        sourceText: "C'est une bonne chose d'exprimer franchement sa pensée; la sincérité est la marque des âmes nobles et généreuses.",
        targetText: "Прекрасное дело — откровенно высказывать свою мысль; искренность — признак благородных и щедрых душ."
      },
      {
        id: 'p-mo-20',
        order: 20,
        sourceText: "Les Essais de Montaigne inventent le genre de l'essai moderne, célébrant la liberté de pensée et la sincérité du regard introspectif.",
        targetText: "«Опыты» Монтеня создали жанр современного эссе, воспевая свободу мысли и искренность самопознания."
      }
    ]
  },

  // 14. БЭКОН - ОПЫТЫ И НАСТАВЛЕНИЯ
  {
    id: 'doc-bacon-essays',
    title: 'Опыты и наставления (О науке, чтении книг и поиске истины)',
    titleTranslations: {
      ru: 'Опыты и наставления (О науке, чтении книг и поиске истины)',
      uk: 'Досліди та настановлення (Про науку, читання книг та пошук істини)',
      en: 'Essays and Counsels (On Science, Reading Books, and Pursuit of Truth)',
      de: 'Essays und Ratschläge (Über Wissenschaft, Bücherlesen und Wahrheitssuche)',
      es: 'Ensayos (Sobre la ciencia, la lectura de libros y la búsqueda de la verdad)',
      fr: 'Essais (De la science, de la lecture des livres et de la recherche de la vérité)',
      it: 'Saggi (Della scienza, della lettura dei libri e della ricerca della vérité)',
      pl: 'Eseje (O nauce, czytaniu książek i poszukiwaniu prawdy)',
      tr: 'Denemeler (Bilim, Kitap Okuma ve Gerçeğin Peşinde Olma)',
      zh: '培根随笔（论科学、读书与追求真理）',
    },
    author: 'Фрэнсис Бэкон',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_quantum_1792929019401.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 11,
    lastReadAt: Date.now() - 3100000,
    readingProgress: 38,
    wordCount: 482,
    isSample: true,
    passages: [
      {
        id: 'p-ba-1',
        order: 1,
        sourceText: "Studies serve for delight, for ornament, and for ability. Their chief use for delight is in privateness and retiring; for ornament, is in discourse; and for ability, is in the judgment and disposition of business.",
        targetText: "Занятия науками и чтением служат для услады, для украшения и для приобретения способностей. Главная их польза для услады проявляется в уединении и покое; для украшения — в беседе; а для способностей — в суждении и ведении дел."
      },
      {
        id: 'p-ba-2',
        order: 2,
        sourceText: "Read not to contradict and confute; nor to believe and take for granted; nor to find talk and discourse; but to weigh and consider.",
        targetText: "Читай не для того, чтобы противоречить и опровергать; не для того, чтобы слепо верить и принимать на веру; и не для того, чтобы вести пустые разговоры; но чтобы взвешивать и размышлять."
      },
      {
        id: 'p-ba-3',
        order: 3,
        sourceText: "Some books are to be tasted, others to be swallowed, and some few to be chewed and digested; that is, some books are to be read only in parts; others to be read, but not curiously; and some few to be read wholly, and with diligence and attention.",
        targetText: "Одни книги следует лишь попробовать на вкус, другие — проглотить, и лишь немногие — разжевать и переварить; то есть одни книги читают лишь отчасти, другие — без особого тщания, и лишь некоторые — целиком, с усердием и вниманием."
      },
      {
        id: 'p-ba-4',
        order: 4,
        sourceText: "Reading maketh a full man; conference a ready man; and writing an exact man. And therefore, if a man write little, he had need have a great memory; if he confer little, he had need have a present wit.",
        targetText: "Чтение делает человека сведущим, беседа — находчивым, а привычка записывать — точным. И потому, если человек мало пишет, ему нужна хорошая память; если мало беседует — быстрый ум."
      },
      {
        id: 'p-ba-5',
        order: 5,
        sourceText: "Knowledge is power. Truth is the daughter of time, not of authority. Look at the stars, but do not forget the earth under your feet.",
        targetText: "Знание — сила. Истина — дочь времени, а не авторитета. Смотри на звезды, но не забывай про землю под ногами."
      },
      {
        id: 'p-ba-6',
        order: 6,
        sourceText: "A wise man will make more opportunities than he finds. Genius, wit, and spirit are expressed in proverbs.",
        targetText: "Мудрый человек создает больше возможностей, чем находит. Гений, ум и дух народа проявляются в его пословицах."
      },
      {
        id: 'p-ba-7',
        order: 7,
        sourceText: "If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he shall end in certainties.",
        targetText: "Если человек начнет с уверенности, он окончит сомнениями; но если он согласится начать с сомнений, он окончит уверенностью."
      },
      {
        id: 'p-ba-8',
        order: 8,
        sourceText: "He that will not apply new remedies must expect new evils; for time is the greatest innovator.",
        targetText: "Кто не применяет новых средств, пусть ждет новых бед; ибо время — величайший из новаторов."
      },
      {
        id: 'p-ba-9',
        order: 9,
        sourceText: "Prosperity is not without many fears and distastes; and adversity is not without comforts and hopes.",
        targetText: "Процветание не лишено множества опасений и неприятностей; а невзгоды не лишены утешений и надежд."
      },
      {
        id: 'p-ba-10',
        order: 10,
        sourceText: "Virtue is like precious odours, most fragrant when they are incensed or crushed: for prosperity doth best discover vice, but adversity doth best discover virtue.",
        targetText: "Добродетель подобна драгоценным благовониям, наиболее благоухающим при сжигании или раздавливании: ибо процветание лучше выявляет порок, а невзгоды — добродетель."
      },
      {
        id: 'p-ba-11',
        order: 11,
        sourceText: "Revenge is a kind of wild justice; which the more man's nature runs to, the more ought law to weed it out.",
        targetText: "Месть — это род дикого правосудия; и чем больше человеческая природа склоняется к ней, тем более закон должен ее искоренять."
      },
      {
        id: 'p-ba-12',
        order: 12,
        sourceText: "Silence is the virtue of fools. Yet a habit of secrecy is both politic and moral.",
        targetText: "Молчание — добродетель дураков. И все же привычка к сдержанности и благоразумной тайне одновременно политична и моральна."
      },
      {
        id: 'p-ba-13',
        order: 13,
        sourceText: "Nature is often hidden; sometimes overcome; seldom extinguished. Force maketh nature more violent in the return.",
        targetText: "Природа часто скрыта, иногда преодолена, но редко угашена. Насилие лишь делает возвращение природы более бурным."
      },
      {
        id: 'p-ba-14',
        order: 14,
        sourceText: "Whosoever is delighted in solitude is either a wild beast or a god. But true friendship redoubleth joys and cutteth griefs in halves.",
        targetText: "Кто упивается уединением, тот либо дикий зверь, либо бог. Но истинная дружба удваивает радости и делит пополам печали."
      },
      {
        id: 'p-ba-15',
        order: 15,
        sourceText: "Money is like muck, not good except it be spread. Wealth is a good servant, but a terrible master.",
        targetText: "Деньги похожи на навоз: от них нет пользы, если они не рассеяны. Богатство — хороший слуга, но ужасный господин."
      },
      {
        id: 'p-ba-16',
        order: 16,
        sourceText: "Discretion of speech is more than eloquence; and to speak agreeably to him with whom we deal is more than to speak in good words or in good order.",
        targetText: "Сдержанность в речи важнее красноречия; а умение говорить сообразно собеседнику важнее, чем произносить красивые слова по порядку."
      },
      {
        id: 'p-ba-17',
        order: 17,
        sourceText: "Crafty men contemn studies, simple men admire them, and wise men use them; for they teach not their own use.",
        targetText: "Хитрые люди презирают науки, простые люди восхищаются ими, а мудрые люди используют их; ибо сами науки не учат своему применению."
      },
      {
        id: 'p-ba-18',
        order: 18,
        sourceText: "Histories make men wise; poets witty; the mathematics subtil; natural philosophy deep; moral grave; logic and rhetoric able to contend.",
        targetText: "История делает людей мудрыми; поэзия — остроумными; математика — проницательными; естественная философия — глубокими; мораль — серьезными; а логика и риторика — способными спорить."
      },
      {
        id: 'p-ba-19',
        order: 19,
        sourceText: "Age appears to be best in four things: old wood best to burn, old wine to drink, old friends to trust, and old authors to read.",
        targetText: "Старость хороша в четырех вещах: старые дрова лучше горят, старое вино лучше пить, старым друзьям лучше верить, а старых авторов лучше читать."
      },
      {
        id: 'p-ba-20',
        order: 20,
        sourceText: "Francis Bacon's philosophical essays laid the intellectual groundwork for empirical science and rationalist inquiry in modern Europe.",
        targetText: "Философские опыты Фрэнсиса Бэкона заложили интеллектуальный фундамент эмпирической науки и рационального познания в современной Европе."
      }
    ]
  }
];
