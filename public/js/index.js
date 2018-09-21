// this function is for having jquery inside this js file
// should be deleted after linking this file to the html
function loadScript(url, callback) {
  var script = document.createElement("script")
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
    $(".adding_button").on("click", function (event) {
      // can change the "adding_button" button name
      event.preventDefault();
      // we should have the add button have an id of the idiom  
      var id = $(this).data("id");
      hideAndShow("#home_page_div", "#add_idiom_div");
      $(".submit_button").attr("data-id", id);
    });

    // ajax calls:

    // create new idiom
    $(".submit_button").on("click", function (event) {
      // can change the "submit_button" button name
      event.preventDefault();
      // we should have the add button have an id of the idiom
      var id = $(this).data("id");
      var newIdiom = {
        language: $("#language_form"), // send language id
        origin_idiom: $("#idiom_form").val().trim(),
        pronunciation: $("#pronunciation_form").val().trim(),
        literal_meaning: $("#literal_form").val().trim(),
        meaning: $("#meaning_form").val().trim(),
        category: $("#category_form").val().trim(),
        equevilant_id: id
      };
      console.log(newIdiom);
      $.ajax("/api/idioms", {
        type: "post",
        data: newIdiom
      }).then(
        function () {
          $(".submit_button").removeAttr("data-id");
          hideAndShow("add_page_div", "the_idiom_div");
          // need to run the "get specific idiom" function
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    });

    // get specific idiom - search by name / id
    $("#search_idiom_submit".on("click", function (event) {
      event.preventDefault();
      // can change the "search_idiom_submit" and "search_idiom_input" button/class/id name
      var name = $("#search_idiom_input");
      var idiomName = {
        idiomName: name
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomName
      }).then(
        function () {
          hideAndShow("home_page_div", "the_idiom_div");
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    }));
    $(".link_idiom".on("click", function (event) {
      event.preventDefault();
      // can change the "link_idiom" class name
      // we should have the link_idiom button have an id of the idiom
      var id = $(this).data("id");
      var idiomId = {
        idiomId: id
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomId
      }).then(
        function () {
          hideAndShow("home_page_div", "the_idiom_div");
          // do things to show the new idiom as a card
          location.reload();
        }
      );
    }));

    // get all idioms from specific category - search by category
    $(".category_button").on("click", function (event) {
      event.preventDefault();
      // can change the "category_button" class name
      // we should have the category button have an name of the category  
      var category = $(this).data("name");
      var idiomsCategory = {
        idiomsCategory: category
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomsCategory
      }).then(
        function () {
          hideAndShow("home_page_div", "the_category_div");
          // do things to show the idioms by category on category card
          location.reload();
        }
      );
    });
    $("#search_category_submit").on("click", function (event) {
      event.preventDefault();
      // can change the "search_language_submit" and "search_language_input" button/class/id name
      var category = $("#search_category_input");
      var idiomsLanguage = {
        idiomsCategory: category
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomsLanguage
      }).then(
        function () {
          hideAndShow("home_page_div", "the_language_div");
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });

    // get all idioms from specific language - search by language
    $(".language_button").on("click", function (event) {
      event.preventDefault();
      // can change the "language_button" class name
      // we should have the language button have an name of the language  
      var language = $(this).data("name");
      var idiomsLanguage = {
        idiomsLanguage: language
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomsLanguage
      }).then(
        function () {
          hideAndShow("home_page_div", "the_language_div");
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });
    $("#search_language_submit").on("click", function (event) {
      event.preventDefault();
      // can change the "search_language_submit" and "search_language_input" button/class/id name
      var language = $("#search_language_input");
      var idiomsLanguage = {
        idiomsLanguage: language
      };
      $.ajax("/api/idioms", {
        type: "get",
        data: idiomsLanguage
      }).then(
        function () {
          hideAndShow("home_page_div", "the_language_div");
          // do things to show the idioms by language on language card
          location.reload();
        }
      );
    });

  });
});