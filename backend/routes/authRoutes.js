const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Utilisateurs = require('../models/utilisateursModel'); // Assurez-vous que le chemin est correct

// Inscription
router.post('/signup', [
    check('nom', 'Le nom est requis').not().isEmpty(),
    check('prenom', 'Le prénom est requis').not().isEmpty(),
    check('email', 'Veuillez fournir un email valide').isEmail(),
    check('mot_de_passe', 'Le mot de passe doit comporter 6 caractères ou plus').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, mot_de_passe } = req.body;

        // Vérifier si l'utilisateur existe déjà
        let utilisateur = await Utilisateurs.findOne({ email });
        if (utilisateur) {
            return res.status(400).json({ msg: 'Un utilisateur existe déjà avec cet email' });
        }

        console.log(email);
        console.log(mot_de_passe);

        // Création de l'utilisateur
        utilisateur = new Utilisateurs({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mot_de_passe: mot_de_passe,
        });

        await utilisateur.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
});

// Connexion
router.post('/login', [
    check('email', 'Veuillez fournir un email valide').isEmail(),
    check('mot_de_passe', 'Le mot de passe est requis').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, mot_de_passe } = req.body;

    try {
        // Trouver l'utilisateur par email

        const utilisateur = await Utilisateurs.findOne({ email: email });

        if (!utilisateur) {
            return res.status(400).json({ msg: 'Identifiants invalides' });
        }

        // Vérification du mot de passe avec la méthode définie dans le modèle utilisateur
        console.log(email);
        console.log(mot_de_passe);
        console.log(utilisateur.mot_de_passe);

        bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, function(err, result) {
            if (err) {
                res.json({
                    error: err
                })
            }
            if (result) {

                const payload = {
                    utilisateur: {
                        id: utilisateur._id
                    }
                };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET, { expiresIn: '1h' },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );

            } else {
                return res.status(400).json({ msg: 'mote de passe invalides.' });
            }
        })

    } catch (error) {
        console.error('Erreur serveur lors de la tentative de connexion:', error.message);
        res.status(500).send('Erreur serveur');
    }
});


module.exports = router;