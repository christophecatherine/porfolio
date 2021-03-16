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
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    })

// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
var rand, mailOptions, host, link;

module.exports = {
    // Action test boite mail > nodemailer
    test: (req, res) => {
        console.log('nodemailer', req.body)
            // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: '1christophecatherine@gmail.com',
            to: req.body.email,
            subject: req.body.sujet,
            html: `
        <h2>${req.body.email}, Ton premier mail avec nodemailer, Successfull !!</h2>'

        ${req.body.content}
      `
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('/admin')
            }
        })
    }
}