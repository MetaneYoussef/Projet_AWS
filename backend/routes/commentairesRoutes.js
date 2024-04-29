require('dotenv').config();
const express = require('express');
const router = express.Router();

const {
    ajouterCommentaire,
    supprimerCommentaire,
    consulterCommentairesDeMedia,
} = require('../controllers/commentairesController');

const { verifyToken, adminOnly, userOnly } = require('../middleware/authMiddleware');


router.post('/', verifyToken, userOnly, ajouterCommentaire);
router.get('/:idmedia', verifyToken, userOnly, consulterCommentairesDeMedia);
router.delete('/:idmedia/:id', verifyToken, adminOnly, supprimerCommentaire);

module.exports = router;