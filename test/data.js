process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "docs";

const thisid = "";

describe('db', () => {
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function (info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
                .finally(async function () {
                    await db.client.close();
                    resolve();
                });
        });
    });

    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    done();
                });
        });
    });

    describe('POST /', () => {
        it('201 Creating new document', (done) => {
            let document = {
                title: "Titel",
                content: "text"
            };

            chai.request(server)
                .post("/")
                .send(document)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("content");
                    res.body.data.content.should.equal("text");
                    done();
                });
        });

    });
    describe('GET /', () => {
        it('200 getting id for put request', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    let thisid = res.body[0]._id;
                    done();
                });
        });
    });

    describe('PUT /', () => {
        it('201 updated document', (done) => {
            let document = {
                oldId: thisid,
                newContent: "hellooooooo"
            };

            chai.request(server)
                .put("/")
                .send(document)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });

    });

});
