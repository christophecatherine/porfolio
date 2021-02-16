/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')

// Import de model
const Competence = require('../DB/models/Competence')

module.exports = {
    // Method Get
    getId: (req, res) => {
        res.render('competenceId')
    },
    get: (req, res) => {
        res.render('competence')
    },
    create: (req, res) => {
        console.log('Controller create competence')
        console.log(req.body)
        const b = req.body

        // On appel notre model (constructeur)
        Competence
        // On lui demande la function create
            .create({
            // On definit nos data pour la création de notre nouvelle compétences
            title: b.title,
            content: b.content,
            author: b.author

            // Notre callback de validation de la function create
        }, (err, data) => {
            // En cas d'err il nous log l'err
            if (err) console.log(err);
            // Compétence cree (avec le _id)
            console.log(data)

            // On redirige sur le controller admin (ou seront charger nos data)
            res.redirect('/admin')
        })
    }
}