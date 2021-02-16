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
    presentationController = require('./controllers/presentationController');
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
router.route('/competence/:id')
    .get(competenceController.getId)

router.route('/competence/create')
    .post(competenceController.create)

// Presentation
router.route('/presentation/create')
    .post(presentationController.post)

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