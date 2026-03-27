// Функция выхода должна быть глобальной, чтобы работать через onclick в HTML
function logout() {
    const modal = document.getElementById('logout-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Если пользователь не авторизован — отправляем на логин
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // --- 1. Инициализация данных профиля ---
    const initProfile = () => {
        const elements = {
            nameInput: document.getElementById('prof-name'),
            emailInput: document.getElementById('prof-email'),
            addressInput: document.getElementById('prof-address'),
            sideName: document.getElementById('user-name-side'),
            sideEmail: document.getElementById('user-email-side'),
            avatarChar: document.getElementById('avatar-char')
        };

        if (elements.nameInput) elements.nameInput.value = currentUser.name || "";
        if (elements.emailInput) elements.emailInput.value = currentUser.email || "";
        if (elements.addressInput) elements.addressInput.value = currentUser.address || "";

        if (elements.sideName) elements.sideName.textContent = currentUser.name || "Пользователь";
        if (elements.sideEmail) elements.sideEmail.textContent = currentUser.email || "";

        if (currentUser.name && elements.avatarChar) {
            elements.avatarChar.textContent = currentUser.name.charAt(0).toUpperCase();
        }

        renderOrders();   // Вызов отрисовки заказов
        renderWishlist(); // Вызов отрисовки избранного
    };

    // --- 2. Переключение вкладок ---
    const navButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabs = document.querySelectorAll('.profile-tab');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            navButtons.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(targetId);
            if (targetTab) targetTab.classList.add('active');
        });
    });

    // --- 3. Сохранение данных профиля ---
    const profileForm = document.getElementById('profile-edit-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('.save-btn');
            const originalText = btn.textContent;

            btn.textContent = '⏳ Сохранение...';
            btn.disabled = true;

            // Обновляем объект пользователя
            currentUser.name = document.getElementById('prof-name').value;
            currentUser.address = document.getElementById('prof-address').value;

            // Синхронизируем с localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
            allUsers = allUsers.map(u => u.email === currentUser.email ? currentUser : u);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));

            setTimeout(() => {
                btn.textContent = '✅ Сохранено';
                btn.style.background = '#76e12e';

                // Обновляем UI без перезагрузки
                document.getElementById('user-name-side').textContent = currentUser.name;
                const avatar = document.getElementById('avatar-char');
                if (avatar) avatar.textContent = currentUser.name ? currentUser.name[0].toUpperCase() : "?";

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2000);
            }, 800);
        });
    }

    // --- 4. Логика Модального окна (Выход) ---
    const modal = document.getElementById('logout-modal');
    const cancelBtn = document.getElementById('cancel-logout');
    const confirmBtn = document.getElementById('confirm-logout');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    initProfile();
});

// --- Функции рендеринга данных (Заказы и Избранное) ---

