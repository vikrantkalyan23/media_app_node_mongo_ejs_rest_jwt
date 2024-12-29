const express = require('express');
const Chat = require('../models/chatModel');
const router = express.Router();

// Home Page
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 }).limit(3);
        res.render('pages/home', { news });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Chat Page
router.get('/chat', async (req, res) => {
    const chats = await Chat.find().sort({ timestamp: -1 });
    res.render('pages/chat', { chats });
});

// Post Chat Message
router.post('/chat', async (req, res) => {
    const { username, message } = req.body;
    try {
        await Chat.create({ username, message });
        res.redirect('/chat');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
