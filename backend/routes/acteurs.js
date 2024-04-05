const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Assurez-vous que le chemin est correct

const {
    getActor,
    searchActor
} = require('../controllers/acteursController');

router.get('/search', searchActor); // Cette route reste publique
router.get('/:id', getActor); // Cette route reste publique


module.exports = router;