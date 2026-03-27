const stockData = {
    "1": { name: 'Т/ц "Одна цена" Челябинск пр.Победы 166', count: 18 },
    "2": { name: 'Т/ц "Одна цена" Минск пр. Независимости 1', count: 0 },
    "3": { name: 'Т/ц "Одна цена" Челябинск ул. Мира 5', count: 5 },
    "default": { name: 'выбранном магазине', count: 0 }
};

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    // Ищем товар в массиве allProducts (убедись, что он доступен из других файлов)
    currentProduct = allProducts.find(item => Number(item.id) === Number(productId));

    if (currentProduct) {
        renderProductPage(currentProduct);
        renderBreadcrumbs(currentProduct);
        initStockLogic();
        updateWishlistButtonUI(currentProduct.id);
    } else {
        // Если товар не найден, можно написать "Товар не найден"
        if(document.getElementById('p-title')) document.getElementById('p-title').textContent = "Товар не найден";
    }
});

// 1. Логика хлебных крошек с отступом
function renderBreadcrumbs(product) {
    const bc = document.getElementById('product-breadcrumbs');
    if (!bc) return;

    // ВАЖНО: берем slug из словаря categoryNames (он должен быть доступен глобально)
    const catSlug = Object.keys(categoryNames).find(key => categoryNames[key] === product.category) || product.category;
    const subCat = encodeURIComponent(product.subCategory);

    bc.innerHTML = `
        <a href="index.html">Главная</a>
        <span class="breadcrumb-separator">›</span>
        <a href="shop.html">Магазин</a>
        <span class="breadcrumb-separator">›</span>
        <a href="shop.html?category=${catSlug}">${product.category}</a>
        <span class="breadcrumb-separator">›</span>
        <a href="shop.html?category=${catSlug}&subcategory=${subCat}">${product.subCategory}</a>
        <span class="breadcrumb-separator">›</span>
        <span class="current-page">${product.name}</span>
    `;
}

// 2. Логика наличия и суммы всех товаров
function initStockLogic() {
    const shopSelect = document.getElementById('shop-location-select');
    const totalStockElement = document.getElementById('p-stock');

    // Считаем сумму всех остатков
    const totalSum = Object.values(stockData).reduce((sum, item) => sum + (item.count || 0), 0);
    if (totalStockElement) totalStockElement.textContent = totalSum;

    if (shopSelect) {
        shopSelect.addEventListener('change', (e) => updateShopAvailability(e.target.value));
        // Инициализируем первым значением
        updateShopAvailability(shopSelect.value);
    }
}

function updateShopAvailability(selectedId) {
    const shopCountDisplay = document.getElementById('shop-count');
    const shopNameDisplay = document.getElementById('selected-shop-name');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    const data = stockData[selectedId] || stockData["default"];

    shopCountDisplay.textContent = data.count;
    shopNameDisplay.textContent = data.name;

    // Блокировка кнопки, если в магазине 0
    if (data.count === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.style.backgroundColor = "#ccc";
        addToCartBtn.textContent = "Нет в наличии";
        shopCountDisplay.style.color = "#ff4d4d";
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.style.backgroundColor = "#76e12e";
        addToCartBtn.textContent = "В корзину";
        shopCountDisplay.style.color = "#76e12e";
    }
}

// 3. Рендер основной страницы
function renderProductPage(product) {
    // Устанавливаем название во вкладку браузера сразу
    document.title = product.name + " — Одна Цена";

    // Находим элементы
    const titleEl = document.getElementById('p-title');
    const imgEl = document.getElementById('p-img');
    const priceEl = document.getElementById('p-price');
    const descEl = document.getElementById('p-desc');

    // Заполняем текст (название товара ПЕРЕКРЫВАЕТ всё остальное)
    if (titleEl) titleEl.textContent = product.name;
    if (priceEl) priceEl.textContent = product.price + ' ₽';
    if (descEl) descEl.textContent = product.desc || "Описание скоро появится.";

    document.getElementById('p-id').textContent = product.id;
    document.getElementById('p-country').textContent = product.country || "Не указана";
    document.getElementById('p-category-name').textContent = categoryNames[product.category] || product.category;

    // --- ЛОГИКА ФОТО ---
    let rawUrl = (product.image || product.img || "nologo.png").trim();
    let finalPath = "";

    // Если фото - заглушка, берем из КОРНЯ
    if (rawUrl === "nologo.png" || rawUrl === "") {
        finalPath = "nologo.png";
    }
    // Если путь уже полный
    else if (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) {
        finalPath = rawUrl;
    }
    // Если просто название файла - берем из папки img/
    else {
        finalPath = 'img/' + rawUrl;
    }

    if (imgEl) {
        imgEl.src = finalPath;
        // На случай если файл в img/ битый
        imgEl.onerror = function() { this.src = 'nologo.png'; };
    }

    // Обработчик кнопки корзины
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            const qty = parseInt(document.getElementById('p-quantity').value) || 1;
            for(let i = 0; i < qty; i++) {
                addToCart(product.id, product.name, product.price, finalPath);
            }
        };
    }
// Внутри функции renderProductPage(product)
    const wishlistBtn = document.getElementById('p-wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.onclick = () => {
            // 1. Вызываем вашу глобальную функцию (из последнего файла)
            window.toggleWishlist(product.id);

            // 2. Сразу обновляем визуальное состояние конкретно этой кнопки
            updateWishlistButtonUI(product.id);
        };
    }
    renderRelated(product.category, product.id);
}

// 4. Управление количеством
function changeQty(delta) {
    const input = document.getElementById('p-quantity');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

// 5. Обновление UI сердца
function updateWishlistButtonUI(id) {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
    const isFav = wishlist.some(item => Number(item.id) === Number(id));
    const icon = document.getElementById('p-heart-icon');
    const text = document.querySelector('#p-wishlist-btn span');

    if (isFav) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#ff4d4d';
        text.textContent = 'В избранном';
    } else {
        icon.className = 'far fa-heart';
        icon.style.color = '#8e8e8e';
        text.textContent = 'В избранное';
    }
}

// 6. Похожие товары (с рабочими сердечками)
function renderRelated(category, currentId) {
    const grid = document.getElementById('related-grid');
    if (!grid) return;

    const wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
    const related = allProducts
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);

    grid.innerHTML = related.map(item => {
        const isFav = wishlist.some(fav => Number(fav.id) === Number(item.id));
        const heartClass = isFav ? 'fas fa-heart active' : 'far fa-heart';

        // Логика пути для похожих
        let relImg = (item.image || item.img || "nologo.png").trim();
        let relPath = (relImg === "nologo.png") ? "nologo.png" :
            (relImg.startsWith('http') || relImg.startsWith('img/')) ? relImg : "img/" + relImg;

        return `
        <div class="product-card">
            <i class="${heartClass} wishlist-icon" onclick="toggleWishlist(${item.id})"></i>
            <a href="product.html?id=${item.id}">
                <div class="product-img-container">
                    <img src="${relPath}" alt="${item.name}" onerror="this.src='nologo.png'">
                </div>
                <span class="product-name">${item.name}</span>
            </a>
            <div class="product-footer">
                <span class="price">${item.price} ₽</span>
                <button class="btn-outline-green" onclick="addToCart(${item.id})">В корзину</button>
            </div>
        </div>
        `;
    }).join('');
}