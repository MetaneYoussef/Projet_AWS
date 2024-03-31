const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Assurez-vous que le chemin est correct

const {
    creerActeur,
    obtenirActeurs,
    obtenirActeur,
    supprimerActeur,
    majActeur
} = require('../controllers/acteursController');

// Appliquer le middleware d'authentification aux routes protégées
router.post('/', verifyToken, creerActeur);
router.get('/:id', obtenirActeur); // Cette route reste publique
router.get('/', obtenirActeurs); // Cette route reste publique
router.delete('/:id', verifyToken, supprimerActeur);
router.patch('/:id', verifyToken, majActeur);

module.exports = router;