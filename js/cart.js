// 1. ГЛАВНАЯ ФУНКЦИЯ: Добавление товара
// Вспомогательная функция для формирования пути к изображению
function getImagePath(rawUrl) {
    if (!rawUrl || rawUrl === "" || rawUrl === "undefined" || rawUrl === "nologo.png") {
        return "nologo.png";
    }
    // Если это уже полная ссылка или путь с папкой
    if (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) {
        return rawUrl;
    }
    // Для всех остальных добавляем папку img/
    return 'img/' + rawUrl;
}
// Универсальная функция, которая может принимать или только ID, или объект целиком
window.addToCart = function(idOrItem) {
    let product;

    // Если передали ID (число)
    if (typeof idOrItem === 'number' || typeof idOrItem === 'string') {
        if (typeof allProducts !== 'undefined') {
            product = allProducts.find(p => p.id === Number(idOrItem));
        }
    }
    // Если передали сразу объект (из избранного)
    else {
        product = idOrItem;
    }

    if (!product) {
        console.error("Товар не найден для добавления в корзину");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    let existingItem = cart.find(item => Number(item.id) === Number(product.id));

    if (existingItem) {
        existingItem.qty = (existingItem.qty || 0) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.img || "nologo.png",
            qty: 1
        });
    }

    localStorage.setItem('user_cart', JSON.stringify(cart));

    if (typeof updateHeaderCart === 'function') updateHeaderCart();
    if (typeof showToast === 'function') {
        showToast(`"${product.name}" добавлен в корзину`);
    }
};
// 2. Уведомление (Toast)
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add('show');

    // Скрываем через 2 секунды
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1000);
}

// 3. Мини-корзина (Dropdown)
function updateHeaderCart() {
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const badge = document.getElementById('cart-badge');
    const menuBadge = document.getElementById('cart-badge-menu');
    const dropdown = document.getElementById('dropdown-content');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    if (badge) {
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? 'block' : 'none';
    }
    if (menuBadge) {
        menuBadge.innerText = totalQty;
        menuBadge.style.display = totalQty > 0 ? 'block' : 'none';
    }

    if (!dropdown) return;

    if (cart.length === 0) {
        dropdown.innerHTML = '<p style="text-align:center; padding: 20px;color: #999">Ваша корзина пока пуста.</p>';
    } else {
        let total = 0;
        let html = cart.map((item, index) => {
            total += item.price * item.qty;

            // Используем сохраненный image или nologo
            // Внутри .map() для корзины и мини-корзины:
            const imgSrc = getImagePath(item.image);

            return `
                <div class="dropdown-item">
                    <a href="product.html?id=${item.id}" class="mini-cart-link">
                        <img src="${imgSrc}" onerror="this.src='nologo.png'" class="mini-cart-img">
                        <div class="item-info">
                            <div class="item-name">${item.name}</div>
                            <div class="item-meta">${item.qty} × ${item.price} ₽</div>
                        </div>
                    </a>
                    <button class="mini-cart-delete" onclick="removeItemFromMiniCart(${index})">✕</button>
                </div>`;
        }).join('');

        html += `
            <div class="mini-cart-footer">
                <div style="margin-bottom:10px"><strong>Итого: ${total} ₽</strong></div>
                <a href="cart.html" class="btn-green-fill" style="display:block">Просмотр корзины</a>
            </div>
        `;
        dropdown.innerHTML = html;
    }
}

