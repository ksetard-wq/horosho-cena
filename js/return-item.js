let currentSelectedId = null;

document.addEventListener('DOMContentLoaded', () => {
    const orders = JSON.parse(localStorage.getItem('my_orders')) || [];
    const returns = JSON.parse(localStorage.getItem('my_returns')) || [];
    const container = document.getElementById('rf-list');

    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#999;">Список заказов пуст</div>`;
        return;
    }

    container.innerHTML = orders.map(order => {
        const isAlreadyReturned = returns.some(r => r.orderId === order.id);

        // 1. Улучшенный поиск картинки
        let firstItemImg = 'nologo.png'; // По умолчанию заглушка

        // Проверяем все возможные варианты, где может лежать фото товара в заказе
        if (order.items && order.items.length > 0) {
            const item = order.items[0];
            firstItemImg = item.img || item.image || item.photo || 'nologo.png';
        } else if (order.img || order.image) {
            // Если картинка привязана прямо к заказу, а не к товарам внутри
            firstItemImg = order.img || order.image;
        }

        // 2. Формируем правильный путь
        // Если путь уже полный (с http или img/), оставляем. Иначе добавляем img/
        const imgSrc = (firstItemImg.startsWith('http') || firstItemImg.startsWith('img/'))
            ? firstItemImg
            : 'img/' + firstItemImg;

        return `
        <div class="rf-item ${isAlreadyReturned ? 'rf-disabled' : ''}" 
             onclick="${isAlreadyReturned ? '' : `selectItem(this, '${order.id}')`}"
             style="${isAlreadyReturned ? 'opacity: 0.5; cursor: not-allowed; position: relative;' : ''}">
            ${isAlreadyReturned ? '<span style="position:absolute; top:5px; right:5px; background:#ff4d4d; color:#fff; font-size:10px; padding:2px 6px; border-radius:10px;">Уже в возврате</span>' : ''}
            <div class="rf-img-wrapper" style="width:100%; height:120px; display:flex; align-items:center; justify-content:center; background:#f9f9f9; border-radius:8px; margin-bottom:10px; overflow:hidden;">
                <img src="${imgSrc}" 
                     onerror="this.src='img/nologo.png'; this.style.opacity='0.5';" 
                     alt="Order #${order.id}" 
                     style="max-width:90%; max-height:90%; object-fit:contain;">
            </div>
            <div class="rf-item-name">Заказ #${order.id}</div>
            <div class="rf-item-price">${order.amount} ₽</div>
        </div>
    `;
    }).join('');

    // Слушатель имен файлов
    const fileInput = document.getElementById('rf-file-input');
    if(fileInput) {
        fileInput.addEventListener('change', function() {
            const names = Array.from(this.files).map(f => f.name).join(', ');
            document.getElementById('file-list-names').innerText = names ? "Выбрано: " + names : "";
        });
    }
});

// Показ/скрытие поля фото
function togglePhotoUpload() {
    const reason = document.getElementById('rf-reason').value;
    const photoSection = document.getElementById('photo-upload-section');
    photoSection.style.display = (reason === 'Брак / Повреждение') ? 'block' : 'none';
}

function selectItem(el, id) {
    document.querySelectorAll('.rf-item').forEach(i => i.classList.remove('rf-selected'));
    el.classList.add('rf-selected');
    currentSelectedId = id;
}

function processReturn() {
    const reason = document.getElementById('rf-reason');
    const loader = document.getElementById('subscribe-loader');

    if (!currentSelectedId) {
        showStatusModal('error', 'Ошибка', 'Выберите товар для возврата');
        return;
    }
    if (!reason.value) {
        showStatusModal('error', 'Ошибка', 'Выберите причину возврата');
        return;
    }

    if (loader) loader.style.display = 'flex';

    setTimeout(() => {
        if (loader) loader.style.display = 'none';

        const returnObj = {
            id: "RET-" + Math.floor(1000 + Math.random() * 9000),
            orderId: currentSelectedId,
            reason: reason.value,
            comment: document.getElementById('rf-comment').value,
            date: new Date().toLocaleDateString(),
            status: "На рассмотрении"
        };

        let returns = JSON.parse(localStorage.getItem('my_returns')) || [];
        returns.unshift(returnObj);
        localStorage.setItem('my_returns', JSON.stringify(returns));

        showStatusModal('success', 'Готово!', 'Заявка принята. Мы свяжемся с вами в ближайшее время.');

        setTimeout(() => { window.location.href = 'profile.html?tab=returns'; }, 2000);
    }, 1500);
}

function showStatusModal(type, title, text) {
    const modal = document.getElementById('subscribe-status-modal');
    document.getElementById('sub-modal-title').innerText = title;
    document.getElementById('sub-modal-text').innerText = text;
    const icon = document.getElementById('sub-modal-icon');

    icon.innerHTML = type === 'error'
        ? '<i class="fas fa-times-circle" style="font-size:50px; color:#ff4d4d;"></i>'
        : '<i class="fas fa-check-circle" style="font-size:50px; color:#76e12e;"></i>';

    modal.style.display = 'flex';
}

function closeSubModal() {
    document.getElementById('subscribe-status-modal').style.display = 'none';
}
function togglePhotoUpload() {
    const reasonSelect = document.getElementById('rf-reason');
    const photoSection = document.getElementById('photo-upload-section');

    // Проверяем, совпадает ли выбранное значение с нужным текстом
    if (reasonSelect.value === 'Брак / Повреждение') {
        photoSection.style.display = 'block'; // Показываем
    } else {
        photoSection.style.display = 'none';  // Скрываем
    }
}

// Также добавим обработчик для отображения имен выбранных файлов
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('rf-file-input');
    const fileListDisplay = document.getElementById('file-list-names');

    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const names = Array.from(this.files).map(file => file.name).join(', ');
                fileListDisplay.innerText = 'Выбрано: ' + names;
            } else {
                fileListDisplay.innerText = '';
            }
        });
    }
});