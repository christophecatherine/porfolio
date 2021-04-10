/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo').default,
    expressSession = require('express-session'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    methodeOverride = require("method-override"),
    cookieParser = require('cookie-parser');

require('dotenv').config()

//cookie-parser
app.use(cookieParser());

// Mongoose
// Ceci est un tuto sinon vous devez cacher cette information de la ligne juste en dessous
const urlDb = process.env.MONGO_URI
mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    })
    .then(DB => console.log('connecter à la base de donnée'))
    .catch(err => console.log(error))

// Express Static (Permet de pointer un dossier static sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use(express.static('public'));


//Method-override
app.use(methodeOverride("_method"));

// Express-session (cookie)
app.use(expressSession({
    secret: 'securite',
    name: 'cookie-sess',
    saveUninitialized: true,
    resave: false,
    //permet de stocker notre session dans la db
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

//Register Helper 
const {
    limitArray,
    limitArrayReverse,
    arrayReverse,
    ifCond,
    inc
} = require("./helper/hbs.js");

// Moment (Handlebars)
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',

    defaultLayout: 'main',
    adminLayout: 'admin',
    helpers: {
        limit: limitArray,
        limitArrayReverse: limitArrayReverse,
        arrayReverse: arrayReverse,
        ifCond: ifCond,
        inc: inc
    }
}));

// Express static permet de diriger un URL sur un dossier en particulier
app.use('/assets', express.static('public'));

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const auth = require('./api/middleware/auth')

// Déclaration de middleWare (session)
app.use('*', auth.ban, (req, res, next) => {

    // Déclaration et utilisation de notre session
    // en corélation avec notre base de donnée
    res.locals.userId = req.session.userId;
    res.locals.user = req.session.user
    if (req.session.isAdmin) res.locals.admin = req.session.isAdmin

    // console.log(req.session)
    // La function next permet qu'une fois la condition effectuer il reprenne son chemin
    next()
})

// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)

// app.use((req, res) => {
//     res.render('err404')
// })

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});

module.exports = app