function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;

    // Имитация данных (в реальности можно брать из localStorage.getItem('orders'))
    const ordersData = [
        {
            id: "4421",
            date: "12.03.2026",
            status: "delivered",
            statusText: "Доставлено",
            total: "4 500 BYN",
            items: [{ name: "Набор инструментов Master", img: "img/tools.png", qty: 1 }]
        },
        {
            id: "4508",
            date: "20.03.2026",
            status: "in-transit",
            statusText: "В пути",
            total: "1 200 BYN",
            items: [{ name: "Шуруповерт Bosch", img: "img/drill.png", qty: 1 }]
        }
    ];

    ordersList.innerHTML = ordersData.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info-main">
                    <span class="order-number">Заказ #${order.id}</span>
                    <span class="order-date">от ${order.date}</span>
                </div>
                <div class="order-status ${order.status}">${order.statusText}</div>
            </div>
            <div class="order-body">
                <div class="order-items-preview">
                    ${order.items.map(item => `
                        <div class="item-mini">
                            <img src="${item.img}" alt="${item.name}" onerror="this.src='nologo.png'">
                            <div class="item-info">
                                <span class="item-name">${item.name}</span>
                                <span class="item-qty">${item.qty} шт.</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div class="order-total">
                        <span class="total-label">Итого:</span>
                        <span class="total-amount">${order.total}</span>
                    </div>
                    <button class="btn-details">Подробнее</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderWishlist() {
    const container = document.getElementById('wishlist-container');
    if (!container) return;

    // 1. Получаем реальные лайкнутые товары
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');

    // 2. Если пусто — показываем сообщение и включаем центрирование
    if (wishlist.length === 0) {
        container.classList.add('is-empty'); // Добавляем класс для центрирования текста
        container.innerHTML = `
            <div class="wishlist-empty-content" style="text-align: center; padding: 40px 0;">
                <div class="empty-icon">
                    <i class="far fa-heart" style="font-size: 80px; color: #e0e7f0;"></i>
                </div>
                <p class="empty-state" style="font-size: 18px; margin: 20px 0;">Список избранного пуст</p>
                <a href="shop.html" class="save-btn" style="text-decoration: none; display: inline-block;">Перейти к покупкам</a>
            </div>`;
        return;
    }

    // 3. Если товары есть — ВЫКЛЮЧАЕМ класс центрирования
    container.classList.remove('is-empty');

    // 4. Рендерим карточки
    container.innerHTML = wishlist.map(item => {
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
        <div class="product-card" style="width: 240px; flex-shrink: 0;">
            <i class="fas fa-heart active wishlist-icon" 
               style="color: #ff4757; cursor: pointer; position: absolute; top: 10px; right: 10px; z-index: 2;" 
               onclick="removeFromWishlist(${item.id})"></i>
            
            <a href="product.html?id=${item.id}" style="text-decoration: none; color: inherit;">
                <div class="product-img-container ${isDefault}" style="height: 180px; overflow: hidden; background: #f8fafc; border-radius: 15px;">
                    <img src="${imageUrl}" 
                         onerror="this.src='nologo.png'; this.parentElement.classList.add('is-default')" 
                         alt="${item.name}" 
                         style="width: 100%; height: 100%; object-fit: contain; padding: 10px;">
                </div>
                <div style="padding: 10px 0;">
                    <span class="product-name" style="font-weight: 600; display: block; margin-bottom: 10px; height: 40px; overflow: hidden;">
                        ${item.name}
                    </span>
                </div>
            </a>
            <div class="product-footer" style="display: flex; justify-content: space-between; align-items: center;">
                <span class="price" style="font-weight: 800; font-size: 18px;">${item.price} ₽</span>
                <button class="btn-outline-green" onclick="addToCart(${item.id})" style="padding: 8px 12px; border-radius: 10px;">
                    В корзину
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// Добавьте эту функцию в глобальную область видимости (вне DOMContentLoaded)
function removeFromWishlist(itemId) {
    // Получаем текущий список
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');

    // Оставляем только те товары, id которых НЕ совпадает с удаляемым
    wishlist = wishlist.filter(item => Number(item.id) !== Number(itemId));

    // Сохраняем обратно в память
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));

    // Мгновенно перерисовываем секцию избранного
    renderWishlist();
}
// Добавь вызов этой функции в initProfile внутри DOMContentLoaded
const initProfile = () => {
    // ... твой существующий код ...
    renderOrders();
    renderWishlist();
    renderReturns(); // Добавляем новый вызов
};

// Сама функция рендеринга (добавь её в конец файла)
function renderReturns() {
    const returnsList = document.getElementById('returns-list');
    if (!returnsList) return;

    // Имитация данных о возвратах
    const returnsData = [
        {
            id: "R-7701",
            date: "15.03.2026",
            status: "processing",
            statusText: "На рассмотрении",
            amount: "120.00 BYN",
            reason: "Не подошел размер",
            itemName: "Кроссовки спортивные"
        }
    ];

    if (returnsData.length > 0) {
        returnsList.innerHTML = returnsData.map(ret => `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info-main">
                        <span class="order-number">Возврат #${ret.id}</span>
                        <span class="order-date">от ${ret.date}</span>
                    </div>
                    <div class="order-status in-transit">${ret.statusText}</div>
                </div>
                <div class="order-body">
                    <p><strong>Товар:</strong> ${ret.itemName}</p>
                    <p style="font-size: 14px; color: #636e72;">Причина: ${ret.reason}</p>
                    <div class="order-footer">
                        <div class="order-total">
                            <span class="total-label">Сумма к возврату:</span>
                            <span class="total-amount">${ret.amount}</span>
                        </div>
                        <button class="btn-details">Статус заявки</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Вызываем рендер заказов при загрузке
    renderUserOrders();

    // Также добавим обработчик на кнопки навигации (табы),
    // чтобы заказы обновлялись при переключении на вкладку
    const orderTabBtn = document.querySelector('[data-tab="tab-orders"]');
    if (orderTabBtn) {
        orderTabBtn.addEventListener('click', renderUserOrders);
    }
});

