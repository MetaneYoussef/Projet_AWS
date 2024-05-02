const mongoose = require('mongoose');
const Question = require('./models/Question');

async function seedQuestions() {
    try {
        await mongoose.connect(process.env.DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        await Question.deleteMany({});
        console.log('Cleared Question collection');

        const questions = [
            // Questions pour les films
            { type: 'film', question: 'Quel genre de films préférez-vous regarder ?', options: ['Action', 'Comédie', 'Drame', 'Fantastique'] },
            { type: 'film', question: 'Quelle ambiance de film recherchez-vous ?', options: ['Suspense', 'Émotion', 'Aventure', 'Éducatif'] },
            { type: 'film', question: 'Quelle période de films aimez-vous le plus ?', options: ['Films classiques', 'Films modernes', 'Films contemporains'] },
            { type: 'film', question: 'Quelle durée de film préférez-vous ?', options: ['Moins de 90 minutes', 'Entre 90 et 120 minutes', 'Plus de 120 minutes'] },
            { type: 'film', question: 'Préférez-vous les films avec de nombreux effets spéciaux ?', options: ['Oui', 'Non'] },
            { type: 'film', question: 'Aimez-vous les films basés sur des histoires vraies ?', options: ['Oui', 'Non'] },
            { type: 'film', question: "Quelle importance accordez-vous à la bande-son d'un film ?", options: ['Très important', 'Peu important'] },
            { type: 'film', question: 'Préférez-vous les films en noir et blanc ou en couleur ?', options: ['Noir et blanc', 'Couleur'] },
            { type: 'film', question: 'Quel type de fin préférez-vous dans un film ?', options: ['Fin heureuse', 'Fin ouverte', 'Fin tragique'] },
            { type: 'film', question: "Aimez-vous les films qui font partie d'une franchise ou série ?", options: ['Oui', 'Non'] },
            { type: 'film', question: "Préférez-vous les films avec des scènes d'action intenses ?", options: ['Oui', 'Non'] },
            { type: 'film', question: 'Quel niveau de complexité narrative appréciez-vous dans un film ?', options: ['Simple et direct', 'Complexe et réfléchi'] },
            { type: 'film', question: 'Aimez-vous les films qui traitent de voyages dans le temps ?', options: ['Oui', 'Non'] },
            { type: 'film', question: 'Quel est votre réalisateur préféré ?', options: ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino'] },
            { type: 'film', question: 'Aimez-vous les films avec des animaux comme personnages principaux ?', options: ['Oui', 'Non'] },

            // Questions pour les séries
            { type: 'série', question: 'Quel genre de séries préférez-vous ?', options: ['Thriller', 'Science-fiction', 'Documentaire', 'Comédie romantique'] },
            { type: 'série', question: 'Combien de temps êtes-vous prêt à consacrer à une série ?', options: ['Une série courte (1 saison)', 'Une série de longueur moyenne (2-5 saisons)', 'Une longue série (plus de 5 saisons)'] },
            { type: 'série', question: 'Préférez-vous les séries avec des épisodes stand-alone ou une histoire continue ?', options: ['Épisodes stand-alone', 'Histoire continue'] },
            { type: 'série', question: "Quel est votre format d'épisode préféré ?", options: ['Moins de 30 minutes', '30 à 60 minutes', 'Plus de 60 minutes'] },
            { type: 'série', question: 'Aimez-vous les séries qui utilisent beaucoup de flashbacks ?', options: ['Oui', 'Non'] },
            { type: 'série', question: 'Préférez-vous les séries basées sur des livres ?', options: ['Oui', 'Non'] },
            { type: 'série', question: 'Quelle importance accordez-vous au développement des personnages ?', options: ['Très important', 'Peu important'] },
            { type: 'série', question: 'Aimez-vous les séries avec un casting international ?', options: ['Oui', 'Non'] },
            { type: 'série', question: 'Préférez-vous les séries primées ?', options: ['Oui', 'Non'] },
            { type: 'série', question: 'Aimez-vous les séries qui abordent des questions sociales ?', options: ['Oui', 'Non'] },
            { type: 'série', question: 'Préférez-vous les séries avec beaucoup de dialogues ou plus d\'action ?', options: ['Beaucoup de dialogues', 'Plus d\'action'] },
            { type: 'série', question: 'Aimez-vous les séries avec un point de vue unique ou multiple ?', options: ['Point de vue unique', 'Point de vue multiple'] },
            { type: 'série', question: 'Quel est votre showrunner ou créateur de série préféré ?', options: ['Vince Gilligan', 'Shonda Rhimes', 'David Benioff & D.B. Weiss', 'Aaron Sorkin'] },
            { type: 'série', question: "Aimez-vous les séries qui ont des crossovers avec d'autres séries ?", options: ['Oui', 'Non'] },
            { type: 'série', question: 'Aimez-vous les séries qui incluent des éléments surnaturels ou fantastiques ?', options: ['Oui', 'Non'] }
        ];


        await Question.insertMany(questions);
        console.log('Questions inserted successfully!');
    } catch (error) {
        console.error('Failed to insert questions:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

seedQuestions();