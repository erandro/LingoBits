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
  function hideAndShow(showTag) {
    if (showTag !== homepageDiv) {
      homepageDiv.addClass("disable_class_name");
    }
    if (showTag !== categoryDiv) {
      homepageDiv.addClass("disable_class_name");
    }
    if (showTag !== languageDiv) {
      homepageDiv.addClass("disable_class_name");
    }
    if (showTag !== idiomDiv) {
      homepageDiv.addClass("disable_class_name");
    }
    if (showTag !== addIdiomDiv) {
      homepageDiv.addClass("disable_class_name");
    }
    showTag.removeClass("disable_class_name");
  }

  // The API methods
  $(function () {

    // show idiom's adding form
    addIdiomButton.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom  
      var id = $(this).data("id");
      hideAndShow(addIdiomDiv);
      addIdiomSubmit.attr("data-id", id);
    });

    // get all languages
    $.ajax("/api/languages", {
      type: "get"
    }).then(
      function (data) {
        console.log(data);
        // put data in array
      }
    ).catch(function (err) {
      console.log(err);
    });

    // ajax calls:

    // create new idiom
    addIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      // we should have the add button have an id of the idiom
      var id = $(this).data("id");
      var newIdiom = {
        LanguageId: formLanguage, // send language id
        origin_idiom: formIdiom.val().trim(),
        pronunciation: formPronunciation.val().trim(),
        literal_meaning: formLiteral.val().trim(),
        meaning: formMeaning.val().trim(),
        category: formCategory.val().trim(),
      };
      console.log(newIdiom);
      $.ajax("/api/idioms/" + id, {
        type: "post"
      }).then(
        function () {
          addIdiomSubmit.removeAttr("data-id");
          hideAndShow(idiomDiv);
          //getting an object with the info I need + Linked Idioms
        }
      ).catch(function (err) {
        console.log(err);
      });
    });

    // get all (or one) idioms - search by name
    searchIdiomSubmit.on("click", function (event) {
      event.preventDefault();
      var name = searchIdiomImput.replace(/\s+/g, "+");
      $.ajax("/api/idiomsbyName" + name, {
        type: "get"
      }).then(
        function () {
          hideAndShow(idiomDiv);
          // I'm getting an array with objects
          // if this array lengh === 1 
          // Show idiomDiv
          // if this array lengh > 1 
          // Show idiomsDiv
        }
      );
    });

    // get specific idiom - by id
    equivalentIdiom.on("click", function (event) {
      event.preventDefault();
      // we should have the equivalentIdiom button have an id of the idiom
      var id = $(this).data("id");
      $.ajax("/api/idiom/" + id, {
        type: "get"
      }).then(
        function () {
          hideAndShow(idiomDiv);
        }
      );
    });

    // get all idioms from specific category - search by category
    categoryButton.on("click", function (event) {
      event.preventDefault();
      // we should have the category button have an name of the category  
      var category = $(this).data("name");
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(categoryDiv);
          // do things to show the idioms by category on category card
        }
      );
    });
    searchCategorySubmit.on("click", function (event) {
      event.preventDefault();
      var category = searchCategoryImput;
      $.ajax("/api/idiomsbyCategory/" + category, {
        type: "get"
      }).then(
        function () {
          hideAndShow(categoryDiv);
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
      $.ajax("/api/idiomsbyLanguage/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(languageDiv);
          // do things to show the idioms by language on language card
        }
      );
    });
    searchLanguageSubmit.on("click", function (event) {
      event.preventDefault();
      var language = searchLanguageImput;
      $.ajax("/api/idiomsbyLanguage/" + language, {
        type: "get"
      }).then(
        function () {
          hideAndShow(languageDiv);
          // do things to show the idioms by language on language card
        }
      );
    });

  });
});

//test function area ******************* v down here v

var testFunction = function () {
  var id = "3";
  $.ajax("/api/idiom/" + id, {
    type: "get"
  }).then(
    function (data) {
      console.log(JSON.stringify(data));
    }
  ).catch(function (err) {
    console.log(err);
  });
};

testFunction();
//test function area ******************* ^  up here  ^

/*
var testFunction = function (event) {
  //event.preventDefault();
  var id = "3";
  var newIdiom = {
    LanguageId: 1,
    origin_idiom: "this is a test origin_idiom 1",
    pronunciation: "this is a test pronunciation 1",
    literal_meaning: "this is a test literal_meaning 1",
    meaning: "this is a test meaning 1",
    category: "this is a test category 1"
  };
  $.ajax("/api/idiom/" + id, {
    type: "post",
    data: newIdiom
  }).then(
    function (data) {
      console.log(data);
      // addIdiomSubmit.removeAttr("data-id");
      // hideAndShow(idiomDiv);
      // need to run the "get specific idiom" function
      // do things to show the new idiom as a card
      // location.reload();
    }
  ).catch(function (err) {
    console.log(err);
  });
};
*/