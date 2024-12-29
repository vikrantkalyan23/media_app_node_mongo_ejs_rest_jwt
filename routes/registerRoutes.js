const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Register = require('../models/registerModel');
 
router.get('/register', (req, res) => {
    res.render('admin/register', { errorMessage: null, successMessage: null });
});
 
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try { 
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.render('admin/register', { errorMessage: 'Email already registered!', successMessage: null });
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const newUser = new Register({ name, email, password: hashedPassword });
        await newUser.save(); 
        res.render('admin/register', { errorMessage: null, successMessage: 'Registration successful! You can now log in.' });
    } catch (error) {
        console.error(error);
        res.render('admin/register', { errorMessage: 'Something went wrong. Please try again.', successMessage: null });
    }
});

module.exports = router;
