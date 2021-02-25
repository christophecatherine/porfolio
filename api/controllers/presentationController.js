/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')
// Import de model
const Presentation = require('../DB/models/Presentation')

module.exports = {


    //Method get
    get: (req, res) => {
        // res.render('presentation')
        Presentation
            .find()
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },


    // Method GetId
    getId: (req, res) => {
        // res.render('presentationId')
        console.log(req.params)
        Presentation
            .findById(req.params.id)
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
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
                // res.redirect('/admin')
                res.json(data)
            })
    },

    // Method put 
    editOne: (req, res) => {
        const c = req.body
        console.log('BODY', c)
        console.log('PARAMS: ', req.params)

        Presentation
            .findByIdAndUpdate(req.params.id, {
                title: c.title
            }, (err, data) => {
                if (err) console.log(err)
                res.json(data)
            })
    },
    // Method delete one 
    deleteOne: (req, res) => {
        console.log(req)
        presentation
            .deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)

                _id: req.params.id

            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console;
                // Sinon on renvoit l'err
                log(err)
                res.json({
                    succes: req.params.id + '// à bien été supprimer'
                })
            })
    }
}