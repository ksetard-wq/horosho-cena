document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('search-results-grid');
    const title = document.getElementById('search-page-main-title');
    const countInfo = document.getElementById('search-count-info');
    const loadMoreBtn = document.getElementById('page-load-more');
    const loadMoreContainer = document.getElementById('page-load-more-container');
    const notFoundBlock = document.getElementById('not-found-block');
    const breadcrumbCurrent = document.querySelector('.breadcrumbs .current-page');

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') ? urlParams.get('q').trim() : "";

    let itemsToShow = 12;
    let filtered = [];

    // 1. УПРАВЛЕНИЕ ЗАГОЛОВКАМИ (только для поиска)
    const displayTitle = query ? `Результаты поиска: "${query}"` : "Все товары";
    if (title) title.innerText = displayTitle;
    if (breadcrumbCurrent) breadcrumbCurrent.innerText = displayTitle;

    // 2. ФИЛЬТРАЦИЯ ИЗ ALLPRODUCTS
    if (typeof allProducts !== 'undefined') {
        if (query === "") {
            filtered = allProducts;
        } else {
            const lowerQuery = query.toLowerCase();
            filtered = allProducts.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                (p.category && p.category.toLowerCase().includes(lowerQuery))
            );
        }

        if (countInfo) countInfo.innerText = `Найдено товаров: ${filtered.length}`;

        if (filtered.length === 0) {
            if (notFoundBlock) notFoundBlock.style.display = 'block';
            // Принудительно скрываем контейнер кнопки, если ничего не найдено
            if (loadMoreContainer) loadMoreContainer.style.setProperty('display', 'none', 'important');
            if (grid) grid.innerHTML = '';
            if (countInfo) countInfo.innerText = 'Товаров не найдено';
        } else {
            if (notFoundBlock) notFoundBlock.style.display = 'none';
            renderSearchGrid();
        }
    }

    function renderSearchGrid() {
        if (!grid) return;

        // Берем только ту часть товаров, которую нужно показать
        const currentBatch = filtered.slice(0, itemsToShow);
        grid.innerHTML = currentBatch.map(product => createStandardCard(product)).join('');

        // ЛОГИКА КНОПКИ:
        if (loadMoreContainer) {
            // Если показанных товаров меньше, чем всего найдено — показываем кнопку
            if (filtered.length > itemsToShow) {
                loadMoreContainer.style.setProperty('display', 'flex', 'important');
            } else {
                // Если всё показали или товаров изначально мало — скрываем совсем
                loadMoreContainer.style.setProperty('display', 'none', 'important');
            }
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            itemsToShow += 12;
            renderSearchGrid();
        };
    }
});

// ФУНКЦИЯ КАРТОЧКИ (такая же как в магазине)
function createStandardCard(item) {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
    const isFavorite = wishlist.some(fav => Number(fav.id) === Number(item.id));
    const heartClass = isFavorite ? 'fas fa-heart active' : 'far fa-heart';

    let rawUrl = (item.image && item.image.trim() !== "") ? item.image.trim() : "nologo.png";
    let finalPath = (rawUrl === "nologo.png") ? "nologo.png" : (rawUrl.startsWith('http') || rawUrl.startsWith('img/')) ? rawUrl : 'img/' + rawUrl;

    return `
    <div class="product-card">
        <i class="${heartClass} wishlist-icon" onclick="toggleWishlist(${item.id})"></i>
        <a href="product.html?id=${item.id}" style="text-decoration: none; color: inherit;">
            <div class="product-img-container ${finalPath === "nologo.png" ? 'is-default' : ''}">
                <img src="${encodeURI(finalPath)}" 
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
    </div>`;
}
// Обработка нажатия Enter в поле поиска
