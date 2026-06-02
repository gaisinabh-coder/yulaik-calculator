export const START_SECTIONS = [
  {
    id: 'collections',
    imageKey: 'kit',
    name: 'Просмотр готовых коллекций',
    description:
      'Посмотреть идеи комплектов и готовые направления для секций, команд, мероприятий и выездов.',
  },
  {
    id: 'custom_order',
    imageKey: 'single',
    name: 'Расчёт стоимости индивидуального заказа',
    description:
      'Рассчитать один вид изделий или печать на вещах заказчика.',
  },
  {
    id: 'team_kit',
    imageKey: 'travel',
    name: 'Расчёт стоимости комплекта для команд',
    description:
      'Рассчитать комплект для секции, команды, коллектива, мероприятия или выезда.',
  },
] as const;

export const PRINT_METHODS = [
  {
    id: 'print',
    name: 'Печать',
    description:
      'Базовое нанесение логотипа, бренда, имени, номера или принта.',
    extraPricePerPrintedItem: 0,
  },
  {
    id: 'embroidery',
    name: 'Вышивка',
    description:
      'Более статусное нанесение. Подходит для худи, толстовок, шоперов, сумок и подарочных изделий.',
    extraPricePerPrintedItem: 350,
  },
] as const;

export const READY_COLLECTIONS = [
  {
    id: 'tastes_orenburg',
    imageKey: 'eventMember',
    name: 'Вкусы Оренбуржья',
    description:
      'Готовая коллекция для гастромаркетов, городских событий и сувенирного мерча с локальным характером.',
    priceLabel: 'готовые изделия по наличию',
    products: [
      {
        id: 'tastes_tshirt',
        imageKey: 'tshirt',
        name: 'Футболка',
        description: 'Футболка с авторским принтом коллекции',
      },
      {
        id: 'tastes_shopper',
        imageKey: 'shopper',
        name: 'Шопер',
        description: 'Шопер с принтом коллекции',
      },
      {
        id: 'tastes_bandana',
        imageKey: 'drawstringBag',
        name: 'Бандана',
        description: 'Бандана с графикой коллекции',
      },
      {
        id: 'tastes_bottle_case',
        imageKey: 'accessoryLogo',
        name: 'Чехол для бутылки',
        description: 'Текстильный чехол с принтом',
      },
      {
        id: 'tastes_cupholder',
        imageKey: 'crossbody',
        name: 'Капхолдер',
        description: 'Аксессуар для стакана с принтом',
      },
      {
        id: 'tastes_keychain',
        imageKey: 'accessoryLogo',
        name: 'Брелок / тег',
        description: 'Небольшой сувенирный аксессуар',
      },
    ],
  },
  {
    id: 'orenburzhye',
    imageKey: 'kit',
    name: 'Оренбуржье',
    description:
      'Коллекция с визуальными образами Оренбуржья: степь, городские смыслы, локальные символы и авторские принты.',
    priceLabel: 'готовые изделия по наличию',
    products: [
      {
        id: 'orenburzhye_tshirt',
        imageKey: 'tshirt',
        name: 'Футболка',
        description: 'Футболка с авторским принтом коллекции',
      },
      {
        id: 'orenburzhye_shopper',
        imageKey: 'shopper',
        name: 'Шопер',
        description: 'Шопер с локальным принтом',
      },
      {
        id: 'orenburzhye_bandana',
        imageKey: 'drawstringBag',
        name: 'Бандана',
        description: 'Бандана с графикой коллекции',
      },
      {
        id: 'orenburzhye_headband',
        imageKey: 'accessoryLogo',
        name: 'Повязка',
        description: 'Повязка с авторским принтом',
      },
      {
        id: 'orenburzhye_bottle_case',
        imageKey: 'accessoryLogo',
        name: 'Чехол для бутылки',
        description: 'Чехол с визуалом коллекции',
      },
      {
        id: 'orenburzhye_keychain',
        imageKey: 'accessoryLogo',
        name: 'Брелок / тег',
        description: 'Небольшой сувенирный аксессуар',
      },
    ],
  },
] as const;

export const TEAM_KITS = [
  {
    id: 'section_member',
    imageKey: 'sectionMember',
    name: 'Участник секции',
    description: 'Для секций, студий и кружков',
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
    description: 'Для организаторов событий, фестивалей, конкурсов и сборов',
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
    description: 'Для команды, студии или коллектива, которым нужен единый стиль',
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
    description: 'Для соревнований, выступлений, конкурсов и поездок',
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
    description: 'Изделие + логотип / бренд',
  },
  {
    id: 'hoodie',
    imageKey: 'hoodie',
    name: 'Худи / толстовка / свитшот',
    price: 3290,
    printedItemsCount: 1,
    description: 'Изделие + логотип / бренд',
  },
  {
    id: 'bag',
    imageKey: 'drawstringBag',
    name: 'Мешок для обуви / формы',
    price: 690,
    printedItemsCount: 1,
    description: 'Изделие + логотип / бренд',
  },
  {
    id: 'shopper',
    imageKey: 'shopper',
    name: 'Шопер',
    price: 690,
    printedItemsCount: 1,
    description: 'Изделие + логотип / бренд',
  },
  {
    id: 'crossbody',
    imageKey: 'crossbody',
    name: 'Сумка через плечо / поясная сумка',
    price: 990,
    printedItemsCount: 1,
    description: 'Изделие + логотип / бренд',
  },
  {
    id: 'backpack',
    imageKey: 'backpack',
    name: 'Рюкзак',
    price: 1990,
    printedItemsCount: 1,
    description: 'Изделие + логотип / бренд',
  },
] as const;

export const CUSTOMER_PRINT_ZONES = [
  {
    id: 'chest_logo',
    imageKey: 'chestLogo',
    name: 'Логотип на груди',
    description: 'Небольшой логотип спереди',
    price: 290,
  },
  {
    id: 'front_print',
    imageKey: 'frontPrint',
    name: 'Принт спереди',
    description: 'Основной принт на передней части изделия',
    price: 490,
  },
  {
    id: 'back_print',
    imageKey: 'backPrint',
    name: 'Принт на спине',
    description: 'Крупная надпись, номер, слоган или принт',
    price: 690,
  },
  {
    id: 'accessory_logo',
    imageKey: 'accessoryLogo',
    name: 'Логотип на аксессуаре',
    description: 'Мешок, шопер, сумка или рюкзак',
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