// 4. Удаление из мини-корзины с анимацией
window.removeItemFromMiniCart = function(index) {
    // Используем твой старый способ поиска элементов
    const items = document.querySelectorAll('.dropdown-item');
    const targetItem = items[index];

    if (targetItem) {
        targetItem.classList.add('item-fade-out'); // Твоя анимация

        setTimeout(() => {
            let cart = JSON.parse(localStorage.getItem('user_cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('user_cart', JSON.stringify(cart));

            // Обновляем шапку корзины
            updateHeaderCart();

            // ДОБАВЛЕНО: Обновляем избранное, чтобы иконки синхронизировались
            if (typeof updateHeaderWishlist === 'function') updateHeaderWishlist();

            // Обновляем страницу корзины, если мы на ней
            if (typeof renderCart === 'function') { renderCart(); }
        }, 400);
    }
}
// 5. Функции для страницы cart.html (Таблица)
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const itemsList = document.getElementById('order-items');

    if (typeof updateCartVisibility === 'function') updateCartVisibility();
    if (cart.length === 0) return;

    itemsList.innerHTML = cart.map((item, index) => {
        // Внутри .map() для корзины и мини-корзины:
        const imgSrc = getImagePath(item.image);
        const productLink = `product.html?id=${item.id}`;

        return `
        <tr>
            <td>
                <div class="product-info-cell">
                    <a href="${productLink}" class="cart-img-link">
                        <img src="${imgSrc}" onerror="this.src='nologo.png'" class="cart-product-img">
                    </a>
                    <div>
                        <a href="${productLink}" class="product-name-link">
                            <div class="product-name">${item.name}</div>
                        </a>
                        <select class="mini-address-select">
                            <option>Выбрать местоположение...</option>
                            <option>Т/ц "Одна цена" (3 в наличии)</option>
                        </select>
                    </div>
                </div>
            </td>
            <td>${item.price}₽</td>
            <td>
                <div class="qty-input-wrapper">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <input type="text" class="qty-val" value="${item.qty}" readonly>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td><strong>${item.price * item.qty}₽</strong></td>
            <td class="text-right">
                <button class="delete-icon" onclick="removeItem(${index})">🗑</button>
            </td>
        </tr>
    `}).join('');

    if (typeof updateTotals === 'function') updateTotals();
}
window.removeItem = function(index) {
    // Находим все строки в таблице
    const rows = document.querySelectorAll('#order-items tr');
    const targetRow = rows[index];

    if (targetRow) {
        // 1. Добавляем класс анимации
        targetRow.classList.add('row-fade-out');

        // 2. Ждем завершения анимации (400мс)
        setTimeout(() => {
            let cart = JSON.parse(localStorage.getItem('user_cart')) || [];

            // Удаляем элемент из массива
            cart.splice(index, 1);
            localStorage.setItem('user_cart', JSON.stringify(cart));

            // 3. Перерисовываем всё
            renderCart();
            updateHeaderCart();

            // Если корзина стала пустой, это автоматически скроет блоки через renderCart
        }, 400);
    }
};

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderCart();
    if (document.getElementById('order-items')) renderCart();
});
function updateDeliveryUI() {
    const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
    const pickupBlock = document.getElementById('pickup-selection');
    const totalPriceElement = document.getElementById('final-total-price');

    // Получаем текущую сумму товаров из localStorage или из интерфейса
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (deliveryType === 'pickup') {
        pickupBlock.style.display = 'block'; // Показываем выбор адреса
        totalPriceElement.innerText = subtotal + '₽';
    } else {
        pickupBlock.style.display = 'none'; // Скрываем выбор адреса
        totalPriceElement.innerText = (subtotal + 300) + '₽'; // Добавляем стоимость курьера
    }
}

// Вызовите при загрузке страницы, чтобы установить начальную цену
document.addEventListener('DOMContentLoaded', updateDeliveryUI);
// Функция изменения количества товара
function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('user_cart')) || [];

    if (cart[index]) {
        cart[index].qty += delta;

        // Не позволяем количеству быть меньше 1
        if (cart[index].qty < 1) cart[index].qty = 1;

        localStorage.setItem('user_cart', JSON.stringify(cart));
        renderCart(); // Перерисовываем таблицу и итоги
    }
}

// Функция расчета итогов с учетом доставки
function updateTotals() {
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const deliveryRadio = document.querySelector('input[name="deliv"]:checked');
    const deliveryCost = deliveryRadio ? parseInt(deliveryRadio.value) : 0;

    // Расчет скидки
    let discountAmount = 0;
    if (currentDiscount > 0) {
        discountAmount = Math.round(subtotal * (currentDiscount / 100));
    }

    // Элементы на странице
    const subtotalElem = document.getElementById('subtotal-val');
    const finalTotalElem = document.getElementById('final-total');
    const discountInfo = document.getElementById('discount-info');

    if (subtotalElem) subtotalElem.innerText = `${subtotal}₽`;

    // Итоговая сумма
    const totalWithDiscount = (subtotal - discountAmount) + deliveryCost;
    if (finalTotalElem) {
        finalTotalElem.innerText = `${totalWithDiscount}₽`;
    }

    // Красивый вывод инфо о скидке
    if (discountInfo) {
        if (currentDiscount > 0) {
            discountInfo.style.display = 'flex';
            discountInfo.style.justifyContent = 'space-between';
            discountInfo.style.margin = '10px 0';
            discountInfo.style.padding = '10px';
            discountInfo.style.background = '#f0f9eb';
            discountInfo.style.borderRadius = '8px';
            discountInfo.style.border = '1px dashed #69c300';

            discountInfo.innerHTML = `
                <span style="color: #606266;">Скидка по промокоду (${currentDiscount}%):</span>
                <span style="color: #69c300; font-weight: bold;">-${discountAmount}₽</span>
            `;
        } else {
            discountInfo.style.display = 'none';
        }
    }

    renderSummaryList(cart);
}

