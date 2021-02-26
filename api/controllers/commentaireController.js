/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')

// Import de model
const Presentation = require('../DB/models/Presentation');
const Commentaire = require('../DB/models/Commentaire');
const articleController = require('./articleController');

//Method get
module.exports = {
    get: (req, res) => {
        // res.render('commentaire')
        Commentaire
            .find()
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },

    // Method create(post)
    create: async(req, res) => {
        console.log('Controller create commentaire')

        const presentation = await Presentation.findById(req.params.id)

        const comment = new Commentaire({
            author: req.body.author,
            content: req.body.content,
            refID: presentation._id
        })

        presentation.comment.push(comment._id)

        comment.save((err) => {
            if (err) return handleError(err)
        })
        presentation.save((err) => {
            if (err) return handleError(err)
        })

        res.redirect(`/presentation/${presentation._id}`)

    },

    // Method delete one
    deleteOne: (req, res) => {
        console.log(req)
            // Fonction de suppression de un Articles rechercher par son _id
        Commentaire
            .deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id
                    // ici nous avons un callback err
            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console.log(err)
                    // Sinon on renvoit l'err
                res.json({
                    succes: req.params.id + ' // à bien été supprimer'
                })
            })
    },
}