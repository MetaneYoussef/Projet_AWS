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

router.get('/', verifyToken, obtenirUtilisateurs);
router.get('/:id', obtenirUtilisateur);
router.delete('/:id', verifyToken, supprimerUtilisateur);
router.patch('/:id', verifyToken, majUtilisateur);

router.post('/:id/filmsWatchlist', verifyToken, ajouterAFilmWatchlist);
router.delete('/:id/filmsWatchlist', verifyToken, retirerDeFilmWatchlist);
router.get('/:id/filmsWatchlist', verifyToken, obtenirFilmWatchlist);
router.patch('/:id/filmsWatchlist', verifyToken, majpFilmWatchlist);
router.get('/:id/recommandationsFilm', verifyToken, obtenirRecommandationsFilm);

router.post('/:id/seriesWatchlist', verifyToken, ajouterSerieWatchlist);
router.delete('/:id/seriesWatchlist', verifyToken, retirerSerieWatchlist);
router.get('/:id/seriesWatchlist', verifyToken, obtenirSerieWatchlist);
router.patch('/:id/seriesWatchlist', verifyToken, majpSerieWatchlist);
router.get('/:id/seriesRecommendations', verifyToken, obtenirRecommandationsSerie);

module.exports = router;