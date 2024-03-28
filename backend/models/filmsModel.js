const mongoose = require('mongoose')

const Schema = mongoose.Schema

const filmsSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    tmdb_id: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    background: {
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
    rating: {
        type: Number,
        min: 0,
        max: 10,
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