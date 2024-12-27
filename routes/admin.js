const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware to verify JWT
const { addNews, getNews, updateNews, deleteNews } = require('../controllers/newsController');

// Admin routes (protected by JWT)
router.post('/add', verifyToken, addNews);       // Add a news post
router.get('/', verifyToken, getNews);          // Get all news posts
router.put('/:id', verifyToken, updateNews);    // Update a news post
router.delete('/:id', verifyToken, deleteNews); // Delete a news post

module.exports = router;
