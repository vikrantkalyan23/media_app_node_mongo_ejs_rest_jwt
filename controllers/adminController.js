const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.loginPage = (req, res) => {
    res.render('admin/login', { errorMessage: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('admin/login', { errorMessage: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/admin/dashboard');
    }

    return res.render('admin/login', { errorMessage: 'Invalid username or password!' });
};

exports.dashboard = (req, res) => {
    res.render('admin/dashboard');
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin');
};
