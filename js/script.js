document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('cityModal');
    const openBtn = document.getElementById('openCityModal');
    const closeBtn = document.getElementById('closeModal');

    // Новое: ищем кнопку города внутри КАТАЛОГА
    const catalogCityTrigger = document.getElementById('cityTrigger');

    // Новое: ищем ВСЕ текстовые элементы, где отображается город (и в шапке, и в каталоге)
    // Для этого добавь класс .current-city-value к спану в шапке, если его там нет
    const allCityTexts = document.querySelectorAll('.current-city-value');

    const cityOptions = document.querySelectorAll('.city-variant');

    // 1. Открытие окна (из шапки)
    if (openBtn) {
        openBtn.onclick = function() {
            modal.style.display = "flex";
        };
    }

    // 1.1 Открытие окна (из КАТАЛОГА)
    if (catalogCityTrigger) {
        catalogCityTrigger.onclick = function() {
            modal.style.display = "flex";
            // По желанию: можно закрыть каталог при открытии выбора города
            // document.getElementById('catalogMenu').classList.remove('active');
        };
    }

    // 2. Смена города
    cityOptions.forEach(function(option) {
        option.onclick = function() {
            const newCity = this.textContent;

            // Обновляем текст во всех местах сразу
            allCityTexts.forEach(function(el) {
                el.textContent = newCity;
            });

            // Если в шапке ID другой (например currentCity), обновим и его для подстраховки
            const headerCity = document.getElementById('currentCity');
            if (headerCity) headerCity.textContent = newCity;

            modal.style.display = "none";
        };
    });

    // 3. Закрытие на кнопку "Отмена"
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // 4. Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

// Твой скролл (без изменений)
window.onscroll = function() {
    const header = document.querySelector(".main-content");
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("shrunk");
        } else {
            header.classList.remove("shrunk");
        }
    }
};

// Закрытие при клике вне меню

function updateHeaderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const badge = document.getElementById('wishlist-badge');

    // Обновляем счетчик
    if (badge) {
        badge.innerText = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'block' : 'none';
    }

    // Подсвечиваем все сердечки у товаров, которые уже в списке
    document.querySelectorAll('.btn-add-wishlist').forEach(button => {
        const productId = button.getAttribute('data-id');
        const isAdded = wishlist.some(item => item.id == productId);

        if (isAdded) {
            button.classList.add('active'); // Сердечко станет красным
        } else {
            button.classList.remove('active');
        }
    });
}
// 1. Добавление/Удаление из избранного
function toggleWishlist(id, name, price, img) {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const index = wishlist.findIndex(item => Number(item.id) === Number(id));

    if (index > -1) {
        wishlist.splice(index, 1);
        // showToast(`"${name}" удален`); // если есть функция тоста
    } else {
        wishlist.push({ id, name, price, img });
        // showToast(`"${name}" добавлен`);
    }

    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));

    // Обновляем иконки в шапке
    if (typeof updateHeaderWishlist === 'function') updateHeaderWishlist();

    // САМОЕ ГЛАВНОЕ: перерисовываем сетку товаров на текущей странице
    if (typeof renderGrid === 'function') {
        renderGrid();
    }
}
// 2. Обновление мини-избранного (Dropdown)
function updateHeaderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const badge = document.getElementById('wishlist-badge');
    const dropdown = document.getElementById('wishlist-dropdown-content');

    if (badge) {
        badge.innerText = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'block' : 'none';
    }

    if (!dropdown) return;

    if (wishlist.length === 0) {
        dropdown.innerHTML = '<p style="text-align:center; padding:20px;">Список желаний пуст.</p>';
    } else {
        dropdown.innerHTML = wishlist.map((item, index) => `
            <div class="dropdown-item">
                <img src="${item.img}" alt="" style="width:40px; height:40px; object-fit:contain;">
                <div class="item-info" style="flex:1; margin-left:10px;">
                    <div style="font-weight:bold; font-size:12px;">${item.name}</div>
                    <div>${item.price} ₽</div>
                </div>
                <button class="mini-cart-delete" onclick="removeFromWishlist(${index})">✕</button>
            </div>
        `).join('') + `<a href="wishlist.html" class="btn-green-fill" style="display:block; margin-top:10px; text-align:center;">Просмотр списка</a>`;
    }
}

