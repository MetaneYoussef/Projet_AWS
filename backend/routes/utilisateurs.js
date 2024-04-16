const express = require('express');
const {
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur
} = require('../controllers/utilisateursController');

const {
    ajouterAFilmWatchlist,
    retirerDeFilmWatchlist,
    obtenirFilmWatchlist,
    majpFilmWatchlist,
    obtenirRecommandationsFilm
} = require('../controllers/filmWatchlistController');

const {
    ajouterSerieWatchlist,
    retirerSerieWatchlist,
    obtenirSerieWatchlist,
    majpSerieWatchlist,
    obtenirRecommandationsSerie
} = require('../controllers/serieWatchlistController');

const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Routes pour la gestion des utilisateurs
router.get('/', verifyToken, obtenirUtilisateurs); // Obtenir tous les utilisateurs
router.get('/:id', obtenirUtilisateur); // Obtenir un utilisateur spécifique par ID
router.delete('/:id', verifyToken, supprimerUtilisateur); // Supprimer un utilisateur spécifique par ID
router.patch('/:id', verifyToken, majUtilisateur); // Mettre à jour un utilisateur spécifique par ID

// Routes pour la gestion de la watchlist de films
router.post('/:id/filmsWatchlist', verifyToken, ajouterAFilmWatchlist); // Ajouter un film à la watchlist d'un utilisateur
router.delete('/:id/filmsWatchlist', verifyToken, retirerDeFilmWatchlist); // Retirer un film de la watchlist d'un utilisateur
router.get('/:id/filmsWatchlist', verifyToken, obtenirFilmWatchlist); // Obtenir la watchlist de films d'un utilisateur
router.patch('/:id/filmsWatchlist', verifyToken, majpFilmWatchlist); // Mettre à jour la progression d'un film dans la watchlist
router.get('/:id/recommandationsFilm', verifyToken, obtenirRecommandationsFilm); // Obtenir des recommandations de films

// Routes pour la gestion de la watchlist des séries
router.post('/:id/seriesWatchlist', verifyToken, ajouterSerieWatchlist); // Ajouter une série à la watchlist d'un utilisateur
router.delete('/:id/seriesWatchlist', verifyToken, retirerSerieWatchlist); // Retirer une série de la watchlist d'un utilisateur
router.get('/:id/seriesWatchlist', verifyToken, obtenirSerieWatchlist); // Obtenir la watchlist des séries d'un utilisateur
router.patch('/:id/seriesWatchlist', verifyToken, majpSerieWatchlist); // Mettre à jour la progression d'une série dans la watchlist
router.get('/:id/seriesRecommendations', verifyToken, obtenirRecommandationsSerie); // Obtenir des recommandations de séries basées sur la watchlist

module.exports = router;