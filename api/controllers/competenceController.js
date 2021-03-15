/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')

// Import de model
const Competence = require('../DB/models/Competence')

//Method get
module.exports = {
    get: (req, res) => {
        res.render('competence')
    },

    //Method getId
    getId: (req, res) => {
        // console.log(req.params)
        Competence
            .findById(req.params.id)
            .populate('comment')
            .lean()
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },


    // Method create(post)
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
            content: b.content


            // Notre callback de validation de la function create
        }, (err, data) => {
            // En cas d'err il nous log l'err
            if (err) console.log(err);
            // Compétence cree (avec le _id)
            console.log(data)

            // On redirige sur le controller admin (ou seront charger nos data)
            res.redirect('/admin')
                // res.json(data)
        })
    },

    //Method put
    editOne: (req, res) => {
        const b = req.body
        console.log('EDITONE COMPÉTENCE BODY: ', b)
        console.log('EDITONE COMPÉTENCE PARAMS: ', req.params.id)

        Competence
            .findByIdAndUpdate(req.params.id, {
                ...req.body
            }, (err, data) => {
                if (err) console.log(err)
                    // res.json(data)
                res.redirect('/admin')
            })
    },

    // Method delete one
    deleteOne: (req, res) => {
        console.log("Delete Competences: ", req.params.id)
            // Fonction de suppression de un Articles rechercher par son _id
        Competence
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
                res.redirect('/admin')
            })
    },
}