const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, enum: ['Sports', 'Weather', 'General'], required: true },
});

module.exports = mongoose.model('News', NewsSchema);
