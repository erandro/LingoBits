// this function is for having jquery inside this js file
// should be deleted after linking this file to the html
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) { //IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" ||
        script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

$(document).ready(function () {

  // assign values to all elements that are called
  var homepageDiv = $("#home_page_div");
  var categoryDiv = $("#the_category_div");
  var languageDiv = $("#the_language_div");
  var idiomDiv = $("#the_idiom_div");
  var addIdiomDiv = $("#add_page_div");

  var searchIdiomSubmit = $("#search_idiom_submit");
  var searchIdiomImput = $("#search_idiom_input");
  var addIdiomButton = $("#adding_button");
  var equivalentIdiom = $(".link_idiom");

  var addIdiomSubmit = $("#submit_button");
  var formLanguage = $("#language_form");
  var formIdiom = $("#idiom_form");
  var formPronunciation = $("#pronunciation_form");
  var formLiteral = $("#literal_form");
  var formMeaning = $("#meaning_form");
  var formCategory = $("#category_form");

  var categoryButton = $(".category_button");
  var searchCategorySubmit = $("#search_category_submit");
  var searchCategoryImput = $("#search_category_input");

  var languageButton = $(".language_button");
  var searchLanguageSubmit = $("#search_language_submit");
  var searchLanguageImput = $("#search_language_input");

  // Display changes action
  function hideAndShow(hideTag, showTag) {
    if (hideTag.hasClass("show_class_name")) {
      $(hideTag).removeClass("show_class_name").addClass("disable_class_name");
    }
    if (showTag.hasClass("disable_class_name")) {
      $(showTag).removeClass("disable_class_name").addClass("show_class_name");
    }
  }

  // The API methods
  $(function () {

    // show idiom's adding form
    addIdiomButton.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom  
      var id = $(this).data("id");
      hideAndShow(homepageDiv, addIdiomDiv);
      addIdiomSubmit.attr("data-id", id);
    });

    // ajax calls:

    // create new idiom
    addIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom
      var id = $(this).data("id");
      var newIdiom = {
        language: formLanguage, // send language id
        origin_idiom: formIdiom.val().trim(),
        pronunciation: formPronunciation.val().trim(),
        literal_meaning: formLiteral.val().trim(),
        meaning: formMeaning.val().trim(),
        category: formCategory.val().trim(),
        equevilant_id: id
      };
      console.log(newIdiom);
      $.ajax("/api/idioms", {
        type: "post",
        data: newIdiom
      }).then(
        function () {
          addIdiomSubmit.removeAttr("data-id");
          hideAndShow(addIdiomDiv, idiomDiv);
          // need to run the "get specific idiom" function
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    });

    // get specific idiom - search by name / id
    searchIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      var name = searchIdiomImput;
      $.ajax("/api/idioms/name/" + name, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, idiomDiv);
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    });
    equivalentIdiom.on("click", function (event) {
      event.preventDefault();
      // we should have the equivalentIdiom button have an id of the idiom
      var id = $(this).data("id");
      $.ajax("/api/idioms/id/" + id, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, idiomDiv);
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    });

    // get all idioms from specific category - search by category
    categoryButton.on("click", function (event) {
      event.preventDefault();
      // we should have the category button have an name of the category  
      var category = $(this).data("name");
      $.ajax("/api/idioms/category/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, categoryDiv);
          // do things to show the idioms by category on category card
          location.reload();
        }
      );
    });
    searchCategorySubmit.on("click", function (event) {
      event.preventDefault();
      var category = searchCategoryImput;
      $.ajax("/api/idioms/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, categoryDiv);
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });

    // get all idioms from specific language - search by language
    languageButton.on("click", function (event) {
      event.preventDefault();
      // we should have the language button have an name of the language  
      var language = $(this).data("name");
      $.ajax("/api/idioms/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, languageDiv);
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });
    searchLanguageSubmit.on("click", function (event) {
      event.preventDefault();
      var language = searchLanguageImput;
      $.ajax("/api/idioms/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(homepageDiv, languageDiv);
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });

  });
});

//test function area ******************* v down here v
console.log("test");

var testFunction = function (event) {
  event.preventDefault();
  var id = "17";
  var newIdiom = {
    language: "1",
    origin_idiom: "this is a test origin_idiom 1",
    pronunciation: "this is a test pronunciation 1",
    literal_meaning: "this is a test literal_meaning 1",
    meaning: "this is a test meaning 1",
    category: "this is a test category 1",
    equevilant_id: id
  };
  console.log(newIdiom);
  $.ajax("/api/idioms", {
    type: "post",
    data: newIdiom
  }).then(
    function (data) {
      console.log(data);
      // addIdiomSubmit.removeAttr("data-id");
      // hideAndShow(addIdiomDiv, idiomDiv);
      // need to run the "get specific idiom" function
      // do things to show the new idiom as a card
      location.reload();
    }
  );
};

testFunction();
//test function area ******************* ^  up here  ^