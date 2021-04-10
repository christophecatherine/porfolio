

module.exports = {
    newCookie: (req, res) => {
        console.log('Controller new cookie')
        console.log(req.cookies)
        res.cookie('cookie-modal', {
            domain: '/',
            path: '*',
            secure: true,
            resave: false
        })
        res.redirect('/')
    },
    delCookie: (req, res) => {
        console.log('Controller delete cookie')
        res.clearCookie('cookie-modal')
        res.redirect('/')
    }
}