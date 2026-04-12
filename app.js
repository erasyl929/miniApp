// app.js
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.setHeaderColor('#0f0f0f');
tg.setBackgroundColor('#0f0f0f');

let currentUser = tg.initDataUnsafe.user;

if (!currentUser) {
    tg.showAlert('Не удалось получить данные пользователя Telegram');
}

// Инициализация экрана
document.getElementById('welcome-text').textContent = `Привет, ${currentUser.first_name}!`;

// === РЕГИСТРАЦИЯ ===
window.handleRegister = function() {
    const customName = document.getElementById('custom-name').value.trim();

    tg.sendData(JSON.stringify({
        action: 'register',
        telegramId: currentUser.id,
        first_name: currentUser.first_name,
        username: currentUser.username || '',
        customName: customName || currentUser.first_name
    }));

    tg.showPopup({
        title: 'Регистрация',
        message: 'Данные отправлены в бот...',
        buttons: [{ type: 'close' }]
    });
};

// === ВХОД ===
window.handleLogin = function() {
    tg.sendData(JSON.stringify({
        action: 'login',
        telegramId: currentUser.id
    }));

    tg.showPopup({
        message: 'Проверяем аккаунт...',
        buttons: [{ type: 'close' }]
    });
};

// Функция, которую бот вызовет после успешной операции
window.showMainScreen = function(userData) {
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');

    document.getElementById('main-welcome').textContent = `С возвращением, ${userData.first_name}!`;
    document.getElementById('balance').textContent = `${userData.balance || 0} 💰`;
};

// Заглушки для кнопок главного экрана
window.goToShop = () => tg.showAlert('🛒 Магазин скоро будет доступен');
window.goToProfile = () => tg.showAlert('👤 Профиль скоро будет доступен');

// Запуск
console.log('Mini App запущен для пользователя:', currentUser);