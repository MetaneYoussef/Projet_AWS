require('dotenv').config();

const mongoose = require('mongoose');
const Acteur = require('../models/acteurModel');
const Serie = require('../models/serieModel');
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
    const search_url = 'https://api.themoviedb.org/3/search/tv?query=' +
        name.split(' ').join('%20') + '&include_adult=false&language=fr-FR&page=1';


    details = await fetch(search_url, options)
        .then(res => res.json())
        .then(json => {
            const titre = json.results[0].name
            const synopsis = json.results[0].overview
            const poster = base_url + json.results[0].poster_path
            const background = base_url + json.results[0].backdrop_path
            const date_sortie = json.results[0].first_air_date
            const id = json.results[0].id
            const rating = json.results[0].vote_average
            const genre = json.results[0].genre_ids
            return { id, titre, date_sortie, poster, background, synopsis, rating, genre };
        })
        .catch(err => console.error('error: ' + err));
    if (!details) {
        return { error: 'Aucune série trouvé' };
    }
    const serie_url = 'https://api.themoviedb.org/3/tv/' + details.id + '?language=fr-FR';
    details = await fetch(serie_url, options)
        .then(res => res.json())
        .then((json) => {
            details.nombre_saisons = json.number_of_seasons;
            details.nombre_episodes = json.number_of_episodes;
            return details;
        })
        .catch(err => console.error('error:' + err));


    saisons = [];

    for (let i = 1; i <= parseInt(details.nombre_saisons); i++) {
        const saison_url = 'https://api.themoviedb.org/3/tv/' + details.id + '/season/' + i + '?language=fr-FR';
        saison = await fetch(saison_url, options)
            .then(res => res.json())
            .then(json => {
                const titre = json.name;
                const poster = base_url + json.poster_path;
                const tmdb_id = json.id;
                const overview = json.overview;
                const nombre_saison = json.season_number;
                const date_sortie = json.air_date;
                const rating = json.vote_average;
                const episodes = json.episodes.map((episode) => {
                    const titre = episode.name;
                    const tmdb_id = episode.id;
                    const overview = episode.overview;
                    const poster = base_url + episode.still_path;
                    const numero_saison = episode.season_number;
                    const numero_episode = episode.episode_number;
                    const date_sortie = episode.air_date;
                    const rating = episode.vote_average;


                    return episode = { titre, tmdb_id, overview, poster, numero_episode, numero_saison, date_sortie, rating };
                });
                return { titre, poster, tmdb_id, overview, nombre_saison, date_sortie, rating, episodes };
            })
            .catch(err => console.error('error:' + err));
        saisons.push(saison);
    }
    details.saisons = saisons;


    return details;
}


const creerSerie = async (req, res) => {

    const series = req.body;
    if (series.acteurs) {
        let idActeurs = [];
        for (let acteur of series.acteurs) {
            const idActeur = await Acteur.findOne({ nom: acteur })
            if (!idActeur) {
                return res.status(400).json({ error: "l'acteur " + acteur + " n'existe pas" });
            }
            if (idActeur) {
                idActeurs.push(idActeur._id);
            }
        }
        series.acteurs = idActeurs;
    }
    let details = await fetchMoviedetails(series.titre);
    if (details.error) {
        return res.status(400).json({ error: details.error });
    }
    series.tmdb_id = details.id;
    series.titre = details.titre;
    series.date_sortie = Date(details.date_sortie);
    series.poster = details.poster;
    series.background = details.background;
    series.synopsis = details.synopsis;
    series.rating = details.rating;
    series.nombre_saisons = details.nombre_saisons;
    series.nombre_episodes = details.nombre_episodes;
    series.saisons = details.saisons;


    series.genre = details.genre.map((id) => {
        parseInt(id);
        switch (id) {
            case 10759:
                return 'Action & Adventure';
            case 16:
                return 'Animation';
            case 35:
                return 'Comedy';
            case 80:
                return 'Crime';
            case 99:
                return 'Documentary';
            case 18:
                return 'Drama';
            case 10751:
                return 'Family';
            case 10762:
                return 'Kids';
            case 9648:
                return 'Mystery';
            case 10763:
                return 'News';
            case 10764:
                return 'Reality';
            case 10765:
                return 'Sci-Fi & Fantasy';
            case 10766:
                return 'Soap';
            case 10767:
                return 'Talk';
            case 10768:
                return 'War & Politics';
            case 37:
                return 'Western';
            default:
                return 'Unknown';
        }
    });


    try {
        const serie = await Serie.create(series);
        res.status(200).json(serie)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const convertirActeursIdEnActeur = async (serie) => {


    const acteursWithNames = await Promise.all(serie.acteurs.map(async (idActeur) => {
        return await Acteur.findById(idActeur);
    }));

    serie.acteurs = acteursWithNames;

    return serie;
}



const obtenirSerie = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet Serie n\'existe pas' })
    }

    let serie = await Serie.findById(id);

    if (!serie) {
        return res.status(400).json({ error: 'Cet Serie n\'existe pas' })
    }
    try {
        serie = await convertirActeursIdEnActeur(serie);
        res.status(200).json(serie)
    } catch (error) {
        console.error('Error replacing actor IDs with names:', error);
        res.status(500).send('Server error');
    }
}

const obtenirSeries = async (req, res) => {
    try {
        let series = await Serie.find({}).sort({ createdAt: -1 });

        // Convert each series document to a plain object and replace actor IDs with names
        series = await Promise.all(series.map(async (serie) => {
            let serieObj = serie.toObject(); // Convert Mongoose document to a plain object
            serieObj = await convertirActeursIdEnActeur(serieObj);
            return serieObj;
        }));

        res.status(200).json(series);
    } catch (error) {
        console.error('Error fetching and converting series:', error);
        res.status(500).send('Server error');
    }
};

const supprimerSerie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    const serie = await Serie.findOneAndDelete({ _id: id })

    if (!serie) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    res.status(200).json(serie)
}
const majSerie = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    let serie = await Serie.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    serie = await Serie.findById(id);
    if (!serie) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    res.status(200).json(serie)
}

module.exports = {
    creerSerie,
    obtenirSerie,
    obtenirSeries,
    supprimerSerie,
    majSerie
}