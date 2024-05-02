const express = require('express');
const router = express.Router();
const Question = require('../models/Question');


router.get('/initial', (req, res) => {
    res.json({
        question: "Préférez-vous regarder un film ou une série?",
        options: ["film", "série"]
    });
});


router.get('/:type', async(req, res) => {
    const { type } = req.params;
    try {
        const questions = await Question.aggregate([
            { $match: { type: type } },
            { $sample: { size: 5 } }
        ]);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/recommendations', async(req, res) => {
    const { answers } = req.body;
    res.json({ recommendations: "Voici vos recommandations basées sur vos réponses..." });
});

module.exports = router;