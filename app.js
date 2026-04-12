const tg = window.Telegram.WebApp;
tg.expand();

const API = "https://mini-app-74tm-45wtzkh83-erasylsariphan-1825s-projects.vercel.app"; // потом заменишь

async function register() {
    const username = document.getElementById('username').value;

    const res = await fetch(API + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            telegramId: tg.initDataUnsafe.user.id,
            username
        })
    });

    const data = await res.json();

    if (data.success) {
        loadUser(data.user);
    }
}

async function login() {
    const res = await fetch(API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            telegramId: tg.initDataUnsafe.user.id
        })
    });

    const data = await res.json();

    if (data.success) {
        loadUser(data.user);
    }
}

function loadUser(user) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';

    document.getElementById('welcome').innerText =
        `Привет, ${user.username}`;
}

function buy(item) {
    tg.sendData(JSON.stringify({ action: 'buy', item }));
}