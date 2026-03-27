const cityData = {
    "Минск": {
        center: [53.9006, 27.5590],
        shops: [
            { coords: [53.9050, 27.5580], address: "пр. Независимости, 15" },
            { coords: [53.9038, 27.5513], address: "ул. Немига, 3" },
            { coords: [53.8643, 27.4856], address: "пр. Дзержинского, 104" }
        ]
    },
    "Жлобин": {
        center: [52.8933, 30.0240],
        shops: [
            { coords: [52.8965, 30.0382], address: "ул. Первомайская, 41" },
            { coords: [52.8845, 30.0435], address: "Микрорайон 18, д. 1" }
        ]
    },
    "Гомель": {
        center: [52.4345, 30.9754],
        shops: [
            { coords: [52.4390, 30.9950], address: "ул. Советская, 39" },
            { coords: [52.4080, 30.9300], address: "пр. Речицкий, 5В" }
        ]
    },
    "Могилев": {
        center: [53.8981, 30.3325],
        shops: [
            { coords: [53.9050, 30.3380], address: "ул. Первомайская, 57" },
            { coords: [53.8780, 30.3350], address: "пр. Пушкинский, 43" }
        ]
    },
    "Брест": {
        center: [52.0976, 23.6877],
        shops: [
            { coords: [52.0920, 23.6930], address: "ул. Советская, 34" },
            { coords: [52.0730, 23.7050], address: "Варшавское шоссе, 11" }
        ]
    }
};

let myMap;
let placemarkCollection;

if (typeof ymaps !== 'undefined') {
    ymaps.ready(initShopsPage);
}

function initShopsPage() {
    // 1. Создаем карту с центром по Беларуси, чтобы было видно все города
    myMap = new ymaps.Map("map", {
        center: [53.7098, 27.9534],
        zoom: 6,
        controls: ['zoomControl']
    });

    placemarkCollection = new ymaps.GeoObjectCollection();
    myMap.geoObjects.add(placemarkCollection);

    // 2. Рисуем сразу все города и адреса
    renderAllShops();

    // 3. Включаем поиск, который умеет скрывать лишнее
    setupAddressSearchLogic();

    // 4. Оставляем логику модалки (если нужно переключиться на один город)
    setupCityModalLogic();
}

function renderAllShops() {
    const addressList = document.getElementById('address-list');
    if (!addressList) return;

    addressList.innerHTML = '';
    placemarkCollection.removeAll();

    Object.keys(cityData).forEach(cityName => {
        const data = cityData[cityName];

        const cityHeader = document.createElement('li');
        cityHeader.className = "city-divider";

        // Убрали стрелочку <i>, оставили только текст
        cityHeader.innerHTML = `<span>${cityName}</span>`;

        cityHeader.onclick = function() {
            document.querySelectorAll('.city-divider').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            myMap.setCenter(data.center, 12, { duration: 500 });
        };

        addressList.appendChild(cityHeader);

        data.shops.forEach(shop => {
            const placemark = new ymaps.Placemark(shop.coords, {
                hintContent: shop.address,
                balloonContent: `<strong>Одна Цена</strong><br>${cityName}, ${shop.address}`
            }, { preset: 'islands#greenDotIcon' });

            placemarkCollection.add(placemark);

            const li = document.createElement('li');
            li.className = "address-item";
            li.innerHTML = `<strong>${shop.address}</strong><br><span style="font-size:12px; color:#888;">09:00 - 21:00</span>`;

            li.addEventListener('click', () => {
                myMap.setCenter(shop.coords, 16, { duration: 400 });
                placemark.balloon.open();
                document.querySelectorAll('.city-divider').forEach(el => el.classList.remove('active'));
                cityHeader.classList.add('active');
            });

            addressList.appendChild(li);
        });
    });
}

function setupAddressSearchLogic() {
    const searchInput = document.querySelector('.search-box1 input'); // Исправил селектор под ваш HTML
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const items = document.querySelectorAll('.address-list li');
        let firstMatch = null;

        items.forEach(item => {
            const text = item.textContent.toLowerCase();

            if (text.includes(filter)) {
                item.style.display = ""; // Возвращаем стандартное отображение (обычно block или flex)
                // УБРАНО: item.style.backgroundColor = "..."; — это создавало визуальный шум

                if (!firstMatch && filter !== "") firstMatch = item;
            } else {
                item.style.display = "none";
            }
        });

        // Плавный скролл к первому найденному элементу
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

function setupCityModalLogic() {
    const modal = document.getElementById('cityModal');
    const openBtn = document.getElementById('openCityModal');
    const closeBtn = document.getElementById('closeModal');
    const cityVariants = document.querySelectorAll('.city-variant');

    if (openBtn) openBtn.onclick = () => modal.style.display = 'block';
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';

    cityVariants.forEach(variant => {
        variant.onclick = function() {
            const name = this.textContent.trim();
            if (cityData[name]) {
                localStorage.setItem('userCity', name);
                // При выборе в модалке — просто летим к городу на карте
                myMap.setCenter(cityData[name].center, 12, { duration: 600 });
                const headerCity = document.getElementById('currentCity');
                if (headerCity) headerCity.textContent = name;
                modal.style.display = 'none';
            }
        };
    });
}