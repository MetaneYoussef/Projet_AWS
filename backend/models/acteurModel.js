const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ActeursSchema = new Schema({

    nom: {
        type: String,
        required: true
    },
    annee_de_naissance: {
        type: Number,
        min: 1000,
        max: 2024,
        required: true
    },
    annee_de_deces: {
        type: Number,
        min: 1000,
        max: 2024,
        required: false
    },
    awards: {
        type: [String],
        required: false
    }


}, { timestamps: true })

module.exports = mongoose.model('Acteurs', ActeursSchema)