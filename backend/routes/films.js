const express = require('express')
const {
    creerFilm,
    obtenirFilm,
    obtenirFilms,
    supprimerFilm,
    majFilm
} = require('../controllers/filmsComtroller')
const router = express.Router()

router.post('/', creerFilm)
router.get('/:id', obtenirFilm)
router.get('/', obtenirFilms)
router.delete('/:id', supprimerFilm)
router.patch('/:id', majFilm)

module.exports = router