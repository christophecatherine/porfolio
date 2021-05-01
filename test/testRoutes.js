// DB
const mongoose = require('mongoose');

const Article = require('../api/DB/models/Article');
// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../server');
const path = require('path');
const Presentation = require('../api/DB/models/Presentation');

chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  Presentation (project)', () => {
    let prez

    // beforeEach((done) => {
    //     Article.deleteOne({}, (err) => {
    //         done();
    //     });
    // });

    it(' ChaiRouter // Get page project', (done) => {
        chai.request(app)
            .get('/project')
            .set('Accept', 'application/json')
            // .expect(200)
            .end((err, res) => {
                // console.log(res)
                if (err) return done(err)
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
    });

    it(' ChaiRouter // Get page project', (done) => {
        // simulation des data de mon formulaire
        let article = {
            title: 'test Chai Post'
        }

        // simulation de l'envoie du formulaire
        chai.request(app)
            .post("/presentation")
            .send(article)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(200);
                done()
            });
    });

    it(' ChaiRouter // Get presentation (ID)', (done) => {
        prez = new Presentation({
            title: 'Get Présentation ID (Route)'
        })
        prez.save()

        chai.request(app)
            .get("/presentation/" + prez._id)
            .end(function(err, res) {
                if (err) {
                    don(err);
                }
                expect(res.status).to.equal(200);
                done()
            });


    });

    // it(' ChaiRouter // Delete presentation (ID)', (done) => {
    //     prez = new Presentation({
    //         title: 'Delete Présentation ID (Route)'
    //     })
    //     prez.save()

    //     chai.request(app)
    //         .delete("/presentation/" + prez._id)
    //         .end(function(err, res) {
    //             if (err) {
    //                 don(err);
    //             }
    //             expect(res.status).to.equal(200);
    //             done()
    //         });

    // });

    // it(' ChaiRouter // Put presentation (ID)', (done) => {
    //     let body = {
    //         title: "Mon Edit Via la route",
    //         content: "Mon super content"
    //     }

    //     prez = new Presentation({
    //         title: 'put Présentation ID (Route)'
    //     })
    //     prez.save()

    //     chai.request(app)
    //         .put("/presentation/" + prez._id)
    //         .send(body)
    //         .end(function(err, res) {
    //             if (err) {
    //                 don(err);
    //             }
    //             expect(res.status).to.equal(200);
    //             done()
    //         });
    // });


});