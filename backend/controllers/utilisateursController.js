const mongoose = require('mongoose');
const Utilisateur = require('../models/utilisateursModel');

// creation d'un utilisateur
const creerUtilisateur = async (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateur.create({ nom, prenom, email, mot_de_passe });
        res.status(200).json(utilisateur)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// voir tous les utilisateur
const obtenirUtilisateurs = async (req, res) => {
    const utilisateurs = await Utilisateur.find({}).sort({ createdAt: -1 })
    res.status(200).json(utilisateurs)
}


//voir un seul utilisateur
const obtenirUtilisateur = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }

    const utilisateur = await Utilisateur.findById(id)

    if (!utilisateur) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }
    res.status(200).json(utilisateur)

}



//suppression d'un utilisateur
const supprimerUtilisateur = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }

    const utilisateur = await Utilisateur.findOneAndDelete({ _id: id })

    if (!utilisateur) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }

    res.status(200).json(utilisateur)
}

const majUtilisateur = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }

    const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!utilisateur) {
        return res.status(400).json({ error: 'Cet utilisteur n\'existe pas' })
    }

    res.status(200).json(utilisateur)
}

module.exports = {
    creerUtilisateur,
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur
}