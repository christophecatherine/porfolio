/*
 * Controller
 *************/
const Presentation = require('../DB/models/Presentation')

module.exports = {
    // Method Get
    pageHome: async(req, res) => {
        const dbPresentation = await Presentation.find({}).lean()
        res.render('home', {
            dbPresentation
        })
    }
}