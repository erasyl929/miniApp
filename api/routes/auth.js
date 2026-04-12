const router = require('express').Router();
const User = require('../models/User');

// регистрация
router.post('/register', async (req, res) => {
    const { telegramId, username } = req.body;

    let user = await User.findOne({ telegramId });

    if (user) {
        return res.json({ success: true, user });
    }

    user = new User({ telegramId, username });
    await user.save();

    res.json({ success: true, user });
});

// вход
router.post('/login', async (req, res) => {
    const { telegramId } = req.body;

    const user = await User.findOne({ telegramId });

    if (!user) {
        return res.json({ success: false });
    }

    res.json({ success: true, user });
});

module.exports = router;