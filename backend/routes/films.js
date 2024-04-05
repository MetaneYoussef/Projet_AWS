require('dotenv').config();
const express = require('express');
const router = express.Router();

// Vous avez déjà importé les contrôleurs, donc pas besoin de le faire à nouveau
const {
    discoverMovies,
    getmovie,
    searchMovies
} = require('../controllers/filmsComtroller');

router.get('/discover', discoverMovies);
router.get('/search', searchMovies);
router.get('/:id', getmovie);

module.exports = router;