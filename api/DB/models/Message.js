// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel Message dans schema 
const MessageSchema = new mongoose.Schema({

    title: String,

})

// Creer un model dans Message qui est associer a Message schema
const Message = mongoose.model('Message', MessageSchema)

// export de notre model 

module.exports = Message