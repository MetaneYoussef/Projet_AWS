require('dotenv').config();

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('./config/winston');
const rateLimit = require('./utils/rateLimit');
const errorHandler = require('./middleware/errorMiddleware');
const verifyToken = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const utilisateursRoutes = require('./routes/utilisateurs');
const filmsRoutes = require('./routes/films');
const acteursRoutes = require('./routes/acteurs');
const seriesRoutes = require('./routes/series');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Sécurité de base avec Helmet et CORS
app.use(helmet());
app.use(cors());

// Logging des requêtes HTTP avec Morgan et Winston
app.use(morgan('combined', { stream: { write: (message) => winston.info(message.trim()) } }));

// Limite le taux de requêtes pour prévenir les attaques DDoS ou de force brute
app.use(rateLimit);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.use('/api/authRoutes', authRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/films', filmsRoutes);
app.use('/api/acteurs', acteursRoutes);
app.use('/api/series', seriesRoutes);

// Integration de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Gestion globale des erreurs
app.use(errorHandler);

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        // Utilisation de HTTP plutôt que HTTPS pour le moment
        app.listen(process.env.PORT || 4000, () => {
            console.log(`HTTP Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((err) => winston.error(err.message));