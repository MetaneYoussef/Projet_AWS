const express = require('express');
const {
    creerUtilisateur,
    obtenirUtilisateurs,
    obtenirUtilisateur,
    supprimerUtilisateur,
    majUtilisateur,
    ajouterAWatchlist,
    retirerDeWatchlist,
    obtenirWatchlist
} = require('../controllers/utilisateursController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Routes pour la gestion des utilisateurs
router.post('/', creerUtilisateur); // Créer un nouvel utilisateur
router.get('/', obtenirUtilisateurs); // Obtenir tous les utilisateurs
router.get('/:id', obtenirUtilisateur); // Obtenir un utilisateur spécifique par ID
router.delete('/:id', verifyToken, supprimerUtilisateur); // Supprimer un utilisateur spécifique par ID
router.patch('/:id', verifyToken, majUtilisateur); // Mettre à jour un utilisateur spécifique par ID

// Routes pour la gestion de la watchlist avec le middleware d'authentification
router.patch('/:id/watchlist/ajouter', verifyToken, ajouterAWatchlist); // Ajouter un élément à la watchlist d'un utilisateur
router.patch('/:id/watchlist/retirer', verifyToken, retirerDeWatchlist); // Retirer un élément de la watchlist d'un utilisateur
router.get('/:id/watchlist', verifyToken, obtenirWatchlist); // Obtenir la watchlist d'un utilisateur

module.exports = router;