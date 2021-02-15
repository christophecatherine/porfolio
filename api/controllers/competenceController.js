/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('competenceId')
    },
    create: (req, res) => {
        console.log('Controller create competence')
        console.log(req.body)
    }
}