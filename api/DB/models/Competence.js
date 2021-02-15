// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel Competence dans schema 
const CompetenceSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})

// Creer un model dans Competence qui est associer a Competence schema
const Competence = mongoose.model('Competence', CompetenceSchema)

// export de notre model 

module.exports = Competence