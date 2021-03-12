/*
 * On déclare nos constante
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer'),
  // Déclaration ne notre transporter
  // C'est en quelque sorte notre connexion à notre boite mail
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
      user: "1christophecatherine@gmail.com",
      pass: "10Chanteloup!"
    }
  })

// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
var rand, mailOptions, host, link;

module.exports = {
  // Action test boite mail > nodemailer
  test: (req, res) => {
    console.log(req.body)
    // On configure notre mail à envoyer par nodemailer
    const mailOptions = {
      from: '1christophecatherine@gmail.com',
      to: req.body.email,
      subject: 'Félicitation, ' + req.body.author + ' !',
      html: `
        <h2>${req.body.author}, Ton premier mail avec nodemailer, Successfull !!</h2>
      `
    }

    // On demande à notre transporter d'envoyer notre mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err)
      else {
        console.log(info)
        res.render('home', {
          success: "Un email à bien été envoyer à " + req.body.email
        })
      }
    })
  },
  // Envoie du message de vérification
  sendVerif: (req, res) => {
    // génération d'un chiffre random
    rand = Math.floor((Math.random() * 100) + 54)
    // on definit notre host
    host = req.get('host')
    // on définit le lien
    link = "http://" + req.get('host') + "/verify/" + rand
    // et enfin notre mail
    mailOptions = {
      from: '1christophecatherine@gmail.com',
      to: req.body.email,
      subject: "Veuillez confirmez votre email svp.",
      rand: rand,
      html: `
        <h2>Encore un effort</h2>,<br>
        <h5>Cliquer sur le lien suivant afin de finir la procédure de validation de mail.</h5><br>
        <a href=" ` + link + ` ">Click here to verify</a>
      `
    }
    console.log(mailOptions)
    // Et envoi notre mail avec nos callback
    transporter.sendMail(mailOptions, (err, res, next) => {
      if (err) {
        console.log(err)
        res.end("error")
      } else {
        console.log("Message Envoyer")
        next()
      }
    })
    // Response
    res.render('home', {
      success: "Un email de vérification à bien été envoyer à " + req.body.email
    })
  },
  // Génération de la page ID (Unique)
  verifMail: (req, res) => {
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page verify: ')
    // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
      console.log("Domain is matched. Information is from Authentic email")
      // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
      if (req.params.id == mailOptions.rand) {
        console.log("email is verified")
        res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
      } else {
        console.log("email is not verified")
        res.end("<h1>Bad Request</h1>")
      }
    } else {
      res.end("<h1>Request is from unknown source")
    }
  }
}