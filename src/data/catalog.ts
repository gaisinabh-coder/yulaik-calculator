export const START_SECTIONS = [
  {
    id: 'collections',
    imageKey: 'kit',
    name: 'Готовые коллекции',
    description:
      'Посмотреть лимитированные коллекции для маркетов, городских событий и подарочного мерча.',
  },
  {
    id: 'custom_order',
    imageKey: 'single',
    name: 'Индивидуальный заказ',
    description:
      'Рассчитать один вид изделий или нанесение на ваших вещах.',
  },
  {
    id: 'team_kit',
    imageKey: 'travel',
    name: 'Комплекты для команд',
    description:
      'Собрать комплект для секции, студии, команды, коллектива или выезда.',
  },
] as const;

export const PRINT_METHODS = [
  {
    id: 'print',
    name: 'Печать',
    description:
      'Базовое нанесение логотипа, имени, номера, надписи или авторского принта.',
    extraPricePerPrintedItem: 0,
  },
  {
    id: 'embroidery',
    name: 'Вышивка',
    description:
      'Более статусное нанесение для худи, толстовок, шоперов, сумок и подарочных изделий.',
    extraPricePerPrintedItem: 350,
  },
] as const;

export const READY_COLLECTIONS = [
  {
    id: 'tastes_orenburg',
    imageKey: 'eventMember',
    name: 'Вкусы Оренбуржья',
    description:
      'Лимитированная коллекция для гастромаркетов, городских событий и сувениров с локальным характером.',
    priceLabel: 'готовые изделия по наличию',
    products: [
      {
        id: 'tastes_tshirt_01',
        imageKey: 'tshirt',
        type: 'Футболка',
        variant: 'Вкусы Оренбуржья',
        name: 'Футболка «Вкусы Оренбуржья»',
        description:
          'Футболка с авторским принтом из коллекции «Вкусы Оренбуржья».',
        price: 1490,
      },
      {
        id: 'tastes_shopper_01',
        imageKey: 'shopper',
        imageUrl: '/catalog/tastes-shopper-01.jpg',
        type: 'Шопер',
        variant: 'Вкусы Оренбуржья',
        name: 'Шопер «Вкусы Оренбуржья»',
        description:
          'Плотный шопер с принтом коллекции. Удобен для маркета, прогулки и подарочного набора.',
        price: 690,
      },
      {
        id: 'tastes_bandana_01',
        imageKey: 'drawstringBag',
        type: 'Бандана',
        variant: 'Вкусы Оренбуржья',
        name: 'Бандана «Вкусы Оренбуржья»',
        description:
          'Бандана с графикой коллекции — акцентный аксессуар для образа или команды.',
        price: 490,
      },
      {
        id: 'tastes_bottle_case_01',
        imageKey: 'accessoryLogo',
        imageUrl: '/catalog/tastes-bottle-01.jpg',
        type: 'Чехол для бутылки',
        variant: 'Вкусы Оренбуржья',
        name: 'Чехол для бутылки «Вкусы Оренбуржья»',
        description:
          'Текстильный чехол для бутылки с принтом. Лёгкий сувенирный аксессуар для событий и прогулок.',
        price: 590,
      },
      {
        id: 'tastes_cupholder_01',
        imageKey: 'crossbody',
        type: 'Капхолдер',
        variant: 'Вкусы Оренбуржья',
        name: 'Капхолдер «Вкусы Оренбуржья»',
        description:
          'Аксессуар для стакана с принтом коллекции. Удобен для фестивалей, кофе и прогулок.',
        price: 440,
      },
      {
        id: 'tastes_keychain_01',
        imageKey: 'accessoryLogo',
        type: 'Брелок / тег',
        variant: 'Вкусы Оренбуржья',
        name: 'Брелок / тег «Вкусы Оренбуржья»',
        description:
          'Небольшой сувенирный аксессуар с графикой коллекции.',
        price: 190,
      },
    ],
  },
  {
    id: 'orenburzhye',
    imageKey: 'kit',
    name: 'Оренбуржье',
    description:
      'Коллекция с образами Оренбуржья: степь, городские смыслы, локальные символы и авторские принты.',
    priceLabel: 'готовые изделия по наличию',
    products: [
      {
        id: 'orenburzhye_tshirt_01',
        imageKey: 'tshirt',
        type: 'Футболка',
        variant: 'Оренбуржье',
        name: 'Футболка «Оренбуржье»',
        description:
          'Футболка с авторским принтом о степи, городе и локальной идентичности.',
        price: 1490,
      },
      {
        id: 'orenburzhye_shopper_01',
        imageKey: 'shopper',
        type: 'Шопер',
        variant: 'Оренбуржье',
        name: 'Шопер «Оренбуржье»',
        description:
          'Шопер с локальным принтом. Подходит для подарка, маркета и повседневного использования.',
        price: 690,
      },
      {
        id: 'orenburzhye_bandana_01',
        imageKey: 'drawstringBag',
        type: 'Бандана',
        variant: 'Оренбуржье',
        name: 'Бандана «Оренбуржье»',
        description:
          'Бандана с графикой коллекции «Оренбуржье». Можно использовать как аксессуар или элемент образа.',
        price: 490,
      },
      {
        id: 'orenburzhye_headband_01',
        imageKey: 'accessoryLogo',
        type: 'Повязка',
        variant: 'Оренбуржье',
        name: 'Повязка «Оренбуржье»',
        description:
          'Повязка с авторским принтом для прогулок, тренировок, танцев и городских событий.',
        price: 390,
      },
      {
        id: 'orenburzhye_bottle_case_01',
        imageKey: 'accessoryLogo',
        type: 'Чехол для бутылки',
        variant: 'Оренбуржье',
        name: 'Чехол для бутылки «Оренбуржье»',
        description:
          'Чехол с визуалом коллекции. Практичный аксессуар с локальным характером.',
        price: 590,
      },
      {
        id: 'orenburzhye_keychain_01',
        imageKey: 'accessoryLogo',
        type: 'Брелок / тег',
        variant: 'Оренбуржье',
        name: 'Брелок / тег «Оренбуржье»',
        description:
          'Компактный сувенирный аксессуар с символикой коллекции.',
        price: 190,
      },
    ],
  },
] as const;

