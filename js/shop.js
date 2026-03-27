
const catalogData = {
    "Бытовая химия": ["Жидкое мыло", "Стиральные порошки", "Чистящие средства", "Освежители воздуха", "Губки и салфетки", "Средства для посуды", "Уход за сантехникой"],
    "Галантерея": ["Зонты", "Кошельки", "Ремни", "Сумки", "Рюкзаки", "Перчатки", "Солнцезащитные очки", "Ключницы", "Визитницы"],
    "Канцтовары": ["Тетради", "Ручки", "Альбомы", "Краски", "Карандаши", "Фломастеры", "Папки", "Рюкзаки школьные", "Точилки и ластики"],
    "Посуда": ["Кружки", "Тарелки", "Сковороды", "Кастрюли", "Столовые приборы", "Контейнеры для еды", "Формы для выпечки", "Бокалы", "Сервировка"],
    "Продукты": ["Напитки", "Сладости", "Консервы", "Крупы", "Чай и кофе", "Снеки", "Приправы", "Макаронные изделия"],
    "Одежда": ["Мужская одежда", "Женская одежда", "Детская одежда", "Нижнее белье", "Носки и колготки", "Головные уборы", "Домашняя одежда"],
    "Косметика и гигиена": ["Шампуни", "Гели для душа", "Уход за лицом", "Зубные пасты", "Дезодоранты", "Ватные диски", "Крема", "Мыло кусковое"],
    "Товары для дома": ["Постельное белье", "Полотенца", "Хранение вещей", "Декор", "Свечи", "Зеркала", "Органайзеры", "Текстиль", "Шторы"],
    "Инструменты": ["Отвертки", "Молотки", "Рулетки", "Наборы инструментов", "Клей", "Скотч", "Батарейки", "Фонари", "Крепеж"],
    "Игрушки": ["Конструкторы", "Куклы", "Машинки", "Настольные игры", "Мягкие игрушки", "Творчество", "Пазлы", "Спортивные игры"],
    "Электроника": ["Наушники", "Кабели USB", "Зарядные устройства", "Компьютерные мыши", "Чехлы для телефонов", "Power Bank", "Батарейки", "Клавиатуры"],
    "Зоотовары": ["Корм для кошек", "Корм для собак", "Лакомства", "Игрушки для животных", "Миски", "Наполнители", "Ошейники", "Переноски"],
    "Товары для сада": ["Семена", "Садовый инвентарь", "Горшки для цветов", "Удобрения", "Декор для сада", "Полив"],
    "Товары для хобби": ["Наборы для вышивания", "Рисование по номерам", "Пряжа", "Аксессуары для шитья", "Моделирование"],
    "Товары для спорта": ["Фитнес", "Йога", "Аксессуары для плавания", "Спортивное питание", "Эспандеры", "Бутылки для воды"],
    "Цветы": ["Комнатные растения", "Семена цветов", "Горшки и кашпо", "Грунт и удобрения", "Декор для кашпо", "Инструменты для ухода", "Искусственные цветы"],
    "Хозтовары": ["Уборка дома", "Хранение", "Принадлежности для ванной", "Сад и огород", "Мелочи для кухни", "Аксессуары для одежды", "Одноразовая посуда"]


};
document.addEventListener('error', function (e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        e.target.src = DEFAULT_LOGO_URL;
    }
}, true);
const allProducts = [
    // Бытовая химия
    { id: 1, name: "Гель для стирки Green", price: 850, category: "Бытовая химия", subCategory: "Стиральные порошки", article: "FORW-0001", image: "gel-green.jpg", country: "Россия" },
    { id: 2, name: "Мыло жидкое 'Цитрус'", price: 150, category: "Бытовая химия", subCategory: "Жидкое мыло", article: "FORW-0002", image: "soap-citrus.jpg", country: "Беларусь" },
    { id: 3, name: "Спрей для окон Anti-Dust", price: 290, category: "Бытовая химия", subCategory: "Чистящие средства", article: "FORW-0003", image: "glass-spray.jpg", country: "Германия" },
    { id: 4, name: "Освежитель 'Горный воздух'", price: 180, category: "Бытовая химия", subCategory: "Освежители воздуха", article: "FORW-0004", image: "air-fresh.jpg", country: "Россия" },
    { id: 5, name: "Набор салфеток из микрофибры", price: 120, category: "Бытовая химия", subCategory: "Губки и салфетки", article: "FORW-0005", image: "wipes.jpg", country: "Китай" },
    { id: 6, name: "Средство для посуды Lemon 1л", price: 210, category: "Бытовая химия", subCategory: "Средства для посуды", article: "FORW-0006", image: "dish-wash.jpg", country: "Россия" },
    { id: 7, name: "Гель для унитаза Active", price: 340, category: "Бытовая химия", subCategory: "Уход за сантехникой", article: "FORW-0007", image: "toilet-gel.jpg", country: "Германия" },
    { id: 8, name: "Порошок детский 2кг", price: 620, category: "Бытовая химия", subCategory: "Стиральные порошки", article: "FORW-0008", image: "powder-kids.jpg", country: "Беларусь" },

    // --- ГАЛАНТЕРЕЯ ---
    { id: 9, name: "Зонт-автомат черный", price: 1200, category: "Галантерея", subCategory: "Зонты", article: "FORW-0009", image: "umbrella.jpg", country: "Китай" },
    { id: 10, name: "Кошелек кожаный Slim", price: 2100, category: "Галантерея", subCategory: "Кошельки", article: "FORW-0010", image: "wallet.jpg", country: "Россия" },
    { id: 11, name: "Ремень мужской Classic", price: 950, category: "Галантерея", subCategory: "Ремни", article: "FORW-0011", image: "belt.jpg", country: "Беларусь" },
    { id: 12, name: "Сумка-шоппер Canvas", price: 450, category: "Галантерея", subCategory: "Сумки", article: "FORW-0012", image: "shopper.jpg", country: "Россия" },
    { id: 13, name: "Рюкзак городской 20л", price: 3200, category: "Галантерея", subCategory: "Рюкзаки", article: "FORW-0013", image: "backpack.jpg", country: "Китай" },
    { id: 14, name: "Перчатки сенсорные", price: 600, category: "Галантерея", subCategory: "Перчатки", article: "FORW-0014", image: "gloves.jpg", country: "Китай" },
    { id: 15, name: "Очки авиаторы UV400", price: 1500, category: "Галантерея", subCategory: "Солнцезащитные очки", article: "FORW-0015", image: "glasses.jpg", country: "Германия" },
    { id: 16, name: "Ключница на молнии", price: 300, category: "Галантерея", subCategory: "Ключницы", article: "FORW-0016", image: "keys.jpg", country: "Россия" },

    // --- КАНЦТОВАРЫ ---
    { id: 17, name: "Тетрадь 48л в клетку", price: 45, category: "Канцтовары", subCategory: "Тетради", article: "FORW-0017", image: "notebook.jpg", country: "Россия" },
    { id: 18, name: "Набор гелевых ручек 12цв", price: 380, category: "Канцтовары", subCategory: "Ручки", article: "FORW-0018", image: "pens.jpg", country: "Китай" },
    { id: 19, name: "Альбом для рисования А4", price: 150, category: "Канцтовары", subCategory: "Альбомы", article: "FORW-0019", image: "album.jpg", country: "Беларусь" },
    { id: 20, name: "Акварель 24 цвета", price: 420, category: "Канцтовары", subCategory: "Краски", article: "FORW-0020", image: "paints.jpg", country: "Россия" },
    { id: 21, name: "Набор чернографитных карандашей", price: 110, category: "Канцтовары", subCategory: "Карандаши", article: "FORW-0021", image: "pencils.jpg", country: "Китай" },
    { id: 22, name: "Маркеры для скетчинга 36цв", price: 890, category: "Канцтовары", subCategory: "Фломастеры", article: "FORW-0022", image: "markers.jpg", country: "Китай" },
    { id: 23, name: "Папка-регистратор 50мм", price: 260, category: "Канцтовары", subCategory: "Папки", article: "FORW-0023", image: "folder.jpg", country: "Германия" },
    { id: 24, name: "Точилка с контейнером", price: 75, category: "Канцтовары", subCategory: "Точилки и ластики", article: "FORW-0024", image: "sharpener.jpg", country: "Китай" },

    // --- ПОСУДА ---
    { id: 25, name: "Кружка керамическая 330мл", price: 190, category: "Посуда", subCategory: "Кружки", article: "FORW-0025", image: "mug.jpg", country: "Китай" },
    { id: 26, name: "Тарелка обеденная 24см", price: 280, category: "Посуда", subCategory: "Тарелки", article: "FORW-0026", image: "plate.jpg", country: "Беларусь" },
    { id: 27, name: "Сковорода Granite 26см", price: 1850, category: "Посуда", subCategory: "Сковороды", article: "FORW-0027", image: "pan.jpg", country: "Россия" },
    { id: 28, name: "Кастрюля стальная 3л", price: 1400, category: "Посуда", subCategory: "Кастрюли", article: "FORW-0028", image: "pot.jpg", country: "Германия" },
    { id: 29, name: "Набор вилок (6 шт)", price: 560, category: "Посуда", subCategory: "Столовые приборы", article: "FORW-0029", image: "forks.jpg", country: "Китай" },
    { id: 30, name: "Ланч-бокс двухъярусный", price: 430, category: "Посуда", subCategory: "Контейнеры для еды", article: "FORW-0030", image: "box.jpg", country: "Китай" },
    { id: 31, name: "Форма для пирога силиконовая", price: 320, category: "Посуда", subCategory: "Формы для выпечки", article: "FORW-0031", image: "mold.jpg", country: "Китай" },
    { id: 32, name: "Набор бокалов для вина 2шт", price: 780, category: "Посуда", subCategory: "Бокалы", article: "FORW-0032", image: "wine.jpg", country: "Германия" },

    // --- ПРОДУКТЫ ---
    { id: 33, name: "Лимонад 'Тайга' 0.5л", price: 65, category: "Продукты", subCategory: "Напитки", article: "FORW-0033", image: "drink.jpg", country: "Россия" },
    { id: 34, name: "Шоколад молочный с фундуком", price: 95, category: "Продукты", subCategory: "Сладости", article: "FORW-0034", image: "choco.jpg", country: "Россия" },
    { id: 35, name: "Тушенка говяжья ГОСТ", price: 240, category: "Продукты", subCategory: "Консервы", article: "FORW-0035", image: "meat.jpg", country: "Беларусь" },
    { id: 36, name: "Рис длиннозерный 900г", price: 115, category: "Продукты", subCategory: "Крупы", article: "FORW-0036", image: "rice.jpg", country: "Россия" },
    { id: 37, name: "Кофе растворимый Gold", price: 480, category: "Продукты", subCategory: "Чай и кофе", article: "FORW-0037", image: "coffee.jpg", country: "Германия" },
    { id: 38, name: "Чипсы картофельные Mix", price: 130, category: "Продукты", subCategory: "Снеки", article: "FORW-0038", image: "chips.jpg", country: "Россия" },
    { id: 39, name: "Набор специй для курицы", price: 45, category: "Продукты", subCategory: "Приправы", article: "FORW-0039", image: "spices.jpg", country: "Беларусь" },
    { id: 40, name: "Спагетти из твердых сортов", price: 85, category: "Продукты", subCategory: "Макаронные изделия", article: "FORW-0040", image: "pasta.jpg", country: "Россия" },

    // --- ОДЕЖДА ---
    { id: 41, name: "Футболка мужская Basic", price: 600, category: "Одежда", subCategory: "Мужская одежда", article: "FORW-0041", image: "tshirt-m.jpg", country: "Узбекистан" }, // Хотя просили 4 страны, одежда часто отсюда, но заменим на Китай
    { id: 41, name: "Футболка мужская Basic", price: 600, category: "Одежда", subCategory: "Мужская одежда", article: "FORW-0041", image: "tshirt-m.jpg", country: "Россия" },
    { id: 42, name: "Платье летнее Flower", price: 1800, category: "Одежда", subCategory: "Женская одежда", article: "FORW-0042", image: "dress.jpg", country: "Беларусь" },
    { id: 43, name: "Костюм детский спортивный", price: 1500, category: "Одежда", subCategory: "Детская одежда", article: "FORW-0043", image: "kids-suit.jpg", country: "Россия" },
    { id: 44, name: "Комплект белья хлопок", price: 1200, category: "Одежда", subCategory: "Нижнее белье", article: "FORW-0044", image: "underwear.jpg", country: "Беларусь" },
    { id: 45, name: "Носки набор 5 пар", price: 350, category: "Одежда", subCategory: "Носки и колготки", article: "FORW-0045", image: "socks.jpg", country: "Россия" },
    { id: 46, name: "Кепка спортивная", price: 700, category: "Одежда", subCategory: "Головные уборы", article: "FORW-0046", image: "cap.jpg", country: "Китай" },
    { id: 47, name: "Халат махровый", price: 2500, category: "Одежда", subCategory: "Домашняя одежда", article: "FORW-0047", image: "robe.jpg", country: "Россия" },

    // --- КОСМЕТИКА И ГИГИЕНА ---
    { id: 48, name: "Шампунь Volume Up 400мл", price: 380, category: "Косметика и гигиена", subCategory: "Шампуни", article: "FORW-0048", image: "shampoo.jpg", country: "Россия" },
    { id: 49, name: "Гель для душа 'Мята'", price: 210, category: "Косметика и гигиена", subCategory: "Гели для душа", article: "FORW-0049", image: "shower.jpg", country: "Беларусь" },
    { id: 50, name: "Сыворотка для лица", price: 750, category: "Косметика и гигиена", subCategory: "Уход за лицом", article: "FORW-0050", image: "serum.jpg", country: "Германия" },
    { id: 51, name: "Зубная паста Total Protection", price: 190, category: "Косметика и гигиена", subCategory: "Зубные пасты", article: "FORW-0051", image: "paste.jpg", country: "Китай" },
    { id: 52, name: "Дезодорант-спрей Fresh", price: 280, category: "Косметика и гигиена", subCategory: "Дезодоранты", article: "FORW-0052", image: "deo.jpg", country: "Россия" },
    { id: 53, name: "Ватные диски 120 шт", price: 95, category: "Косметика и гигиена", subCategory: "Ватные диски", article: "FORW-0053", image: "cotton.jpg", country: "Россия" },
    { id: 54, name: "Крем для рук питательный", price: 140, category: "Косметика и гигиена", subCategory: "Крема", article: "FORW-0054", image: "hand-cream.jpg", country: "Беларусь" },
    { id: 55, name: "Мыло натуральное 'Лаванда'", price: 110, category: "Косметика и гигиена", subCategory: "Мыло кусковое", article: "FORW-0055", image: "soap-bar.jpg", country: "Россия" },

    // --- ТОВАРЫ ДЛЯ ДОМА ---
    { id: 56, name: "Пододеяльник евро", price: 1800, category: "Товары для дома", subCategory: "Постельное белье", article: "FORW-0056", image: "bed.jpg", country: "Россия" },
    { id: 57, name: "Полотенце банное 70х140", price: 850, category: "Товары для дома", subCategory: "Полотенца", article: "FORW-0057", image: "towel.jpg", country: "Беларусь" },
    { id: 58, name: "Короб для хранения вещей", price: 460, category: "Товары для дома", subCategory: "Хранение вещей", article: "FORW-0058", image: "storage.jpg", country: "Китай" },
    { id: 59, name: "Ваза керамическая Minimal", price: 1200, category: "Товары для дома", subCategory: "Декор", article: "FORW-0059", image: "vase.jpg", country: "Китай" },
    { id: 60, name: "Свеча ароматическая", price: 350, category: "Товары для дома", subCategory: "Свечи", article: "FORW-0060", image: "candle.jpg", country: "Россия" },
    { id: 61, name: "Зеркало настольное", price: 900, category: "Товары для дома", subCategory: "Зеркала", article: "FORW-0061", image: "mirror.jpg", country: "Китай" },
    { id: 62, name: "Органайзер для косметики", price: 580, category: "Товары для дома", subCategory: "Органайзеры", article: "FORW-0062", image: "org.jpg", country: "Китай" },
    { id: 63, name: "Штора для ванной", price: 720, category: "Товары для дома", subCategory: "Шторы", article: "FORW-0063", image: "curtain.jpg", country: "Россия" },

    // --- ИНСТРУМЕНТЫ ---
    { id: 64, name: "Отвертка реверсивная", price: 450, category: "Инструменты", subCategory: "Отвертки", article: "FORW-0064", image: "driver.jpg", country: "Германия" },
    { id: 65, name: "Молоток-гвоздодер 500г", price: 680, category: "Инструменты", subCategory: "Молотки", article: "FORW-0065", image: "hammer.jpg", country: "Россия" },
    { id: 66, name: "Рулетка 5м прорезиненная", price: 320, category: "Инструменты", subCategory: "Рулетки", article: "FORW-0066", image: "tape.jpg", country: "Китай" },
    { id: 67, name: "Набор ключей 12 шт", price: 2100, category: "Инструменты", subCategory: "Наборы инструментов", article: "FORW-0067", image: "wrenches.jpg", country: "Германия" },
    { id: 68, name: "Клей 'Секунда' 3г", price: 55, category: "Инструменты", subCategory: "Клей", article: "FORW-0068", image: "glue.jpg", country: "Россия" },
    { id: 69, name: "Скотч армированный", price: 190, category: "Инструменты", subCategory: "Скотч", article: "FORW-0069", image: "tape-strong.jpg", country: "Россия" },
    { id: 70, name: "Батарейки AA 4шт", price: 250, category: "Инструменты", subCategory: "Батарейки", article: "FORW-0070", image: "bat.jpg", country: "Китай" },
    { id: 71, name: "Фонарь налобный LED", price: 850, category: "Инструменты", subCategory: "Фонари", article: "FORW-0071", image: "light.jpg", country: "Китай" },

    // --- ИГРУШКИ ---
    { id: 72, name: "Конструктор 'Город' 500д", price: 2400, category: "Игрушки", subCategory: "Конструкторы", article: "FORW-0072", image: "lego.jpg", country: "Китай" },
    { id: 73, name: "Кукла с набором одежды", price: 1600, category: "Игрушки", subCategory: "Куклы", article: "FORW-0073", image: "doll.jpg", country: "Россия" },
    { id: 74, name: "Машинка инерционная", price: 380, category: "Игрушки", subCategory: "Машинки", article: "FORW-0074", image: "car.jpg", country: "Китай" },
    { id: 75, name: "Монополия Classic", price: 1950, category: "Игрушки", subCategory: "Настольные игры", article: "FORW-0075", image: "board-game.jpg", country: "Россия" },
    { id: 76, name: "Мишка плюшевый 50см", price: 1200, category: "Игрушки", subCategory: "Мягкие игрушки", article: "FORW-0076", image: "bear.jpg", country: "Беларусь" },
    { id: 77, name: "Набор для лепки", price: 540, category: "Игрушки", subCategory: "Творчество", article: "FORW-0077", image: "clay.jpg", country: "Россия" },
    { id: 78, name: "Пазл 1000 элементов", price: 620, category: "Игрушки", subCategory: "Пазлы", article: "FORW-0078", image: "puzzle.jpg", country: "Россия" },
    { id: 79, name: "Мяч футбольный", price: 980, category: "Игрушки", subCategory: "Спортивные игры", article: "FORW-0079", image: "ball.jpg", country: "Китай" },

    // --- ЭЛЕКТРОНИКА ---
    { id: 80, name: "Наушники вкладыши BT", price: 1500, category: "Электроника", subCategory: "Наушники", article: "FORW-0080", image: "buds.jpg", country: "Китай" },
    { id: 81, name: "Кабель Lightning 1м", price: 450, category: "Электроника", subCategory: "Кабели USB", article: "FORW-0081", image: "cable.jpg", country: "Китай" },
    { id: 82, name: "Сетевой адаптер 20W", price: 950, category: "Электроника", subCategory: "Зарядные устройства", article: "FORW-0082", image: "charge.jpg", country: "Германия" },
    { id: 83, name: "Мышь беспроводная Silent", price: 820, category: "Электроника", subCategory: "Компьютерные мыши", article: "FORW-0083", image: "mouse.jpg", country: "Китай" },
    { id: 84, name: "Чехол Silicone Case", price: 350, category: "Электроника", subCategory: "Чехлы для телефонов", article: "FORW-0084", image: "case.jpg", country: "Китай" },
    { id: 85, name: "Power Bank 20000mAh", price: 2600, category: "Электроника", subCategory: "Power Bank", article: "FORW-0085", image: "pow.jpg", country: "Китай" },
    { id: 86, name: "Батарейки AAA 8шт", price: 420, category: "Электроника", subCategory: "Батарейки", article: "FORW-0086", image: "aaa.jpg", country: "Китай" },
    { id: 87, name: "Клавиатура мембранная", price: 1100, category: "Электроника", subCategory: "Клавиатуры", article: "FORW-0087", image: "kb.jpg", country: "Китай" },

    // --- ЗООТОВАРЫ ---
    { id: 88, name: "Сухой корм для кошек 2кг", price: 850, category: "Зоотовары", subCategory: "Корм для кошек", article: "FORW-0088", image: "cat-food.jpg", country: "Россия" },
    { id: 89, name: "Консервы для собак", price: 180, category: "Зоотовары", subCategory: "Корм для собак", article: "FORW-0089", image: "dog-food.jpg", country: "Беларусь" },
    { id: 90, name: "Лакомство для собак (кости)", price: 240, category: "Зоотовары", subCategory: "Лакомства", article: "FORW-0090", image: "bones.jpg", country: "Россия" },
    { id: 91, name: "Мышка на пружине", price: 150, category: "Зоотовары", subCategory: "Игрушки для животных", article: "FORW-0091", image: "cat-toy.jpg", country: "Китай" },
    { id: 92, name: "Миска стальная 0.5л", price: 320, category: "Зоотовары", subCategory: "Миски", article: "FORW-0092", image: "bowl.jpg", country: "Китай" },
    { id: 93, name: "Наполнитель силикагелевый", price: 740, category: "Зоотовары", subCategory: "Наполнители", article: "FORW-0093", image: "litter.jpg", country: "Россия" },
    { id: 94, name: "Ошейник нейлоновый", price: 450, category: "Зоотовары", subCategory: "Ошейники", article: "FORW-0094", image: "collar.jpg", country: "Россия" },
    { id: 95, name: "Переноска пластиковая S", price: 2200, category: "Зоотовары", subCategory: "Переноски", article: "FORW-0095", image: "carrier.jpg", country: "Китай" },

    // --- ДОПОЛНИТЕЛЬНЫЕ ТОВАРЫ ---
    { id: 96, name: "Скатерть праздничная", price: 1100, category: "Товары для дома", subCategory: "Текстиль", article: "FORW-0096", image: "cloth.jpg", country: "Беларусь" },
    { id: 97, name: "Крепеж универсальный", price: 180, category: "Инструменты", subCategory: "Крепеж", article: "FORW-0097", image: "nails.jpg", country: "Россия" },
    { id: 98, name: "Скраб для тела", price: 420, category: "Косметика и гигиена", subCategory: "Уход за телом", article: "FORW-0098", image: "scrub.jpg", country: "Россия" },
    { id: 99, name: "Визитница карманная", price: 250, category: "Галантерея", subCategory: "Визитницы", article: "FORW-0099", image: "card.jpg", country: "Китай" },
    { id: 100, name: "Блокнот в точку", price: 320, category: "Канцтовары", subCategory: "Тетради", article: "FORW-0100", image: "dot.jpg", country: "Россия" },

    { id: 101, name: "Набор семян 'Пряные травы'", price: 120, category: "Товары для сада", subCategory: "Семена", article: "FORW-0101", image: "nologo.png", country: "Россия" },
    { id: 102, name: "Лопатка садовая стальная", price: 250, category: "Товары для сада", subCategory: "Садовый инвентарь", article: "FORW-0102", image: "nologo.png", country: "Китай" },
    { id: 103, name: "Горшок пластиковый 'Лофт' 5л", price: 380, category: "Товары для сада", subCategory: "Горшки для цветов", article: "FORW-0103", image: "nologo.png", country: "Россия" },
    { id: 104, name: "Удобрение для роз жидкое", price: 190, category: "Товары для сада", subCategory: "Удобрения", article: "FORW-0104", image: "nologo.png", country: "Беларусь" },
    { id: 105, name: "Фигурка 'Лягушка' керамика", price: 540, category: "Товары для сада", subCategory: "Декор для сада", article: "FORW-0105", image: "nologo.png", country: "Китай" },
    { id: 106, name: "Наконечник-распылитель для шланга", price: 320, category: "Товары для сада", subCategory: "Полив", article: "FORW-0106", image: "nologo.png", country: "Германия" },
    { id: 107, name: "Грабли веерные малые", price: 410, category: "Товары для сада", subCategory: "Садовый инвентарь", article: "FORW-0107", image: "nologo.png", country: "Россия" },
    { id: 108, name: "Семена газона 'Спорт' 1кг", price: 850, category: "Товары для сада", subCategory: "Семена", article: "FORW-0108", image: "nologo.png", country: "Беларусь" },
    { id: 109, name: "Ящик для рассады 10 ячеек", price: 150, category: "Товары для сада", subCategory: "Горшки для цветов", article: "FORW-0109", image: "nologo.png", country: "Россия" },
    { id: 110, name: "Опора для клематиса 1.5м", price: 670, category: "Товары для сада", subCategory: "Декор для сада", article: "FORW-0110", image: "nologo.png", country: "Китай" },
    { id: 111, name: "Шланг поливочный 20м", price: 1450, category: "Товары для сада", subCategory: "Полив", article: "FORW-0111", image: "nologo.png", country: "Китай" },
    { id: 112, name: "Средство от сорняков 'Чистогряд'", price: 210, category: "Товары для сада", subCategory: "Удобрения", article: "FORW-0112", image: "nologo.png", country: "Россия" },
    { id: 113, name: "Секатор для кустов", price: 780, category: "Товары для сада", subCategory: "Садовый инвентарь", article: "FORW-0113", image: "nologo.png", country: "Германия" },
    { id: 114, name: "Термометр садовый 'Пчела'", price: 290, category: "Товары для сада", subCategory: "Декор для сада", article: "FORW-0114", image: "nologo.png", country: "Китай" },
    { id: 115, name: "Автополив 'Улитка'", price: 460, category: "Товары для сада", subCategory: "Полив", article: "FORW-0115", image: "nologo.png", country: "Китай" },

    // --- ТОВАРЫ ДЛЯ ХОББИ (15 товаров) ---
    { id: 116, name: "Набор 'Зимний лес' мулине", price: 950, category: "Товары для хобби", subCategory: "Наборы для вышивания", article: "FORW-0116", image: "nologo.png", country: "Россия" },
    { id: 117, name: "Картина по номерам 'Кот у окна'", price: 680, category: "Товары для хобби", subCategory: "Рисование по номерам", article: "FORW-0117", image: "nologo.png", country: "Китай" },
    { id: 118, name: "Пряжа шерсть 100% (Серая)", price: 340, category: "Товары для хобби", subCategory: "Пряжа", article: "FORW-0118", image: "nologo.png", country: "Беларусь" },
    { id: 119, name: "Шпульки для швейной машины 10шт", price: 150, category: "Товары для хобби", subCategory: "Аксессуары для шитья", article: "FORW-0119", image: "nologo.png", country: "Китай" },
    { id: 120, name: "Сборная модель самолета ТУ-154", price: 1200, category: "Товары для хобби", subCategory: "Моделирование", article: "FORW-0120", image: "nologo.png", country: "Россия" },
    { id: 121, name: "Канва для вышивания Aida 14", price: 280, category: "Товары для хобби", subCategory: "Наборы для вышивания", article: "FORW-0121", image: "nologo.png", country: "Россия" },
    { id: 122, name: "Набор акрила для рисования", price: 790, category: "Товары для хобби", subCategory: "Рисование по номерам", article: "FORW-0122", image: "nologo.png", country: "Германия" },
    { id: 123, name: "Спицы бамбуковые 4мм", price: 190, category: "Товары для хобби", subCategory: "Пряжа", article: "FORW-0123", image: "nologo.png", country: "Китай" },
    { id: 124, name: "Ножницы портновские 20см", price: 620, category: "Товары для хобби", subCategory: "Аксессуары для шитья", article: "FORW-0124", image: "nologo.png", country: "Германия" },
    { id: 125, name: "Клей для пластиковых моделей", price: 230, category: "Товары для хобби", subCategory: "Моделирование", article: "FORW-0125", image: "nologo.png", country: "Россия" },
    { id: 126, name: "Пяльцы деревянные круглые", price: 310, category: "Товары для хобби", subCategory: "Наборы для вышивания", article: "FORW-0126", image: "nologo.png", country: "Беларусь" },
    { id: 127, name: "Мольберт настольный малый", price: 1500, category: "Товары для хобби", subCategory: "Рисование по номерам", article: "FORW-0127", image: "nologo.png", country: "Россия" },
    { id: 128, name: "Крючок для вязания с ручкой", price: 140, category: "Товары для хобби", subCategory: "Пряжа", article: "FORW-0128", image: "nologo.png", country: "Китай" },
    { id: 129, name: "Иголки для шитья (набор 20шт)", price: 85, category: "Товары для хобби", subCategory: "Аксессуары для шитья", article: "FORW-0129", image: "nologo.png", country: "Россия" },
    { id: 130, name: "Краска-эмаль для моделей (хаки)", price: 180, category: "Товары для хобби", subCategory: "Моделирование", article: "FORW-0130", image: "nologo.png", country: "Германия" },

    // --- ТОВАРЫ ДЛЯ СПОРТА (15 товаров) ---
    { id: 131, name: "Скакалка со счетчиком прыжков", price: 350, category: "Товары для спорта", subCategory: "Фитнес", article: "FORW-0131", image: "nologo.png", country: "Китай" },
    { id: 132, name: "Коврик для йоги нескользящий", price: 1100, category: "Товары для спорта", subCategory: "Йога", article: "FORW-0132", image: "nologo.png", country: "Китай" },
    { id: 133, name: "Очки для плавания Anti-fog", price: 650, category: "Товары для спорта", subCategory: "Аксессуары для плавания", article: "FORW-0133", image: "nologo.png", country: "Германия" },
    { id: 134, name: "Протеиновый батончик (набор 5шт)", price: 580, category: "Товары для спорта", subCategory: "Спортивное питание", article: "FORW-0134", image: "nologo.png", country: "Россия" },
    { id: 135, name: "Набор эспандеров ленточных", price: 420, category: "Товары для спорта", subCategory: "Эспандеры", article: "FORW-0135", image: "nologo.png", country: "Китай" },
    { id: 136, name: "Бутылка спортивная 750мл", price: 390, category: "Товары для спорта", subCategory: "Бутылки для воды", article: "FORW-0136", image: "nologo.png", country: "Россия" },
    { id: 137, name: "Ролик для пресса", price: 890, category: "Товары для спорта", subCategory: "Фитнес", article: "FORW-0137", image: "nologo.png", country: "Россия" },
    { id: 138, name: "Йога-блок пробковый", price: 520, category: "Товары для спорта", subCategory: "Йога", article: "FORW-0138", image: "nologo.png", country: "Китай" },
    { id: 139, name: "Шапочка для плавания силикон", price: 280, category: "Товары для спорта", subCategory: "Аксессуары для плавания", article: "FORW-0139", image: "nologo.png", country: "Китай" },
    { id: 140, name: "Изотоник порошок 500г", price: 1300, category: "Товары для спорта", subCategory: "Спортивное питание", article: "FORW-0140", image: "nologo.png", country: "Германия" },
    { id: 141, name: "Эспандер кистевой кольцо", price: 150, category: "Товары для спорта", subCategory: "Эспандеры", article: "FORW-0141", image: "nologo.png", country: "Россия" },
    { id: 142, name: "Шейкер для коктейлей 600мл", price: 450, category: "Товары для спорта", subCategory: "Бутылки для воды", article: "FORW-0142", image: "nologo.png", country: "Китай" },
    { id: 143, name: "Гантели виниловые 2х1кг", price: 1200, category: "Товары для спорта", subCategory: "Фитнес", article: "FORW-0143", image: "nologo.png", country: "Китай" },
    { id: 144, name: "Ремень для йоги хлопковый", price: 340, category: "Товары для спорта", subCategory: "Йога", article: "FORW-0144", image: "nologo.png", country: "Беларусь" },
    { id: 145, name: "Беруши для плавания", price: 190, category: "Товары для спорта", subCategory: "Аксессуары для плавания", article: "FORW-0145", image: "nologo.png", country: "Китай" },

    // --- ЦВЕТЫ (15 товаров) ---
    { id: 146, name: "Спатифиллум 'Микс'", price: 850, category: "Цветы", subCategory: "Комнатные растения", article: "FORW-0146", image: "nologo.png", country: "Россия" },
    { id: 147, name: "Семена Астры кустовой", price: 45, category: "Цветы", subCategory: "Семена цветов", article: "FORW-0147", image: "nologo.png", country: "Беларусь" },
    { id: 148, name: "Кашпо подвесное 'Плетенка'", price: 420, category: "Цветы", subCategory: "Горшки и кашпо", article: "FORW-0148", image: "nologo.png", country: "Китай" },
    { id: 149, name: "Грунт для орхидей 2л", price: 180, category: "Цветы", subCategory: "Грунт и удобрения", article: "FORW-0149", image: "nologo.png", country: "Россия" },
    { id: 150, name: "Набор табличек для рассады", price: 95, category: "Цветы", subCategory: "Декор для кашпо", article: "FORW-0150", image: "nologo.png", country: "Китай" },
    { id: 151, name: "Пульверизатор 0.5л прозрачный", price: 130, category: "Цветы", subCategory: "Инструменты для ухода", article: "FORW-0151", image: "nologo.png", country: "Китай" },
    { id: 152, name: "Искусственная лаванда (куст)", price: 290, category: "Цветы", subCategory: "Искусственные цветы", article: "FORW-0152", image: "nologo.png", country: "Китай" },
    { id: 153, name: "Драцена Маргината", price: 1100, category: "Цветы", subCategory: "Комнатные растения", article: "FORW-0153", image: "nologo.png", country: "Германия" },
    { id: 154, name: "Семена Бархатцев 2г", price: 35, category: "Цветы", subCategory: "Семена цветов", article: "FORW-0154", image: "nologo.png", country: "Россия" },
    { id: 155, name: "Горшок керамический 'Мрамор'", price: 760, category: "Цветы", subCategory: "Горшки и кашпо", article: "FORW-0155", image: "nologo.png", country: "Китай" },
    { id: 156, name: "Удобрение палочки для фикусов", price: 160, category: "Цветы", subCategory: "Грунт и удобрения", article: "FORW-0156", image: "nologo.png", country: "Германия" },
    { id: 157, name: "Декоративная бабочка на магните", price: 65, category: "Цветы", subCategory: "Декор для кашпо", article: "FORW-0157", image: "nologo.png", country: "Китай" },
    { id: 158, name: "Ножницы садовые мини", price: 340, category: "Цветы", subCategory: "Инструменты для ухода", article: "FORW-0158", image: "nologo.png", country: "Россия" },
    { id: 159, name: "Букет искусственных пионов", price: 890, category: "Цветы", subCategory: "Искусственные цветы", article: "FORW-0159", image: "nologo.png", country: "Китай" },
    { id: 160, name: "Суккулент Эхеверия Микс", price: 320, category: "Цветы", subCategory: "Комнатные растения", article: "FORW-0160", image: "nologo.png", country: "Германия" },

    // --- ХОЗТОВАРЫ (15 товаров) ---
    { id: 161, name: "Ведро 10л пластик", price: 210, category: "Хозтовары", subCategory: "Уборка дома", article: "FORW-0161", image: "nologo.png", country: "Россия" },
    { id: 162, name: "Контейнер для хранения 15л", price: 480, category: "Хозтовары", subCategory: "Хранение", article: "FORW-0162", image: "nologo.png", country: "Россия" },
    { id: 163, name: "Коврик в ванную силиконовый", price: 560, category: "Хозтовары", subCategory: "Принадлежности для ванной", article: "FORW-0163", image: "nologo.png", country: "Китай" },
    { id: 164, name: "Сетка-шпалера для огурцов", price: 120, category: "Хозтовары", subCategory: "Сад и огород", article: "FORW-0164", image: "nologo.png", country: "Россия" },
    { id: 165, name: "Нож кухонный универсальный", price: 350, category: "Хозтовары", subCategory: "Мелочи для кухни", article: "FORW-0165", image: "nologo.png", country: "Германия" },
    { id: 166, name: "Прищепки бамбуковые 20шт", price: 180, category: "Хозтовары", subCategory: "Аксессуары для одежды", article: "FORW-0166", image: "nologo.png", country: "Беларусь" },
    { id: 167, name: "Набор бумажных тарелок 10шт", price: 95, category: "Хозтовары", subCategory: "Одноразовая посуда", article: "FORW-0167", image: "nologo.png", country: "Россия" },
    { id: 168, name: "Швабра с микрофиброй", price: 890, category: "Хозтовары", subCategory: "Уборка дома", article: "FORW-0168", image: "nologo.png", country: "Китай" },
    { id: 169, name: "Органайзер для обуви", price: 320, category: "Хозтовары", subCategory: "Хранение", article: "FORW-0169", image: "nologo.png", country: "Китай" },
    { id: 170, name: "Мыльница на присоске", price: 140, category: "Хозтовары", subCategory: "Принадлежности для ванной", article: "FORW-0170", image: "nologo.png", country: "Беларусь" },
    { id: 171, name: "Перчатки резиновые садовые", price: 110, category: "Хозтовары", subCategory: "Сад и огород", article: "FORW-0171", image: "nologo.png", country: "Россия" },
    { id: 172, name: "Терка четырехгранная сталь", price: 280, category: "Хозтовары", subCategory: "Мелочи для кухни", article: "FORW-0172", image: "nologo.png", country: "Китай" },
    { id: 173, name: "Пакеты вакуумные для одежды", price: 420, category: "Хозтовары", subCategory: "Аксессуары для одежды", article: "FORW-0173", image: "nologo.png", country: "Китай" },
    { id: 174, name: "Стаканы одноразовые 200мл (50шт)", price: 130, category: "Хозтовары", subCategory: "Одноразовая посуда", article: "FORW-0174", image: "nologo.png", country: "Россия" },
    { id: 175, name: "Мешки для мусора 60л с завязками", price: 160, category: "Хозтовары", subCategory: "Уборка дома", article: "FORW-0175", image: "nologo.png", country: "Россия" }
];

