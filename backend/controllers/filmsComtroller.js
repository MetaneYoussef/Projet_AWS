require('dotenv').config();

const mongoose = require('mongoose');
const Acteur = require('../models/acteurModel');
const Film = require('../models/filmsModel');
const fetch = require('node-fetch');


const base_url = 'https://image.tmdb.org/t/p/original/'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};

const fetchMoviedetails = async (name) => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' +
        name.split(' ').join('%20') + '&include_adult=false&language=fr-FR&page=1';


    details = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const titre = json.results[0].title
            const id = json.results[0].id
            const poster = base_url + json.results[0].poster_path
            const background = base_url + json.results[0].backdrop_path
            const synopsis = json.results[0].overview
            const date_sortie = json.results[0].release_date
            const rating = json.results[0].vote_average
            const genre = json.results[0].genre_ids
            return { id, titre, date_sortie, poster, background, synopsis, rating, genre };
        })
        .catch(err => console.error('error:' + err));
    if (!details) {
        return { error: 'Aucun film trouvé' };
    }
    return details;
}



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
    let details = await fetchMoviedetails(film.titre);
    if (details.error) {
        return res.status(400).json({ error: details.error });
    }
    film.date_sortie = new Date(details.date_sortie);
    film.tmdb_id = details.id;
    film.titre = details.titre;
    film.poster = details.poster;
    film.background = details.background;
    film.synopsis = details.synopsis;
    film.rating = details.rating;
    film.genre = details.genre.map((id) => {
        parseInt(id);
        switch (id) {
            case 28:
                return 'Action';
            case 12:
                return 'Aventure';
            case 16:
                return 'Animation';
            case 35:
                return 'Comédie';
            case 80:
                return 'Crime';
            case 99:
                return 'Documentaire';
            case 18:
                return 'Drame';
            case 10751:
                return 'Familial';
            case 14:
                return 'Fantastique';
            case 36:
                return 'Histoire';
            case 27:
                return 'Horreur';
            case 10402:
                return 'Musique';
            case 9648:
                return 'Mystère';
            case 10749:
                return 'Romance';
            case 878:
                return 'Science-Fiction';
            case 10770:
                return 'Téléfilm';
            case 53:
                return 'Thriller';
            case 10752:
                return 'Guerre';
            case 37:
                return 'Western';
        }
    });

    console.log(film)
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

const trailerFilm =  async(req, res) => {
    const { movieId } = req.params;
    try {
        const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=fr-FR';
        const response = await axios.get(url, options);
        // return res.json(response.data);
        const trailers = response.data.results.filter(video => video.site === 'YouTube');
        let trailerKey = null;
        if (trailers.length > 0) {
            // Essayer de trouver un trailer officiel en premier
            const officialTrailers = trailers.filter(video => video.type === 'Trailer' && video.official);
            if (officialTrailers.length > 0) {
                trailerKey = officialTrailers[0].key;
            } else {
                // S'il n'y a pas de trailer officiel, prendre le premier résultat qui pourrait être un clip ou tout autre type
                trailerKey = trailers[0].key;
            }
            res.json({ success: true, trailerUrl: `https://www.youtube.com/watch?v=${trailerKey}` });
        } else {
            res.status(404).json({ success: false, message: 'Trailer not found' });
        }
    } catch (error) {
        console.error('Error fetching trailer:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
module.exports = {
    creerFilm,
    obtenirFilm,
    supprimerFilm,
    obtenirFilms,
    majFilm,
    trailerFilm
}