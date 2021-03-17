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
    nodemailerController = require('./controllers/nodemailerController');

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
    .post(competenceController.create)

router.route('/competences/:id')
    .get(competenceController.getId)
    .put(competenceController.editOne)
    .delete(competenceController.deleteOne)

//Message
router.route('/message')
    .post(messageController.create)

router.route('/messageId/:id')
    .delete(messageController.deleteOne)

//Auth
router.route('/register')
    .post(authController.register)

//User
router.route('/user/:id')
    .put(userController.editOne)
    .delete(userController.deleteOne)


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
    .post(upload.single('imagePresentation'), presentationController.create)

router.route('/presentation/:id')
    .get(presentationController.getId)
    .delete(presentationController.deleteOne)
    .put(upload.single('imagePresentation'), presentationController.editOne)

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

router.route('/lostPassword')
    .post(nodemailerController.lostPassword)


/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;