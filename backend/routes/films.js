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
    majFilm
} = require('../controllers/filmsComtroller');

// Appliquer le middleware d'authentification aux routes protégées
router.post('/', creerFilm);
router.get('/:id', obtenirFilm); // Cette route reste publique
router.get('/', obtenirFilms); // Cette route reste publique
router.delete('/:id', verifyToken, supprimerFilm);
router.patch('/:id', verifyToken, majFilm);

const apiKey = process.env.TMDBAPIKEY;

router.get('/trailer/:movieId', async(req, res) => {
    const { movieId } = req.params;
    try {
        const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=fr-FR';
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzEwNDVlZWUxNDQ2YTA2MmJhMDQ5YWFhNTFjY2JmYyIsInN1YiI6IjY1ZjQ0YzI4YTMxM2I4MDE4NTI3ZjY2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e1ZfIrrt_lEIA4PLLcM0nen5yKXVgtxs0R70Mm-sP_g'
            }
        };
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
});

module.exports = router;