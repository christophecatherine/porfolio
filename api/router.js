/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    path = require('path')

/*
 * Controller
 *************/
const homeController = require('./controllers/homeController'),
    adminController = require('./controllers/adminController'),
    contactController = require('./controllers/contactController'),
    competenceController = require('./controllers/competenceController'),
    projectController = require('./controllers/projectController'),
    articleController = require('./controllers/articleController'),
    presentationController = require('./controllers/presentationController'),
    messageController = require('./controllers/messageController'),
    userController = require('./controllers/userController'),
    commentaireController = require('./controllers/commentaireController');

/*

 * Router
 ***********/

// Home
router.route('/')
    .get(homeController.pageHome)

// Admin
router.route('/admin')
    .get(adminController.get)

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
    .get(messageController.get)
    .post(messageController.create)

router.route('/messageId/:id')
    .delete(messageController.deleteOne)

//User
router.route('/register')
    .post(userController.register)

//Commentaire
router.route('/commentaire')
    .get(commentaireController.get)
    // .post(commentaireController.create)

router.route('/commentaire/:id')
    .get(commentaireController.get)
    .post(commentaireController.create)
    .delete(commentaireController.deleteOne)


// Presentation
router.route('/presentation')
    .get(presentationController.get)
    .post(presentationController.create)

router.route('/presentation/:id')
    .get(presentationController.getId)
    .delete(presentationController.deleteOne)

// Project
router.route('/project')
    .get(projectController.get)



// Article
router.route('/article')
    .get(articleController.get)
    .post(articleController.post)
    .delete(articleController.deleteAll)

// Contact
router.route('/contact')
    .get(contactController.get)


/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;