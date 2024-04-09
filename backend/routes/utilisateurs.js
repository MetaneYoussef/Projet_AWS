const express = require('express');
const {
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

// Nouvelle route pour la mise à jour de la progression d'un élément dans la watchlist d'un utilisateur
router.patch('/:id/watchlist/majp', verifyToken, majpWatchlist);

router.get('/:id/recommandations', verifyToken, obtenirRecommandations);




module.exports = router;