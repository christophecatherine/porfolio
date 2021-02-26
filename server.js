/*
 * App.js
 ******************************/

// Import de module
// à vous d'allez jettez un oeil sur la doc de chaque module sur: https://www.npmjs.com/
const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    methodeOverride = require("method-override");

// Mongoose
// Ceci est un tuto sinon vous devez cacher cette information de la ligne juste en dessous
const urlDb = 'mongodb://localhost:27017/porfolio'
mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(DB => console.log('connecter à la base de donnée'))
    .catch(err => console.log(error))

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'admin'
}));

// Express static permet de diriger un URL sur un dossier en particulier
app.use('/assets', express.static('public'));

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Method-override
app.use(methodeOverride("_method"));

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


// save session avec MongoDB
//const mongoStore = MongoStore(expressSession)