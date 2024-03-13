const mongoose = require('mongoose');
const Acteur = require('../models/acteurModel');
const Serie = require('../models/serieModel');

const creerSerie = async (req, res) => {

    const series = req.body;
    for (let i = 0; i < series.saison.length; i++) {
        if (series.saison[i].acteurs) {
            let idActeurs = [];
            for (let acteur of series.saison[i].acteurs) {
                const idActeur = await Acteur.findOne({ nom: acteur })
                if (!idActeur) {
                    return res.status(400).json({ error: "l'acteur " + acteur + " n'existe pas" });
                }
                if (idActeur) {
                    idActeurs.push(idActeur._id);
                }
            }
            series.saison[i].acteurs = idActeurs;
        }
    }


    try {
        const serie = await Serie.create(series);
        res.status(200).json(serie)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const convertirActeursIdEnActeur = async (saison) => {
    saison = saison.toObject();
    if (saison.acteurs) {

        let Acteurs = [];

        for (let idActeur of saison.acteurs) {
            let accteur = await Acteur.findById(idActeur);

            if (!accteur) {
                saison.acteurs = saison.acteurs.filter((element => element !== idActeur))
            } else if (accteur) {
                Acteurs.push(accteur.nom)
            }

        }
        console.log(Acteurs) // output :[ 'Leo leo', 'meme' ]
        console.log(saison.acteurs) // output :[new ObjectId('65f0df030540c1bf06f84815'),new ObjectId('65f0df2e0540c1bf06f84817')]
        saison.acteurs = [...Acteurs];
        console.log(Acteurs) // output :[ 'Leo leo', 'meme' ]
        console.log(saison.acteurs) //  output :[new ObjectId('65f0df030540c1bf06f84815'),new ObjectId('65f0df2e0540c1bf06f84817')]
    }
    return saison;
}



const obtenirSerie = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet Serie n\'existe pas' })
    }

    let serie = await Serie.findById(id);

    if (!serie) {
        return res.status(400).json({ error: 'Cet Serie n\'existe pas' })
    }
    // serie.toObject();
    // for (let i = 0; i < serie.saison.length; i++) {
    //     serie.saison[i] = await convertirActeursIdEnActeur(serie.saison[i]);
    // }

    res.status(200).json(serie)
}

const obtenirSeries = async (req, res) => {
    let Series = await Serie.find({}).sort({ createdAt: -1 })
    // for (let i = 0; i < Series.length; i++) {

    //     Films[i] = await convertirActeursIdEnActeur(Serie[i]);
    //     output.push(Films[i])
    // }
    res.status(200).json(Series)
}
const supprimerSerie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    const serie = await Serie.findOneAndDelete({ _id: id })

    if (!serie) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    res.status(200).json(serie)
}
const majSerie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    let serie = await Serie.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    serie = await Serie.findById(id);
    if (!serie) {
        return res.status(400).json({ error: 'Cet serie n\'existe pas' })
    }

    res.status(200).json(serie)
}

module.exports = {
    creerSerie,
    obtenirSerie,
    obtenirSeries,
    supprimerSerie,
    majSerie
}