// 3. Рендер основной таблицы Wishlist
function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const itemsList = document.getElementById('wishlist-items');
    const emptySection = document.getElementById('empty-wishlist');
    const contentSection = document.getElementById('wishlist-content');

    if (wishlist.length === 0) {
        if (emptySection) emptySection.style.display = 'block';
        if (contentSection) contentSection.style.display = 'none';
        return;
    }

    if (emptySection) emptySection.style.display = 'none';
    if (contentSection) contentSection.style.display = 'block';

    itemsList.innerHTML = wishlist.map((item, index) => `
        <tr>
            <td class="text-center"><button class="remove-wish" onclick="removeFromWishlist(${index})">✕</button></td>
            <td><img src="${item.img}" class="cart-product-img" style="width:50px;"></td>
            <td><a href="product.html?id=${item.id}" class="wish-item-name">${item.name}</a></td>
            <td>${item.price}₽</td>
            <td><span class="stock-status">В наличии</span></td>
            <td><button class="btn-wish-to-cart" onclick="moveToCart(${index})">В корзину</button></td>
        </tr>
    `).join('');
}

// Удаление и перенос
window.removeFromWishlist = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    updateHeaderWishlist();
    renderWishlist();
};

window.moveToCart = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const item = wishlist[index];
    addToCart(item.id, item.name, item.price, item.img); // Вызывает вашу функцию добавления в корзину
    removeFromWishlist(index);
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderWishlist();
    if (document.getElementById('wishlist-items')) renderWishlist();
});
// Вызывайте это внутри функции, которая меняет город
function changeCity(newCity) {
    document.getElementById('currentCity').textContent = newCity; // В шапке
    document.getElementById('currentCityMenu').textContent = newCity; // В меню каталога
}
document.addEventListener('DOMContentLoaded', () => {
    const mSlider = document.getElementById('main-slider');
    const mSlides = document.querySelectorAll('.main-slider .slide');
    const mainDotsBox = document.getElementById('main-dots');
    const navGroup = document.querySelector('.slider-navigation-group');

    if (mSlider && mSlides.length > 0) {
        const nextBtn = navGroup.querySelector('.next');
        const prevBtn = navGroup.querySelector('.prev');
        let mIdx = 0;

        // Чистим и создаем точки
        mainDotsBox.innerHTML = '';
        mSlides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => showMain(i));
            mainDotsBox.appendChild(dot);
        });

        // ЕДИНАЯ функция переключения
        function showMain(index) {
            mSlides[mIdx].classList.remove('active');
            if(mainDotsBox.children[mIdx]) mainDotsBox.children[mIdx].classList.remove('active');

            mIdx = (index + mSlides.length) % mSlides.length;

            mSlides[mIdx].classList.add('active');
            if(mainDotsBox.children[mIdx]) mainDotsBox.children[mIdx].classList.add('active');

            // Тема и фон
            const data = mSlides[mIdx].dataset;
            if (data.theme) mSlider.setAttribute('data-theme', data.theme);
            if (data.bg) mSlider.style.background = data.bg;
        }

        nextBtn.onclick = () => showMain(mIdx + 1);
        prevBtn.onclick = () => showMain(mIdx - 1);

        setInterval(() => showMain(mIdx + 1), 8000);

    }

    // === 2. ПРАВЫЙ САЙДБАР (10 ТОВАРОВ) ===
    const sideCards = document.querySelectorAll('.side-card');
    const sideDotBox = document.getElementById('side-dots');
    const sideContainer = document.getElementById('side-container');

    if (sideCards.length > 0 && sideDotBox) {
        let sIdx = 0;
        let sideInterval;

        // Создаем 10 точек автоматически
        sideDotBox.innerHTML = '';
        sideCards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `s-dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => showSide(i);
            sideDotBox.appendChild(dot);
        });

        function showSide(index) {
            sideCards[sIdx].classList.remove('active');
            sideDotBox.children[sIdx].classList.remove('active');
            sIdx = (index + sideCards.length) % sideCards.length;
            sideCards[sIdx].classList.add('active');
            sideDotBox.children[sIdx].classList.add('active');
        }

        const startSideAuto = () => { sideInterval = setInterval(() => showSide(sIdx + 1), 5000); };
        sideContainer.onmouseenter = () => clearInterval(sideInterval);
        sideContainer.onmouseleave = startSideAuto;
        startSideAuto();
    }
});

// Скролл хедера
window.onscroll = function() {
    const header = document.querySelector(".main-content");
    if (header && window.scrollY > 50) header.classList.add("shrunk");
    else if (header) header.classList.remove("shrunk");
};
function showMain(index) {
    mSlides[mIdx].classList.remove('active');
    const allDots = mainDotsBox.querySelectorAll('.dot');
    if(allDots[mIdx]) allDots[mIdx].classList.remove('active');

    mIdx = (index + mSlides.length) % mSlides.length;

    mSlides[mIdx].classList.add('active');
    if(allDots[mIdx]) allDots[mIdx].classList.add('active');

    // КЛЮЧЕВАЯ СТРОКА: Передаем тему от слайда к родителю
    mSlider.setAttribute('data-theme', mSlides[mIdx].dataset.theme);

    const newBg = mSlides[mIdx].getAttribute('data-bg');
    if(newBg) mSlider.style.background = newBg;
}
function handleSubscribe() {
    const emailInput = document.querySelector('.footer-subscribe input[type="email"]');
    const email = emailInput.value.trim();
    const loader = document.getElementById('full-page-loader');

    // Регулярное выражение для проверки почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Показываем лоадер
    loader.style.display = 'flex';

    setTimeout(() => {
        // Скрываем лоадер через секунду "проверки"
        loader.style.display = 'none';

        if (!emailRegex.test(email)) {
            // ОШИБКА: Неверный формат
            showStatusModal(
                'error',
                'Ошибка адреса',
                'Пожалуйста, введите корректный Email в формате example@mail.ru'
            );
        } else {
            // УСПЕХ: Имитация отправки
            showStatusModal(
                'success',
                'Успешно!',
                `Письмо с подтверждением отправлено на адрес: ${email}`
            );
            emailInput.value = ''; // Очистить поле

            // Здесь место для реальной отправки:
            // fetch('send_email.php', { method: 'POST', body: JSON.stringify({email: email}) });
        }
    }, 1200);
}

function showStatusModal(type, title, text) {
    const modal = document.getElementById('status-modal');
    const titleElem = document.getElementById('modal-title');
    const textElem = document.getElementById('modal-text');
    const iconElem = document.getElementById('modal-icon');

    titleElem.innerText = title;
    textElem.innerText = text;

    if (type === 'error') {
        iconElem.innerHTML = '<div class="icon-error">✕</div>';
    } else {
        iconElem.innerHTML = '<div class="icon-success">✓</div>';
    }

    modal.style.display = 'flex';
}

function closeStatusModal() {
    document.getElementById('status-modal').style.display = 'none';
}
// Основная логика подписки
function handleSubscribe() {
    const emailInput = document.querySelector('.footer-subscribe input[type="email"]');
    const email = emailInput.value.trim();
    const loader = document.getElementById('subscribe-loader');

    // Регулярка для проверки почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Включаем лоадер
    loader.style.display = 'flex';

    setTimeout(() => {
        // Выключаем лоадер через 1.5 секунды
        loader.style.display = 'none';

        if (!emailRegex.test(email)) {
            // ОШИБКА: Неверный формат
            showSubModalStatus(
                'error',
                'Ошибка ввода',
                'Пожалуйста, проверьте правильность написания почты. Адрес должен быть в формате name@mail.ru'
            );
        } else {
            // ПРОВЕРКА: Уже подписан или нет
            let subscriptions = JSON.parse(localStorage.getItem('my_subscriptions')) || [];

            if (subscriptions.includes(email)) {
                // Если почта уже есть в списке
                showSubModalStatus(
                    'success', // Используем success, так как это не критическая ошибка, а статус
                    'Вы уже с нами!',
                    `Ваш адрес ${email} уже успешно подписан на наши рассылки.`
                );
            } else {
                // Новая подписка: сохраняем в память
                subscriptions.push(email);
                localStorage.setItem('my_subscriptions', JSON.stringify(subscriptions));

                showSubModalStatus(
                    'success',
                    'Успешная подписка!',
                    `Спасибо за доверие! Мы отправили письмо с подтверждением на адрес: ${email}`
                );
            }
            emailInput.value = ''; // Очистить поле в обоих случаях успеха
        }
    }, 1500);
}

// Показ красивого модального окна
function showSubModalStatus(type, title, text) {
    const modal = document.getElementById('subscribe-status-modal');
    const titleElem = document.getElementById('sub-modal-title');
    const textElem = document.getElementById('sub-modal-text');
    const iconElem = document.getElementById('sub-modal-icon');

    titleElem.innerText = title;
    textElem.innerText = text;

    if (type === 'error') {
        iconElem.innerHTML = '<div class="sub-icon-error">✕</div>';
    } else {
        iconElem.innerHTML = '<div class="sub-icon-success">✓</div>';
    }

    modal.style.display = 'flex';

    // Закрытие при клике на фон
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeSubModal();
        }
    };
}

function closeSubModal() {
    const modal = document.getElementById('subscribe-status-modal');
    if (modal) modal.style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('main-search-input');
    const searchBtn = document.getElementById('search-submit-btn');
    const resultsContainer = document.getElementById('search-results-ajax');

    let currentLimit = 10;
    let filteredProducts = [];

    if (!searchInput || !resultsContainer) return;

    // --- 1. ФУНКЦИЯ ПЕРЕХОДА НА ПОЛНУЮ СТРАНИЦУ ПОИСКА ---
    const goToFullSearch = () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    };

    // Слушаем клик по лупе
    if (searchBtn) {
        searchBtn.addEventListener('click', goToFullSearch);
    }

    // Слушаем нажатие ENTER в поле ввода
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Отменяем перезагрузку формы
            goToFullSearch();
        }
    });

    // --- 2. AJAX ПОИСК (Выпадающий список при вводе) ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        currentLimit = 10;

        if (query.length < 1) {
            resultsContainer.style.display = 'none';
            return;
        }

        if (typeof allProducts === 'undefined') {
            console.error("Массив allProducts не найден!");
            return;
        }

        filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            (product.category && product.category.toLowerCase().includes(query))
        );

        renderSearchRows();
    });

    // --- 3. ОТРИСОВКА СТРОК В ВЫПАДАЮЩЕМ СПИСКЕ ---
    function renderSearchRows() {
        if (filteredProducts.length === 0) {
            resultsContainer.innerHTML = '<div style="padding:15px; color:#999;">Ничего не найдено</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        const visibleItems = filteredProducts.slice(0, currentLimit);

        let html = visibleItems.map(product => {
            // Исправляем путь к картинке
            let rawImg = product.image || product.img || 'nologo.png';
            let imgSrc = (rawImg.startsWith('http') || rawImg.startsWith('img/')) ? rawImg : 'img/' + rawImg;

            return `
                <div class="search-item" onclick="window.location.href='product.html?id=${product.id}'">
                    <img src="${imgSrc}" onerror="this.src='img/nologo.png'">
                    <div class="search-item-info">
                        <span class="search-item-name">${product.name}</span>
                        <span class="search-item-price">${product.price} ₽</span>
                    </div>
                </div>
            `;
        }).join('');

        if (filteredProducts.length > currentLimit) {
            html += `
                <div id="load-more-search" class="search-load-more" style="cursor:pointer; text-align:center; padding:10px; color:#76e12e; font-weight:bold;">
                    Показать больше (${filteredProducts.length - currentLimit})
                </div>
            `;
        }

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';

        const loadMoreBtn = document.getElementById('load-more-search');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentLimit += 10;
                renderSearchRows();
            });
        }
    }

    // --- 4. ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ ПОИСКА ---
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            resultsContainer.style.display = 'none';
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') resultsContainer.style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы поиска внутри меню каталога
    const catalogSearchInput = document.getElementById('catalogSearchInput');
    const catalogSearchBtn = document.querySelector('.search-inside-menu .search-icon');

    // Функция выполнения поиска
    const performCatalogSearch = () => {
        if (!catalogSearchInput) return;
        const query = catalogSearchInput.value.trim();
        if (query.length > 0) {
            // Переход на страницу поиска с параметром q
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    };

    // 1. Поиск при нажатии на Enter
    if (catalogSearchInput) {
        catalogSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Останавливаем стандартные события
                performCatalogSearch();
            }
        });
    }

    // 2. Поиск при клике на иконку лупы
    if (catalogSearchBtn) {
        catalogSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performCatalogSearch();
        });
    }
});
