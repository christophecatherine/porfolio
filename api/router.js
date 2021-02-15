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
    projectController = require('./controllers/projectController')
    /*
     * Router
     ***********/

// Home
router.route('/')
    .get(homeController.pageHome)

// Admin
router.route('/admin')
    .get(adminController.get)


// Competence
router.route('/competence/:id')
    .get(competenceController.get)

// Contact
router.route('/contact')
    .get(contactController.get)


/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;