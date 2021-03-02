const Message = require('../DB/models/Message')

//Methode get
module.exports = {
    get: (req, res) => {
        // res.render('message')
        Message
            .find()
            .exec((err, data) => {
                if (err) console.log(err);
                res.json(data)
            })
    },

    // Method create(post)
    create: (req, res) => {
        console.log('Controller create message')
        console.log(req.body)
        const b = req.body

        // On appel notre model (constructeur)
        Message
        // On lui demande la function create
            .create({
            // On definit nos data pour la création de notre nouvelle message
            ...req.body
            // Notre callback de validation de la function create
        }, (err, data) => {
            // En cas d'err il nous log l'err
            if (err) console.log(err);
            // Message cree (avec le _id)
            console.log(data)

            // On redirige sur le controller admin (ou seront charger nos data)
            res.redirect('/admin')
                //res.json(data)
        })
    },

    // Method delete one
    deleteOne: (req, res) => {
        console.log(req)
            // Fonction de suppression d'un message'
        Message
            .deleteOne({
                    _id: req.params.id
                },
                // ici nous avons un callback err
                (err) => {
                    // Si nous avons pas d'erreur alors on redirige
                    if (err) console.log(err)
                        // Sinon on renvoit l'err
                        // res.json({
                        //     succes: 'à bien été supprimer'
                        // })
                    res.redirect('/admin')
                })
    },
}