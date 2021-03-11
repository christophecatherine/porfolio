// Appel bcrypt
const bcrypt = require('bcrypt')

// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel article dans schema 
const UserSchema = new mongoose.Schema({

    //le nom est de type string et requiere vrai
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },

    // l'email est de type string et requiere vrai et est unique 
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        // unique: true,

    },

    password: {
        type: String,
        required: [true, 'Le mots de passe est obligatoire']
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isBan: {
        type: Boolean,
        default: false
    }

})

//securiser avec le middleware
UserSchema.pre('save', function(next) {

    //constante this pour recuperer user schema 
    const user = this

    //module de cryptage
    bcrypt.hash(user.password, 10, (error, encrypted) => {

        user.password = encrypted
        next()
    })

})


// export de notre model 

module.exports = mongoose.model('User', UserSchema)