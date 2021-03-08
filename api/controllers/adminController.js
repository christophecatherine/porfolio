/*
 * Controller
 *************/
const Message = require('../DB/models/Message')
const Presentation = require('../DB/models/Presentation')
const User = require('../DB/models/User')

module.exports = {
    get: async(req, res) => {
        console.log('Controller Page Admin (GET)');
        // On definit notre récupération de nos data Competence (Array)
        const dbMessage = await Message.find().lean()
        const dbPresentation = await Presentation.find().lean()
        const dbUtilisateur = await User.find().lean()


        // On renvoit notre page admin avec son layout (spécifié) et les datas voulu (DB)
        res.render('admin', {
            layout: 'admin',
            dbMessage,
            dbPresentation,
            dbUtilisateur

        })
    }
}