const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    original: { type: String, required: true },
    translation: { type: String, required: true },
    // Dành cho SRS (Spaced Repetition)
    nextReview: { type: Date, default: Date.now },
    repetition: { type: Number, default: 0 },
    efactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 0 }
});

module.exports = mongoose.model('Word', wordSchema);