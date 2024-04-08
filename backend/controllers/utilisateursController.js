const mongoose = require('mongoose');
const Utilisateur = require('../models/utilisateursModel');

// Création d'un utilisateur
const creerUtilisateur = async(req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe
        });
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Voir tous les utilisateurs
const obtenirUtilisateurs = async(req, res) => {
    try {
        const utilisateurs = await Utilisateur.find({}).sort({ createdAt: -1 });
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Voir un seul utilisateur
const obtenirUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findById(id);

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un utilisateur
const supprimerUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndDelete({ _id: id });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un utilisateur
const majUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, {...req.body }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un film ou une série à la watchlist d'un utilisateur
const ajouterAWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId, type } = req.body; // ID de TMDB et type (film ou série) à ajouter

    try {
        // Utilisez 'addToSet' pour éviter les doublons et ajouter seulement l'ID de TMDB
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $addToSet: { watchlist: { tmdbId, type, progress: 0 } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retirer un film ou une série de la watchlist d'un utilisateur
const retirerDeWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId } = req.body; // ID de TMDB du film ou de la série à retirer

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $pull: { watchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtenir la watchlist d'un utilisateur
const obtenirWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur

    try {
        const utilisateur = await Utilisateur.findById(id).populate('watchlist');
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour de la progression d'un élément dans la watchlist
const majpWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { tmdbId, progress } = req.body; // ID TMDB de l'élément et progression à mettre à jour

    try {
        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id, 'watchlist.tmdbId': tmdbId }, { $set: { 'watchlist.$.progress': progress } }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur ou élément de watchlist non trouvé" });
        }

        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    creerUtilisateur,
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur,
    ajouterAWatchlist,
    retirerDeWatchlist,
    obtenirWatchlist,
    majpWatchlist,
};