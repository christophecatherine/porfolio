module.exports = {
    admin: (req, res, next) => {
        console.log('Middleware Admin: ', req.session)
        if (!req.session.isAdmin) res.redirect('/')
        else next()
    }
}