/*
 * Controller
 *************/
const Article = require('../DB/models/Article')

module.exports = {
    // Method Get
    get: async(req, res) => {
        // Variable de récupération de tout les Articles
        Article
            .find({})
            .lean()
            .exec((err, data) => {
                // Petit log pour checker
                console.log(data);
                // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
                // res.render('article', {
                //     dbArticle: data
                // })
                res.json(data)
            })

    },
    // Method Post
    post: async(req, res) => {
        // On demande au model Article de créé un Article
        Article
            .create({
                // Il nous créé un Article avec le model du formulaire envoyer (req.body)
                ...req.body
            }, (err, data) => {
                Article
                    .find({})
                    .lean()
                    .exec((err, data) => {
                        // Petit log pour checker
                        console.log(data);
                        // Et on renvoit la page article avec notre objet de tout nos article pour agrémenté la liste
                        // res.render('article', {
                        //     dbArticle: data
                        // })
                        res.json(data)
                    })
            })

    },
    // Method Delete One
    deleteOne: (req, res) => {
        // Fonction de suppression de un Articles rechercher par son _id
        Article.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
                // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on redirige
            if (!err) return res.redirect('/article')
                // Sinon on renvoit l'err
            else res.send(err)
        })
    },
    // Method Delete All
    deleteAll: (req, res) => {
        // Fonction de suppression de tout les Articles
        Article.deleteMany((err) => {
            if (!err) return res.redirect('/article')
            else res.send(err)
        })
    }
}