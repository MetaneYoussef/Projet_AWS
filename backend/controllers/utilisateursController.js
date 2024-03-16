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

// Ajouter un film à la watchlist d'un utilisateur
const ajouterAWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { filmId } = req.body; // ID du film à ajouter

    try {
        // Utilisez 'addToSet' pour éviter les doublons
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, { $addToSet: { watchlist: filmId } }, { new: true }).populate('watchlist');

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retirer un film de la watchlist d'un utilisateur
const retirerDeWatchlist = async(req, res) => {
    const { id } = req.params; // ID de l'utilisateur
    const { filmId } = req.body; // ID du film à retirer

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, { $pull: { watchlist: filmId } }, { new: true }).populate('watchlist');

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

module.exports = {
    creerUtilisateur,
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur,
    ajouterAWatchlist,
    retirerDeWatchlist,
    obtenirWatchlist
};