const express = require('express')
const {
    creerSerie,
    obtenirSerie,
    obtenirSeries,
    supprimerSerie,
    majSerie
} = require('../controllers/seriesController')
const router = express.Router()

router.post('/', creerSerie)
router.get('/:id', obtenirSerie)
router.get('/', obtenirSeries)
router.delete('/:id', supprimerSerie)
router.patch('/:id', majSerie)


module.exports = router