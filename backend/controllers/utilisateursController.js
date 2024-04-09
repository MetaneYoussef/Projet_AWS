const mongoose = require('mongoose');
const Utilisateur = require('../models/utilisateursModel');
const fetch = require('node-fetch');
const axios = require('axios');

// Création d'un utilisateur
const creerUtilisateur = async(req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe
        });
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Voir tous les utilisateurs
const obtenirUtilisateurs = async(req, res) => {
    try {
        const utilisateurs = await Utilisateur.find({}).sort({ createdAt: -1 });
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Voir un seul utilisateur
const obtenirUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findById(id);

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un utilisateur
const supprimerUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndDelete({ _id: id });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un utilisateur
const majUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, {...req.body }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un film ou une série à la watchlist d'un utilisateur
const ajouterAWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId, type } = req.body; // ID de TMDB et type (film ou série) à ajouter

    try {
        // Utilisez 'addToSet' pour éviter les doublons et ajouter seulement l'ID de TMDB
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $addToSet: { watchlist: { tmdbId, type, progress: 0 } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retirer un film ou une série de la watchlist d'un utilisateur
const retirerDeWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId } = req.body; // ID de TMDB du film ou de la série à retirer

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $pull: { watchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtenir la watchlist d'un utilisateur
const obtenirWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur

    try {
        const utilisateur = await Utilisateur.findById(id).populate('watchlist');
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour de la progression d'un élément dans la watchlist
const majpWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId, progress } = req.body; // ID TMDB de l'élément et progression à mettre à jour

    try {
        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id, 'watchlist.tmdbId': tmdbId }, { $set: { 'watchlist.$.progress': progress } }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur ou élément de watchlist non trouvé" });
        }

        res.status(200).json(utilisateur.watchlist);
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


const fetchMostFrequentGenre = async(watchlist) => {
    const genreCounts = {};
    // Assurez-vous que 'options' est défini correctement pour vos appels API.
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDBAPIKEY}`
        }
    };

    for (const item of watchlist) {
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
const obtenirRecommandations = async(req, res) => {
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

        if (!utilisateur || !utilisateur.watchlist || utilisateur.watchlist.length === 0) {
            return res.status(404).json({ message: "Watchlist vide ou utilisateur non trouvé" });
        }

        const mostFrequentGenreId = await fetchMostFrequentGenre(utilisateur.watchlist);
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
    creerUtilisateur,
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur,
    ajouterAWatchlist,
    retirerDeWatchlist,
    obtenirWatchlist,
    majpWatchlist,
    obtenirRecommandations
};