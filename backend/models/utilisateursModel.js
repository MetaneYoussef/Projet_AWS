const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Définition du schéma pour un élément de la watchlist
const watchlistItemSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['film', 'serie'] // Utilisation de 'film' et 'serie' comme discuté
    },
    progress: {
        type: Number,
        default: 0
    }

}, { _id: false }); // Pas besoin d'un champ _id distinct pour chaque élément de la watchlist

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
    watchlist: [watchlistItemSchema]
}, { timestamps: true }); // Activez la gestion des timestamps

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