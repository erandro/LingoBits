var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

var testFixtures = {
    languages: [
        { language_name: "English", abbreviation: "ENG" },
        { language_name: "French", abbreviation: "FRE" },
        { language_name: "Spanish", abbreviation: "ESP" },
        { language_name: "Arabic", abbreviation: "ARB" }
    ],
    idioms: [
        { origin_idiom: "A hot potato", category: "social conversation", LanguageId: 1 },
        { origin_idiom: "A penny for your thoughts", category: "thinking mind ideas", LanguageId: 1 },
        { origin_idiom: "Barking up the wrong tree", category: "social speaking wrong people", LanguageId: 1 },
        { origin_idiom: "Ball is in your court", category: "decision yours", LanguageId: 1 },
        { origin_idiom: "Be glad to see the back of", category: "Leave Happy", LanguageId: 1 }
    ]
};
describe("Testing Idiom Routes", function () {
    // Before each test begins, create a new request server for testing
    // & delete all languages from the db
    beforeEach(function () {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
    });

    it("should find all idioms", function (done) {
        var languages = testFixtures.languages;
        var idioms = testFixtures.idioms;
        //Add Languages to the db to satisfy the foreign key constraint using Language Id in the idioms table
        db.Language.bulkCreate(languages)
            .then(function () {
                // Add some idioms to the db to test with
                db.Idiom.bulkCreate(idioms).then(function () {
                    // Request the route that returns all languages
                    request.get("/api/idioms").end(function (err, res) {
                        var responseStatus = res.status;
                        var responseBody = res.body;

                        // Run assertions on the response
                        expect(err).to.be.null;
                        expect(responseStatus).to.equal(200);

                        expect(responseBody).to.be.an("array").that.has.lengthOf(5);
                        for (var i = 0; i < 5; i++) {
                            expect(responseBody[i]).to.be.an("object").that.includes(idioms[i]);
                        }
                        // The `done` function is used to end any asynchronous tests
                        done();
                    });
                });
            });

    });

    it("post a new idiom linked to existing ", function (done) {
        var languages = testFixtures.languages;
        var idioms = testFixtures.idioms;
        //Add Languages to the db to satisfy the foreign key constraint using Language Id in the idioms table
        db.Language.bulkCreate(languages).then(function () {
            // Add some idioms to the db to test with
            db.Idiom.bulkCreate(idioms).then(function () {
                // Request the POST route that adds a new idiom and link it to an existing one(Id:4)
                var curIdiomId = 4;
                var newIdiom = { origin_idiom: "الكرة فى ملعبك", category: "decision yours", LanguageId: 4 };
                request.post(`/api/idiom/${curIdiomId}`).send(newIdiom).end(function (err, res) {
                    var responseStatus = res.status;
                    var responseBody = res.body;

                    // Run assertions on the response
                    expect(err).to.be.null;
                    expect(responseStatus).to.equal(200);
                    var expectedIdiom = {};
                    expect(responseBody).to.include({ id: 6, origin_idiom: "الكرة فى ملعبك", category: "decision yours", LanguageId: 4 });
                    db.Link.findAll({
                        where: {
                            [Op.or]: [{ idiom1Id: curIdiomId }, { idiom2Id: curIdiomId }]
                        }
                    }).then(function (links) {
                        expect(links).to.be.an("array").that.has.lengthOf(1);
                        expect(curIdiomId === links[0].idiom1Id || curIdiomId === links[0].idiom2Id).to.be.true;
                        done();
                    });

                });

            });

        });
    });
});