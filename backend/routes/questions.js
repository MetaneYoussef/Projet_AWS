const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Route initiale pour choisir entre film et série
router.get('/initial', (req, res) => {
    res.json({
        question: "Préférez-vous regarder un film ou une série?",
        options: ["film", "série"]
    });
});

// Route pour récupérer des questions aléatoires basées sur le type (film ou série)
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

// Route pour envoyer des recommandations basées sur les réponses de l'utilisateur
router.post('/recommendations', async(req, res) => {
    const { answers, type } = req.body; // Assurez-vous que 'answers' est un objet avec des clés correspondant aux 'tags' des questions
    try {
        const recommendations = await fetchRecommendationsBasedOnAnswers(answers, type);
        res.json({ recommendations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fonction pour interroger l'API TMDB
async function fetchRecommendationsBasedOnAnswers(answers, type) {
    try {
        const queryParams = answers.map(answer => {
            // Construire chaque partie de la requête pour TMDB basée sur les réponses
            // Ici, il faut un mapping entre les tags des questions et les paramètres de TMDB
            const key = Object.keys(answer)[0];
            const value = answer[key];
            return `${key}=${encodeURIComponent(value)}`;
        }).join('&');

        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&language=fr-FR&${queryParams}`;
        const response = await axios.get(url);
        return response.data.results; // Renvoie les films ou séries recommandés
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw new Error('TMDB API request failed');
    }
}


module.exports = router;