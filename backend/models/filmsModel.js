const mongoose = require('mongoose')

const Schema = mongoose.Schema

const filmsSchema = new Schema({
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
    Longueur: {
        type: Number,
        min: 1,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    acteurs: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Acteurs'
        }]
    }


}, { timestamps: true })

module.exports = mongoose.model('Films', filmsSchema)