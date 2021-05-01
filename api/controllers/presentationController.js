/*
 * Controller
 *************/
// Import module
// const dateformat = require('dataformat')
// Import de model
const Presentation = require('../DB/models/Presentation'),
    path = require('path'),
    fs = require('fs')


module.exports = {

    //Method get
    get: (req, res) => {
        Presentation
            .find()
            .lean()
            .exec((err, data) => {
                if (err) console.log(err);
                //res.json(data)
                res.render('project', {
                    dbPresentation: data,
                    search: 'input'
                })
            })
    },

    // Method GetId
    getId: (req, res) => {
        Presentation
            .findById(req.params.id)
            .populate('comment')
            .lean()
            .exec((err, data) => {
                if (err) console.log(err);
                // res.json(data)
                console.log(data)
                res.render('presentationID', {
                    presentationID: data
                })
            })
    },

    //Method create(post)
    create: (req, res) => {
        // console.log('Controller create presentation')
        // console.log(req.body)
        const b = req.body

        // console.log(req.file)

        // On appel notre model (constructeur)
        Presentation
        // On lui demande la function create
            .create({
            ...req.body,
            // On definit nos data pour la création de notre nouvelle presentation
            // title: b.title, // replace by ...req.body
            // content: b.content, // replace by ...req.body
            // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
            imgPresentation: `/assets/image/${req.file.completed}`,
            // On stock aussi le nom de l'image
            imgName: req.file.completed

            // Notre callback de validation de la function create
        }, (err, data) => {
            // En cas d'err il nous log l'err
            if (err) console.log(err);
            // presentation cree (avec le _id)
            // console.log(data)

            // On redirige sur le controller admin (ou seront charger nos data)
            res.redirect('/admin')
                //res.json(data)
        })
    },

    // Method put 
    editOne: async(req, res) => {
        const b = req.body
            // On declare notre articleID (Objet à éditer)
        const presentationID = await Presentation.findById(req.params.id),
            // Query qui est l'id de notre objet à éditer
            query = {
                _id: req.params.id
            },
            // pathImg sera le chemin de notre fichier à supprimer
            pathImg = path.resolve("public/image/" + presentationID.imgName)
            // console.log('EDITONE PRESENTATION BODY', b)
            // console.log('EDITONE PRESENTATION PARAMS: ', req.params.id)

        console.log(req.body)
        console.log(req.file)

        if (!req.file) {
            if (req.body.title) {
                Presentation
                    .findByIdAndUpdate(req.params.id, {
                        ...req.body
                    }, (err, data) => {
                        if (err) console.log(err)
                            // res.json(data)
                        res.redirect('/admin')
                    })
            }
        } else {
            Presentation
                .findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
                    imgPresentation: `/assets/image/${req.file.completed}`,
                    // On stock aussi le nom de l'image
                    imgName: req.file.completed
                }, (err, data) => {
                    if (err) console.log(err)
                        // res.json(data)
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)
                            // res.json({
                            // succes: req.params.id + '// à bien été supprimer'
                            // })
                        res.redirect('/admin')
                    })
                })
        }


    },

    // Method delete one 
    deleteOne: async(req, res) => {
        const dbPresentation = await Presentation.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("public/image/" + dbPresentation.imgName);

        Presentation
            .deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id,
            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console.log(err)
                    // Sinon on renvoit l'err
                else {
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)
                            // res.json({
                            // succes: req.params.id + '// à bien été supprimer'
                            // })
                        res.redirect('/admin')
                    })
                }
            })
    }
}