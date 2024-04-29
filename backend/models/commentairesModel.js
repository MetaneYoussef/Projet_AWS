const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentaireSchema = new Schema({
    contenu: {
        type: String,
        required: [true, 'Le contenu du commentaire est obligatoire']
    },
    date: {
        type: Date,
        default: Date.now
    },
    idutilisateur: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    idmedia: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);