function renderUserOrders() {
    const ordersContainer = document.getElementById('orders-list');
    if (!ordersContainer) return;

    // Получаем заказы из localStorage
    const orders = JSON.parse(localStorage.getItem('my_orders')) || [];

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag" style="font-size: 48px; color: #e2e8f0; margin-bottom: 15px;"></i>
                <p>У вас пока нет оформленных заказов</p>
                <a href="shop.html" class="save-btn" style="text-decoration: none; display: inline-block; margin-top: 15px;">Перейти к покупкам</a>
            </div>`;
        return;
    }

    // Формируем HTML для списка заказов
    ordersContainer.innerHTML = orders.map(order => {
        // Определяем цвет статуса
        let statusColor = '#69c300'; // Зеленый для "Оплачен"
        if (order.status && order.status.includes('Ожидает')) {
            statusColor = '#f39c12'; // Оранжевый для банковского перевода
        }

        return `
            <div class="order-card-modern" onclick="showOrderDetails('${order.id}')" style="cursor:pointer">
                <div class="order-info-main">
                    <div class="order-header-flex">
                        <span class="order-number">Заказ #${order.id}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <div class="order-details">
                        <div class="detail-item">
                            <span class="label">Способ оплаты:</span>
                            <span class="value">${order.method}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Статус:</span>
                            <span class="value" style="color: ${statusColor}; font-weight: 600;">● ${order.status || 'Обрабатывается'}</span>
                        </div>
                    </div>
                </div>
                <div class="order-price-block">
                    <span class="total-label">Итого к оплате</span>
                    <span class="total-amount">${order.amount}</span>
                </div>
            </div>
        `;
    }).join('');
}
// Добавьте это в ваш profile.js
function renderReturns() {
    const returnsContainer = document.getElementById('returns-list');
    if (!returnsContainer) return;

    const returns = JSON.parse(localStorage.getItem('my_returns')) || [];

    if (returns.length === 0) {
        returnsContainer.innerHTML = '<p class="empty-state">У вас пока нет заявок на возврат</p>';
        return;
    }

    returnsContainer.innerHTML = returns.map(ret => `
        <div class="order-card-modern" style="border-left: 4px solid #f39c12;">
            <div class="order-info-main">
                <div class="order-header-flex">
                    <span class="order-number">Возврат ${ret.id}</span>
                    <span class="order-date">от ${ret.date}</span>
                </div>
                <div class="order-details">
                    <div class="detail-item">
                        <span class="label">По заказу:</span>
                        <span class="value">${ret.orderId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Причина:</span>
                        <span class="value">${ret.reason}</span>
                    </div>
                </div>
            </div>
            <div class="order-price-block">
                <span class="total-label">Статус</span>
                <span class="total-amount" style="color: #f39c12; font-size: 16px;">${ret.status}</span>
            </div>
        </div>
    `).join('');
}

// Вызывайте renderReturns() при переключении на вкладку "Возвраты"
document.querySelector('[data-tab="tab-returns"]').addEventListener('click', renderReturns);
// Функция открытия деталей ЗАКАЗА
function showOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('my_orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('details-modal');
    const content = document.getElementById('det-content');
    document.getElementById('det-title').innerText = `Заказ #${order.id}`;

    // Генерируем список товаров с фото
    const itemsHtml = order.items ? order.items.map(item => `
        <div class="det-item">
            <img src="${item.img || 'img/nologo.png'}" onerror="this.src='img/nologo.png'">
            <div>
                <div style="font-weight:700">${item.name}</div>
                <div style="font-size:13px; color:#718096">${item.price || order.amount} x ${item.qty || 1} шт.</div>
            </div>
        </div>
    `).join('') : '<p>Информация о товарах недоступна</p>';

    content.innerHTML = `
        <div class="det-row"><span class="det-label">Дата и время:</span><span class="det-value">${order.date}</span></div>
        <div class="det-row"><span class="det-label">Способ оплаты:</span><span class="det-value">${order.method}</span></div>
        <div class="det-row"><span class="det-label">Статус:</span><span class="det-value">${order.status}</span></div>
        <div class="det-items-list">
            <h4 style="margin-bottom:15px">Товары:</h4>
            ${itemsHtml}
        </div>
        <div class="det-row" style="margin-top:20px; border-top:2px solid #69c300; padding-top:15px">
            <span style="font-size:18px; font-weight:800">Итого:</span>
            <span style="font-size:18px; font-weight:800; color:#69c300">${order.amount}</span>
        </div>
    `;

    modal.classList.add('active');
}

// Аналогично для ВОЗВРАТОВ (добавь onclick="showReturnDetails('${ret.id}')" в renderReturns)
function showReturnDetails(returnId) {
    const returns = JSON.parse(localStorage.getItem('my_returns')) || [];
    const ret = returns.find(r => r.id === returnId);
    if (!ret) return;

    const modal = document.getElementById('details-modal');
    const content = document.getElementById('det-content');
    document.getElementById('det-title').innerText = `Возврат ${ret.id}`;

    content.innerHTML = `
        <div class="det-row"><span class="det-label">Дата заявки:</span><span class="det-value">${ret.date}</span></div>
        <div class="det-row"><span class="det-label">По заказу:</span><span class="det-value">#${ret.orderId}</span></div>
        <div class="det-row"><span class="det-label">Причина:</span><span class="det-value">${ret.reason}</span></div>
        <div class="det-row"><span class="det-label">Статус:</span><span class="det-value" style="color:#f39c12">${ret.status}</span></div>
        <div style="margin-top:20px; padding:15px; background:#fdf2f2; border-radius:10px;">
            <div style="font-weight:700; margin-bottom:5px">Комментарий клиента:</div>
            <div style="font-size:14px; color:#4a5568">${ret.comment || 'Нет комментария'}</div>
        </div>
    `;
    modal.classList.add('active');
}

function closeDetails() {
    document.getElementById('details-modal').classList.remove('active');
}

// Закрытие по клику на фон
window.onclick = function(event) {
    const modal = document.getElementById('details-modal');
    if (event.target == modal) closeDetails();
}