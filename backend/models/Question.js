const questionSchema = new mongoose.Schema({
    type: String, // 'film' ou 'serie'
    question: String,
    options: [String],
    tags: [String] // Ajout des tags pour les paramètres TMDB
});

module.exports = mongoose.model('Question', questionSchema);