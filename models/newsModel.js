const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String },
    publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
