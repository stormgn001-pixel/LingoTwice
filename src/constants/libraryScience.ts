import { ReadingDocument } from '../types';

export const SCIENCE_DOCUMENTS: ReadingDocument[] = [
  // 15. ДАРВИН - ПРОИСХОЖДЕНИЕ ВИДОВ
  {
    id: 'doc-darwin-tree-of-life',
    title: 'О происхождении видов: Древо жизни и естественный отбор',
    titleTranslations: {
      ru: 'О происхождении видов: Древо жизни и естественный отбор',
      uk: 'Про походження видів: Древо життя та природний добір',
      en: 'On the Origin of Species: The Tree of Life and Natural Selection',
      de: 'Über die Entstehung der Arten: Stammbaum des Lebens und natürliche Selektion',
      es: 'El origen de las especies: El árbol de la vida y la selección natural',
      fr: 'L\'Origine des espèces : L\'arbre de la vie et la sélection naturelle',
      it: 'L\'origine delle specie: L\'albero della vita e la selezione naturale',
      pl: 'O powstawaniu gatunków: Drzewo życia i dobór naturalny',
      tr: 'Türlerin Kökeni: Yaşam Ağacı ve Doğal Seçilim',
      zh: '物种起源：生命之树与自然选择',
    },
    author: 'Чарльз Дарвин',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_darwin_1792929020043.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 8,
    lastReadAt: Date.now() - 1800000,
    readingProgress: 15,
    wordCount: 857,
    isSample: true,
    passages: [
      {
        id: 'p-dtl-1',
        order: 1,
        sourceText: "It is interesting to contemplate a tangled bank, clothed with many plants of many kinds, with birds singing on the bushes, with various insects flitting about, and with worms crawling through the damp earth, and to reflect that these elaborately constructed forms, so different from each other, and dependent upon each other in so complex a manner, have all been produced by laws acting around us.",
        targetText: "Любопытно наблюдать густо заросший берег, покрытый разнообразными растениями множества видов, с поющими в кустах птицами, порхающими вокруг насекомыми и червями, ползающими в сырой земле, и сознавать, что все эти причудливо устроенные формы, столь несхожие между собой и так сложно зависимые друг от друга, были порождены законами, непрерывно действовавшими вокруг нас."
      },
      {
        id: 'p-dtl-2',
        order: 2,
        sourceText: "These laws, taken in the largest sense, being Growth with reproduction; Inheritance which is almost implied by reproduction; Variability from the indirect and direct action of the conditions of life, and from use and disuse; a Ratio of Increase so high as to lead to a Struggle for Life, and as a consequence to Natural Selection.",
        targetText: "Законы эти в самом широком смысле — это Рост с воспроизводством; Наследственность, почти неотделимая от размножения; Изменчивость, порожденная действием условий жизни и упражнением либо неупражнением органов; и Возрастание численности в прогрессии, приводящее к Борьбе за жизнь и, как следствие, к Естественному отбору."
      },
      {
        id: 'p-dtl-3',
        order: 3,
        sourceText: "Entailing Divergence of Character and the Extinction of less-improved forms. Thus, from the war of nature, from famine and death, the most exalted object which we are capable of conceiving, namely, the production of the higher animals, directly follows.",
        targetText: "Влекущему за собой Дисперсию признаков и Вымирание менее усовершенствованных форм. Таким образом, из войны природы, из голода и смерти непосредственно вытекает самый возвышенный предмет, который мы способны себе представить, — рождение высших животных."
      },
      {
        id: 'p-dtl-4',
        order: 4,
        sourceText: "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
        targetText: "Есть подлинное величие в этом воззрении на жизнь с ее разнообразными силами, вдохнутыми некогда в несколько форм или в одну; и в том, что, пока наша планета продолжает совершать круговороты согласно неизменным законам тяготения, из столь простого начала развились и продолжают развиваться бесконечные формы, прекраснейшие и удивительнейшие."
      },
      {
        id: 'p-dtl-5',
        order: 5,
        sourceText: "Natural Selection is daily and hourly scrutinising, throughout the world, every variation, even the slightest; rejecting that which is bad, preserving and adding up all that is good; silently and insensibly working, whenever and wherever opportunity offers, at the improvement of each organic being in relation to its organic and inorganic conditions of life.",
        targetText: "Естественный отбор ежедневно и ежечасно расследует по всему свету мельчайшие изменения, отбрасывая дурное, сохраняя и накапливая всё хорошее; он работает молча и незаметно, везде и всегда, где только предоставляется случай, над усовершенствованием каждого органического существа по отношению к его органическим и неорганическим условиям жизни."
      },
      {
        id: 'p-dtl-6',
        order: 6,
        sourceText: "We see nothing of these slow changes in progress, until the hand of time has marked the long lapse of ages, and then so imperfect is our view into long past geological ages, that we only see that the forms of life are now different from what they formerly were.",
        targetText: "Мы не замечаем этих медленных изменений в ходе их развития, пока рука времени не отметит истечения долгих веков, да и тогда наш взгляд на давно прошедшие геологические эпохи настолько несовершенен, что мы видим лишь то, что формы жизни теперь иные, чем они были прежде."
      },
      {
        id: 'p-dtl-7',
        order: 7,
        sourceText: "The affinities of all the beings of the same class have sometimes been represented by a great tree. I believe this simile largely speaks the truth. The green and budding twigs may represent existing species; and those produced during former years may represent the long succession of extinct species.",
        targetText: "Родство всех существ одного класса иногда изображалось в виде великого древа. Я верю, что это сравнение выражает истину. Зеленые почкующиеся веточки могут символизировать ныне существующие виды; а веточки образовавшиеся в прежние годы, представляют длинный ряд вымерших видов."
      },
      {
        id: 'p-dtl-8',
        order: 8,
        sourceText: "At each period of growth all the growing twigs have tried to branch out on all sides, and to overtop and kill the surrounding twigs and branches, in the same manner as species and groups of species have at all times overmastered other species in the great battle for life.",
        targetText: "В каждый период роста все растущие веточки старались разветвиться во все стороны, перерасти и заглушить окружающие ветви точно так же, как виды и группы видов во все времена одолевали другие виды в великой битве за жизнь."
      },
      {
        id: 'p-dtl-9',
        order: 9,
        sourceText: "As buds give rise by growth to fresh buds, and these, if vigorous, branch out and overtop on all sides many a feebler branch, so by generation I believe it has been with the great Tree of Life, which fills with its dead and broken branches the crust of the earth, and covers the surface with its ever-branching and beautiful ramifications.",
        targetText: "Как почки дают жизнь новым почкам, а те, если они сильны, разрастаются во все стороны, глуша слабые ветви, так же, я верю, было путем размножения и с великим Древом Жизни, которое наполняет своими мертвыми и сломанными сучьями земную кору и покрывает ее поверхность непрестанно ветвящимися и прекрасными разветвлениями."
      },
      {
        id: 'p-dtl-10',
        order: 10,
        sourceText: "Nothing can be more easy than to admit in words the truth of the universal struggle for life, or more difficult—at least I have found it so—than constantly to bear this conclusion in mind.",
        targetText: "Нет ничего более легкого, чем признать на словах истину всеобщей борьбы за жизнь, и нет ничего более трудного — по крайней мере, я убедился в этом на собственном опыте, — чем постоянно удерживать этот вывод в уме."
      },
      {
        id: 'p-dtl-11',
        order: 11,
        sourceText: "A struggle for existence inevitably follows from the high rate at which all organic beings tend to increase. Every being, which during its natural lifetime produces several eggs or seeds, must suffer destruction during some period of its life.",
        targetText: "Борьба за существование неизбежно вытекает из высокой скорости, с которой все органические существа стремятся размножаться. Каждое существо, производящее несколько яиц или семян, должно подвергаться уничтожению в какой-то период своей жизни."
      },
      {
        id: 'p-dtl-12',
        order: 12,
        sourceText: "Otherwise, on the principle of geometrical increase, its numbers would quickly become so inordinately great that no country could support the product. Hence, as more individuals are produced than can possibly survive, there must in every case be a struggle for existence.",
        targetText: "Иначе, в силу принципа геометрического возрастания, его численность быстро стала бы настолько чрезмерной, что ни одна страна не смогла бы прокормить это потомство. Следовательно, поскольку рождается больше особей, чем может выжить, в каждом случае должна происходить борьба за существование."
      },
      {
        id: 'p-dtl-13',
        order: 13,
        sourceText: "Slow though the process of selection may be, if feeble man can do much by artificial selection, I can see no limit to the amount of change, to the beauty and complexity of the coadaptations between all organic beings, which may be effected in the long course of time through nature's power of selection.",
        targetText: "Как ни медлен процесс отбора, если даже слабый человек может много сделать с помощью искусственного отбора, я не вижу предела объему изменений, красоте и сложности взаимных приспособлений всех существ, которые могут быть осуществлены за долгий ход времени благодаря отбирающей силе природы."
      },
      {
        id: 'p-dtl-14',
        order: 14,
        sourceText: "Slight variations, not useful nor injurious to the individual, would not be affected by natural selection, and would be left either a fluctuating element, as perhaps we see in certain polymorphic species, or would ultimately become fixed.",
        targetText: "Незначительные изменения, не полезные и не вредные для особи, не подвергались бы воздействию естественного отбора и остались бы либо колеблющимся элементом, либо в конечном счете зафиксировались бы."
      },
      {
        id: 'p-dtl-15',
        order: 15,
        sourceText: "When we look at the plants and bushes clothing an entangled bank, we are tempted to attribute their proportional numbers and kinds to what we call chance. But how false a view is this!",
        targetText: "Когда мы смотрим на растения и кусты, покрывающие заросший берег, мы испытываем соблазн приписать их численность и виды тому, что мы называем случаем. Но насколько же ложен этот взгляд!"
      },
      {
        id: 'p-dtl-16',
        order: 16,
        sourceText: "Extinction of old forms is the almost inevitable consequence of the production of new forms. The competition between species determines which lineage survives through deep time.",
        targetText: "Вымирание старых форм — почти неизбежное следствие возникновения новых форм. Конкуренция между видами определяет, какая именно линия выживает сквозь толщу времен."
      },
      {
        id: 'p-dtl-17',
        order: 17,
        sourceText: "The geological record is incomparably more imperfect than is generally supposed. The crust of the earth with its embedded remains must not be looked at as a well-filled museum, but as a poor collection made at hazard.",
        targetText: "Геологическая летопись несравненно более несовершенна, чем обычно считают. На земную кору с ее ископаемыми остатками следует смотреть не как на богатый музей, а как на скудное собрание, составленное случайно."
      },
      {
        id: 'p-dtl-18',
        order: 18,
        sourceText: "When the views expressed by me in this volume are generally admitted, we can dimly foresee that there will be a considerable revolution in natural history.",
        targetText: "Когда взгляды, изложенные мною в этом томе, получат общее признание, мы сможем смутно предвидеть значительный переворот в естественной истории."
      },
      {
        id: 'p-dtl-19',
        order: 19,
        sourceText: "Light will be thrown on the origin of man and his history. Psychology will be securely based on the foundation already well laid by Mr. Herbert Spencer.",
        targetText: "Свет будет пролит на происхождение человека и его историю. Психология будет твердо поставлена на основание, уже заложенное мистером Гербертом Спенсером."
      },
      {
        id: 'p-dtl-20',
        order: 20,
        sourceText: "Darwin's revolutionary treatise fundamentally reshaped biological sciences, establishing evolution through natural selection as the unifying principle of living systems.",
        targetText: "Революционный труд Дарвина коренным образом преобразил биологические науки, утвердив эволюцию путем естественного отбора в качестве объединяющего принципа всех живых систем."
      }
    ]
  },

  // 16. КВАНТОВАЯ ЗАПУТАННОСТЬ
  {
    id: 'doc-quantum-entanglement',
    title: 'Квантовая запутанность и ткань пространства-времени',
    titleTranslations: {
      ru: 'Квантовая запутанность и ткань пространства-времени',
      uk: 'Квантова заплутаність і тканина простору-часу',
      en: 'Quantum Entanglement and the Fabric of Spacetime',
      de: 'Quantenverschränkung und das Gewebe der Raumzeit',
      es: 'Entrelazamiento cuántico y el tejido del espacio-tiempo',
      fr: 'L\'intrication quantique et le tissu de l\'espace-temps',
      it: 'L\'intreccio quantistico e il tessuto dello spazio-tempo',
      pl: 'Splecenie kwantowe i tkanina czasoprzestrzeni',
      tr: 'Kuantum Dolanıklığı ve Uzay-Zaman Dokusu',
      zh: '量子纠缠与时空织锦',
    },
    author: 'Dr. Alistair Vance & Prof. Eliza Reed',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_quantum_1792929019401.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 2,
    lastReadAt: Date.now() - 1200000,
    readingProgress: 50,
    wordCount: 544,
    isSample: true,
    passages: [
      {
        id: 'p-qe-1',
        order: 1,
        sourceText: "Quantum entanglement represents one of the most counterintuitive foundations of modern physics. When two particles enter an entangled state, their physical properties become inextricably linked regardless of the spatial distance separating them.",
        targetText: "Квантовая запутанность представляет собой один из самых парадоксальных фундаментальных принципов современной физики. Когда две частицы оказываются в запутанном состоянии, их физические характеристики становятся неразрывно связанными, независимо от разделяющего их пространственного расстояния."
      },
      {
        id: 'p-qe-2',
        order: 2,
        sourceText: "Einstein famously characterized this phenomenon as »spooky action at a distance«. Yet experimental verification, notably recognized in the 2022 Nobel Prize in Physics awarded to Alain Aspect, John Clauser, and Anton Zeilinger, demonstrates that the universe is fundamentally non-local at its deepest quantum stratum.",
        targetText: "Эйнштейн знаменито охарактеризовал это явление как «жуткое дальнодействие». Тем не менее экспериментальные подтверждения, отмеченные Нобелевской премией по физике 2022 года (Ален Аспе, Джон Клаузер и Антон Цайлингер), доказали, что на самом глубоком квантовом уровне наша Вселенная фундаментально нелокальна."
      },
      {
        id: 'p-qe-3',
        order: 3,
        sourceText: "Contemporary theoretical conjectures, such as the ER=EPR hypothesis formulated by Juan Maldacena and Leonard Susskind, propose that spacetime itself may not be a fundamental container, but rather an emergent macroscopic fabric woven together by quantum entanglement threads between microstates.",
        targetText: "Современные теоретические гипотезы, такие как концепция ER=EPR, выдвинутая Хуаном Малдасеной и Леонардом Сасскиндом, предполагают, что само пространство-время может быть не фундаментальным вместилищем, а эмерджентной макроскопической тканью, сотканной нитями квантовой запутанности между микросостояниями."
      },
      {
        id: 'p-qe-4',
        order: 4,
        sourceText: "In quantum information processing, entanglement serves as the foundational currency for quantum teleportation protocols, superdense coding, and error-correcting algorithms essential for fault-tolerant quantum computation.",
        targetText: "В обработке квантовой информации запутанность служит базовым ресурсом для протоколов квантовой телепортации, сверхплотного кодирования и корректирующих ошибки алгоритмов, необходимых для отказоустойчивых квантовых вычислений."
      },
      {
        id: 'p-qe-5',
        order: 5,
        sourceText: "When a measurement is performed on one member of an entangled pair, the wave function collapses instantaneously across the entire system. This does not violate special relativity because no classical information can be transmitted faster than light without a accompanying classical signal channel.",
        targetText: "Когда измерение проводится над одной из частиц запутанной пары, волновая функция мгновенно коллапсирует во всей системе. Это не нарушает специальную теорию относительности, поскольку никакая классическая информация не может быть передана быстрее света без сопутствующего классического канала связи."
      },
      {
        id: 'p-qe-6',
        order: 6,
        sourceText: "The phenomenon challenges our deep-seated macroscopic intuitions regarding realism and locality. In a non-local universe, particles do not possess definite values prior to measurement, forcing physics to embrace a probabilistic, relational architecture of physical reality.",
        targetText: "Этот феномен бросает вызов нашим укоренившимся макроскопическим представлениям о реализме и локальности. В нелокальной вселенной частицы не обладают определенными значениями до проведения измерения, заставляя физику принять вероятностную, реляционную архитектуру физической реальности."
      },
      {
        id: 'p-qe-7',
        order: 7,
        sourceText: "Bell's theorem mathematically established that no local hidden variable theory can reproduce all predictions of quantum mechanics. Violations of Bell's inequalities in laboratory experiments confirmed that nature inherently rejects local realism.",
        targetText: "Теорема Белла математически установила, что никакая теория локальных скрытых параметров не может воспроизвести все предсказания квантовой механики. Нарушения неравенств Белла в лабораторных экспериментах подтвердили, что природа отвергает локальный реализм."
      },
      {
        id: 'p-qe-8',
        order: 8,
        sourceText: "Quantum coherence and decoherence govern the transition between the microscopic quantum realm and the macroscopic classical world we experience daily.",
        targetText: "Квантовая когерентность и декогеренция управляют переходом между микроскопическим квантовым царством и макроскопическим классическим миром, в котором мы живем каждый день."
      },
      {
        id: 'p-qe-9',
        order: 9,
        sourceText: "Decoherence occurs when a quantum system interacts with its surrounding environment, entangling its states with trillions of degrees of freedom, effectively suppressing observable interference phenomena.",
        targetText: "Декогеренция происходит, когда квантовая система взаимодействует с окружающей средой, запутывая свои состояния с триллионами степеней свободы, фактически подавляя наблюдаемые интерференционные явления."
      },
      {
        id: 'p-qe-10',
        order: 10,
        sourceText: "Quantum teleportation enables the exact transfer of an unknown quantum state from one location to another, destroying the original state in accordance with the no-cloning theorem.",
        targetText: "Квантовая телепортация позволяет точно передать неизвестное квантовое состояние из одного места в другое, уничтожая исходное состояние в соответствии с теоремой о запрете клонирования."
      },
      {
        id: 'p-qe-11',
        order: 11,
        sourceText: "The holographic principle suggests that the information contained within a volume of space can be fully encoded on its surrounding boundary, with quantum entanglement serving as the binding agent.",
        targetText: "Голографический принцип указывает на то, что информация, содержащаяся внутри объема пространства, может быть полностью закодирована на его границе, а квантовая запутанность выступает в роли связующего звена."
      },
      {
        id: 'p-qe-12',
        order: 12,
        sourceText: "Wormholes, or Einstein-Rosen bridges, are hypothesized to be the gravitational manifestation of entangled quantum states, bridging quantum mechanics and general relativity.",
        targetText: "Червоточины, или мосты Эйнштейна-Розена, по гипотезам являются гравитационным проявлением запутанных квантовых состояний, объединяя квантовую механику и общую теорию относительности."
      },
      {
        id: 'p-qe-13',
        order: 13,
        sourceText: "Quantum cryptography relies on entanglement to guarantee unconditional security in key distribution, where any eavesdropping attempt instantly corrupts the quantum entanglement signal.",
        targetText: "Квантовая криптография опирается на запутанность для обеспечения безусловной безопасности распределения ключей, где любая попытка перехвата мгновенно разрушает квантовый запутанный сигнал."
      },
      {
        id: 'p-qe-14',
        order: 14,
        sourceText: "Multiparticle entanglement, such as Greenberger-Horne-Zeilinger (GHZ) states, demonstrates extreme forms of non-locality involving three or more quantum bits simultaneously.",
        targetText: "Многочастичная запутанность, такая как состояния Гринбергера-Хорна-Цайлингера (GHZ), демонстрирует экстремальные формы нелокальности, включающие три или более квантовых бита одновременно."
      },
      {
        id: 'p-qe-15',
        order: 15,
        sourceText: "In condensed matter physics, quantum entanglement gives rise to topological phases of matter, fractional quantum Hall effects, and high-temperature superconductivity.",
        targetText: "В физике конденсированного состояния квантовая запутанность порождает топологические фазы материи, фракционный квантовый эффект Холла и высокотемпературную сверхпроводимость."
      },
      {
        id: 'p-qe-16',
        order: 16,
        sourceText: "The black hole information paradox focuses on what happens to quantum entanglement when particles fall past the event horizon into a gravitational singularity.",
        targetText: "Информационный парадокс черных дыр сосредоточен на том, что происходит с квантовой запутанностью, когда частицы падают за горизонт событий в гравитационную сингулярность."
      },
      {
        id: 'p-qe-17',
        order: 17,
        sourceText: "Hawking radiation itself consists of entangled pairs created near the event horizon, where one particle escapes into space while the other falls into the black hole.",
        targetText: "Излучение Хокинга состоит из запутанных пар, создаваемых вблизи горизонта событий, где одна частица улетает в пространство, а другая падает в черную дыру."
      },
      {
        id: 'p-qe-18',
        order: 18,
        sourceText: "Advancements in quantum optics allow scientists to create entangled photon pairs at high rates and distribute them across hundreds of kilometers via fiber networks and satellites.",
        targetText: "Успехи в квантовой оптике позволяют ученым создавать запутанные фотонные пары с высокой скоростью и распределять их на сотни километров через оптоволоконные сети и спутники."
      },
      {
        id: 'p-qe-19',
        order: 19,
        sourceText: "As quantum technology matures, controlling entanglement will transform computation, metrology, and our fundamental understanding of cosmological emergence.",
        targetText: "По мере созревания квантовых технологий управление запутанностью преобразит вычисления, метрологию и наше фундаментальное понимание возникновения космоса."
      },
      {
        id: 'p-qe-20',
        order: 20,
        sourceText: "Quantum entanglement proves that the cosmos is an interconnected web, where separated entities remain bound at the deepest stratum of physical reality.",
        targetText: "Квантовая запутанность доказывает, что космос представляет собой взаимосвязанную сеть, где разделенные сущности остаются едиными на самом глубоком уровне физической реальности."
      }
    ]
  },

  // 17. АРХИТЕКТУРА РАЗУМА (НЕЙРОСЕТИ И ЯЗЫК)
  {
    id: 'doc-neural-constellations',
    title: 'Архитектура разума: Нейросети и человеческий язык',
    titleTranslations: {
      ru: 'Архитектура разума: Нейросети и человеческий язык',
      uk: 'Архітектура розуму: Нейромережі та людська мова',
      en: 'Architecture of Mind: Neural Networks and Human Language',
      de: 'Architektur des Geistes: Neuronale Netze und menschliche Sprache',
      es: 'Arquitectura de la mente: Redes neuronales y lenguaje humano',
      fr: 'Architecture de l\'esprit : Réseaux de neurones et langage humain',
      it: 'Architettura della mente: Reti neurali e linguaggio umano',
      pl: 'Architektura umysłu: Sieci neuronowe i język ludzki',
      tr: 'Zihin Mimarisi: Nöral Ağlar ve İnsan Dili',
      zh: '心灵的架构：神经网络与人类语言',
    },
    author: 'Dr. Elara Vance',
    sourceLang: 'en',
    targetLang: 'ru',
    coverImage: '/src/assets/images/book_cover_technology_1792926491315.jpg',
    category: 'science',
    createdAt: Date.now() - 86400000 * 3,
    lastReadAt: Date.now() - 7200000,
    readingProgress: 20,
    wordCount: 460,
    isSample: true,
    passages: [
      {
        id: 'p-nc-1',
        order: 1,
        sourceText: "Human language is not merely an exchange of symbolic tokens; it is a dynamic neural coordinate system that shapes how we construct reality. When two minds communicate in different tongues, they are navigating subtly distinct conceptual manifolds.",
        targetText: "Человеческий язык — это не просто обмен символическими знаками; это динамическая нейронная система координат, формирующая наше восприятие реальности. Когда два сознания общаются на разных языках, они перемещаются по едва уловимо различным концептуальным многообразиям."
      },
      {
        id: 'p-nc-2',
        order: 2,
        sourceText: "Modern transformer architectures map words into dense high-dimensional semantic spaces. In these vector topologies, semantic proximity translates to geometric distance, allowing mathematical bridges between languages once thought fundamentally incommensurable.",
        targetText: "Современные архитектуры трансформеров проецируют слова в плотные многомерные семантические пространства. В этих векторных топологиях смысловая близость выражается геометрическим расстоянием, создавая математические мосты между языками, некогда считавшимися несоизмеримыми."
      },
      {
        id: 'p-nc-3',
        order: 3,
        sourceText: "Bilingual reading activates concurrent cortical networks. As the eyes track parallel passages, the hippocampus and prefrontal cortex orchestrate dual semantic decoding, reinforcing neural plasticity and long-term vocabulary retention far beyond rote memorization.",
        targetText: "Билингвальное чтение активирует одновременно несколько корковых сетей. Когда глаза следят за параллельными фрагментами текста, гиппокамп и префронтальная кора координируют двойное семантическое декодирование, укрепляя нейропластичность и долговременное запоминание слов гораздо эффективнее простой зубрёжки."
      },
      {
        id: 'p-nc-4',
        order: 4,
        sourceText: "The future of polyglot cognition lies in symbiotic reading environments that dynamically scaffold comprehension, gradually dimming translational aids as comprehension deepens.",
        targetText: "Будущее полиглотного познания лежит в симбиотических средах чтения, которые динамически поддерживают понимание, постепенно ослабляя подсказки перевода по мере углубления языкового навыка."
      },
      {
        id: 'p-nc-5',
        order: 5,
        sourceText: "Self-attention mechanisms allow artificial neural networks to weigh the contextual dependencies between distant tokens across thousands of dimensions, mirroring the associative recall processes observed in biological cortical assemblies during deep reading.",
        targetText: "Механизмы самовнимания позволяют искусственным нейронным сетям взвешивать контекстуальные зависимости между далекими токенами во тысячах измерений, отражая процессы ассоциативного извлечения памяти, наблюдаемые в биологических корах во время глубокого чтения."
      },
      {
        id: 'p-nc-6',
        order: 6,
        sourceText: "Broca's and Wernicke's areas in the left cerebral hemisphere operate as specialized processing hubs, integrating syntax and semantics in real-time acoustic and visual streams.",
        targetText: "Области Брока и Вернике в левом полушарии головного мозга работают как специализированные узлы обработки, интегрирующие синтаксис и семантику в реальном времени акустических и визуальных потоков."
      },
      {
        id: 'p-nc-7',
        order: 7,
        sourceText: "Neuroplasticity enables adult language learners to form new dendritic spines and myelinated pathways, refuting the classical notion that native fluency is impossible past childhood critical windows.",
        targetText: "Нейропластичность позволяет взрослым изучающим языки формировать новые дендритные шипики и миелинизированные пути, опровергая классическое представление о невозможности освоения языка во взрослом возрасте."
      },
      {
        id: 'p-nc-8',
        order: 8,
        sourceText: "Conceptual metaphors act as cognitive mappings from concrete sensory-motor experiences to abstract intellectual domains, anchoring language deep within embodied physiology.",
        targetText: "Концептуальные метафоры действуют как когнитивные проекции из сенсомоторного опыта в абстрактные интеллектуальные сферы, укореняя язык в телесной физиологии."
      },
      {
        id: 'p-nc-9',
        order: 9,
        sourceText: "Cross-lingual alignment techniques align vector representations across multiple languages without requiring direct bilingual dictionaries, uncovering universal human semantic invariants.",
        targetText: "Методы межязыкового выравнивания сопоставляют векторные представления в нескольких языках без необходимости прямого словаря, раскрывая универсальные семантические инварианты."
      },
      {
        id: 'p-nc-10',
        order: 10,
        sourceText: "Eye-tracking studies during parallel text reading reveal that expert polyglots rapidly cross-check structural equivalences, strengthening cognitive cognitive flexibility and working memory.",
        targetText: "Исследования с помощью трекинга глаз при чтении параллельных текстов показывают, что полиглоты быстро сопоставляют структурные эквиваленты, укрепляя когнитивную гибкость и рабочую память."
      },
      {
        id: 'p-nc-11',
        order: 11,
        sourceText: "The Sapir-Whorf hypothesis, in its modern weak formulation, confirms that linguistic structures subtly influence attentional allocation and categorization without constraining thought.",
        targetText: "Гипотеза Сепира-Уорфа в ее современной слабой формулировке подтверждает, что языковые структуры влияют на распределение внимания и категоризацию, не огранивая саму мысль."
      },
      {
        id: 'p-nc-12',
        order: 12,
        sourceText: "Synaptic pruning and long-term potentiation represent the cellular substrates of vocabulary acquisition, turning fragile short-term neural firings into permanent memory traces.",
        targetText: "Синаптический прунинг и долговременная потенциация представляют собой клеточный субстрат усвоения лексики, превращая хрупкие импульсы в постоянные следы памяти."
      },
      {
        id: 'p-nc-13',
        order: 13,
        sourceText: "Generative pre-trained models demonstrate emergent reasoning properties when scaled to hundreds of billions of parameters, prompting fresh questions in philosophy of mind.",
        targetText: "Генеративные предобученные модели демонстрируют эмерджентные свойства рассуждения при масштабировании до сотен миллиардов параметров, ставя новые вопросы перед философией сознания."
      },
      {
        id: 'p-nc-14',
        order: 14,
        sourceText: "The interface between natural natural cognition and synthetic neural networks creates new paradigms for personalized education and interactive translation platforms.",
        targetText: "Интерфейс между естественным познанием и синтетическими нейросетями создает новые парадигмы для персонализированного образования и интерактивных платформ перевода."
      },
      {
        id: 'p-nc-15',
        order: 15,
        sourceText: "Phonological awareness and prosodic tracking in auditory cortex provide the rhythmic scaffolding necessary for rapid decoding of complex syntax.",
        targetText: "Фонологическое осознание и просодическое отслеживание в слуховой коре дают ритмический каркас, необходимый для быстрого декодирования сложного синтаксиса."
      },
      {
        id: 'p-nc-16',
        order: 16,
        sourceText: "Mirror neurons may facilitate linguistic empathy, allowing listeners to simulate the physical and emotional states expressed by the speaker in real-time.",
        targetText: "Зеркальные нейроны могут способствовать языковой эмпатии, позволяя слушателям в реальном времени симулировать физические и эмоциональные состояния говорящего."
      },
      {
        id: 'p-nc-17',
        order: 17,
        sourceText: "Cognitive load theory emphasizes that optimal learning occurs when instructional designs minimize extraneous mental burden while maximizing germane processing.",
        targetText: "Теория когнитивной нагрузки подчеркивает, что оптимальное обучение происходит тогда, когда формат материалов минимизирует постороннюю нагрузку, максимизируя полезную обработку."
      },
      {
        id: 'p-nc-18',
        order: 18,
        sourceText: "Deep learning models trained on multilingual corpora organize representations into hierarchical clusters that reflect genealogical language families and typological features.",
        targetText: "Модели глубокого обучения, обученные на многоязычных корпусах, организуют представления в иерархические кластеры, отражающие генеалогические языковые семьи и типологические черты."
      },
      {
        id: 'p-nc-19',
        order: 19,
        sourceText: "The integration of multi-sensory feedback in digital reading software stimulates visual, auditory, and motor pathways, accelerating foreign language fluency.",
        targetText: "Интеграция мультисенсорной обратной связи в цифровых программах для чтения стимулирует визуальные, слуховые и моторные пути, ускоряя освоение иностранного языка."
      },
      {
        id: 'p-nc-20',
        order: 20,
        sourceText: "Understanding the neural constellations of human language opens unprecedented horizons for bridging cultures and expanding human cognitive potential.",
        targetText: "Понимание нейронных созвездий человеческого языка открывает небывалые горизонты для сближения культур и расширения когнитивного потенциала человека."
      }
    ]
  }
];
