var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/languages", function () {
  // Before each test begins, create a new request server for testing
  // & delete all languages from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all languages", function (done) {
    // Add some languages to the db to test with
    db.Language.bulkCreate([
      { language_name: "English", abbreviation: "ENG" },
      { language_name: "French", abbreviation: "FRE" }
    ]).then(function () {
      // Request the route that returns all languages
      request.get("/api/languages").end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ language_name: "English", abbreviation: "ENG" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ language_name: "French", abbreviation: "FRE" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
