/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')

// Import de model
const Presentation = require('../DB/models/Presentation');
const Commentaire = require('../DB/models/Commentaire');
//const articleController = require('./articleController')

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

        console.log(req.body)

        //Declaration const presentation qui attend la reponse id
        const presentation = await Presentation.findById(req.params.id)

        //Declaration const new comment avec schema en recuperant idpresentation
        const comment = new Commentaire({
                author: req.session.user.name,
                authorID: req.session.userId,
                content: req.body.content,
                refID: presentation._id
            })
            //push de idcomment de la presentation
        presentation.comment.push(comment._id)

        //faire une sauvegarde du new commentaire 
        comment.save((err) => {
                if (err) return handleError(err)
            })
            //faire une sauvegarde de la presentation
        presentation.save((err) => {
                if (err) return handleError(err)
            })
            // on redirige sur la page presentation en chaire de cararactere ($)
        res.redirect(`/presentation/${presentation._id}`)

    },

    // Method delete one
    deleteOne: (req, res) => {
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
                    // res.json({
                    //     succes: req.params.id + ' // à bien été supprimer'
                    // })
                    // on redirige sur la page presentation en chaire de cararactere (+ req.params.id))
                res.redirect('/presentation/' + req.params.id)
            })
    },
}