// Краткий список товаров для правой колонки
function renderSummaryList(cart) {
    const summaryList = document.getElementById('summary-items-list');
    if (!summaryList) return;

    summaryList.innerHTML = cart.map(item => `
        <div class="summary-item-row">
            <span>${item.name} × ${item.qty}</span>
            <span>${item.price * item.qty}₽</span>
        </div>
    `).join('');
}

// Слушатель для переключения радиокнопок доставки
document.addEventListener('change', (e) => {
    if (e.target.name === 'deliv') {
        updateTotals();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('user_phone');

    const maskOptions = {
        mask: '+{375} (00) 000-00-00',
        lazy: false // Маска видна сразу, даже если поле не в фокусе
    };

    const mask = IMask(phoneInput, maskOptions);
});
// Функция для переключения видимости блоков "Пусто" / "Корзина"
function updateCartVisibility() {
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    const emptySection = document.getElementById('empty-cart-section');
    const fullContent = document.getElementById('cart-full-content');

    if (!emptySection || !fullContent) return;

    if (cart.length === 0) {
        // Если товаров нет — показываем баннер, скрываем всю корзину
        emptySection.style.display = 'block';
        fullContent.style.display = 'none';
    } else {
        // Если товары есть — скрываем баннер, показываем корзину
        emptySection.style.display = 'none';
        fullContent.style.display = 'flex'; // Используем flex для сетки
    }
}
window.clearCart = function() {
    if (confirm("Вы уверены, что хотите очистить всю корзину?")) {
        localStorage.removeItem('user_cart');
        renderCart(); // Это само вызовет updateCartVisibility()
        updateHeaderCart();
    }
};
// 1. Переменные для работы скидки
// Переменные для промокода
const VALID_PROMO = "GIFT10";
// Загружаем скидку из памяти при старте, если она там есть
let currentDiscount = Number(localStorage.getItem('applied_discount')) || 0; // Твой секретный код

// 2. Функция активации промокода
function applyPromoCode() {
    const input = document.querySelector('.promo-input-field');
    const loader = document.getElementById('full-page-loader');
    const code = input.value.trim().toUpperCase();

    if (code === "") {
        if (typeof showToast === 'function') showToast("Введите промокод");
        return;
    }

    if (loader) loader.style.display = 'flex';

    setTimeout(() => {
        if (code === VALID_PROMO) {
            currentDiscount = 10;
            localStorage.setItem('applied_discount', '10');
            updateTotals();
            input.style.borderColor = "#69c300";
            input.value = "";
            if (typeof showToast === 'function') showToast("Промокод применен!");
        } else {
            input.style.borderColor = "#ff4d4d";
            if (typeof showToast === 'function') showToast("Неверный промокод");
        }

        // ОБЯЗАТЕЛЬНО скрываем лоадер здесь
        if (loader) loader.style.display = 'none';
    }, 1000);
}

function submitOrder() {
    // Получаем элементы
    const nameInput = document.getElementById('user_name');
    const phoneInput = document.getElementById('user_phone');
    const emailInput = document.getElementById('user_email');
    const errorBox = document.getElementById('order-error-message');

    let errors = [];

    // Сброс предыдущих стилей ошибок
    [nameInput, phoneInput, emailInput].forEach(input => {
        if (input) {
            input.classList.remove('input-error');
        }
    });
    errorBox.style.display = 'none';

    // --- 1. ВАЛИДАЦИЯ ФИО ---
    const nameVal = nameInput.value.trim();
    // Регулярка: только буквы (рус/лат), пробелы и дефисы. Минимум 2 слова.
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]{2,}(?:\s+[а-яА-ЯёЁa-zA-Z]{2,})+$/;

    if (nameVal === "") {
        errors.push("Поле ФИО не может быть пустым.");
        nameInput.classList.add('input-error');
    } else if (!nameRegex.test(nameVal)) {
        errors.push("Введите полное ФИО (минимум Фамилия и Имя, без цифр).");
        nameInput.classList.add('input-error');
    }

    // --- 2. ВАЛИДАЦИЯ ТЕЛЕФОНА (Строгая проверка цифр) ---
    const phoneVal = phoneInput.value.trim();
    // Оставляем только цифры, удаляя +, (), пробелы и тире
    const onlyDigits = phoneVal.replace(/\D/g, "");

    // Условие: если есть нижнее подчеркивание (от маски) ИЛИ цифр меньше 12
    if (phoneVal === "" || phoneVal.includes('_') || onlyDigits.length < 12) {
        errors.push("Введите номер телефона полностью (9 цифр после кода +375).");
        phoneInput.classList.add('input-error');
    }

    // --- 3. ВАЛИДАЦИЯ EMAIL ---
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailVal === "") {
        errors.push("Поле Email не может быть пустым.");
        emailInput.classList.add('input-error');
    } else if (!emailRegex.test(emailVal)) {
        errors.push("Введите корректный адрес почты (например: example@mail.ru).");
        emailInput.classList.add('input-error');
    }

    // --- 4. ПРОВЕРКА КОРЗИНЫ ---
    const cart = JSON.parse(localStorage.getItem('user_cart')) || [];
    if (cart.length === 0) {
        errors.push("Ваша корзина пуста. Добавьте товары перед оформлением.");
    }

    // --- ВЫВОД ОШИБОК ---
    if (errors.length > 0) {
        errorBox.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">Пожалуйста, исправьте следующие ошибки:</div>
            <ul style="margin: 0; padding-left: 20px;">
                ${errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
        `;
        errorBox.style.display = 'block';

        // Автопрокрутка к блоку ошибки
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // --- ЕСЛИ ВСЁ УСПЕШНО ---
    handleOrderFinalize(nameVal);
}


function handleOrderFinalize(userName) {
    const loader = document.getElementById('full-page-loader');
    if (!loader) {
        console.error("Лоадер не найден в HTML!");
        return;
    }

    const loaderText = loader.querySelector('p');
    const finalTotalElem = document.getElementById('final-total');
    const finalAmount = finalTotalElem ? finalTotalElem.innerText : "0₽";

    // Безопасный поиск метода оплаты
    const selectedPayInput = document.querySelector('input[name="pay"]:checked');
    if (!selectedPayInput) {
        loader.style.display = 'none';
        alert("Пожалуйста, выберите способ оплаты");
        return;
    }

    const selectedPayMethod = selectedPayInput.closest('.payment-option').querySelector('.radio-label-text').innerText;

    loader.style.display = 'flex';
    if (loaderText) loaderText.innerText = "Проверка данных...";

    setTimeout(() => {
        if (loaderText) loaderText.innerText = "Создание безопасного соединения...";

        setTimeout(() => {
            if (loaderText) loaderText.innerText = "Перенаправление на оплату...";

            const orderId = "FWD-" + Math.floor(100000 + Math.random() * 900000);
            const orderData = {
                id: orderId,
                amount: finalAmount,
                user: userName,
                method: selectedPayMethod,
                date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: "Оплачен"
            };

            sessionStorage.setItem('current_pending_order', JSON.stringify(orderData));

            // Если файлов payment.html или bank-transfer.html нет,
            // браузер выдаст 404, но лоадер исчезнет, так как страница перезагрузится.
            if (selectedPayMethod.toLowerCase().includes("перевод")) {
                window.location.href = 'bank-transfer.html';
            } else {
                window.location.href = 'payment.html';
            }
        }, 1000);
    }, 800);
}
function saveOrderToProfile() {
    // 1. Берем данные текущего заказа
    const orderData = JSON.parse(sessionStorage.getItem('current_pending_order'));
    if (!orderData) return;

    // 2. Получаем список всех заказов пользователя
    let myOrders = JSON.parse(localStorage.getItem('my_orders')) || [];

    // 3. Добавляем новый заказ в начало списка
    myOrders.unshift(orderData);

    // 4. Сохраняем обратно
    localStorage.setItem('my_orders', JSON.stringify(myOrders));

    // 5. Очищаем корзину и временные данные
    localStorage.removeItem('user_cart');
    sessionStorage.removeItem('current_pending_order');
}
function renderMyOrders() {
    const orders = JSON.parse(localStorage.getItem('my_orders')) || [];
    const container = document.getElementById('orders-container');

    if (orders.length === 0) {
        container.innerHTML = "<p>У вас пока нет заказов</p>";
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <strong>Заказ ${order.id}</strong>
                <span>${order.date}</span>
            </div>
            <div class="order-footer">
                <span>Метод: ${order.method}</span>
                <strong>Сумма: ${order.amount}</strong>
            </div>
        </div>
    `).join('');
}