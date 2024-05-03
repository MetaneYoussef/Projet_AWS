const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');

const TMDB_API_KEY = process.env.TMDB_API_KEY;


router.get('/addQuestions', async(req, res) => {
    await Question.deleteMany({});
    console.log('Cleared Question collection');

    const questions = [
        // Questions pour les films avec tags
        { type: 'film', question: 'Quel genre de films préférez-vous regarder ?', options: ['Action', 'Comédie', 'Drame', 'Fantastique'], tags: ['genre_ids'] },
        { type: 'film', question: 'Quelle ambiance de film recherchez-vous ?', options: ['Suspense', 'Émotion', 'Aventure', 'Éducatif'], tags: ['keywords'] },
        { type: 'film', question: 'Quelle période de films aimez-vous le plus ?', options: ['Films classiques', 'Films modernes', 'Films contemporains'], tags: ['release_date'] },
        { type: 'film', question: 'Quelle durée de film préférez-vous ?', options: ['Moins de 90 minutes', 'Entre 90 et 120 minutes', 'Plus de 120 minutes'], tags: ['with_runtime'] },
        { type: 'film', question: 'Préférez-vous les films avec de nombreux effets spéciaux ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'film', question: 'Aimez-vous les films basés sur des histoires vraies ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'film', question: "Quelle importance accordez-vous à la bande-son d'un film ?", options: ['Très important', 'Peu important'], tags: ['keywords'] },
        { type: 'film', question: 'Préférez-vous les films en noir et blanc ou en couleur ?', options: ['Noir et blanc', 'Couleur'], tags: ['keywords'] },
        { type: 'film', question: 'Quel type de fin préférez-vous dans un film ?', options: ['Fin heureuse', 'Fin ouverte', 'Fin tragique'], tags: ['keywords'] },
        { type: 'film', question: "Aimez-vous les films qui font partie d'une franchise ou série ?", options: ['Oui', 'Non'], tags: ['with_companies'] },
        { type: 'film', question: "Préférez-vous les films avec des scènes d'action intenses ?", options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'film', question: 'Quel niveau de complexité narrative appréciez-vous dans un film ?', options: ['Simple et direct', 'Complexe et réfléchi'], tags: ['keywords'] },
        { type: 'film', question: 'Aimez-vous les films qui traitent de voyages dans le temps ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'film', question: 'Quel est votre réalisateur préféré ?', options: ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino'], tags: ['with_crew'] },
        { type: 'film', question: 'Aimez-vous les films avec des animaux comme personnages principaux ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        // Questions pour les séries avec tags
        { type: 'série', question: 'Quel genre de séries préférez-vous ?', options: ['Thriller', 'Science-fiction', 'Documentaire', 'Comédie romantique'], tags: ['genre_ids'] },
        { type: 'série', question: 'Combien de temps êtes-vous prêt à consacrer à une série ?', options: ['Une série courte (1 saison)', 'Une série de longueur moyenne (2-5 saisons)', 'Une longue série (plus de 5 saisons)'], tags: ['number_of_seasons'] },
        { type: 'série', question: 'Préférez-vous les séries avec des épisodes stand-alone ou une histoire continue ?', options: ['Épisodes stand-alone', 'Histoire continue'], tags: ['keywords'] },
        { type: 'série', question: "Quel est votre format d'épisode préféré ?", options: ['Moins de 30 minutes', '30 à 60 minutes', 'Plus de 60 minutes'], tags: ['with_runtime'] },
        { type: 'série', question: 'Aimez-vous les séries qui utilisent beaucoup de flashbacks ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: 'Préférez-vous les séries basées sur des livres ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: 'Quelle importance accordez-vous au développement des personnages ?', options: ['Très important', 'Peu important'], tags: ['keywords'] },
        { type: 'série', question: 'Aimez-vous les séries avec un casting international ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: 'Préférez-vous les séries primées ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: 'Aimez-vous les séries qui abordent des questions sociales ?', options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: "Préférez-vous les séries avec beaucoup de dialogues ou plus d'action ?", options: ['Beaucoup de dialogues', "Plus d'action"], tags: ['keywords'] },
        { type: 'série', question: 'Aimez-vous les séries avec un point de vue unique ou multiple ?', options: ['Point de vue unique', 'Point de vue multiple'], tags: ['keywords'] },
        { type: 'série', question: 'Quel est votre showrunner ou créateur de série préféré ?', options: ['Vince Gilligan', 'Shonda Rhimes', 'David Benioff & D.B. Weiss', 'Aaron Sorkin'], tags: ['with_crew'] },
        { type: 'série', question: "Aimez-vous les séries qui ont des crossovers avec d'autres séries ?", options: ['Oui', 'Non'], tags: ['keywords'] },
        { type: 'série', question: 'Aimez-vous les séries qui incluent des éléments surnaturels ou fantastiques ?', options: ['Oui', 'Non'], tags: ['keywords'] }
    ];

    await Question.insertMany(questions);
    console.log('Questions inserted successfully!');
    res.json({
        msg: "ok"

    });
});

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