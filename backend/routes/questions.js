const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');

const TMDB_API_KEY = process.env.TMDB_API_KEY;


router.get('/addQuestions', async (req, res) => {
    await Question.deleteMany({});
    console.log('Cleared Question collection');

    const questions = [
        // Questions pour les films
        { type: 'films', question: 'Quel genre de films préférez-vous regarder?', options: ['Action', 'Comédie', 'Drame', 'Fantaisie'], tags: ['with_genres'] },
        { type: 'films', question: 'Quelle atmosphère de film recherchez-vous?', options: ['Suspense', 'Émotion', 'Aventure', 'Éducatif'], tags: ['with_keywords'] },
        { type: 'films', question: 'Quelle époque de film préférez-vous?', options: ['Films classiques', 'Films modernes', 'Films contemporains'], tags: ['primary_release_year'] },
        { type: 'films', question: 'Quelle durée de film préférez-vous?', options: ['Moins de 90 minutes', 'Entre 90 et 120 minutes', 'Plus de 120 minutes'], tags: ['with_runtime'] },
        { type: 'films', question: 'Préférez-vous les films avec beaucoup d\'effets spéciaux?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'films', question: 'Aimez-vous les films basés sur des histoires vraies?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'films', question: 'Quelle importance accordez-vous à la bande originale du film?', options: ['Très important', 'Pas important'], tags: ['with_keywords'] },
        { type: 'films', question: 'Préférez-vous les films en noir et blanc ou en couleur?', options: ['Noir et blanc', 'Couleur'], tags: ['with_keywords'] },
        { type: 'films', question: 'Quel type de fin de film préférez-vous?', options: ['Fin heureuse', 'Fin ouverte', 'Fin tragique'], tags: ['with_keywords'] },
        { type: 'films', question: 'Aimez-vous les films faisant partie d\'une franchise ou d\'une série?', options: ['Oui', 'Non'], tags: ['with_companies'] },
        { type: 'films', question: 'Préférez-vous les films avec des scènes d\'action intenses?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'films', question: 'Quel niveau de complexité narrative appréciez-vous dans un film?', options: ['Simple et direct', 'Complexe et réfléchi'], tags: ['with_keywords'] },
        { type: 'films', question: 'Aimez-vous les films qui traitent de voyage dans le temps?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'films', question: 'Qui est votre réalisateur préféré?', options: ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino'], tags: ['with_crew'] },
        { type: 'films', question: 'Aimez-vous les films avec des animaux comme personnages principaux?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        // Questions pour les séries
        { type: 'series', question: 'Quel genre de séries préférez-vous?', options: ['Thriller', 'Science-fiction', 'Documentaire', 'Comédie romantique'], tags: ['with_genres'] },
        { type: 'series', question: 'Combien de temps êtes-vous prêt à consacrer à une série?', options: ['Une série courte (1 saison)', 'Une série moyenne (2-5 saisons)', 'Une série longue (plus de 5 saisons)'], tags: ['with_number_of_seasons'] },
        { type: 'series', question: 'Préférez-vous les séries avec des épisodes autonomes ou une histoire continue?', options: ['Épisodes autonomes', 'Histoire continue'], tags: ['with_keywords'] },
        { type: 'series', question: 'Quel format d\'épisode préférez-vous?', options: ['Moins de 30 minutes', '30 à 60 minutes', 'Plus de 60 minutes'], tags: ['with_runtime'] },
        { type: 'series', question: 'Aimez-vous les séries qui utilisent beaucoup de flashbacks?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Préférez-vous les séries basées sur des livres?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Quelle importance accordez-vous au développement des personnages?', options: ['Très important', 'Pas important'], tags: ['with_keywords'] },
        { type: 'series', question: 'Aimez-vous les séries avec un casting international?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Préférez-vous les séries primées?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Aimez-vous les séries qui abordent des questions sociales?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Préférez-vous les séries avec beaucoup de dialogues ou plus d\'action?', options: ['Beaucoup de dialogues', 'Plus d\'action'], tags: ['with_keywords'] },
        { type: 'series', question: 'Aimez-vous les séries avec un point de vue unique ou multiple?', options: ['Point de vue unique', 'Points de vue multiples'], tags: ['with_keywords'] },
        { type: 'series', question: 'Qui est votre showrunner ou créateur de séries préféré?', options: ['Vince Gilligan', 'Shonda Rhimes', 'David Benioff & D.B. Weiss', 'Aaron Sorkin'], tags: ['with_crew'] },
        { type: 'series', question: 'Aimez-vous les séries qui ont des crossovers avec d\'autres séries?', options: ['Oui', 'Non'], tags: ['with_keywords'] },
        { type: 'series', question: 'Aimez-vous les séries qui incluent des éléments surnaturels ou fantastiques?', options: ['Oui', 'Non'], tags: ['with_keywords'] }
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
router.get('/:type/questions', async (req, res) => {
    const { type } = req.params;
    const validTypes = ['films', 'series']; // Define valid types
    const normalizedType = type.toLowerCase(); // Normalize the type to lower case

    if (!validTypes.includes(normalizedType)) {
        return res.status(400).json({ message: "Invalid type specified" });
    }

    try {
        const questions = await Question.find({ type: normalizedType }).limit(5);
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions for type:", normalizedType, error);
        res.status(500).json({ message: error.message });
    }
});



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};

router.post('/recommendations', async (req, res) => {
    console.log("Received answers:", req.body.answers);
    const { answers, type } = req.body;
    const tmdbType = type === 'film' ? 'movie' : 'tv';

    try {
        const recommendations = await fetchRecommendations(answers, tmdbType);
        res.status(200).json({ recommendations });
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        res.status(500).json({ message: error.message });
    }
});

async function fetchRecommendations(answers, tmdbType) {
    const queryParams = new URLSearchParams({
        include_adult: false,
        language: 'fr-FR'
    });

    // Supposons que answers est un tableau d'objets où chaque objet a une clé et une valeur correspondant aux paramètres de l'API
    answers.forEach(answer => {
        const key = Object.keys(answer)[0];
        const value = answer[key];
        queryParams.append(key, value);
    });

    const url = `https://api.themoviedb.org/3/discover/${tmdbType}?${queryParams.toString()}`;
    console.log("Requesting URL:", url);

    try {
        const response = await axios.get(url, options);
        let searchParamsSize = [...new Set(queryParams.keys())].length;
        while (response.data.results.length < 5 && searchParamsSize >= 0) {
            console.log(response.data);
            // Remove the last search parameter
            queryParams.delete([...new Set(queryParams.keys())][searchParamsSize - 1]);
            console.log("New query params:", queryParams);
            const url = `https://api.themoviedb.org/3/discover/${tmdbType}?${queryParams.toString()}`;
            const newResponse = await axios.get(url, options);
            response.data.results.push(...newResponse.data.results);
            searchParamsSize = [...new Set(queryParams.keys())].length;
        }

        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw new Error('TMDB API request failed: ' + error.message);
    }
}

module.exports = router;