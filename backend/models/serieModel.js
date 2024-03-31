const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SeriesSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    }, poster: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    nombre_saisons: {
        type: Number,
        required: true
    },
    nombre_episodes: {
        type: Number,
        required: true
    },
    date_sortie: {
        type: Date,
        required: true
    },
    tmdb_id: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    acteurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acteur'
    }],
    saisons: {
        type: [{
            titre: {
                type: String, required: true
            },
            poster: {
                type: String, required: true
            },
            tmdb_id: {
                type: Number, required: false
            },
            overview: {
                type: String, required: true
            },
            nombre_saison: {
                type: Number, required: true
            },
            date_sortie: {
                type: Date, required: false
            },
            rating: {
                type: Number, required: false
            },
            episodes: {
                type: [{
                    titre: {
                        type: String, required: true
                    },
                    overview: {
                        type: String, required: true
                    },
                    numero_saison: {
                        type: Number, required: true
                    },
                    numero_episode: {
                        type: Number, required: true
                    },
                    poster: {
                        type: String, required: false
                    }, date_sortie: {
                        type: Date, required: false
                    }, rating: {
                        type: Number, required: false
                    }
                }]
            }
        }],
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model('Series', SeriesSchema)