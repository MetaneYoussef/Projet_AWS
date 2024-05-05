const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');

const TMDB_API_KEY = process.env.TMDB_API_KEY;


router.get('/addQuestions', async(req, res) => {
    await Question.deleteMany({});
    console.log('Cleared Question collection');

    const questions =
        // Questions pour les films avec tags
        [
            { type: 'film', question: 'What genre of movies do you prefer to watch?', options: ['Action', 'Comedy', 'Drama', 'Fantasy'], tags: ['with_genres'] },
            { type: 'film', question: 'What movie atmosphere are you looking for?', options: ['Suspense', 'Emotion', 'Adventure', 'Educational'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Which movie era do you like the most?', options: ['Classic films', 'Modern films', 'Contemporary films'], tags: ['primary_release_year'] }, // Requires year conversion
            { type: 'film', question: 'What movie duration do you prefer?', options: ['Less than 90 minutes', 'Between 90 and 120 minutes', 'More than 120 minutes'], tags: ['with_runtime'] },
            { type: 'film', question: 'Do you prefer movies with many special effects?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Do you like movies based on true stories?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'How important is the movie soundtrack to you?', options: ['Very important', 'Not important'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Do you prefer black and white or color movies?', options: ['Black and white', 'Color'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'What type of movie ending do you prefer?', options: ['Happy ending', 'Open ending', 'Tragic ending'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Do you like movies that are part of a franchise or series?', options: ['Yes', 'No'], tags: ['with_companies'] },
            { type: 'film', question: 'Do you prefer movies with intense action scenes?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'What level of narrative complexity do you appreciate in a movie?', options: ['Simple and direct', 'Complex and thoughtful'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Do you like movies that deal with time travel?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'film', question: 'Who is your favorite director?', options: ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino'], tags: ['with_crew'] }, // Requires crew IDs
            { type: 'film', question: 'Do you like movies with animals as main characters?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            // Questions for series with corrected tags
            { type: 'series', question: 'What genre of series do you prefer?', options: ['Thriller', 'Science-fiction', 'Documentary', 'Romantic Comedy'], tags: ['with_genres'] },
            { type: 'series', question: 'How much time are you willing to dedicate to a series?', options: ['A short series (1 season)', 'A medium-length series (2-5 seasons)', 'A long series (more than 5 seasons)'], tags: ['with_number_of_seasons'] },
            { type: 'series', question: 'Do you prefer series with stand-alone episodes or a continuous story?', options: ['Stand-alone episodes', 'Continuous story'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'What is your preferred episode format?', options: ['Less than 30 minutes', '30 to 60 minutes', 'More than 60 minutes'], tags: ['with_runtime'] },
            { type: 'series', question: 'Do you like series that use a lot of flashbacks?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you prefer series based on books?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'How important is character development to you?', options: ['Very important', 'Not important'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you like series with an international cast?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you prefer award-winning series?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you like series that address social issues?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you prefer series with a lot of dialogue or more action?', options: ['A lot of dialogue', 'More action'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you like series with a unique or multiple viewpoints?', options: ['Unique viewpoint', 'Multiple viewpoints'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Who is your favorite showrunner or series creator?', options: ['Vince Gilligan', 'Shonda Rhimes', 'David Benioff & D.B. Weiss', 'Aaron Sorkin'], tags: ['with_crew'] }, // Requires crew IDs
            { type: 'series', question: 'Do you like series that have crossovers with other series?', options: ['Yes', 'No'], tags: ['with_keywords'] }, // Requires keyword IDs
            { type: 'series', question: 'Do you like series that include supernatural or fantastic elements?', options: ['Yes', 'No'], tags: ['with_keywords'] } // Requires keyword IDs
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
router.get('/:type/questions', async(req, res) => {
    console.log("Received type:", req.params.type); // Cela devrait afficher 'film' ou 'série'
    const { type } = req.params; // 'film' ou 'série'
    let questionType = type === 'film' ? 'film' : 'series'; // Adapter le type de question

    try {
        const questions = await Question.find({ type: questionType }); // Utiliser find pour récupérer toutes les questions pertinentes
        console.log("Questions:", questions); // Cela devrait afficher un tableau de questions
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/recommendations', async(req, res) => {
    console.log("Received answers:", req.body.answers); // Cela devrait montrer exactement ce que vous recevez.
    const { answers, type } = req.body;
    const tmdbType = type === 'film' ? 'movie' : 'tv';

    try {
        const recommendations = await fetchRecommendations(answers, tmdbType);
        res.json({ recommendations });
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        res.status(500).json({ message: error.message });
    }
});

async function fetchRecommendations(answers, tmdbType) {
    const queryParams = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: 'fr-FR'
    });

    // Supposons que answers est un tableau d'objets où chaque objet a une clé et une valeur correspondant aux paramètres de l'API
    answers.forEach(answer => {
        const key = Object.keys(answer)[0]; // la clé du paramètre
        const value = answer[key]; // la valeur du paramètre
        queryParams.append(key, value);
    });

    const url = `https://api.themoviedb.org/3/discover/${tmdbType}?${queryParams.toString()}`;
    console.log("Requesting URL:", url); // Affichez l'URL pour vérifier si elle est correcte

    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        throw new Error('TMDB API request failed: ' + error.message);
    }
}

module.exports = router;