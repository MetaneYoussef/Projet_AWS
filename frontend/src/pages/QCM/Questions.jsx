// questions.js
const questions = [
  {
    questionText: "Quel genre de films préférez-vous ?",
    answerOptions: [
      { answerText: "Action", genre: "action" },
      { answerText: "Comédie", genre: "comedy" },
      { answerText: "Drame", genre: "drama" },
      { answerText: "Fantastique", genre: "fantasy" },
    ],
  },

  {
    questionText: "Quelle ambiance recherchez-vous dans un film ?",
    answerOptions: [
      { answerText: "Inspirante et motivante", mood: "inspiring" },
      { answerText: "Sombre et mystérieuse", mood: "dark" },
      { answerText: "Légère et amusante", mood: "light" },
      { answerText: "Romantique et émouvante", mood: "romantic" },
    ],
  },
  {
    questionText: "Quelle importance accordez-vous à la bande-son d'un film ?",
    answerOptions: [
      { answerText: "Primordiale, elle fait le film", importance: "high" },
      { answerText: "Importante, mais pas essentielle", importance: "medium" },
      { answerText: "Peu importe, tant que l'histoire est bonne", importance: "low" },
    ],
  },
  {
    questionText: "Dans quel cadre préférez-vous que l'histoire se déroule ?",
    answerOptions: [
      { answerText: "Dans le futur ou l'espace", setting: "future_space" },
      { answerText: "Dans le passé historique", setting: "historical" },
      { answerText: "Dans le monde réel et contemporain", setting: "real_world" },
      { answerText: "Dans un univers fantastique ou magique", setting: "fantasy_magic" },
    ],
  },
  {
    questionText: "Quel type de protagoniste préférez-vous dans les films ?",
    answerOptions: [
      { answerText: "Un héros parfait, sans faille", protagonist: "flawless_hero" },
      { answerText: "Un anti-héros complexe avec des défauts", protagonist: "flawed_hero" },
      { answerText: "Un personnage ordinaire dans des circonstances extraordinaires", protagonist: "ordinary_person" },
      { answerText: "Un ensemble de personnages avec des histoires entrelacées", protagonist: "ensemble_cast" },
    ],
  },
  {
    questionText: "Quelle durée de film préférez-vous ?",
    answerOptions: [
      { answerText: "Moins de 90 minutes", duration: "short" },
      { answerText: "Entre 90 et 120 minutes", duration: "medium" },
      { answerText: "Plus de 120 minutes", duration: "long" },
    ],
  },
  {
    questionText: "Quel est votre niveau de tolérance aux scènes intenses ou effrayantes ?",
    answerOptions: [
      { answerText: "Élevé, plus c'est intense, mieux c'est", tolerance: "high" },
      { answerText: "Modéré, cela dépend du contexte du film", tolerance: "medium" },
      { answerText: "Faible, je préfère les films sans scènes effrayantes", tolerance: "low" },
    ],
  },
  {
    questionText: "Préférez-vous les films avec une fin heureuse ou ouverte à interprétation ?",
    answerOptions: [
      { answerText: "J'aime les fins heureuses qui concluent l'histoire", ending: "happy" },
      { answerText: "Je préfère les fins ouvertes qui me laissent penser", ending: "open" },
    ],
  },
  {
    questionText: "Comment préférez-vous regarder des films ?",
    answerOptions: [
      { answerText: "Seul(e), pour me plonger totalement dans l'expérience", watchingPreference: "alone" },
      { answerText: "Avec des amis ou la famille, pour partager le moment", watchingPreference: "with_others" },
    ],
  },
  {
    questionText: "Quel rôle joue l'humour dans les films que vous regardez ?",
    answerOptions: [
      { answerText: "J'adore les films qui me font rire", humorImportance: "important" },
      { answerText: "C'est agréable, mais pas nécessaire", humorImportance: "moderate" },
      { answerText: "Je préfère les films sérieux sans humour", humorImportance: "low" },
    ],
  }
  // Ajoutez d'autres questions ici
];

export default questions;
