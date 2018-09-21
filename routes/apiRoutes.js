var db = require("../models");

module.exports = function (app) {
  // Get all idioms
  app.get("/api/idioms", function (req, res) {
    return res.json({});
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
  });

  // Create a new idiom
  app.post("/api/idioms", function (req, res) {
    return res.json({});
    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
  });

  // Create a new language
  app.post("/api/languages", function (req, res) {
    console.log("Received POST request at /api/languages");
    var language = req.body;
    console.log("Recieved Object: " + JSON.stringify(language));
    db.Language.create(language)
      .then(function (language) {
        res.json(language);
      })
      .catch(function (err) {
        console.log("ERRRRRRRRRORRRR");
        console.log(err);
        res.send(err);
      });
  });

  // Get all languages
  app.get("/api/languages", function (req, res) {
    db.Language.findAll({})
      .then(function (languages) {
        console.log("Retrieved: " + languages);
        res.json(languages);
      })
      .catch(function (err) {
        res.send(err);
      });
  });
};
