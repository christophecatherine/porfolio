// export de module 
// on defini notre fnc de requete reponse et next 
module.exports = {
    admin: (req, res, next) => {
        // console.log('Middleware Admin: ', req.session)
        //la requete session n'est pas admin on redirige sur ('/')
        if (!req.session.isAdmin) res.redirect('/')
            // simon on continue la requete 
        else next()
    },
    ban: (req, res, next) => {
        if (req.session.isBan === true) res.end()
            // simon on continue la requete 
        else next()
    }
}