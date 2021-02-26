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
        console.log('fgfreg')
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
            .populate('comment')
            .lean()
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

        console.log('BODY', req.body)
        console.log('PARAMS: ', req.params)

        Presentation
            .updateOne({
                _id: req.params.id
            }, {
                title: req.body.title
            }, (err, data) => {
                if (err) console.log(err)
                res.json(data)
            })
    },

    // Method delete one 
    deleteOne: (req, res) => {
        console.log(req)

        Presentation
            .deleteOne({

                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id

            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console.log(err)
                    // Sinon on renvoit l'err

                res.json({
                    succes: req.params.id + '// à bien été supprimer'
                })
            })
    }
}