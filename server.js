/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo'),
    expressSession = require('express-session'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    methodeOverride = require("method-override");


require('dotenv').config()

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


const mongoStore = MongoStore(expressSession)

//Method-override
app.use(methodeOverride("_method"));

// Express-session
app.use(expressSession({
    secret: 'securite',
    name: 'cookie-sess',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Déclaration de middleWare (session)
app.use('*', (req, res, next) => {
    // Déclaration et utilisation de notre session
    // en corélation avec notre base de donnée
    res.locals.user = req.session.userId;
    // Déclaration de notre condition middleware status
    if (req.session.status === 'user') {
        // Utilisation de notre middleware
        res.locals.user = req.session.status
    }

    // Déclaration de notre condition middleware status
    else if (req.session.status === 'admin') {
        // Utilisation de notre middleware
        res.locals.admin = req.session.status
    }
    // La function next permet qu'une fois la condition effectuer il reprenne son chemin
    next()
})


//Register Helper 
const {
    limitArray
} = require("./helper/hbs.js");

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'admin',
    helpers: {
        limit: limitArray,
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