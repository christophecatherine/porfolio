/*
 * Import Module
 **/
const connexion = require('../models/connexion')

module.exports = {

    // RECUPERE LES USERS //
    connexion: (req, res) => {

        connexion
            .find()

        // Lean permet d'alleger les requêtes //
        .lean()

        .exec((err, data) => {
            if (err) console.log(err, data)
            res.render('login', {
                success: 'Connexion reussie',
                dbComment: data

            })


        })
    },

    // METHODE POST //

    create: (req, res) => {
        connexion

            .create({
            // RECHERCHE LA CONST DANS LAQUELLE ON VEUT INDEXER LA CONNEXION  //
            title: req.body.title

            // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
        }, (err, dataPrim) => {
            if (err) console.log(err)

            // RENVOIE SUITE A REUSSITE DE LA CONNEXION A LA PAGE SUIVANTE : 
            res.redirect('/login')
        })
    },


}