/*
 * Controller
 *************/
// Import module
// const dateformat = require('datformat')
// Import de model
const User = require('../DB/models/User')
const bcrypt = require('bcrypt')

module.exports = {
    // Method put 
    editOne: (req, res) => {
        let boolAdmin = false
        let boolVerified = false
        let boolBan = false

        if (req.body.isAdmin === 'on') boolAdmin = true;
        if (req.body.isBan === 'on') boolBan = true;
        if (req.body.isVerified === 'on') boolVerified = true;
        // console.log(req.body);
        User
            .findByIdAndUpdate(req.params.id, {
                isAdmin: boolAdmin,
                isVerified: boolVerified,
                isBan: boolBan
            }, (err, data) => {
                if (err) console.log(err)
                    // res.json(data)
                res.redirect('/admin')
            })
    },

    // Method delete one 
    deleteOne: (req, res) => {
        console.log("Delete User: ", req.params.id)
        User
            .deleteOne({

                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id

            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (err) console.log(err)
                    // Sinon on renvoit l'err

                // res.json({
                // succes: req.params.id + '// à bien été supprimer'
                // })
                res.redirect('/admin')
            })
    },


    // logout: (req, res) => {
    //     req.session.destroy(() => {
    //         res.clearCookie('cookie-sess')
    //         console.log(req.session)
    //         res.redirect('/')
    //     })
    // }
}