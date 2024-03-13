const mongoose = require('mongoose')

const Schema = mongoose.Schema

const utilisateursSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mot_de_passe: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Utilisateurs', utilisateursSchema)