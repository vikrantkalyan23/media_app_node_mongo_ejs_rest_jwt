const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const News = require('../models/News');
const router = express.Router();
const auth = require('../middleware/auth');

// Register
router.post('/news', auth, async (req, res) => {
    const { title, content, category } = req.body;
    try {
        await News.create({ title, content, category });
        res.send('News Added');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add News
router.post('/news', async (req, res) => {
    const { title, content, category } = req.body;
    try {
        await News.create({ title, content, category });
        res.send('News Added');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Edit/Delete News (Add as needed)
// ...

module.exports = router;
