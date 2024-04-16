const Utilisateur = require('../models/utilisateursModel');
const axios = require('axios');

// Ajouter un film à la watchlist de films d'un utilisateur
const ajouterAFilmWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId } = req.body; // ID de TMDB du film à ajouter

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $addToSet: { filmsWatchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retirer un film de la watchlist de films d'un utilisateur
const retirerDeFilmWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId } = req.body; // ID de TMDB du film à retirer

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $pull: { filmsWatchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir la watchlist de films d'un utilisateur
const obtenirFilmWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur

    try {
        const utilisateur = await Utilisateur.findById(id).populate('filmsWatchlist');;
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour de la progression d'un film dans la watchlist de films
const majpFilmWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId, progress } = req.body; // ID TMDB du film et progression à mettre à jour

    try {
        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id, 'filmsWatchlist.tmdbId': tmdbId }, { $set: { 'filmsWatchlist.$.progress': progress } }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur ou élément de watchlist non trouvé" });
        }

        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

// Définir une liste de genres à partir de l'API TMDB
const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    ScienceFiction: 878,
    TVMovie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
};


const fetchMostFrequentGenre = async(filmsWatchlist) => {
    const genreCounts = {};
    // Assurez-vous que 'options' est défini correctement pour vos appels API.
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDBAPIKEY}`
        }
    };

    for (const item of filmsWatchlist) {
        var tmdbId = item.tmdbId;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?language=fr-FR`, options);
            const movieGenres = response.data.genres;
            movieGenres.forEach((genre) => {
                genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1; // Utiliser l'ID de genre ici
            });
        } catch (error) {
            console.error(`Error fetching movie details for tmdbId ${tmdbId}: `, error);
        }
    }

    // Trouver l'ID de genre le plus fréquent
    let mostFrequentGenreId = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b, null);
    return mostFrequentGenreId; // Retourne l'ID du genre
};


// Controller function to obtain recommendations based on the user's watchlist
const obtenirRecommandationsFilm = async(req, res) => {
    const { id } = req.params;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.TMDBAPIKEY
        }
    };

    try {
        const utilisateur = await Utilisateur.findById(id);

        if (!utilisateur || !utilisateur.filmsWatchlist || utilisateur.filmsWatchlist.length === 0) {
            return res.status(404).json({ message: "Watchlist vide ou utilisateur non trouvé" });
        }

        const mostFrequentGenreId = await fetchMostFrequentGenre(utilisateur.filmsWatchlist);
        if (!mostFrequentGenreId) {
            return res.status(404).json({ message: "Aucun genre fréquent trouvé dans la watchlist" });
        }

        const recommendationsUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${mostFrequentGenreId}&language=fr-FR`;
        const recommendationsResponse = await axios.get(recommendationsUrl, options);
        const recommendations = recommendationsResponse.data.results;

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des recommandations: ' + error.message });
    }
};

module.exports = {
    ajouterAFilmWatchlist,
    retirerDeFilmWatchlist,
    obtenirFilmWatchlist,
    majpFilmWatchlist,
    obtenirRecommandationsFilm
};