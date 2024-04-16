const mongoose = require('mongoose');
const Utilisateur = require('../models/utilisateursModel');

const obtenirUtilisateurs = async(req, res) => {
    try {
        const utilisateurs = await Utilisateur.find({}).sort({ createdAt: -1 });
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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


module.exports = {
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur
};