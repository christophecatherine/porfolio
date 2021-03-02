// Appel de mongoose 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creer un nouvel Message dans schema 
const MessageSchema = new mongoose.Schema({

    username: String,
    email: String,
    sujet: String,
    message: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})

// Creer un model dans Message qui est associer a Message schema
const Message = mongoose.model('Message', MessageSchema)

// export de notre model 

module.exports = Message