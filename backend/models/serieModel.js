const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SeriesSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_sortie: {
        type: Date,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    saison: {
        type: [{
            titre: {
                type: String, required: true
            },
            description: {
                type: String, required: true
            },
            nombre: {
                type: Number, required: true
            },
            date_sortie: {
                type: Date, required: true
            },
            acteurs: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Acteur'
            }],
            episode: {
                type: [{
                    titre: {
                        type: String, required: true
                    },
                    description: {
                        type: String, required: true
                    },
                    nombre: {
                        type: Number, required: true
                    }
                }]
            }
        }],
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model('Series', SeriesSchema)