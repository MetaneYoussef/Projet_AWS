require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const verifyToken = require('../middleware/authMiddleware'); // Assurez-vous que le chemin est correct

// Vous avez déjà importé les contrôleurs, donc pas besoin de le faire à nouveau
const {
    creerFilm,
    obtenirFilm,
    obtenirFilms,
    supprimerFilm,
    majFilm,
    trailerFilm
} = require('../controllers/filmsComtroller');

// Appliquer le middleware d'authentification aux routes protégées
router.post('/', creerFilm);
router.get('/:id', obtenirFilm); // Cette route reste publique
router.get('/', obtenirFilms); // Cette route reste publique
router.delete('/:id', verifyToken, supprimerFilm);
router.patch('/:id', verifyToken, majFilm);

const apiKey = process.env.TMDBAPIKEY;

router.get('/trailer/:movieId',trailerFilm);

module.exports = router;