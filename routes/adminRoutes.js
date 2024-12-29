const express = require('express');
const { loginPage, login, dashboard, logout } = require('../controllers/adminController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const News = require('../models/newsModel');

const router = express.Router();

router.get('/', loginPage);
router.post('/login', login);
router.get('/dashboard', isAuthenticated, dashboard);
router.get('/logout', logout);
router.get('/register', (req, res) => {
    res.render('admin/register', { errorMessage: null, successMessage: null });
});
router.get('/news', async (req, res) => {
    try {
        const newsList = await News.find().sort({ createdAt: -1 });
        res.render('admin/news', { newsList:newsList ,errorMessage:null});
    } catch (err) {
        res.render('admin/news', { newsList: null,errorMessage: 'Error fetching news' });
    }
});

router.get('/news/add', (req, res) => {
    res.render('admin/addNews', { errorMessage: null, successMessage: null });
});

router.post('/news/add', async (req, res) => {
    try {
        const { title, description, url, imageUrl, publishedAt } = req.body;
        const newNews = new News({
            title,
            description,
            url,
            imageUrl,
            publishedAt
        });

        await newNews.save(); 
        res.redirect('/admin/news');
    } catch (err) {
        console.error(err);
        res.render('admin/addNews', { errorMessage: 'Error adding news', successMessage: null });
    }
});

router.get('/news/edit/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id); // Find the news by ID
        if (!news) {
            return res.status(404).send('News not found');
        }
        res.render('admin/editNews', { news }); // Pass the news data to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching news for editing');
    }
});

router.get('/news/delete/:id', async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id); // Delete the news by ID
        if (!deletedNews) {
            return res.status(404).send('News not found');
        }
        res.redirect('/admin/news'); // Redirect to the news list after deletion
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting news');
    }
});

router.post('/news/edit/:id', async (req, res) => {
    try {
        const { title, description, url, imageUrl, publishedAt } = req.body;
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { title, description, url, imageUrl, publishedAt },
            { new: true }  
        );

        if (!updatedNews) {
            return res.status(404).send('News not found');
        }

        res.redirect('/admin/news');  
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating news');
    }
});
module.exports = router;
