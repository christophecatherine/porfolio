/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')
// Import de model
const Presentation = require('../DB/models/Presentation')

module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('presentationId')
    },


    //Method post
    post: (req, res) => {

    },


    //Method create(post)
    create: (req, res) => {
        console.log('Controller create presentation')
        console.log(req.body)
        const c = req.body

        // On appel notre model (constructeur)
        Presentation
        // On lui demande la function create
            .create({
            // On definit nos data pour la création de notre nouvelle compétences
            title: c.title,


            // Notre callback de validation de la function create
        }, (err, data) => {
            // En cas d'err il nous log l'err
            if (err) console.log(err);
            // Compétence cree (avec le _id)
            console.log(data)

            // On redirige sur le controller admin (ou seront charger nos data)
            res.redirect('/admin')
        })
    },

}