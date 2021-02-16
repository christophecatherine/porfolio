/*
 * Controller
 *************/
const Competence = require('../DB/models/Competence')

module.exports = {
    get: async(req, res) => {
        console.log('Controller Page Admin (GET)');
        // On definit notre récupération de nos data Competence (Array)
        const dbCompetence = await Competence.find().lean()

        // On renvoit notre page admin avec son layout (spécifié) et les datas voulu (DB)
        res.render('admin', {
            layout: 'admin',
            dbCompetence
        })
    }
}