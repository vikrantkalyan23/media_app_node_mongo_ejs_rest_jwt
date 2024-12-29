const express = require('express');
const Chat = require('../models/chatModel');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('frontend/home');
});

// Chat Page
router.get('/chat', async (req, res) => {
    const chats = await Chat.find().sort({ timestamp: -1 });
    res.render('frontend/chat', { chats });
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
