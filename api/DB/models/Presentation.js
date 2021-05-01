// Appel de mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Commentaire = require('./Commentaire');
// const Competences = require('./Competences');


//Creer un nouvel Presentation dans schema
const PresentationSchema = new mongoose.Schema({

    title: String,
    content: String,
    description: String,
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentaire'
    }],
    // competence: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Competences'
    // }],
    isVerified: {
        type: Boolean,
        default: false
    },
    imgPresentation: String,
    imgName: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})


// Creer un model dans Presentation qui est associer a Presentation schema
const Presentation = mongoose.model('Presentation', PresentationSchema)

// export de notre model

module.exports = Presentation