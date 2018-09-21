var db = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
module.exports = function (app) {
  // Get all idioms
  app.get("/api/idioms", function (req, res) {
    db.Idiom.findAll({})
      .then(function (idioms) {
        res.status(200).json(idioms);
      })
      .catch(function (err) {
        console.log("ERRRRRRRRRRRR");
        console.log(err);
        res.send(err);
      });
  });
  //GET idiom by id
  app.get("/api/idiom/:id", function (req, res) {
    Idiom.findOne({
      where: { id: req.params.id }
    })
      .then(function (idiom) {
        var newLinked_idioms_ids = [];
        //look in the newLinks table for newLinked idioms
        db.newLink.findAll({
          where: {
            [Op.or]: [{ idiom1Id: req.params.id }, { idiom2Id: req.params.id }]
          }
        })
          .then(function (newLinks) {
            //for each newLink
            for (const newLink of newLinks) {
              //if Idiom1 is the original idiom
              if (newLink.idiom1Id === parseInt(req.params.id)) {
                newLinked_idioms_ids.push(newLink.idiom2Id);
              } else {//else if Idiom2 is the original idiom
                newLinked_idioms_ids.push(newLink.idiom1Id);
              }
            }

          })
          .catch(function (err) {
            res.send(err);
          });
        //form an array of newLinked idioms and return it with the original idiom
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  //Get idioms by language
  app.get("/api/idiomsbyLanguage/:langId", function (req, res) {
    db.Language.findAll({
      where: { LanguageId: req.params.langId }
    })
      .then(function (idioms) {
        res.json(idioms);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  });
  //Get idioms by category
  app.get("/api/idiomsbyCategory/:category", function (req, res) {
    db.Language.findAll({
      where: {
        category: { [Op.like]: `%${req.params.category}%` }
      }
    })
      .then(function (idioms) {
        res.json(idioms);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  });
  //GET idioms by text
  //(TODO)
  // Create a new idiom
  app.post("/api/idioms", function (req, res) {
    var idiom = req.body;
    db.Idiom.create(idiom)
      .then(function (idiom) {
        res.json(idiom);
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  // Create a new language
  app.post("/api/languages", function (req, res) {
    var language = req.body;
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
        res.status(200).json(languages);
      })
      .catch(function (err) {
        res.send(err);
      });
  });
  //POST newLink between two idioms
  app.post("/api/newLink", function (req, res) {
    newLink = req.body;
    db.newLink.create(newLink)
      .then(function (linkdb) {
        res.json(linkdb);
      })
      .catch(function (err) {
        res.send(err);
      });
  });
}
