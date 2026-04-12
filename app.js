const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
tg.setHeaderColor('#0f0f0f');
tg.setBackgroundColor('#0f0f0f');

let currentUser = null;

// Основная функция инициализации
async function initApp() {
    const user = tg.initDataUnsafe.user;
    
    if (!user) {
        tg.showAlert('Не удалось получить данные Telegram. Попробуйте перезапустить Mini App.');
        return;
    }

    currentUser = user;
    document.getElementById('user-avatar').textContent = user.photo_url ? '🖼️' : '👤';
    document.getElementById('welcome-text').textContent = `Привет, ${user.first_name}!`;
}

// Обработка регистрации
window.handleRegister = function() {
    const customName = document.getElementById('custom-name').value.trim();

    tg.sendData(JSON.stringify({
        action: 'register',
        telegramId: currentUser.id,
        first_name: currentUser.first_name,
        username: currentUser.username,
        customName: customName || currentUser.first_name
    }));
};

// Обработка входа (для уже существующих пользователей)
window.handleLogin = function() {
    tg.sendData(JSON.stringify({
        action: 'login',
        telegramId: currentUser.id
    }));
};

// Функция, которую вызовет бот после успешной регистрации/входа
window.showMainScreen = function(userData) {
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    
    document.getElementById('main-welcome').textContent = `С возвращением, ${userData.first_name}!`;
    document.getElementById('balance').textContent = `${userData.balance || 0} 💰`;
};

// Дополнительные функции (пока заглушки)
window.goToShop = () => tg.showAlert('Магазин скоро будет доступен');
window.goToProfile = () => tg.showAlert('Профиль скоро будет доступен');

// Запуск
initApp();