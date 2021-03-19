// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel Competence dans schema 
const CommentaireSchema = new mongoose.Schema({

    content: String,
    author: String,
    authorID: String,
    refID: String

})

// Creer un model dans Competence qui est associer a Competence schema
const Commentaire = mongoose.model('Commentaire', CommentaireSchema)

// export de notre model 

module.exports = Commentaire