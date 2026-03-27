document.querySelectorAll('.city-item').forEach(item => {
    const header = item.querySelector('.city-header');
    const icon = item.querySelector('.icon-toggle');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Закрываем другие (аккордеон)
        document.querySelectorAll('.city-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.icon-toggle').textContent = '+';
        });

        if (!isActive) {
            item.classList.add('active');
            icon.textContent = '×'; // Меняем плюс на крестик
        } else {
            icon.textContent = '+';
        }
    });
});
document.addEventListener('click', (event) => {
    // Находим все шапки городов
    const allHeaders = document.querySelectorAll('.city-header');

    // Проверяем, кликнул ли пользователь именно на заголовок города
    const clickedHeader = event.target.closest('.city-header');

    if (clickedHeader) {
        // Если кликнули на город:
        const isAlreadySelected = clickedHeader.classList.contains('selected');

        // 1. Сначала у всех убираем класс selected (сброс фона и цвета)
        allHeaders.forEach(header => header.classList.remove('selected'));

        // 2. Если этот город не был активен — красим его
        if (!isAlreadySelected) {
            clickedHeader.classList.add('selected');
        }
    } else {
        // Если кликнули в любое другое место (мимо городов)
        allHeaders.forEach(header => header.classList.remove('selected'));
    }
});