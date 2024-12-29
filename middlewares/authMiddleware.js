const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/admin');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/admin');
    }
};
