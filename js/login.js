// --- 1. ПРОВЕРКА ПРИ ЗАГРУЗКЕ ---
window.onload = () => {
    // Если в LocalStorage есть активный юзер, кидаем его сразу в профиль
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'profile.html';
    }
};

// --- 2. ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ---
window.showScreen = (screen) => {
    const screens = ['login-form', 'register-form', 'forgot-form'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const target = document.getElementById(screen + '-form');
    if (target) target.style.display = 'block';

    const title = document.getElementById('page-title');
    if (screen === 'login') title.innerText = 'Мой аккаунт';
    if (screen === 'register') title.innerText = 'Регистрация';
    if (screen === 'forgot') title.innerText = 'Восстановление пароля';
};

// --- 3. РЕГИСТРАЦИЯ ---
window.handleRegister = () => {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const address = document.getElementById('reg-address').value;
    const pass = document.getElementById('reg-password').value;

    if (!name || !email || !address || !pass) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('allUsers')) || [];

    if (users.find(u => u.email === email)) {
        alert("Этот Email уже зарегистрирован!");
        return;
    }

    // Сохраняем расширенный объект пользователя
    const newUser = {
        name: name,
        email: email,
        address: address,
        password: pass,
        date: new Date().toLocaleDateString()
    };

    users.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(users));

    // Отправка письма через EmailJS (если настроено)
    if (typeof emailjs !== 'undefined') {
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            to_name: name,
            to_email: email,
            address: address
        });
    }

    document.getElementById('success-modal').style.display = 'flex';
};

// --- 4. ВХОД ---
window.handleLogin = () => {
    const email = document.getElementById('login-user').value;
    const pass = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('allUsers')) || [];

    // Ищем юзера в нашей "базе"
    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
        // Сохраняем сессию
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('username', email.split('@')[0]);

        startRedirect();
    } else {
        alert("Неверный Email или пароль!");
    }
};

// --- 5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
window.closeModalAndGoProfile = () => {
    // Авто-логин после регистрации
    const email = document.getElementById('reg-email').value;
    const users = JSON.parse(localStorage.getItem('allUsers'));
    const user = users.find(u => u.email === email);

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('username', email.split('@')[0]);

    document.getElementById('success-modal').style.display = 'none';
    startRedirect();
};

function startRedirect() {
    // Если у тебя есть оверлей загрузки (loading-overlay), показываем его
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.style.display = 'flex';

    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}