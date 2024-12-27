const News = require('../models/News'); // MongoDB model

// Add a news post
const addNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const news = new News({ title, content, createdBy: req.user.id });
        await news.save();
        res.status(201).json({ message: 'News added successfully', news });
    } catch (error) {
        res.status(500).json({ message: 'Error adding news', error });
    }
};

// Get all news posts
const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news', error });
    }
};

// Update a news post
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNews = await News.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNews) return res.status(404).json({ message: 'News not found' });
        res.status(200).json({ message: 'News updated successfully', updatedNews });
    } catch (error) {
        res.status(500).json({ message: 'Error updating news', error });
    }
};

// Delete a news post
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await News.findByIdAndDelete(id);
        if (!deletedNews) return res.status(404).json({ message: 'News not found' });
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news', error });
    }
};

module.exports = { addNews, getNews, updateNews, deleteNews };
