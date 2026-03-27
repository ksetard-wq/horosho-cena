// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderWishlist();
    if (document.getElementById('wishlist-items')) {
        renderWishlist();
    }
});

// Основная функция: Добавить/Удалить из избранного
// Делаем функцию глобальной, чтобы она была доступна везде
window.toggleWishlist = function(id) {
    const productId = Number(id);

    // Пытаемся найти продукт в общем списке (allProducts должен быть доступен)
    // Если его нет, ищем в уже существующем избранном (на случай, если мы в профиле)
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const productInWish = wishlist.find(p => Number(p.id) === productId);
    const productInAll = typeof allProducts !== 'undefined' ? allProducts.find(p => Number(p.id) === productId) : null;

    const product = productInAll || productInWish;
    if (!product) return;

    const index = wishlist.findIndex(item => Number(item.id) === productId);
    const icons = document.querySelectorAll(`i[onclick="toggleWishlist(${productId})"]`);

    if (index > -1) {
        // УДАЛЕНИЕ
        wishlist.splice(index, 1);

        icons.forEach(icon => {
            icon.classList.replace('fas', 'far');
            icon.classList.remove('active');
            // Если это кнопка в магазине, возвращаем серый цвет
            if(icon.parentElement.classList.contains('btn-add-wishlist')) {
                icon.parentElement.style.color = "#ccc";
            }
        });

        if (typeof showToast === 'function') showToast(`"${product.name}" удален`);
    } else {
        // ДОБАВЛЕНИЕ
        const productImg = (product.image && product.image.trim() !== "") ? product.image : "nologo.png";

        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });

        icons.forEach(icon => {
            icon.classList.replace('far', 'fas');
            icon.classList.add('active');
            if(icon.parentElement.classList.contains('btn-add-wishlist')) {
                icon.parentElement.style.color = "#ff4d4d";
            }
        });

        if (typeof showToast === 'function') showToast(`"${product.name}" добавлен`);
    }

    // Сохраняем изменения
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));

    // Обновляем шапку (счетчики)
    if (typeof updateHeaderWishlist === 'function') updateHeaderWishlist();

    // КЛЮЧЕВОЙ МОМЕНТ: если на странице есть контейнер избранного, перерисовываем его
    // Это заставит карточку исчезнуть сразу после нажатия на сердечко
    if (document.getElementById('wishlist-container')) {
        renderWishlist();
    }
    if (document.getElementById('wishlist-items')) {
        renderWishlist();
    }
};

// Обновление иконки в шапке и счетчика
window.updateHeaderWishlist = function() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const badge = document.getElementById('wishlist-badge');
    const dropdown = document.getElementById('wishlist-dropdown-content');
    const menuWishBadge = document.getElementById('wishlist-badge-menu');

    // 1. Обновляем бейджи (счетчики)
    if (badge) {
        badge.innerText = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'block' : 'none';
    }
    if (menuWishBadge) {
        menuWishBadge.innerText = wishlist.length;
        menuWishBadge.style.display = wishlist.length > 0 ? 'block' : 'none';
    }

    // 2. Обновляем выпадающее меню
    if (dropdown) {
        if (wishlist.length === 0) {
            dropdown.innerHTML = '<p style="padding:15px; text-align:center; font-size:13px; color:#999;">Список пуст</p>';
        } else {
            let html = wishlist.map((item) => {
                // --- ИСПРАВЛЕННАЯ ЛОГИКА ФОТО ---
                let rawUrl = (item.image && item.image.trim() !== "") ? item.image.trim() : "nologo.png";
                let finalPath = "";

                if (rawUrl === "nologo.png") {
                    finalPath = "nologo.png";
                } else if (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) {
                    finalPath = rawUrl;
                } else {
                    finalPath = 'img/' + rawUrl;
                }
                // -------------------------------

                return `
                <div class="dropdown-item" style="display:flex; align-items:center; padding:10px; border-bottom:1px solid #eee;">
                    <a href="product.html?id=${item.id}" class="mini-wish-link" style="display:flex; align-items:center; text-decoration:none; color:inherit; flex:1;">
                        <img src="${finalPath}" onerror="this.src='nologo.png'" style="width:40px; height:40px; object-fit:contain; border-radius:4px;">
                        <div style="margin-left:10px; font-size:12px;">
                            <div class="wish-name" style="font-weight:500; color: black; line-height:1.2;">${item.name}</div>
                            <div style="color:#69c300; margin-top: 3px;">${item.price}₽</div>
                        </div>
                    </a>
                    <button onclick="removeFromWishlist(${item.id})" style="background:none; border:none; color:#ccc; cursor:pointer; padding:6px; font-size:16px;">✕</button>
                </div>`;
            }).join('');

            dropdown.innerHTML = html + `
                <a href="wishlist.html" class="btn-green-fill" style="display:block; text-align:center; margin-top:10px; padding:10px; font-size:12px; text-decoration:none; color:#fff; background:#69c300; border-radius:4px;">
                    Открыть список
                </a>`;
        }
    }

    // 3. Синхронизируем все сердечки на странице
    document.querySelectorAll('.btn-add-wishlist, .wishlist-icon').forEach(btn => {
        // Если это сама иконка, берем её, если кнопка — ищем иконку внутри
        const icon = btn.tagName === 'I' ? btn : btn.querySelector('i');
        const onclickAttr = btn.getAttribute('onclick') || (btn.parentElement ? btn.parentElement.getAttribute('onclick') : "");
        const idMatch = onclickAttr ? onclickAttr.match(/\d+/) : null;

        if (!idMatch || !icon) return;

        const productId = Number(idMatch[0]);
        const isAdded = wishlist.some(item => Number(item.id) === productId);

        if (isAdded) {
            icon.classList.replace('far', 'fas');
            icon.classList.add('active');
            if (btn.classList.contains('btn-add-wishlist')) btn.style.color = "#ff4d4d";
        } else {
            icon.classList.replace('fas', 'far');
            icon.classList.remove('active');
            if (btn.classList.contains('btn-add-wishlist')) btn.style.color = "#ccc";
        }
    });
};

