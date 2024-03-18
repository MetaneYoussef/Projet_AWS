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

const router = express.Router();

// Routes pour la gestion des utilisateurs
router.post('/', creerUtilisateur); // Créer un nouvel utilisateur
router.get('/', obtenirUtilisateurs); // Obtenir tous les utilisateurs
router.get('/:id', obtenirUtilisateur); // Obtenir un utilisateur spécifique par ID
router.delete('/:id', supprimerUtilisateur); // Supprimer un utilisateur spécifique par ID
router.patch('/:id', majUtilisateur); // Mettre à jour un utilisateur spécifique par ID

// Routes pour la gestion de la watchlist sans le middleware d'authentification
router.patch('/:id/watchlist/ajouter', ajouterAWatchlist); // Ajouter un élément à la watchlist d'un utilisateur
router.patch('/:id/watchlist/retirer', retirerDeWatchlist); // Retirer un élément de la watchlist d'un utilisateur
router.get('/:id/watchlist', obtenirWatchlist); // Obtenir la watchlist d'un utilisateur

module.exports = router;