export const TEAM_KITS = [
  {
    id: 'section_member',
    imageKey: 'sectionMember',
    name: 'Участник секции',
    description: 'Базовый комплект для секций, студий и кружков.',
    direction: 'Секции, студии, кружки',
    price: 1790,
    printedItemsCount: 2,
    composition: 'футболка / топ + мешок / шопер',
    items: ['футболка / топ', 'мешок / шопер', 'нанесение на обе вещи'],
    upperOptions: ['Футболка', 'Топ'],
    secondUpperOptions: [],
    accessoryOptions: ['Мешок', 'Шопер'],
    includedPrints: [
      'логотип / бренд на футболке или топе',
      'логотип / бренд на мешке или шопере',
    ],
  },
  {
    id: 'event_member',
    imageKey: 'eventMember',
    name: 'Участник мероприятия',
    description:
      'Комплект для фестивалей, конкурсов, сборов, мастер-классов и городских событий.',
    direction: 'Организаторы событий',
    price: 1790,
    printedItemsCount: 2,
    composition: 'футболка / топ + мешок / шопер',
    items: ['футболка / топ', 'мешок / шопер', 'нанесение на обе вещи'],
    upperOptions: ['Футболка', 'Топ'],
    secondUpperOptions: [],
    accessoryOptions: ['Мешок', 'Шопер'],
    includedPrints: [
      'логотип / бренд на футболке или топе',
      'логотип / бренд на мешке или шопере',
    ],
  },
  {
    id: 'team',
    imageKey: 'team',
    name: 'Команда',
    description:
      'Комплект для команды, студии или коллектива, которым нужен единый визуальный стиль.',
    direction: 'Команды, студии, коллективы',
    price: 4290,
    printedItemsCount: 2,
    composition: 'худи / толстовка / свитшот + сумка',
    items: [
      'худи / толстовка / свитшот',
      'сумка через плечо / поясная сумка',
      'нанесение на обе вещи',
    ],
    upperOptions: [],
    secondUpperOptions: ['Худи', 'Толстовка', 'Свитшот'],
    accessoryOptions: ['Сумка через плечо', 'Поясная сумка'],
    includedPrints: [
      'логотип / бренд на худи, толстовке или свитшоте',
      'логотип / бренд на сумке',
    ],
  },
  {
    id: 'travel',
    imageKey: 'travel',
    name: 'Выезд',
    description:
      'Расширенный комплект для соревнований, выступлений, конкурсов и поездок.',
    direction: 'Соревнования, выступления, поездки',
    price: 6290,
    printedItemsCount: 3,
    composition: 'футболка / топ + худи / толстовка / свитшот + рюкзак',
    items: [
      'футболка / топ',
      'худи / толстовка / свитшот',
      'рюкзак',
      'нанесение на все вещи',
    ],
    upperOptions: ['Футболка', 'Топ'],
    secondUpperOptions: ['Худи', 'Толстовка', 'Свитшот'],
    accessoryOptions: ['Рюкзак'],
    includedPrints: [
      'логотип / бренд на футболке или топе',
      'логотип / бренд на худи, толстовке или свитшоте',
      'логотип / бренд на рюкзаке',
    ],
  },
] as const;

