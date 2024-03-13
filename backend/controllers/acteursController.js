const mongoose = require('mongoose');
const Acteur = require('../models/acteurModel');


const creerActeur = async (req, res) => {
    const actor = req.body;

    try {
        const acteur = await Acteur.create(actor);
        res.status(200).json(acteur)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// voir tous les acteurs
const obtenirActeurs = async (req, res) => {
    const acteur = await Acteur.find({}).sort({ createdAt: -1 })
    res.status(200).json(acteur)
}

//voir un seul acteur
const obtenirActeur = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet Acteur n\'existe pas' })
    }

    const acteur = await Acteur.findById(id)

    if (!acteur) {
        return res.status(400).json({ error: 'Cet Acteur n\'existe pas' })
    }
    res.status(200).json(acteur)

}


//suppression d'un acteur
const supprimerActeur = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet acteur n\'existe pas' })
    }

    const acteur = await Acteur.findOneAndDelete({ _id: id })

    if (!acteur) {
        return res.status(400).json({ error: 'Cet acteur n\'existe pas' })
    }

    res.status(200).json(acteur)
}

// modification d'un acteur
const majActeur = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet acteur n\'existe pas' })
    }

    const acteur = await Acteur.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!acteur) {
        return res.status(400).json({ error: 'Cet acteur n\'existe pas' })
    }

    res.status(200).json(acteur)
}

module.exports = {
    creerActeur,
    obtenirActeurs,
    supprimerActeur,
    obtenirActeur,
    majActeur
}