// Функция удаления для крестиков в меню и таблице
window.removeFromWishlist = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];

    // Удаляем товар по его ID, а не по индексу
    wishlist = wishlist.filter(item => Number(item.id) !== Number(productId));

    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));

    // Синхронно обновляем все части интерфейса
    updateHeaderWishlist();

    if (document.getElementById('wishlist-items')) {
        renderWishlist();
    }

    if (document.getElementById('wishlist-container')) {
        renderWishlist(); // Для сетки в профиле
    }
};
window.renderWishlist = function() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const container = document.getElementById('wishlist-items');
    const emptyBlock = document.getElementById('empty-wishlist');
    const contentBlock = document.getElementById('wishlist-content');

    if (!container) return;

    // Проверка на пустоту
    if (wishlist.length === 0) {
        if (emptyBlock) emptyBlock.style.display = 'block';
        if (contentBlock) contentBlock.style.display = 'none';
        container.innerHTML = '';
        return;
    } else {
        if (emptyBlock) emptyBlock.style.display = 'none';
        if (contentBlock) contentBlock.style.display = 'block';
    }

    // Отрисовка таблицы
    container.innerHTML = wishlist.map((item) => {
        // --- ЛОГИКА ПРОВЕРКИ КАРТИНКИ ---
        let rawUrl = (item.image && item.image.trim() !== "") ? item.image.trim() : "nologo.png";
        let finalPath = "";

        if (rawUrl === "nologo.png") {
            finalPath = "nologo.png";
        } else if (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) {
            finalPath = rawUrl;
        } else {
            // Если в базе просто название файла, например "gel.png"
            finalPath = 'img/' + rawUrl;
        }
        // -------------------------------

        return `
            <tr class="product-row">
                <td class="text-center">
                    <button class="remove-wish-btn" onclick="removeFromWishlist(${item.id})" style="cursor:pointer; background:none; border:none; color:#ccc; font-size:18px;">✕</button>
                </td>
                <td>
                    <a href="product.html?id=${item.id}">
                        <img src="${finalPath}" 
                             onerror="this.src='nologo.png'" 
                             class="wish-table-img" 
                             style="width:80px; height:80px; object-fit:contain;">
                    </a>
                </td>
                <td>
                    <a href="product.html?id=${item.id}" class="wish-item-name-link" style="text-decoration:none; color:#333;">
                        <span class="wish-item-name">${item.name}</span>
                    </a>
                </td>
                <td><strong style="font-size: 16px;">${item.price}₽</strong></td>
                <td><span class="stock-status" style="color:#69c300;">● В наличии</span></td>
                <td>
                  <button class="btn-wish-to-cart" 
                    onclick='addToCart(${JSON.stringify(item).replace(/'/g, "&apos;")})' 
                    style="padding: 10px 20px; border-radius: 20px; border: 1px solid #69c300; background: #fff; color: #69c300; cursor: pointer;">
                В корзину
            </button>
                </td>
            </tr>
        `;
    }).join('');
};

window.handleAddToCart = function(btn, item) {
    // 1. Используем единый ключ 'user_cart'
    let cart = JSON.parse(localStorage.getItem('user_cart')) || [];

    const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingIndex === -1) {
        // Добавляем товар. Поле 'qty' используем как в основной функции addToCart
        cart.push({ ...item, qty: 1 });
        showToast(`"${item.name}" добавлен в корзину`);
    } else {
        showToast(`"${item.name}" уже в корзине`);
    }

    // 2. Сохраняем в localStorage
    localStorage.setItem('user_cart', JSON.stringify(cart));

    // 3. Визуальное обновление кнопки
    btn.classList.add('is-added');
    btn.innerHTML = 'В корзине ';

    // 4. Вызываем вашу функцию обновления шапки
    updateHeaderCart();
};
// Функция для анимации удаления
window.animateRemove = function(index) {
    const row = document.querySelector(`.product-row[data-index="${index}"]`);
    if (!row) return;

    // 1. Запускаем анимацию исчезновения
    row.classList.add('fade-out');

    setTimeout(() => {
        // 2. Удаляем из данных
        let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
        wishlist.splice(index, 1);
        localStorage.setItem('user_wishlist', JSON.stringify(wishlist));

        // 3. Обновляем счетчики в шапке
        updateHeaderWishlist();

        // 4. Перерисовываем список
        // Теперь renderWishlist (с тем условием, что я дал выше)
        // сам увидит, что массив пуст, и покажет заглушку "Список пуст"
        renderWishlist();

    }, 500); // Время должно совпадать с длительностью transition в CSS
};
