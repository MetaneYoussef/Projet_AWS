const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: String, // 'film' ou 'serie'
    question: String,
    options: [String]
});

module.exports = mongoose.model('Question', questionSchema);