let filteredProducts = [...allProducts];
let currentPage = 1;
const itemsPerPage = 20;


function updateActiveNavLinks() {
    // 1. Получаем текущую категорию из URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category');

    // 2. Находим все ссылки в верхней панели навигации
    const navLinks = document.querySelectorAll('.nav-cats a');

    navLinks.forEach(link => {
        // Удаляем класс active у всех на всякий случай
        link.classList.remove('active');

        // 3. Проверяем, совпадает ли href ссылки с текущей категорией
        if (currentCategory) {
            // Создаем объект URL из ссылки, чтобы легко достать параметры
            const linkUrl = new URL(link.href, window.location.origin);
            const linkCategory = linkUrl.searchParams.get('category');

            if (linkCategory === currentCategory) {
                link.classList.add('active');
            }
        }
    });
}
function renderGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.classList.remove('animating');

    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredProducts.slice(start, start + itemsPerPage);
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');

    grid.innerHTML = pageItems.map(item => {
        const isFavorite = wishlist.some(fav => Number(fav.id) === Number(item.id));
        const heartClass = isFavorite ? 'fas fa-heart active' : 'far fa-heart';

        // 1. Улучшенная проверка: если поле пустое, сразу ставим nologo
        let rawUrl = (item.image && item.image.trim() !== "") ? item.image.trim() : "nologo.png";
        let finalPath = "";

        if (rawUrl === "nologo.png") {
            finalPath = "nologo.png";
        } else if (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) {
            finalPath = rawUrl;
        } else {
            finalPath = 'img/' + rawUrl;
        }

        const imageUrl = encodeURI(finalPath);
        const isDefault = finalPath === "nologo.png" ? "is-default" : "";

        return `
        <div class="product-card">
            <i class="${heartClass} wishlist-icon" onclick="toggleWishlist(${item.id})"></i>
            <a href="product.html?id=${item.id}" style="text-decoration: none; color: inherit;">
                <div class="product-img-container ${isDefault}">
                    <img src="${imageUrl}" 
                         onerror="this.src='nologo.png'; this.parentElement.classList.add('is-default')" 
                         alt="${item.name}">
                </div>
                <span class="product-name">${item.name}</span>
            </a>
            <div class="product-footer">
                <span class="price">${item.price} ₽</span>
                <button class="btn-outline-green" onclick="addToCart(${item.id})">
                    В корзину
                </button>
            </div>
        </div>
        `;
    }).join('');

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const container = document.getElementById('pagination');
    if (!container) return;

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    const range = 2; // Сколько страниц показывать по бокам от текущей

    // Кнопка "Назад"
    if (currentPage > 1) {
        html += `<button class="page-btn nav-btn" onclick="setPage(${currentPage - 1})">
                    <i class="fas fa-chevron-left"></i>
                 </button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        // Логика показа первой, последней и соседних страниц с текущей
        if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
            html += `<button class="page-btn num-btn ${i === currentPage ? 'active' : ''}" onclick="setPage(${i})">
                        ${i}
                     </button>`;
        }
        // Добавляем многоточие
        else if (i === currentPage - range - 1 || i === currentPage + range + 1) {
            html += `<span class="page-dots">...</span>`;
        }
    }

    // Кнопка "Вперед"
    if (currentPage < totalPages) {
        html += `<button class="page-btn nav-btn" onclick="setPage(${currentPage + 1})">
                    <i class="fas fa-chevron-right"></i>
                 </button>`;
    }

    container.innerHTML = html;
}

// Добавь это в функцию setPage, чтобы при переключении страницы кидало вверх к товарам
function setPage(page) {
    currentPage = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Плавный скролл вверх
}
// Словарь для красивых названий категорий
const categoryNames = {
    'bytovaya-khimiya': 'Бытовая химия',
    'galantereya': 'Галантерея',
    'tsvety': 'Цветы',
    'kantstovary': 'Канцтовары',
    'krasota': 'Косметика и гигиена',
    'odezhda': 'Одежда',
    'posuda': 'Посуда',
    'produkty': 'Продукты',
    'sport': 'Товары для спорта',
    'dom': 'Товары для дома',
    'zhivotnym': 'Зоотовары',
    'sad': 'Товары для сада',
    'khobbi': 'Товары для хобби',
    'khoztovary': 'Хозтовары',
    'kosmetika-i-gigiena': 'Косметика и гигиена',
    'tovary-dlya-doma': 'Товары для дома',
    'instrumenty': 'Инструменты',
    'detyam': 'Игрушки',
    'elektronika': 'Электроника',

};



// Уточненная функция поиска макс. цены
function getMaxPriceByCategory(categoryName) {
    // Если категория не передана, ищем по всем товарам
    const products = categoryName
        ? allProducts.filter(p => p.category === categoryName)
        : allProducts;

    if (products.length === 0) return 10000; // Дефолтное значение, если товаров нет
    return Math.max(...products.map(p => p.price));
}

function updateBreadcrumbs(categorySlug, subCategory) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;

    const categoryName = categoryNames[categorySlug];
    let html = `<a href="index.html">Главная</a> <span class="separator-arrow">›</span> 
                <a href="shop.html">Магазин</a>`;

    if (categoryName) {
        // Если выбрана подкатегория, категория становится ссылкой
        if (subCategory) {
            html += `<span class="separator-arrow">›</span> 
                     <a href="shop.html?category=${categorySlug}">${categoryName}</a>
                     <span class="separator-arrow">›</span> 
                     <span>${decodeURIComponent(subCategory)}</span>`;
        } else {
            // Если только категория — она последний элемент (текст)
            html += `<span class="separator-arrow">›</span> <span>${categoryName}</span>`;
        }
    }

    breadcrumbs.innerHTML = html;
}

function handleFilter() {
    const grid = document.getElementById('products-grid');
    const loader = document.getElementById('loader');
    const pageTitle = document.getElementById('page-title') || document.querySelector('h1');

    if (loader) loader.style.display = 'block';
    if (grid) grid.style.opacity = '0.3';

    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategorySlug = urlParams.get('category');
        const selectedSubCategory = urlParams.get('subcategory');

        // 1. ПОЛУЧАЕМ ТЕКУЩУЮ КАТЕГОРИЮ
        // Используем объект categoryNames для перевода из URL (slug) в понятное имя
        const selectedCategoryName = categoryNames[selectedCategorySlug];

        // 2. СБОР ВЫБРАННЫХ СТРАН
        const selectedCountries = Array.from(document.querySelectorAll('#country-filters input:checked'))
            .map(cb => cb.value);

        // 3. БЕЗОПАСНОЕ ОБНОВЛЕНИЕ ЗАГОЛОВКА
        // Если у заголовка id="p-title", значит мы на странице товара — НЕ меняем его
        if (pageTitle && pageTitle.id !== 'p-title') {
            if (selectedSubCategory) {
                pageTitle.innerText = decodeURIComponent(selectedSubCategory);
            } else if (selectedCategoryName) {
                pageTitle.innerText = selectedCategoryName;
            } else {
                pageTitle.innerText = 'Магазин';
            }
        }

        // 4. КОМБИНИРОВАННАЯ ФИЛЬТРАЦИЯ (Категория + Подкатегория + Страна)
        const baseFiltered = allProducts.filter(p => {
            const categoryMatch = !selectedCategorySlug || p.category === selectedCategoryName;
            const subCategoryMatch = !selectedSubCategory || p.subCategory === decodeURIComponent(selectedSubCategory);
            const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(p.country);

            return categoryMatch && subCategoryMatch && countryMatch;
        });

        // 5. ДИНАМИЧЕСКИЙ ДИАПАЗОН ЦЕН
        const dynamicMax = baseFiltered.length > 0
            ? Math.max(...baseFiltered.map(p => p.price))
            : 10000;

        const priceMinInput = document.getElementById('price-min');
        const priceMaxInput = document.getElementById('price-max');
        const slider1 = document.getElementById('slider-1');
        const slider2 = document.getElementById('slider-2');

        if (priceMaxInput && slider2) {
            slider1.max = dynamicMax;
            slider2.max = dynamicMax;
            if (parseInt(priceMaxInput.value) > dynamicMax || !priceMaxInput.value) {
                priceMaxInput.value = dynamicMax;
                slider2.value = dynamicMax;
            }
            if (typeof updateTrackColor === 'function') updateTrackColor();
        }

        // 6. ФИНАЛЬНЫЙ РЕЗУЛЬТАТ ПО ЦЕНЕ
        const minPrice = parseInt(priceMinInput?.value) || 0;
        const maxPrice = parseInt(priceMaxInput?.value) || dynamicMax;

        filteredProducts = baseFiltered.filter(p => p.price >= minPrice && p.price <= maxPrice);

        // 7. СОРТИРОВКА
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            const sortVal = sortSelect.value;
            if (sortVal === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
            if (sortVal === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
        }

        currentPage = 1;

        // ВАЖНО: Убедитесь, что ваша функция renderGrid() использует логику
        // формирования пути img/, которую мы обсуждали ранее.
        renderGrid();

        if (loader) loader.style.display = 'none';
        if (grid) {
            grid.style.opacity = '1';
            grid.classList.add('animating');
        }
    }, 600);
}
function setPage(p) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (p < 1 || p > totalPages) return;
    currentPage = p;
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetFilters() {
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    // Сбрасываем и страны, и категории
    document.querySelectorAll('#country-filters input, #category-filters input').forEach(cb => cb.checked = false);
    handleFilter();
}

// Слайдеры и инициализация
// === ЕДИНЫЙ БЛОК ИНИЦИАЛИЗАЦИИ ===
document.addEventListener('DOMContentLoaded', () => {
    // 1. То, что должно работать НА ВСЕХ страницах (например, боковое меню)
    if (typeof updateActiveNavLinks === 'function') updateActiveNavLinks();
    if (typeof renderSmartCatalog === 'function') renderSmartCatalog();

    // 2. ПРЕДОХРАНИТЕЛЬ: Если сетки магазина нет, значит мы в поиске или на главной.
    // Останавливаем выполнение shop.js, чтобы не ломать чужие заголовки!
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    // 3. Код ТОЛЬКО для страницы магазина
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('category');
    const sub = urlParams.get('subcategory');

    // Крошки
    if (typeof updateBreadcrumbs === 'function') updateBreadcrumbs(cat, sub);

    // Слайдеры цены
    const slider1 = document.getElementById('slider-1');
    const slider2 = document.getElementById('slider-2');
    const priceMaxInput = document.getElementById('price-max');

    if (priceMaxInput && slider2) {
        // Узнаем макс цену для текущей категории
        const maxCategoryPrice = getMaxPriceByCategory(categoryNames[cat]);

        priceMaxInput.value = maxCategoryPrice;
        slider2.max = maxCategoryPrice;
        slider2.value = maxCategoryPrice;

        if (slider1) {
            slider1.max = maxCategoryPrice;
            slider1.value = 0;
            slider1.oninput = controlSlider1;
        }
        slider2.oninput = controlSlider2;
        if (typeof updateTrackColor === 'function') updateTrackColor();
    }

    // Запуск фильтрации (она сама отрисует товары)
    if (typeof handleFilter === 'function') handleFilter();
});

function updateTrackColor() {
    const slider1 = document.getElementById('slider-1');
    const slider2 = document.getElementById('slider-2');
    const track = document.querySelector('.slider-track');
    if(!slider1 || !slider2 || !track) return;

    const percent1 = (slider1.value / slider1.max) * 100;
    const percent2 = (slider2.value / slider2.max) * 100;
    track.style.background = `linear-gradient(to right, #e0e0e0 ${percent1}%, #76e12e ${percent1}%, #76e12e ${percent2}%, #e0e0e0 ${percent2}%)`;
}

function controlSlider1() {
    const slider1 = document.getElementById('slider-1');
    const slider2 = document.getElementById('slider-2');
    if (parseInt(slider1.value) > parseInt(slider2.value)) slider1.value = slider2.value;
    document.getElementById('price-min').value = slider1.value;
    updateTrackColor();
    handleFilter();
}

function controlSlider2() {
    const slider1 = document.getElementById('slider-1');
    const slider2 = document.getElementById('slider-2');
    if (parseInt(slider2.value) < parseInt(slider1.value)) slider2.value = slider1.value;
    document.getElementById('price-max').value = slider2.value;
    updateTrackColor();
    handleFilter();
}
function getMaxPriceByCategory(category) {
    // Если категория не выбрана, ищем макс. цену среди всех товаров
    const products = category
        ? allProducts.filter(p => p.category === category)
        : allProducts;

    if (products.length === 0) return 0;

    // Находим максимальное значение цены
    const max = Math.max(...products.map(p => p.price));
    return max;
}
function renderSmartCatalog() {
    const container = document.getElementById('catalog-list');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const activeCat = urlParams.get('category');
    const activeSub = urlParams.get('subcategory');

    container.innerHTML = '';

    Object.keys(catalogData).forEach(catName => {
        // Находим слаг для текущей категории по её имени
        const catSlug = Object.keys(categoryNames).find(key => categoryNames[key] === catName) || 'all';
        const isCatActive = activeCat === catSlug;

        const wrapper = document.createElement('div');
        // Добавляем класс 'open' только если категория активна в URL
        wrapper.className = `cat-item-wrapper ${isCatActive ? 'open active' : ''}`;

        wrapper.innerHTML = `
            <div class="cat-header">
                <a href="shop.html?category=${catSlug}" class="cat-link ${isCatActive ? 'active' : ''}">${catName}</a>
                <span class="toggle-arrow">
                    <i class="fas fa-chevron-right"></i>
                </span>
            </div>
            <div class="sub-cat-list">
                ${catalogData[catName].map(sub => {
            // Проверяем активность подкатегории
            const isSubActive = activeSub === sub;
            return `
                        <a href="shop.html?subcategory=${encodeURIComponent(sub)}&category=${catSlug}" 
                           class="sub-cat-item ${isSubActive ? 'active' : ''}">
                            ${sub}
                        </a>
                    `;
        }).join('')}
            </div>
        `;

        // Логика клика по стрелочке
        const arrow = wrapper.querySelector('.toggle-arrow');
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Останавливаем всплытие, чтобы не сработали другие события

            // 1. Находим все остальные открытые категории и закрываем их
            document.querySelectorAll('.cat-item-wrapper.open').forEach(openWrapper => {
                if (openWrapper !== wrapper) {
                    openWrapper.classList.remove('open');
                }
            });

            // 2. Переключаем текущую
            wrapper.classList.toggle('open');
        });

        container.appendChild(wrapper);
    });
}
window.resetToShop = function() {
    // 1. Очищаем инпуты цен
    if (document.getElementById('price-min')) document.getElementById('price-min').value = '';
    if (document.getElementById('price-max')) document.getElementById('price-max').value = '';

    // 2. Сбрасываем чекбоксы стран (если они выбраны)
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);

    // 3. Переходим на чистую страницу магазина без параметров в URL
    // Это автоматически сбросит категорию и вернет заголовок "Магазин"
    window.location.href = 'shop.html';
};

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', renderSmartCatalog);