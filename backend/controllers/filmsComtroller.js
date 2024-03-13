const mongoose = require('mongoose');
const Acteur = require('../models/acteurModel');
const Film = require('../models/filmsModel');


const creerFilm = async (req, res) => {
    const film = req.body;
    if (film.acteurs) {
        let idActeurs = [];
        for (let acteur of film.acteurs) {
            const idActeur = await Acteur.findOne({ nom: acteur })
            if (!idActeur) {
                return res.status(400).json({ error: "l'acteur " + acteur + " n'existe pas" });
            }
            if (idActeur) {
                idActeurs.push(idActeur._id);
            }
        }
        film.acteurs = idActeurs;
    }


    try {
        const fiilm = await Film.create(film);
        res.status(200).json(fiilm)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const convertirActeursIdEnActeur = async (film) => {
    if (film.acteurs) {
        let Acteurs = [];
        for (let idActeur of film.acteurs) {
            let acteur = await Acteur.findById(idActeur)
            if (!acteur) {
                film.acteurs = film.acteurs.filter((element => element !== idActeur))
            } else if (acteur) {
                Acteurs.push(acteur)
            }

        }

        film.acteurs = Acteurs;
    }
    return film;
}
const obtenirFilm = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet Film n\'existe pas' })
    }

    let film = await Film.findById(id)

    if (!film) {
        return res.status(400).json({ error: 'Cet Film n\'existe pas' })
    }
    film = await convertirActeursIdEnActeur(film);
    res.status(200).json(film)
}

const obtenirFilms = async (req, res) => {
    let Films = await Film.find({}).sort({ createdAt: -1 })
    let output = [];
    for (let i = 0; i < Films.length; i++) {

        Films[i] = await convertirActeursIdEnActeur(Films[i]);
        output.push(Films[i])
    }
    res.status(200).json(output)
}


//suppression d'un film
const supprimerFilm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet film n\'existe pas' })
    }

    const film = await Film.findOneAndDelete({ _id: id })

    if (!film) {
        return res.status(400).json({ error: 'Cet film n\'existe pas' })
    }

    res.status(200).json(film)
}

// modification d'un film
const majFilm = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet film n\'existe pas' })
    }

    const film = await Film.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!film) {
        return res.status(400).json({ error: 'Cet film n\'existe pas' })
    }

    res.status(200).json(film)
}
module.exports = {
    creerFilm,
    obtenirFilm,
    supprimerFilm,
    obtenirFilms,
    majFilm
}