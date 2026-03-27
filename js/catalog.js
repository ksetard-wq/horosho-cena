document.addEventListener('DOMContentLoaded', function() {
    // 1. Данные (12 категорий)
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
        "Зоотовары": ["Корм для кошек", "Корм для собак", "Лакомства", "Игрушки для животных", "Миски", "Наполнители", "Ошейники", "Переноски"]
    };
    const categoryNames = {
        'bytovaya-khimiya': 'Бытовая химия',
        'galantereya': 'Галантерея',
        'kantstovary': 'Канцтовары',
        'posuda': 'Посуда',
        'produkty': 'Продукты',
        'odezhda': 'Одежда',
        'kosmetika-i-gigiena': 'Косметика и гигиена',
        'tovary-dlya-doma': 'Товары для дома',
        'instrumenty': 'Инструменты',
        'igrushki': 'Игрушки',
        'elektronika': 'Электроника',
        'zootovary': 'Зоотовары'
    };

// Вспомогательная функция для поиска ключа по значению
    function getSlugByValue(value) {
        return Object.keys(categoryNames).find(key => categoryNames[key] === value);
    }
    const btn = document.getElementById('catalogBtn');
    const menu = document.getElementById('catalogMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mainCatsList = document.getElementById('mainCategories');
    const subContainer = document.getElementById('subContainer');
    const subList = document.getElementById('submenuList');

    if (!btn || !menu) return;

    // 3. Функция переключения меню
    function toggleMenu(state) {
        if (state) {
            menu.classList.add('active');
            // УБРАЛИ блокировку скролла body. Теперь страница крутится обычно.
            renderMain();
        } else {
            menu.classList.remove('active');
        }
    }

    // 4. Отрисовка левой части
    function renderMain() {
        if (!mainCatsList) return;
        mainCatsList.innerHTML = '';
        Object.keys(catalogData).forEach((cat, i) => {
            const li = document.createElement('li');
            li.textContent = cat;

            // При клике на саму категорию в левом списке
            li.onclick = () => {
                const slug = getSlugByValue(cat);
                window.location.href = `shop.html?category=${slug}`;
            };

            li.onmouseenter = () => {
                document.querySelectorAll('.main-categories li').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
                showSubs(cat);
            };
            mainCatsList.appendChild(li);
            if (i === 0) {
                li.classList.add('active');
                showSubs(cat);
            }
        });
    }

    // 5. Отрисовка правой части
    function showSubs(catName) {
        if (!subList || !subContainer) return;

        subContainer.classList.remove('visible');

        setTimeout(() => {
            subList.innerHTML = '';
            const catSlug = getSlugByValue(catName);

            // 1. Заголовок категории (Клик ведет на общую категорию)
            const titleLi = document.createElement('li');
            titleLi.textContent = catName;
            titleLi.style.cssText = "font-weight:700; font-size:32px; color:#000; margin-bottom:30px; cursor:pointer;";
            titleLi.onclick = () => {
                window.location.href = `shop.html?category=${catSlug}`;
            };
            subList.appendChild(titleLi);

            // 2. Сами подкатегории (Клик ведет на фильтр подкатегории)
            catalogData[catName].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                li.style.cssText = "font-size:16px; color:#555; cursor:pointer; padding:5px 0;";

                li.onclick = () => {
                    // Формируем ссылку: категория + подкатегория
                    const url = `shop.html?category=${catSlug}&subcategory=${encodeURIComponent(item)}`;
                    window.location.href = url;
                };

                // Добавим легкий эффект наведения для подкатегорий прямо здесь
                li.onmouseenter = () => li.style.color = "#76e12e";
                li.onmouseleave = () => li.style.color = "#555";

                subList.appendChild(li);
            });

            subContainer.classList.add('visible');
        }, 50);
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(!menu.classList.contains('active'));
    });

    if (closeMenuBtn) {
        closeMenuBtn.onclick = () => toggleMenu(false);
    }

    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== btn) {
            toggleMenu(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") toggleMenu(false);
    });
});