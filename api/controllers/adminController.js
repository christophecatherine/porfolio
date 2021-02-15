/*
 * Controller
 *************/
module.exports = {
    get: async(req, res) => {
        res.render('admin', {
            layout: 'admin'
        })
    }
}