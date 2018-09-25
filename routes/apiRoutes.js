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
        console.log(err);
        res.send(err);
      });
  });
  //GET idiom by id
  app.get("/api/idiom/:id", function (req, res) {
    db.Idiom.findOne({
      where: { id: parseInt(req.params.id) }
    })
      .then(function (requestedIdiom) {
        //look in the Links table for linked idioms
        db.Link.findAll({
          where: {
            [Op.or]: [{ idiom1Id: parseInt(req.params.id) }, { idiom2Id: parseInt(req.params.id) }]
          }
        })
          .then(function (links) {
            var linked_idioms_ids = [];
            var ratings = [];
            //fill the array linked_idioms_ids with ids of linked idioms
            for (var link of links) {
              //if Idiom1 is the original idiom
              if (link.idiom1Id === parseInt(req.params.id)) {
                linked_idioms_ids.push(link.idiom2Id);
              } else {//else if Idiom2 is the original idiom
                linked_idioms_ids.push(link.idiom1Id);
              }
              ratings.push(link.rating);
            }
            db.Idiom.findAll({
              where: {
                id: {
                  [Op.or]: linked_idioms_ids
                }
              }
            })
              .then(function (idioms) {
                var linkedIdiomsArr = [];
                for (var linkedIdiom of idioms) {
                  for (var i = 0; i < linked_idioms_ids.length; i++) {
                    if (linkedIdiom.id == linked_idioms_ids[i]) {
                      linkedIdiomsArr.push({ idiom: linkedIdiom, rating: ratings[i] });
                    }
                  }
                }
                var idiomToSend = {
                  id: requestedIdiom.id,
                  origin_idiom: requestedIdiom.origin_idiom,
                  pronunciation: requestedIdiom.pronunciation,
                  literal_meaning: requestedIdiom.literal_meaning,
                  meaning: requestedIdiom.meaning,
                  category: requestedIdiom.category,
                  LanguageId: requestedIdiom.LanguageId,
                  LinkedIdioms: linkedIdiomsArr
                };
                res.status(200).json(idiomToSend);
              })
              .catch(function (err) {
                res.send(err);
              });
          })
          .catch(function (err) {
            res.send(err);
          });
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  //Get idioms by language
  app.get("/api/idiomsbyLanguage/:langId", function (req, res) {
    db.Idiom.findAll({
      where: { LanguageId: parseInt(req.params.langId) }
    })
      .then(function (idioms) {
        res.status(200).json(idioms);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  });
  //Get idioms by category
  app.get("/api/idiomsbyCategory/:category", function (req, res) {
    db.Idiom.findAll({
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
  //GET idioms by name
  app.get("/api/idiomsbyName/:name", function (req, res) {
    var name = req.params.name;
    name = name.replace(/\+/g, ' ');
    db.Idiom.findAll({
      limit: 10,
      where: {
        origin_idiom: { [Op.like]: `%${name}%` }
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
  // Get all languages
  app.get("/api/languages", function (req, res) {
    db.Language.findAll({})
      .then(function (languages) {
        res.status(200).json(languages);
      })
      .catch(function (err) {
        res.send(err);
      });
  });
  // Get all categories
  app.get("/api/categories", function (req, res) {
    db.Idiom.findAll({
      attributes: ['category']
    })
      .then(function (idiomsdb) {
        var foundCategories = [];
        for (idiom of idiomsdb) {
          var categoriesInIdiom = idiom.category.split(" ");
          for (category of categoriesInIdiom) {
            var trimmedCategory = category.trim();
            if (trimmedCategory.length > 1 && !foundCategories.includes(trimmedCategory)) {
              foundCategories.push(trimmedCategory);
            }
          }
        }
        res.status(200).json(foundCategories);
      })
      .catch(function (err) {
        console.log("ERRRRRRRRRRRR");
        console.log(err);
        res.send(err);
      });
  });
  // POST a new idiom
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

  // POST a new language
  app.post("/api/languages", function (req, res) {
    var language = req.body;
    db.Language.create(language)
      .then(function (language) {
        res.json(language);
      })
      .catch(function (err) {
        console.log(err);
        res.send(err);
      });
  });

  //POST a new idiom linked to existing
  app.post("/api/idiom/:curIdiomId", function (req, res) {
    var curIdiomId = parseInt(req.params.curIdiomId);
    var newIdiom = req.body;
    db.Idiom.create(newIdiom)
      .then(function (newIdiomdb) {
        //create a new link between curIdiomId and newIdiomdb.id
        var newLink = { idiom1Id: curIdiomId, idiom2Id: newIdiomdb.id };
        db.Link.create(newLink)
          .then(function (newLinkdb) {
            res.status(200).json(newIdiomdb);
          })
          .catch(function (err) {
            res.send(err);
          });
      })
      .catch(function (err) {
        res.send(err);
      });
  });
}

function extend(obj, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
}