export const INDIVIDUAL_PRODUCTS = [
  {
    id: 'tshirt_top',
    imageKey: 'tshirt',
    name: 'Футболка / топ',
    price: 1090,
    printedItemsCount: 1,
    description:
      'Готовое изделие ЮлайК с нанесением логотипа, названия, имени или принта.',
  },
  {
    id: 'hoodie',
    imageKey: 'hoodie',
    name: 'Худи / толстовка / свитшот',
    price: 3290,
    printedItemsCount: 1,
    description:
      'Тёплое изделие с нанесением для команды, студии, формы или подарка.',
  },
  {
    id: 'bag',
    imageKey: 'drawstringBag',
    name: 'Мешок для обуви / формы',
    price: 690,
    printedItemsCount: 1,
    description:
      'Мешок с логотипом или именем для тренировок, выступлений и сборов.',
  },
  {
    id: 'shopper',
    imageKey: 'shopper',
    name: 'Шопер',
    price: 690,
    printedItemsCount: 1,
    description:
      'Шопер с логотипом, принтом или фирменной графикой.',
  },
  {
    id: 'crossbody',
    imageKey: 'crossbody',
    name: 'Сумка через плечо / поясная сумка',
    price: 990,
    printedItemsCount: 1,
    description:
      'Сумка с нанесением для команды, выезда, мероприятия или подарочного комплекта.',
  },
  {
    id: 'backpack',
    imageKey: 'backpack',
    name: 'Рюкзак',
    price: 1990,
    printedItemsCount: 1,
    description:
      'Рюкзак с логотипом, именем или символикой команды.',
  },
] as const;

export const CUSTOMER_PRINT_ZONES = [
  {
    id: 'chest_logo',
    imageKey: 'chestLogo',
    name: 'Логотип на груди',
    description:
      'Небольшой логотип, знак команды, студии или бренда спереди.',
    price: 290,
  },
  {
    id: 'front_print',
    imageKey: 'frontPrint',
    name: 'Принт спереди',
    description:
      'Основной принт, надпись или изображение на передней части изделия.',
    price: 490,
  },
  {
    id: 'back_print',
    imageKey: 'backPrint',
    name: 'Принт на спине',
    description:
      'Крупный принт, номер, фамилия, слоган или надпись на спине.',
    price: 690,
  },
  {
    id: 'accessory_logo',
    imageKey: 'accessoryLogo',
    name: 'Логотип на аксессуаре',
    description:
      'Нанесение на мешок, шопер, сумку, рюкзак или другой аксессуар.',
    price: 390,
  },
] as const;

export const CUSTOMER_ITEM_TYPES = [
  'Футболка / топ',
  'Лонгслив',
  'Худи / толстовка',
  'Мешок',
  'Шопер',
  'Сумка',
  'Рюкзак',
  'Другое',
] as const;

export const PERSONALIZATION = [
  {
    id: 'none',
    name: 'Без персонализации',
    price: 0,
  },
  {
    id: 'name',
    name: 'Имя',
    price: 150,
  },
  {
    id: 'surname',
    name: 'Фамилия',
    price: 150,
  },
  {
    id: 'name_surname',
    name: 'Имя + фамилия',
    price: 250,
  },
  {
    id: 'number',
    name: 'Номер',
    price: 150,
  },
  {
    id: 'name_number',
    name: 'Имя + номер',
    price: 250,
  },
  {
    id: 'surname_number',
    name: 'Фамилия + номер',
    price: 250,
  },
  {
    id: 'name_surname_number',
    name: 'Имя + фамилия + номер',
    price: 350,
  },
] as const;

// Временные алиасы, чтобы старые импорты не ломались во время перехода
export const CALCULATION_TYPES = START_SECTIONS;
export const KITS = TEAM_KITS;
export const SETS = TEAM_KITS;
export const SINGLE_PRODUCTS = INDIVIDUAL_PRODUCTS;