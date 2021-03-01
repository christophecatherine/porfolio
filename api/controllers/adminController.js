/*
 * Controller
 *************/
const Competence = require('../DB/models/Competence')
const Presentation = require('../DB/models/Presentation')

module.exports = {
    get: async(req, res) => {
        console.log('Controller Page Admin (GET)');
        // On definit notre récupération de nos data Competence (Array)
        const dbCompetence = await Competence.find().lean()
        const dbPresentation = await Presentation.find().lean()


        // On renvoit notre page admin avec son layout (spécifié) et les datas voulu (DB)
        res.render('admin', {
            layout: 'admin',
            dbCompetence,
            dbPresentation

        })
    }
}