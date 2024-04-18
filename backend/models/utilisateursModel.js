const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

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
        default: 0,
        min: 0,
        max: 100
    }
}, { _id: false });

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
        default: 0,
        min: 0,
        max: 100
    }
}, { _id: false });


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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    filmsWatchlist: [filmWatchlistSchema],
    seriesWatchlist: [serieWatchlistSchema]
}, { timestamps: true });

utilisateurSchema.index({ email: 1 });

utilisateurSchema.pre('save', async function(next) {
    if (!this.isModified('mot_de_passe')) return next();
    const salt = await bcrypt.genSalt(12);
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
    next();
});

utilisateurSchema.methods.matchMotDePasse = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.mot_de_passe);
};

utilisateurSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.mot_de_passe;
    return obj;
};

utilisateurSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('L\'email est déjà utilisé'));
    } else {
        next(error);
    }
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
module.exports = Utilisateur;