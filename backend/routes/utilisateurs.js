const express = require('express')
const {
    creerUtilisateur,
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur
} = require('../controllers/utilisateursController');

const router = express.Router()

router.post('/', creerUtilisateur)
router.get('/:id', obtenirUtilisateur)
router.get('/', obtenirUtilisateurs)
router.delete('/:id', supprimerUtilisateur)
router.patch('/:id', majUtilisateur)

module.exports = router