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
        //raccoucie pour la session 
        const sess = req.session
        console.log(req.body)
            //compare les 2 MP
        if (req.body.password !== req.body.password) {
            console.log('error password')
            res.render('home', {
                error: 'nous rencontrons un problème avec votre MP !',
                sess: sess
            })

        } else {
            //On log si la function est ok
            console.log('password is ok')
                // On demande la fonction de Mongo pour créer notre utilisateur
            User.create({
                //On récupère notre formulaire
                ...req.body,
                // Au cas ou une err survient on force 

            }, (err, user) => {
                // Si il y a une err
                if (err) {
                    console.log(err)
                } else {
                    //Redirection 
                    res.render('home', {
                        sucess: 'Votre compte à bien été crée;',
                        sess: sess
                    })
                }
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
        } else if (userAuth.isBan === true) {
            res.render('login', {
                error: "Votre compte à été banni !",
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

                            //notre requete session userId vaut user._id
                            req.session.userId = User._id
                                // si useradmin est strictement vrai la requete de is admin vaut useradmain 
                            if (User.isAdmin === true) {
                                req.session.isAdmin = User.isAdmin
                            }
                            if (User.isBan === true) {
                                req.session.isBan = User.isBan
                            }
                            //notre requete session user vaut nos objets 
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
    editPassword: async(req, res) => {
        console.log(req.body)
        const user = await User.find({
            email: req.body.email
        })

        if (!user) {
            console.log('L utilisateur n exite pas')
            res.redirect('/')
        } else {
            // Mettre controller pour editer l'user
            bcrypt.hash(req.body.password, 10, (error, encrypted) => {
                User.findOneAndUpdate({
                    email: req.body.email
                }, {
                    password: encrypted
                }, (err) => {
                    if (err) console.log(err)

                    console.log(req.body)
                    res.redirect('/')
                })
            })
        }
    },

    //la fonction de notre deconnection vaut l'annulation de la session et on supp le cookie et on redirige ('/')
    logout: (req, res) => {

        req.session.destroy(() => {
            res.clearCookie('cookie-sess')
            console.log(req.session)
            res.redirect('/')
        })
    },

}