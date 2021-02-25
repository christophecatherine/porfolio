// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel Presentation dans schema 
const PresentationSchema = new mongoose.Schema({

    title: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

// Creer un model dans Presentation qui est associer a Presentation schema
const Presentation = mongoose.model('Presentation', PresentationSchema)

// export de notre model 

module.exports = Presentation