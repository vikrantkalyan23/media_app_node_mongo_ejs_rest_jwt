const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = []; // Mock database; replace with actual DB in production
const SECRET_KEY = 'your_jwt_secret_key'; // Replace with a secure secret key

// Middleware to parse JSON and form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send('User already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    res.redirect('/auth'); // Redirect back to the authentication page
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }); // Set token as an HTTP-only cookie
    res.redirect('/dashboard'); // Redirect to the dashboard
});

// Protected Route Example
router.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access Denied. Please log in.');
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        res.send(`Welcome, ${verified.name}!`);
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
});

module.exports = router;
