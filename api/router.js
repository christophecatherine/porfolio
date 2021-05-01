/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload = require('./config/multer');

/*
 * Middleware
 *************/
const auth = require('./middleware/auth')

/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    adminController = require('./controllers/adminController'),
    contactController = require('./controllers/contactController'),
    competenceController = require('./controllers/competenceController'),
    presentationController = require('./controllers/presentationController'),
    messageController = require('./controllers/messageController'),
    userController = require('./controllers/userController'),
    commentaireController = require('./controllers/commentaireController'),
    authController = require('./controllers/authController'),
    nodemailerController = require('./controllers/nodemailerController'),
    cookieController = require('./controllers/cookieController');

/*

 * Router
 ***********/

// Home
router.route('/')
    .get(homeController.pageHome)

// Admin
router.route('/admin')
    .get(auth.admin, adminController.get)

// Competences 
router.route('/competences')
    .get(competenceController.get)
    .post(auth.admin, competenceController.create)

router.route('/competences/:id')
    .get(competenceController.getId)
    .put(auth.admin, competenceController.editOne)
    .delete(auth.admin, competenceController.deleteOne)

//Message
router.route('/message')
    .post(messageController.create)

router.route('/messageId/:id')
    .delete(auth.admin, messageController.deleteOne)

//Auth
router.route('/register')
    .post(authController.register)

//User
router.route('/user/:id')
    .put(auth.admin, userController.editOne)
    .delete(auth.admin, userController.deleteOne)


//Commentaire
router.route('/commentaire')
    .get(commentaireController.get)
    .post(commentaireController.create)

router.route('/commentaire/:id')
    .get(commentaireController.get)
    .post(commentaireController.create)
    .delete(commentaireController.deleteOne)

// Presentations
router.route('/presentation')
    .post(auth.admin, upload.single('imagePresentation'), presentationController.create)

router.route('/presentation/:id')
    .get(presentationController.getId)
    .delete(auth.admin, presentationController.deleteOne)
    .put(auth.admin, upload.single('imagePresentation'), presentationController.editOne)

// Project
router.route('/project')
    .get(presentationController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

// Login
router.route('/login')
    .get(authController.get)

router.route('/logout')
    .get(authController.logout)

router.route('/login/register')
    .post(authController.register)

router.route('/login/auth')
    .post(authController.auth)


// Nodemailer
// email test
router.route('/nodemailer')
    .post(nodemailerController.test)

// Mot de passe oublier
router.route('/lostPassword')
    .post(nodemailerController.lostPassword)

// Page de mot de passe oublier
router.route('/lostPassword/:id')
    .get(nodemailerController.pageEditPassword)

// Mot de passe oublier
router.route('/editPassword')
    .post(authController.editPassword)

// Accept cookie
router.route('/cookie')
    .get(cookieController.newCookie)
    .post(cookieController.delCookie)


/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;