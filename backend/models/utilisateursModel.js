const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const utilisateursSchema = new Schema({
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
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
    },
    mot_de_passe: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    watchlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Films' // Assurez-vous que ce nom correspond au modèle que vous utilisez pour les films ou séries.
    }]
}, { timestamps: true });

// Hachage du mot de passe avant d'enregistrer l'utilisateur
utilisateursSchema.pre('save', async function(next) {
    if (!this.isModified('mot_de_passe')) return next();

    const salt = await bcrypt.genSalt(10);
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
    next();
});

// Méthode pour comparer le mot de passe entré avec le mot de passe haché
utilisateursSchema.methods.matchMotDePasse = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

module.exports = mongoose.model('Utilisateurs', utilisateursSchema);