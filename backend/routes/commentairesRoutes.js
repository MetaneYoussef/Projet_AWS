require('dotenv').config();
const express = require('express');
const router = express.Router();

const {
    ajouterCommentaire,
    supprimerCommentaire,
    consulterCommentairesDeMedia,
    likeCommentaire
} = require('../controllers/commentairesController');

const { verifyToken } = require('../middleware/authMiddleware');


router.post('/', ajouterCommentaire);
router.get('/:idmedia', consulterCommentairesDeMedia);
router.delete('/:idmedia/:id', supprimerCommentaire);
router.post('/like/:id', likeCommentaire);

module.exports = router;
