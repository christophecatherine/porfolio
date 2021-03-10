/*
 * Controller
 *************/
// Import module
const bcrypt = require('bcrypt')
    // const dateformat = require('datformat')
const User = require('../DB/models/User')

// Import de model

module.exports = {


    //Method get
    get: (req, res) => {
        res.render('login')

    },
    register: (req, res) => {
        console.log('Controller Register: ', req.body)

        // Check mdp1 avec mdp2 si ils sont identiques //
        if (req.body.password !== req.body.password2) {

            // erreur //
            res.render('login', {
                error: 'Vos mots de passe ne correspondent pas !'
            })
        } else {

            // pas erreur //
            User
                .create({
                    // RECHERCHE LA CONST POUR L'AUTH //
                    ...req.body
                    // SI ERREUR, ALORS RENVOI MESSAGE ERREUR, SINON, CONTINUE //
                }, (err, data) => {
                    if (err) console.log(err)

                    // RENVOI SUITE A CREATION DE L'AUTH A LA PAGE SUIVANTE : 

                    res.render('login', {
                        success: 'Inscription complète'
                    })
                })
        }
    },
    //Authentification
    auth: async(req, res) => {
        // userAuth sera le résultat de notre recherche 'email: req.body.email' via le constructeur User
        let userAuth = await User.findOne({
            email: req.body.email
        })

        // si utilisateur n'existe pas dans la db ... //
        if (!userAuth) {
            res.render('login', {
                error: "Ce compte n'existe pas",
            })
        } else {

            User
            // Regarde de nouveau si l'adresse mail existe après la création du compte //
                .findOne({
                email: req.body.email
            }, (err, User) => {
                if (err) console.log(err)
                if (!User) {
                    // si erreur dans le MdP, renvoi vers la page login //
                    res.render('login', {
                        error: "Votre authentification n'est pas reconue !"
                    })

                } else {

                    // Bcrypt va comparer l'adresse mail enregistrée dans la DB et celle saisie par l'user afin de voir si un mdp est rataché a celle ci // 
                    bcrypt.compare(req.body.password, User.password, (error, same) => {

                        // si non-correspondance des données, alors renvoi de message erreur et renvoi sur la page login //
                        if (!same) {
                            res.render('login', {
                                error: "une erreur est survenue !"
                            })
                        } else {

                            req.session.userId = User._id

                            if (User.isAdmin === true) {
                                req.session.isAdmin = User.isAdmin
                            }

                            req.session.user = {
                                name: User.name,
                                email: User.email,
                                isAdmin: User.isAdmin,
                                isBan: User.isBan
                            }

                            // Quand on est connecté, ça nous renvoie le message "vous êtes connecté en tant que" suivi du prénom de l'utilisateur + renvoi sur la page home //
                            // res.render('home', {
                            //     success: "vous etes connecté au nom de: " + User.firstname
                            // })

                            res.redirect('/')
                        }
                    })
                }
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('cookie-sess')
            console.log(req.session)
            res.redirect('/')
        })
    }

}