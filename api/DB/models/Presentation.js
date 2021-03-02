// Appel de mongoose 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Commentaire = require('./Commentaire')

//Creer un nouvel Presentation dans schema 
const PresentationSchema = new mongoose.Schema({

    title: String,
    content: String,
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentaire'
    }],
    createDate: {
        type: Date,
        default: new Date()
    }
})

// Creer un model dans Presentation qui est associer a Presentation schema
const Presentation = mongoose.model('Presentation', PresentationSchema)

// export de notre model 

module.exports = Presentation