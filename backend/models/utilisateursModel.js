const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Définition du schéma pour un élément de la watchlist
const filmWatchlistSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'film'
    },
    progress: {
        type: Number,
        default: 0
    }

}, { _id: false });

// Schéma de la watchlist pour les séries avec détails d'épisodes
const serieWatchlistSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'serie'
    },
    saison: {
        type: Number,
        required: true
    },
    episode: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    }
}, { _id: false });

// Définition du schéma pour un utilisateur
const utilisateurSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est obligatoire']
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
    },
    mot_de_passe: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    filmsWatchlist: [filmWatchlistSchema],
    seriesWatchlist: [serieWatchlistSchema]
}, { timestamps: true });

// Fonction qui s'exécute avant l'enregistrement d'un utilisateur pour chiffrer le mot de passe
utilisateurSchema.pre('save', async function(next) {
    if (!this.isModified('mot_de_passe')) return next(); // Seulement si le mot de passe a été modifié
    const salt = await bcrypt.genSalt(10); // Génération du sel
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt); // Chiffrement du mot de passe
    next();
});

// Méthode pour comparer les mots de passe lors de la connexion
utilisateurSchema.methods.matchMotDePasse = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
module.exports = Utilisateur;