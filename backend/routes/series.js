const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Assurez-vous que le chemin est correct

const {
    creerSerie,
    obtenirSerie,
    obtenirSeries,
    supprimerSerie,
    majSerie
} = require('../controllers/seriesController');

// Appliquer le middleware d'authentification aux routes protégées
router.post('/', verifyToken, creerSerie);
router.get('/:id', obtenirSerie); // Cette route reste publique
router.get('/', obtenirSeries); // Cette route reste publique
router.delete('/:id', verifyToken, supprimerSerie);
router.patch('/:id', verifyToken, majSerie);

module.exports = router;